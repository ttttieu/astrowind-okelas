import sys, re
import cairosvg
sys.path.insert(0, '/home/claude/erpf')
from lib import Fig, LIGHT, DARK, tw
import build_erpf as B
from build_erpf import bind, curly, chip, head, make, var_check, two_cols

OUT = '/home/claude/erps/out'
CHK = '/home/claude/erps/check'

B.PAIRS += ['nhập kho', 'chịu trách nhiệm', 'nhân viên', 'phê duyệt', 'ngoại lệ', 'cấu hình', 'nhất quán', 'quy tắc']

CONC_VI = 'Sơ đồ minh họa khái niệm từ bài viết, không phải số liệu đo lường.'
CONC_EN = 'Conceptual diagram from the article, not measured data.'

VI = dict(
    mt=60,
    t={1: 'Sáu câu hỏi ERP cần được trả lời về quy trình',
       2: 'Năm dấu hiệu quy trình chưa sẵn sàng cho ERP',
       3: 'Ba hệ quả khi đưa quy trình chưa chuẩn vào ERP',
       4: 'Chuẩn hóa trước ERP: cần nhất quán, không cần hoàn hảo',
       5: 'Tự đánh giá một quy trình bằng bốn câu hỏi',
       0: 'Quy trình chưa chuẩn hóa —\nrủi ro lớn nhất trước khi triển khai ERP'},
    s={1: 'ERP là công cụ vận hành quy trình đã được thiết kế, không phải công cụ thiết kế quy trình.',
       2: 'Mỗi dấu hiệu cho thấy chưa có một phiên bản quy trình đủ rõ để cấu hình.',
       3: 'Ba hướng diễn biến thường gặp khi các câu hỏi về quy trình chưa được trả lời trước.',
       4: 'Mục tiêu là đủ nhất quán để cấu hình và vận hành, không phải một bộ tài liệu hoàn chỉnh.',
       5: 'Chọn một quy trình quan trọng trong phạm vi ERP và tự kiểm tra trung thực.'},
    f={1: CONC_VI,
       2: 'Dấu hiệu theo phân tích trong bài viết, không phải thống kê.',
       3: 'Ba hướng diễn biến theo phân tích trong bài viết, không phải thống kê.',
       4: CONC_VI,
       5: 'Câu hỏi tự đánh giá từ bài viết, là công cụ thảo luận định hướng, không phải phương pháp luận được chứng nhận.'},
    # fig 1
    h1='Nhà triển khai cần biết, với từng quy trình',
    q1=['Có bao nhiêu bước?', 'Ai thực hiện từng bước?', 'Ai phê duyệt, theo điều kiện nào?',
        'Dữ liệu nào được nhập ở từng điểm?', 'Ngoại lệ xảy ra khi nào, xử lý ra sao?',
        'Liên kết với quy trình nào, theo thứ tự nào?'],
    e1='Nếu các phòng ban trả lời khác nhau cho cùng một câu hỏi, không thể cấu hình chính xác.',
    # fig 2
    w=[('Quy trình nằm trong đầu người', 'Chỉ có mô tả miệng, hoặc file cũ không ai cập nhật.'),
       ('Mỗi người một cách làm', 'Quy trình hình thành theo thói quen cá nhân; ERP không chạy song song nhiều phiên bản.'),
       ('Họp yêu cầu kết thúc bằng “tùy trường hợp”', 'Chưa có một phiên bản quy trình được chấp nhận.'),
       ('Ngoại lệ nhiều hơn quy tắc', 'Không ai còn nhớ quy tắc gốc.'),
       ('Không rõ ai chịu trách nhiệm gì', 'Câu trả lời phụ thuộc vào người đang có mặt.')],
    e2='Nếu nhiều dấu hiệu này xuất hiện, vấn đề nằm ở quy trình trước khi nằm ở phần mềm.',
    # fig 3
    root3='Đưa quy trình chưa chuẩn hóa vào ERP',
    hw='Hướng',
    cq=[('Cấu hình theo quy trình sai', 'Hệ thống không phản ánh thực tế. Sau go-live, nhân viên dùng Excel, ghi chú ngoài hệ thống hoặc xin ngoại lệ.'),
        ('Customization không kiểm soát', 'Mỗi nhóm có yêu cầu riêng, danh sách thay đổi dài dần. Mỗi customization có thể vỡ khi nâng cấp, và chỉ vài người hiểu.'),
        ('Cạn ngân sách trước go-live', 'Việc làm rõ quy trình diễn ra ngay trong dự án, với chi phí cao hơn ở mỗi buổi họp và vòng chỉnh cấu hình.')],
    e3='Chi phí làm rõ quy trình không biến mất; nó chuyển sang giai đoạn đắt hơn.',
    # fig 4
    n_t='Không cần', n_d='Không phải điều kiện để bắt đầu',
    n_i=['Flowchart chi tiết được mọi bên phê duyệt', 'Chuẩn hóa toàn bộ tổ chức', 'Xử lý mọi ngoại lệ ngay từ đầu'],
    y_t='Cần', y_d='Đủ để cấu hình và vận hành',
    y_i=['Ưu tiên quy trình thuộc phạm vi triển khai đầu tiên', 'Tập trung vào quy trình lõi, các trường hợp thông thường',
         'Tài liệu hóa đủ để nhân viên mới làm theo được', 'Mỗi quy trình có một người chịu trách nhiệm'],
    e4='Ngoại lệ có thể xử lý sau, khi hệ thống đã ổn định.',
    # fig 5
    st1='Bước 1: chọn một quy trình quan trọng trong phạm vi ERP (ví dụ: nhập kho, phê duyệt mua hàng, xử lý đơn hàng)',
    st2='Bước 2: tự trả lời bốn câu hỏi',
    ck=['Quy trình có được ghi bằng văn bản đủ chi tiết để người mới thực hiện không?',
        'Ba nhân viên cùng mô tả quy trình, có giống nhau không?',
        'Ai phê duyệt ở bước cuối, và điều đó có được ghi rõ không?',
        'Quy trình có thay đổi gần đây không, và tài liệu có được cập nhật không?'],
    e5='Nhiều câu trả lời “không” hoặc “không chắc” là khoảng trống cần xử lý trước khi triển khai ERP.',
    # cover
    kick='OKELAS · Insights · ERP',
    ca='Mỗi bộ phận một cách làm', cm='Một quy trình nhất quán', cb='ERP chỉ vận hành quy trình đã được định nghĩa',
    amp='ERP',
)

EN = dict(
    mt=62,
    t={1: 'Six questions ERP needs answered about a process',
       2: 'Five warning signs your processes are not ready',
       3: 'Three consequences of skipping process standardization',
       4: 'Before ERP: consistent is enough, perfect is not required',
       5: 'Self-assess one process with four questions',
       0: 'Process Standardization Before ERP:\nThe Step Most Companies Skip'},
    s={1: 'ERP operates processes that are already designed; it is not a tool for designing them.',
       2: 'Each sign shows there is no single process version clear enough to configure.',
       3: 'Three common paths when the process questions are not answered up front.',
       4: 'The goal is consistent enough to configure and operate, not a complete document set.',
       5: 'Pick one important process within the ERP scope and test it honestly.'},
    f={1: CONC_EN,
       2: 'Signs from the article’s analysis, not statistics.',
       3: 'Three paths from the article’s analysis, not statistics.',
       4: CONC_EN,
       5: 'Self-assessment questions from the article, a discussion aid, not a certified methodology.'},
    h1='What an implementation partner needs to know, for each process',
    q1=['How many steps does it have?', 'Who performs each step?', 'Who approves, and under what conditions?',
        'What data is captured at each point?', 'When do exceptions occur, and how are they handled?',
        'How does it connect to adjacent processes, and in what sequence?'],
    e1='If departments answer the same question differently, the system cannot be configured accurately.',
    w=[('Processes live in people’s heads', 'Only verbal descriptions, or an old file no one maintains.'),
       ('Every team has its own way', 'Processes form around personal habits; ERP cannot run parallel versions.'),
       ('Workshops end with “it depends”', 'No single agreed version of the process exists.'),
       ('Exceptions outnumber the rule', 'No one can recall the standard rule.'),
       ('Accountability is unclear', 'The answer depends on who happens to be available.')],
    e2='If several of these appear, the problem lies in the process before it lies in the software.',
    root3='Loading unstandardized processes into ERP',
    hw='Path',
    cq=[('Configured around the wrong process', 'The system does not reflect reality. After go-live, staff fall back on spreadsheets, side notes or requests for exceptions.'),
        ('Uncontrolled customization', 'Each group adds its own demands and the change list keeps growing. Each customization can break on upgrade, and few people understand it.'),
        ('Budget runs out before go-live', 'Clarifying the process happens during the project, at a higher cost in every workshop and configuration round.')],
    e3='The cost of clarifying the process does not disappear; it moves to a more expensive stage.',
    n_t='Not required', n_d='Not a condition for starting',
    n_i=['Detailed flowcharts signed off by everyone', 'Standardizing the whole organization', 'Resolving every exception up front'],
    y_t='Required', y_d='Enough to configure and operate',
    y_i=['Prioritize processes in the initial implementation scope', 'Focus on the core flow, the standard cases',
         'Document enough for a new employee to follow', 'Give each process a named owner'],
    e4='Exceptions can wait until the system has stabilized.',
    st1='Step 1: pick one important process within the ERP scope (e.g. goods receiving, purchase approval, customer order handling)',
    st2='Step 2: answer four questions honestly',
    ck=['Is the process documented in enough detail for a new employee to follow?',
        'If three employees describe it, do they describe it the same way?',
        'Is the final approver clearly recorded somewhere?',
        'Has the process changed recently, and was the documentation updated?'],
    e5='Several “no” or “not sure” answers are gaps to close before implementing ERP.',
    kick='OKELAS · Insights · ERP',
    ca='Every team its own way', cm='One consistent process', cb='ERP only operates processes that are already defined',
    amp='ERP',
)

ALT = {
    'vi': {
        1: 'Sáu câu hỏi nhà triển khai ERP cần biết về mỗi quy trình: số bước, người thực hiện, người phê duyệt, dữ liệu nhập, ngoại lệ và liên kết với quy trình khác; nếu các phòng ban trả lời khác nhau thì không thể cấu hình chính xác.',
        2: 'Năm dấu hiệu quy trình chưa sẵn sàng cho ERP: nằm trong đầu người, mỗi người một cách làm, họp yêu cầu kết thúc bằng tùy trường hợp, ngoại lệ nhiều hơn quy tắc và không rõ ai chịu trách nhiệm.',
        3: 'Đưa quy trình chưa chuẩn hóa vào ERP dẫn tới ba hướng: cấu hình theo quy trình sai, customization không kiểm soát và cạn ngân sách trước go-live.',
        4: 'Chuẩn hóa trước ERP không cần flowchart được mọi bên phê duyệt, chuẩn hóa toàn tổ chức hay xử lý mọi ngoại lệ; cần ưu tiên phạm vi đầu, quy trình lõi, tài liệu đủ cho người mới và một người chịu trách nhiệm cho mỗi quy trình.',
        5: 'Tự đánh giá một quy trình: chọn một quy trình trong phạm vi ERP rồi trả lời bốn câu hỏi về tài liệu hóa, độ nhất quán giữa nhân viên, người phê duyệt cuối và việc cập nhật tài liệu.',
        0: 'Bốn đường đi khác nhau cho cùng một việc hội tụ thành một đường nhất quán trước khi vào khối ERP.'},
    'en': {
        1: 'Six questions an ERP implementation partner needs answered about each process: number of steps, who performs them, who approves, data captured, exceptions and links to adjacent processes; if departments answer differently the system cannot be configured accurately.',
        2: 'Five warning signs processes are not ready for ERP: they live in people’s heads, every team has its own way, workshops end with it depends, exceptions outnumber the rule and accountability is unclear.',
        3: 'Loading unstandardized processes into ERP leads to three paths: configuration around the wrong process, uncontrolled customization and a budget that runs out before go-live.',
        4: 'Standardizing before ERP does not require flowcharts signed off by everyone, organization-wide standardization or resolving every exception; it requires prioritizing the initial scope, the core flow, documentation a new employee can follow and a named owner per process.',
        5: 'Self-assess one process: pick a process within the ERP scope and answer four questions on documentation, consistency between employees, the final approver and whether documentation was updated.',
        0: 'Four different paths for the same task converge into one consistent path before entering the ERP block.'},
}

VI = bind(VI)
EN = curly(EN)
LANGS = {'vi': VI, 'en': EN}
NAMES = {1: 'six-questions', 2: 'five-warning-signs', 3: 'three-consequences',
         4: 'consistent-not-perfect', 5: 'self-check-one-process'}


def numc(f, x, y, n, col='p', r=15):
    f.circle(x, y, r, col)
    f._line(x, y - 10, str(n), 15, 700, 'wh', 'middle', 20)


def fig1(f, L):
    head(f, L, 1)
    f.rect(60, 134, 1080, 44, 'gt', 'gm', 12, 1.6, '6 5')
    f.box_text(60, 134, 1080, 44, L['h1'], 16, 700, 'hd', 16)
    cw, ch, gx, gy, y0 = 348, 92, 18, 12, 194
    for i, q in enumerate(L['q1']):
        x = 60 + (i % 3) * (cw + gx)
        y = y0 + (i // 3) * (ch + gy)
        f.rect(x, y, cw, ch, 'pt', 'p', 16, 1.8)
        numc(f, x + 32, y + ch / 2, i + 1, 'p')
        f.box_text(x + 60, y, cw - 76, ch, q, 16, 700, 'hd', 0, 'left')
    f.ink(y0 + 2 * ch + gy + 16, L['e1'])


def fig2(f, L):
    head(f, L, 2)
    cw, gap, y = 204, 15, 134
    need = 0
    for t, d in L['w']:
        need = max(need, 62 + f.measure(t, 16, 700, cw - 32) + 10 + f.measure(d, 13, 400, cw - 32, 1.42) + 18)
    ch = round(need)
    for i, (t, d) in enumerate(L['w']):
        x = 60 + i * (cw + gap)
        f.rect(x, y, cw, ch, 'at', 'a', 16, 1.8)
        numc(f, x + 32, y + 32, i + 1, 'a')
        th = f.para(x + 16, y + 62, t, 16, 700, 'hd', cw - 32)
        f.para(x + 16, y + 62 + th + 10, d, 13, 400, 'tx', cw - 32, lhr=1.42)
    f.ink(y + ch + 16, L['e2'])


def fig3(f, L):
    head(f, L, 3)
    f.rect(300, 134, 600, 48, 'gt', 'gm', 14, 1.6, '6 5')
    f.box_text(300, 134, 600, 48, L['root3'], 17, 700, 'hd', 16)
    cw, gap, y = 348, 18, 212
    need = 0
    for t, d in L['cq']:
        need = max(need, 20 + 20 + f.measure(t, 18, 700, cw - 40) + 10 + f.measure(d, 14, 400, cw - 40, 1.42) + 20)
    ch = round(need)
    for i, (t, d) in enumerate(L['cq']):
        x = 60 + i * (cw + gap)
        f.arrow(x + cw / 2, 184, x + cw / 2, y - 2, 'gm', 2, 8)
        f.rect(x, y, cw, ch, 'at', 'a', 16, 1.8)
        f._line(x + 20, y + 18, '%s %d' % (L['hw'], i + 1), 13, 700, 'a', 'start', 18)
        th = f.para(x + 20, y + 42, t, 18, 700, 'hd', cw - 40)
        f.para(x + 20, y + 42 + th + 10, d, 14, 400, 'tx', cw - 40, lhr=1.42)
    f.ink(y + ch + 16, L['e3'])


def fig4(f, L):
    head(f, L, 4)
    two_cols(f, L, 4,
             (L['n_t'], L['n_d'], L['n_i'], 'gt', 'gm', '6 5', 62),
             (L['y_t'], L['y_d'], L['y_i'], 'pt', 'p', None, 44))


def fig5(f, L):
    head(f, L, 5)
    f.rect(60, 134, 1080, 54, 'gt', 'gm', 12, 1.6, '6 5')
    f.box_text(60, 134, 1080, 54, L['st1'], 15, 700, 'hd', 16)
    f.arrow(600, 190, 600, 212, 'gm', 2.5, 9)
    f._line(60, 218, L['st2'], 15, 700, 's', 'start', 22)
    cw, ch, gx, gy, y0 = 534, 72, 12, 10, 250
    for i, q in enumerate(L['ck']):
        x = 60 + (i % 2) * (cw + gx)
        y = y0 + (i // 2) * (ch + gy)
        f.rect(x, y, cw, ch, 'pt', 'p', 16, 1.8)
        f.circle(x + 32, y + ch / 2, 15, 'p')
        f._line(x + 32, y + ch / 2 - 10, str(i + 1), 15, 700, 'wh', 'middle', 20)
        f.box_text(x + 58, y, cw - 74, ch, q, 15, 700, 'hd', 0, 'left')
    f.ink(y0 + 2 * ch + gy + 16, L['e5'])


def figcover(f, L):
    f.rect(0, 0, 1200, 630, 'bg', None, 0)
    f.rect(0, 0, 14, 630, 'p', None, 0)
    f._line(60, 44, L['kick'], 16, 700, 's', 'start', 22)
    f.para(60, 84, L['t'][0], 40, 700, 'hd', 1040, lhr=1.25)
    M = (480, 398)
    paths = [[(150, 322), (250, 352), (330, 312), (420, 372), M],
             [(150, 384), (235, 362), (320, 424), (410, 384), M],
             [(150, 450), (255, 432), (340, 470), (430, 414), M],
             [(150, 514), (250, 482), (345, 504), (440, 428), M]]
    for p in paths:
        for a, b in zip(p[:-1], p[1:]):
            f.line(a[0], a[1], b[0], b[1], 'a', 2.6)
        f.circle(p[0][0], p[0][1], 8, 'a')
    f.arrow(M[0], M[1], 690, M[1], 'p', 5, 16)
    f.circle(M[0], M[1], 10, 'p')
    f.rect(700, 318, 260, 160, 'ink', None, 18)
    f._line(830, 374, L['amp'], 40, 700, 'onink', 'middle', 50)
    f.para(100, 548, L['ca'], 15, 700, 'a', 330)
    f.para(500, 430, L['cm'], 15, 700, 's', 190)
    f.para(700, 498, L['cb'], 15, 700, 's', 330)
    f.mark(H_COVER - 30)


H_COVER = 630
FIGS = {1: fig1, 2: fig2, 3: fig3, 4: fig4, 5: fig5}


def build(sel=None):
    for lang, L in LANGS.items():
        for k in list(FIGS) + [0]:
            if sel and k not in sel:
                continue
            label = ALT[lang][k]
            fn = figcover if k == 0 else FIGS[k]
            name = f'erps-00-og-cover-{lang}' if k == 0 else f'erps-{k:02d}-{NAMES[k]}-{lang}'
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
