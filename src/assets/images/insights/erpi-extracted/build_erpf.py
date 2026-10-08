import os, sys, re
import cairosvg
sys.path.insert(0, '/home/claude/erpf')
from lib import Fig, LIGHT, DARK, tw

OUT = '/home/claude/erpf/out'
CHK = '/home/claude/erpf/check'

PAIRS = ['quy trình', 'dữ liệu', 'doanh nghiệp', 'phần mềm', 'dự án', 'tổ chức', 'con người', 'nhà triển khai',
         'kết quả', 'kinh doanh', 'sẵn sàng', 'trách nhiệm', 'thẩm quyền', 'vận hành', 'hệ thống', 'nguyên nhân',
         'thành công', 'giai đoạn', 'khuếch đại', 'chuẩn hóa', 'kế hoạch', 'ra quyết định', 'phạm vi', 'phức tạp',
         'mỗi người', 'tốn kém', 'điểm mạnh', 'điểm yếu', 'thất bại', 'đổi cách', 'mặt kinh doanh', 'cách vận hành']


def bind(o):
    if isinstance(o, str):
        for p in PAIRS:
            o = o.replace(p, p.replace(' ', '\xa0'))
        return o
    if isinstance(o, dict):
        return {k: bind(v) for k, v in o.items()}
    if isinstance(o, (list, tuple)):
        return type(o)(bind(x) for x in o)
    return o


def curly(o):
    if isinstance(o, str):
        return o.replace("'", '’')
    if isinstance(o, dict):
        return {k: curly(v) for k, v in o.items()}
    if isinstance(o, (list, tuple)):
        return type(o)(curly(x) for x in o)
    return o


GOV_VI = 'Phân tích từ góc độ quản trị, không phải tư vấn tuân thủ hay pháp lý.'
GOV_EN = 'Analysis from a management perspective, not compliance or legal advice.'

VI = dict(
    mt=60,
    t={1: 'Dự án “xong” chưa có nghĩa là ERP thành công',
       2: 'ERP khuếch đại những gì doanh nghiệp đang có',
       3: 'Tám nguyên nhân khiến dự án ERP không đạt mục tiêu',
       4: 'Dấu hiệu sớm theo ba giai đoạn của dự án',
       5: 'Năm thách thức riêng của doanh nghiệp sản xuất',
       6: 'Trả lời sáu câu hỏi này trước khi chọn ERP',
       0: 'Tại sao dự án ERP không đạt mục tiêu —\nvà vấn đề thực sự không nằm ở phần mềm'},
    s={1: 'Phần lớn dự án ERP không kết thúc bằng một tuyên bố thất bại chính thức.',
       2: 'ERP là công cụ ghi nhận giao dịch theo quy trình. Nó không tự sửa quy trình.',
       3: 'Sắp xếp theo thứ tự trong bài viết; số thứ tự không phải mức độ nghiêm trọng.',
       4: 'Dùng như danh sách đối chiếu khi dự án đang chuẩn bị, đang chạy hoặc đã go-live.',
       5: 'Ngoài tám nguyên nhân chung cho mọi ngành, sản xuất đối mặt thêm các yêu cầu riêng.',
       6: 'Đây là các câu hỏi cần trả lời trước, không phải sau khi đã chọn phần mềm.'},
    f={1: 'Sơ đồ minh họa khái niệm từ bài viết, không phải số liệu đo lường. ' + GOV_VI,
       2: 'Minh họa khái niệm “ERP là công cụ khuếch đại” từ bài viết, không phải số liệu đo lường. ' + GOV_VI,
       3: 'Cách nhóm theo phân tích trong bài viết, không phải thống kê. ' + GOV_VI,
       4: 'Dấu hiệu tổng hợp từ bài viết, không phải số liệu đo lường. ' + GOV_VI,
       5: 'Thách thức theo phân tích trong bài viết, không phải thống kê. ' + GOV_VI,
       6: 'Câu hỏi tự đánh giá định hướng từ bài viết, là công cụ thảo luận, không phải phương pháp luận được chứng nhận.'},
    # fig 1
    a_t='Phần nhìn thấy', a_d='Phần mềm đã triển khai, hệ thống đang chạy',
    a_i=['Phần mềm đã được cài đặt', 'Nhân viên vẫn đăng nhập', 'Dữ liệu vẫn được nhập vào'],
    b_t='Phần bị che khuất', b_d='Kết quả thực tế khác xa kỳ vọng ban đầu',
    b_i=['Nghiệp vụ thực tế vẫn chạy bằng Excel, email, thủ công song song',
         'Dữ liệu trong ERP không được tin, báo cáo không dùng để ra quyết định',
         'Customization tăng dần, hệ thống ngày càng khó bảo trì',
         'Doanh nghiệp chưa thực sự đổi cách vận hành'],
    e1='Phần mềm chạy chưa phải mục tiêu: chưa đổi cách vận hành thì vẫn là thất bại về mặt kinh doanh.',
    # fig 2
    r1l='Doanh nghiệp có nền tảng',
    r1ld='Quy trình rõ và nhất quán; dữ liệu đủ chất lượng; phạm vi được kiểm soát; con người hiểu vì sao thay đổi; có governance sau go-live.',
    r1r='ERP khuếch đại điểm mạnh', r1rd='Những gì doanh nghiệp đang làm tốt được nhân lên.',
    r2l='Doanh nghiệp chưa sẵn sàng',
    r2ld='Quy trình mơ hồ, dữ liệu lộn xộn, văn hóa “mỗi người một cách”.',
    r2r='ERP cũng khuếch đại điểm yếu', r2rd='Vẫn vận hành như cũ, nhưng trên một hệ thống phức tạp và tốn kém hơn.',
    amp='khuếch đại',
    e2='ERP khuếch đại cả điểm mạnh lẫn điểm yếu: câu hỏi là doanh nghiệp đang có gì để khuếch đại.',
    # fig 3
    c=[('Quy trình chưa chuẩn hóa', 'Dự án thành cuộc thương lượng liên miên về cách hệ thống nên hoạt động.'),
       ('Dữ liệu không sạch, không đủ', 'Hệ thống phản ánh đúng cả những điểm không nhất quán được đưa vào.'),
       ('Scope không được kiểm soát', 'Mỗi yêu cầu nhỏ đều có lý do; cộng lại, dự án phình ra.'),
       ('Customization quá nhiều', 'Hệ thống khó nâng cấp, khó bảo trì, dần thành hộp đen.'),
       ('Con người không đổi cách làm việc', 'Họ làm việc xung quanh hệ thống: Excel, ghi chú riêng, xin ngoại lệ.'),
       ('Thiếu governance sau go-live', 'Hệ thống không có chủ thì không ai muốn dùng.'),
       ('Kế toán, tài chính chưa sẵn sàng', 'Thiếu sơ đồ tài khoản, cách phân bổ chi phí, quy trình đối chiếu.'),
       ('Không định nghĩa “thành công”', 'Dự án luôn “xong” về kỹ thuật dù chưa tạo giá trị kinh doanh.')],
    e3='Cả tám nguyên nhân đều là câu hỏi về mức độ sẵn sàng của tổ chức, không phải câu hỏi chọn phần mềm nào.',
    # fig 4
    st=['Giai đoạn chuẩn bị', 'Giai đoạn triển khai', 'Sau go-live'],
    sg=[['Chưa có tài liệu quy trình hiện tại đủ chi tiết cho nhà triển khai',
         'Họp yêu cầu kết thúc bằng “để xem lại” hoặc “tùy trường hợp”',
         'Không có một người chịu trách nhiệm cuối cùng cho từng module',
         'Dữ liệu master chưa được làm sạch và chuẩn hóa'],
        ['Danh sách customization dài ra mà không ai kiểm soát',
         'Gap analysis thấy nhiều điểm lệch nhưng không có quyết định xử lý',
         'Người dùng cuối được đào tạo muộn hoặc không tham gia kiểm thử',
         'Không có kế hoạch xử lý dữ liệu cũ sau go-live'],
        ['Nhiều quy trình vẫn chạy song song ngoài ERP',
         'Báo cáo ERP không khớp số liệu ban lãnh đạo dùng để quyết định',
         'Không có người phụ trách ERP nội bộ rõ ràng',
         'Mỗi vấn đề đều phải quay lại nhà triển khai']],
    e4='Câu hỏi hữu ích ở mỗi giai đoạn: dấu hiệu nào trong số này đã xuất hiện ở dự án của chúng ta?',
    # fig 5
    root5='Bổ sung cho tám nguyên nhân chung của mọi ngành',
    m=[('BOM và quy trình sản xuất', 'Cần BOM chính xác, cập nhật. Nhiều SME không có BOM đầy đủ, hoặc BOM không phản ánh thực tế.'),
       ('Chất lượng và traceability', 'ISO, GMP, FSMS cần lot tracking, hồ sơ chất lượng, dấu vết kiểm toán; không phải ERP nào cũng xử lý tốt.'),
       ('Tích hợp thiết bị, dây chuyền', 'Tích hợp với máy móc, cân, thiết bị đo, MES làm độ phức tạp tăng đáng kể.'),
       ('Đơn vị tính và hao hụt', 'Thủy sản, thực phẩm, trà có tỷ lệ chuyển đổi và hao hụt mà ERP chuẩn không tự xử lý.'),
       ('Mùa vụ và biến động', 'Tồn kho, lao động, sản lượng biến động lớn mà cấu hình mặc định không phải lúc nào cũng tính tới.')],
    e5='Đây là phần ERP chuẩn không tự động giải quyết: cần được xác định từ đầu dự án.',
    # fig 6
    q=['Quy trình đã đủ rõ ràng và nhất quán để cấu hình vào ERP chưa?',
       'Dữ liệu master đang ở tình trạng nào?',
       'Phạm vi triển khai đầu tiên có đủ nhỏ để thành công không?',
       'Có người đủ năng lực và thẩm quyền ra quyết định trong suốt dự án không?',
       'Có kế hoạch change management, hay chỉ có kế hoạch IT?',
       'Ai chịu trách nhiệm hệ thống sau khi đội dự án rời đi?'],
    gate='Cổng sẵn sàng',
    nx='Chọn ERP nào, nhà triển khai nào?',
    nxd='Không phải câu hỏi sai, nhưng sẽ đến quá sớm nếu chưa qua cổng.',
    e6='Trả lời trung thực trước khi chọn phần mềm là khác biệt giữa dự án tạo ra giá trị và dự án thành gánh nặng.',
    # cover
    kick='OKELAS · Insights · ERP',
    la='Quy trình rõ, dữ liệu sạch', lb='Quy trình mơ hồ, dữ liệu lộn xộn',
    oa='Giá trị được khuếch đại', ob='Hỗn loạn được khuếch đại',
)

EN = dict(
    mt=62,
    t={1: 'A project that is “done” is not a successful ERP',
       2: 'ERP amplifies what the organization already has',
       3: 'Eight root causes of ERP underperformance',
       4: 'Early warning signs across three project stages',
       5: 'Five challenges specific to manufacturing SMEs',
       6: 'Answer these six questions before choosing an ERP',
       0: 'Why ERP Projects Fail —\nand What the Software Cannot Fix'},
    s={1: 'Most ERP projects do not end with a formal declaration of failure.',
       2: 'ERP records transactions according to processes. It does not repair the processes.',
       3: 'In the order they appear in the article; numbering does not indicate severity.',
       4: 'Use as a checklist while a project is preparing, running or already live.',
       5: 'Beyond the eight common causes, manufacturing faces additional operational requirements.',
       6: 'These come first, before software is chosen, not after.'},
    f={1: 'Conceptual diagram from the article, not measured data. ' + GOV_EN,
       2: 'Illustration of the “ERP is an amplifier” idea from the article, not measured data. ' + GOV_EN,
       3: 'Grouping from the article’s analysis, not statistics. ' + GOV_EN,
       4: 'Signs compiled from the article, not measured data. ' + GOV_EN,
       5: 'Challenges from the article’s analysis, not statistics. ' + GOV_EN,
       6: 'Orienting self-assessment questions from the article, a discussion aid, not a certified methodology.'},
    a_t='What is visible', a_d='Software deployed, system running',
    a_i=['The software is installed', 'Employees still log in', 'Data still gets entered'],
    b_t='What is hidden', b_d='Actual results fall well short of expectations',
    b_i=['Real work still runs on spreadsheets, email and manual workarounds in parallel',
         'Data in the ERP is not trusted; reports are not used for decisions',
         'Customization keeps accumulating; the system gets harder to maintain',
         'The organization has not actually changed how it operates'],
    e1='Software that runs is not the goal: without changed operations, it is still a business failure.',
    r1l='An organization with foundations',
    r1ld='Clear, consistent processes; data of sufficient quality; controlled scope; people who understand why they change; governance after go-live.',
    r1r='ERP amplifies strengths', r1rd='What the organization already does well is multiplied.',
    r2l='An organization not yet ready',
    r2ld='Vague processes, inconsistent data, a culture where everyone does it their own way.',
    r2r='ERP amplifies weaknesses too', r2rd='Operations carry on as before, on a more complex and expensive system.',
    amp='amplifier',
    e2='ERP amplifies strengths and weaknesses alike: the question is what your organization has to amplify.',
    c=[('Processes not standardized', 'The project becomes an endless negotiation about how the system should work.'),
       ('Unclean, incomplete data', 'The system faithfully reflects every inconsistency it is given.'),
       ('Scope not controlled', 'Each small request has a reason; together they inflate the project.'),
       ('Customization without strategy', 'The system gets harder to upgrade and maintain, until it becomes a black box.'),
       ('People do not change how they work', 'They work around the system: spreadsheets, private notes, exceptions.'),
       ('No governance after go-live', 'A system without an owner is a system no one wants to use.'),
       ('Finance and accounting not ready', 'No chart of accounts, cost allocation or reconciliation processes in place.'),
       ('No definition of “success”', 'The project is “done” technically even when it creates no business value.')],
    e3='All eight are questions about organizational readiness, not about which software to pick.',
    st=['Preparation stage', 'Implementation stage', 'After go-live'],
    sg=[['No process documentation detailed enough for the implementation partner',
         'Requirements meetings end with “let’s revisit this” or “it depends”',
         'No single accountable owner for each module’s requirements',
         'Master data not yet cleaned and standardized'],
        ['The customization list keeps growing and no one controls it',
         'Gap analysis finds mismatches but no decisions on resolving them',
         'End users trained too late or left out of testing',
         'No plan for handling legacy data after go-live'],
        ['Many processes still run in parallel outside ERP',
         'ERP reports do not reconcile with the numbers management decides on',
         'No clearly designated internal ERP owner',
         'Every issue goes back to the implementation partner']],
    e4='A useful question at each stage: which of these signs have already appeared in our project?',
    root5='On top of the eight causes common to every industry',
    m=[('BOM and production routing', 'Needs accurate, current BOMs. Many SMEs lack complete BOMs, or BOMs that match real production.'),
       ('Quality and traceability', 'ISO, GMP, FSMS need lot tracking, quality records and audit trails; not every ERP handles them well.'),
       ('Equipment and line integration', 'Integrating machines, scales, instruments or MES raises complexity substantially.'),
       ('Units of measure and yield', 'Seafood, food, tea: conversion ratios and production loss that standard ERP does not handle automatically.'),
       ('Seasonality and variability', 'Large swings in inventory, volume and labor that default configurations do not always account for.')],
    e5='Standard ERP does not solve these automatically: they need to be identified early in the project.',
    q=['Are our processes clear and consistent enough to configure in ERP?',
       'What is the actual condition of our master data?',
       'Is our first implementation scope small enough to succeed?',
       'Do we have people with the capability and authority to decide throughout the project?',
       'Do we have a change management plan, or only an IT plan?',
       'Who owns the system after the project team leaves?'],
    gate='Readiness gate',
    nx='Which ERP? Which implementation partner?',
    nxd='Not wrong questions, but they come too early if the gate has not been passed.',
    e6='Honest answers before choosing software separate value-creating projects from burdensome ones.',
    kick='OKELAS · Insights · ERP',
    la='Clear processes, clean data', lb='Vague processes, messy data',
    oa='Value amplified', ob='Chaos amplified',
)

ALT = {
    'vi': {
        1: 'Dự án ERP “xong” có phần nhìn thấy (cài phần mềm, nhân viên đăng nhập, dữ liệu được nhập) và phần bị che khuất (việc thật vẫn chạy bằng Excel và email, dữ liệu không được tin, customization tăng, vận hành chưa đổi); nếu chưa đổi cách vận hành thì vẫn là thất bại về kinh doanh.',
        2: 'Doanh nghiệp có nền tảng đi qua ERP thì điểm mạnh được nhân lên; doanh nghiệp chưa sẵn sàng đi qua cùng một ERP thì điểm yếu cũng được nhân lên trên một hệ thống phức tạp và tốn kém hơn.',
        3: 'Tám nguyên nhân phổ biến khiến dự án ERP không đạt mục tiêu: quy trình chưa chuẩn hóa, dữ liệu kém, scope không kiểm soát, customization quá nhiều, con người không đổi cách làm việc, thiếu governance sau go-live, kế toán chưa sẵn sàng và không định nghĩa thành công.',
        4: 'Dấu hiệu sớm của dự án ERP gặp vấn đề, chia theo ba giai đoạn: chuẩn bị, triển khai và sau go-live, mỗi giai đoạn bốn dấu hiệu.',
        5: 'Năm thách thức riêng của doanh nghiệp sản xuất khi triển khai ERP: BOM, chất lượng và traceability, tích hợp thiết bị, đơn vị tính và hao hụt, mùa vụ.',
        6: 'Sáu câu hỏi về quy trình, dữ liệu, phạm vi, người ra quyết định, change management và trách nhiệm sau dự án phải được trả lời trước khi đến câu hỏi chọn ERP nào và nhà triển khai nào.',
        0: 'Hai chuỗi đầu vào đi qua cùng một khối ERP: chuỗi có trật tự cho ra kết quả có trật tự được nhân lên, chuỗi lộn xộn cho ra sự lộn xộn được nhân lên.'},
    'en': {
        1: 'A “finished” ERP project has a visible side (software installed, employees logging in, data entered) and a hidden side (real work still on spreadsheets and email, data not trusted, customization growing, operations unchanged); without changed operations it is still a business failure.',
        2: 'An organization with foundations passing through ERP has its strengths multiplied; an organization not yet ready passing through the same ERP has its weaknesses multiplied on a more complex and expensive system.',
        3: 'Eight common root causes of ERP underperformance: unstandardized processes, poor data, uncontrolled scope, too much customization, people not changing how they work, no governance after go-live, finance not ready, and no definition of success.',
        4: 'Early warning signs of an ERP project in trouble, in three project stages: preparation, implementation and after go-live, four signs each.',
        5: 'Five challenges specific to manufacturing SMEs implementing ERP: BOM, quality and traceability, equipment integration, units of measure and yield, and seasonality.',
        6: 'Six questions on processes, data, scope, decision-makers, change management and post-project ownership must be answered before the question of which ERP and which implementation partner.',
        0: 'Two input streams pass through the same ERP block: the orderly one comes out as multiplied order, the messy one as multiplied chaos.'},
}

VI = bind(VI)
EN = curly(EN)
LANGS = {'vi': VI, 'en': EN}

NAMES = {1: 'what-failure-looks-like', 2: 'erp-is-an-amplifier', 3: 'eight-root-causes',
         4: 'early-warning-signs', 5: 'manufacturing-challenges', 6: 'readiness-before-selection'}


def chip(f, x, y, w, h, t, st='gm', fill='bg', size=13, color='hd', dash=None, sw=1.5, weight=700):
    f.rect(x, y, w, h, fill, st, 10, sw, dash)
    f.box_text(x, y, w, h, t, size, weight, color, 8)


def numc(f, x, y, n, col='p'):
    f.circle(x, y, 15, col)
    f._line(x, y - 10, str(n), 15, 700, 'wh', 'middle', 20)


def head(f, L, k):
    f.frame(L['t'][k], L['s'][k], L['f'][k], L['mt'])


def two_cols(f, L, k, left, right, y=134):
    h = 330
    for x, (t, d, items, fill, st, dash, ih) in ((60, left), (612, right)):
        f.rect(x, y, 528, h, fill, st, 16, 1.8, dash)
        f.para(x + 24, y + 22, t, 22, 700, 'hd', 480)
        f.para(x + 24, y + 58, d, 14, 400, 'tx', 480, lhr=1.4)
        for i, it in enumerate(items):
            chip(f, x + 24, y + 104 + i * (ih + 10), 480, ih, it, st, 'bg', 14, 'hd')
    f.ink(y + h + 16, L['e%d' % k])


def fig1(f, L):
    head(f, L, 1)
    two_cols(f, L, 1,
             (L['a_t'], L['a_d'], L['a_i'], 'pt', 'p', None, 62),
             (L['b_t'], L['b_d'], L['b_i'], 'at', 'a', '6 5', 44))


def fig2(f, L):
    head(f, L, 2)
    y0, rh, gap = 134, 160, 16
    rows = [(L['r1l'], L['r1ld'], L['r1r'], L['r1rd'], 'pt', 'p', None),
            (L['r2l'], L['r2ld'], L['r2r'], L['r2rd'], 'at', 'a', '6 5')]
    for i, (lt, ld, rt, rd, fill, st, dash) in enumerate(rows):
        y = y0 + i * (rh + gap)
        for x, t, d in ((60, lt, ld), (720, rt, rd)):
            f.rect(x, y, 420, rh, fill, st, 16, 1.8, dash)
            th = f.para(x + 20, y + 18, t, 17, 700, 'hd', 380)
            dh = f.para(x + 20, y + 18 + th + 8, d, 14, 400, 'tx', 380, lhr=1.4)
            if 18 + th + 8 + dh > rh - 12:
                raise ValueError('text overflows box: ' + d)
        f.arrow(486, y + rh / 2, 514, y + rh / 2, 'gm', 3, 10)
        f.arrow(686, y + rh / 2, 714, y + rh / 2, 'gm', 3, 10)
    hh = 2 * rh + gap
    f.rect(520, y0, 160, hh, 'ink', None, 16)
    mid = y0 + hh / 2
    f._line(600, mid - 34, 'ERP', 32, 700, 'onink', 'middle', 42)
    f._line(600, mid + 12, L['amp'], 15, 700, 'onink', 'middle', 22)
    f.ink(y0 + hh + 16, L['e2'])


def fig3(f, L):
    head(f, L, 3)
    cw, ch, gx, gy = 534, 88, 12, 10
    for i, (t, d) in enumerate(L['c']):
        col, row = i % 2, i // 2
        x = 60 + col * (cw + gx)
        y = 134 + row * (ch + gy)
        f.rect(x, y, cw, ch, 'at', 'a', 16, 1.8)
        numc(f, x + 32, y + 30, i + 1, 'a')
        th = f.para(x + 60, y + 14, t, 16, 700, 'hd', cw - 80)
        dh = f.para(x + 60, y + 14 + th + 4, d, 13, 400, 'tx', cw - 80, lhr=1.4)
        if 14 + th + 4 + dh > ch - 8:
            raise ValueError('text overflows box: ' + d)
    f.ink(134 + 4 * ch + 3 * gy + 16, L['e3'])


def fig4(f, L):
    head(f, L, 4)
    cw, gap = 348, 18
    hy, hh = 134, 44
    ch, cg = 62, 8
    for c in range(3):
        x = 60 + c * (cw + gap)
        f.rect(x, hy, cw, hh, 'gt', 'gm', 12, 1.6)
        f.box_text(x, hy, cw, hh, L['st'][c], 16, 700, 'hd', 10)
        if c < 2:
            f.arrow(x + cw + 2, hy + hh / 2, x + cw + gap - 2, hy + hh / 2, 'gm', 2, 8)
        for i, t in enumerate(L['sg'][c]):
            chip(f, x, hy + hh + 14 + i * (ch + cg), cw, ch, t, 'a', 'at', 13, 'tx', None, 1.6, 400)
    bottom = hy + hh + 14 + 4 * ch + 3 * cg
    f.ink(bottom + 16, L['e4'])


def fig5(f, L):
    head(f, L, 5)
    f.rect(60, 134, 1080, 52, 'gt', 'gm', 14, 1.6, '6 5')
    f.box_text(60, 134, 1080, 52, L['root5'], 17, 700, 'hd', 16)
    cw, gap, y = 204, 15, 214
    need = 0
    for t, d in L['m']:
        th = f.measure(t, 16, 700, cw - 32)
        dh = f.measure(d, 13, 400, cw - 32, 1.42)
        need = max(need, 16 + th + 10 + dh + 16)
    ch = round(need)
    for i, (t, d) in enumerate(L['m']):
        x = 60 + i * (cw + gap)
        f.arrow(x + cw / 2, 188, x + cw / 2, y - 2, 'gm', 2, 8)
        f.rect(x, y, cw, ch, 'at', 'a', 16, 1.8)
        th = f.para(x + 16, y + 16, t, 16, 700, 'hd', cw - 32)
        f.para(x + 16, y + 16 + th + 10, d, 13, 400, 'tx', cw - 32, lhr=1.42)
    f.ink(y + ch + 16, L['e5'])


def fig6(f, L):
    head(f, L, 6)
    cw, ch, gx, gy = 534, 62, 12, 10
    for i, q in enumerate(L['q']):
        x = 60 + (i % 2) * (cw + gx)
        y = 134 + (i // 2) * (ch + gy)
        f.rect(x, y, cw, ch, 'pt', 'p', 16, 1.8)
        f.circle(x + 32, y + ch / 2, 15, 'p')
        f._line(x + 32, y + ch / 2 - 10, str(i + 1), 15, 700, 'wh', 'middle', 20)
        f.box_text(x + 56, y, cw - 72, ch, q, 15, 700, 'hd', 0, 'left')
    gy_ = 134 + 3 * ch + 2 * gy + 22
    f.line(60, gy_, 1140, gy_, 'a', 2, '6 5')
    gw = tw(L['gate'], 13, 700) + 28
    f.pill(600 - gw / 2, gy_ - 14, L['gate'], 'a', 'at', 13, 'start', 28, 14)
    f.arrow(600, gy_ + 18, 600, gy_ + 44, 'gm', 2.5, 9)
    by = gy_ + 48
    f.rect(260, by, 680, 70, 'gt', 'gm', 14, 1.6, '6 5')
    f._line(600, by + 11, L['nx'], 17, 700, 'hd', 'middle', 24)
    f._line(600, by + 39, L['nxd'], 13, 400, 'mut', 'middle', 20)
    f.ink(by + 70 + 16, L['e6'])


def figcover(f, L):
    f.rect(0, 0, 1200, 630, 'bg', None, 0)
    f.rect(0, 0, 14, 630, 'p', None, 0)
    f._line(60, 44, L['kick'], 16, 700, 's', 'start', 22)
    f.para(60, 84, L['t'][0], 40, 700, 'hd', 1000, lhr=1.25)
    # ERP block
    f.rect(500, 262, 200, 280, 'ink', None, 18)
    f._line(600, 372, 'ERP', 36, 700, 'onink', 'middle', 46)
    f._line(600, 420, L['amp'], 16, 700, 'onink', 'middle', 22)
    ya, yb = 330, 476
    # row A: orderly
    for dx in (-24, 0, 24):
        for dy in (-24, 0, 24):
            f.circle(340 + dx, ya + dy, 7, 'p')
    f.arrow(410, ya, 486, ya, 'gm', 3, 11)
    f.arrow(714, ya, 790, ya, 'gm', 3, 11)
    for dx in (-40, 0, 40):
        for dy in (-40, 0, 40):
            f.circle(875 + dx, ya + dy, 11, 'p')
    # row B: scattered
    sc = [(-30, -14), (4, -24), (30, -6), (-12, 6), (18, 24), (-34, 20), (2, -2)]
    for dx, dy in sc:
        f.circle(340 + dx * 0.9, yb + dy * 0.9, 7, 'a')
    f.arrow(410, yb, 486, yb, 'gm', 3, 11)
    f.arrow(714, yb, 790, yb, 'gm', 3, 11)
    for dx, dy in sc:
        f.circle(875 + dx * 1.9, yb + dy * 1.9, 11, 'a')
    # labels
    for txt, cy, col, x, anchor, mw in ((L['la'], ya, 's', 60, 'start', 190), (L['lb'], yb, 'a', 60, 'start', 190),
                                        (L['oa'], ya, 's', 1000, 'start', 140), (L['ob'], yb, 'a', 1000, 'start', 140)):
        h = f.measure(txt, 14, 700, mw)
        f.para(x, cy - h / 2, txt, 14, 700, col, mw, anchor)
    f.mark(H_COVER - 30)


H_COVER = 630
FIGS = {1: fig1, 2: fig2, 3: fig3, 4: fig4, 5: fig5, 6: fig6}


def make(fn, L, label, mode='svg', dark=False, H0=480):
    H = H0
    while True:
        f = Fig(H, mode, dark, label)
        try:
            fn(f, L)
            return f
        except ValueError as e:
            if 'collides with footer' not in str(e) or H > 900:
                raise
            H += 2


def var_check(svg_adaptive, png_light_svg):
    s = re.sub(r'<style>.*?</style>', '', svg_adaptive)
    s = re.sub(r'var\(--(\w+)\)', lambda m: LIGHT[m.group(1)], s)
    s = s.replace('font-family="Inter, system-ui, sans-serif"', 'font-family="Inter"')
    return s == png_light_svg


def build(sel=None):
    for lang, L in LANGS.items():
        for k in list(FIGS) + [0]:
            if sel and k not in sel:
                continue
            label = ALT[lang][k]
            fn = figcover if k == 0 else FIGS[k]
            name = f'erpf-00-og-cover-{lang}' if k == 0 else f'erpf-{k:02d}-{NAMES[k]}-{lang}'
            if k == 0:
                s = Fig(H_COVER, 'svg', False, label); fn(s, L)
                p = Fig(H_COVER, 'png', False, label); fn(p, L)
                d = Fig(H_COVER, 'png', True, label); fn(d, L)
                H = H_COVER
            else:
                s = make(fn, L, label, 'svg')
                H = s.H
                p = make(fn, L, label, 'png', False, H)
                d = make(fn, L, label, 'png', True, H)
            svg = s.svg()
            assert var_check(svg, p.svg()), 'adaptive vs light mismatch ' + name
            open(f'{OUT}/{lang}/{name}.svg', 'w', encoding='utf-8').write(svg)
            if k == 0:
                cairosvg.svg2png(bytestring=p.svg().encode('utf-8'), write_to=f'{OUT}/{lang}/{name}.png', output_width=1200)
            cairosvg.svg2png(bytestring=p.svg().encode('utf-8'), write_to=f'{CHK}/{name}-light.png', output_width=1200)
            cairosvg.svg2png(bytestring=d.svg().encode('utf-8'), write_to=f'{CHK}/{name}-dark.png', output_width=1200)
            print('ok', name, 'H', H)


if __name__ == '__main__':
    build([int(a) for a in sys.argv[1:]] or None)
