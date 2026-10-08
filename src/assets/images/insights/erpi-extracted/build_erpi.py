import sys, re
import cairosvg
sys.path.insert(0, '/home/claude/erpf')
from lib import Fig, LIGHT, DARK, tw
import build_erpf as B
from build_erpf import bind, curly, chip, head, make, var_check, two_cols

OUT = '/home/claude/erpi/out'
CHK = '/home/claude/erpi/check'

B.PAIRS += ['scope creep', 'go-live', 'kick-off', 'giai đoạn', 'nhà triển khai', 'ngân sách', 'dự phòng', 'đánh giá', 'tác động', 'quy trình', 'yêu cầu', 'thay đổi', 'nguyên nhân', 'gốc rễ', 'nợ kỹ thuật', 'người có thẩm quyền', 'chi phí', 'rủi ro', 'bảo trì', 'nâng cấp', 'user adoption', 'change management', 'super user', 'người dùng', 'nhân viên', 'chart of accounts', 'số dư đầu kỳ', 'chi phí', 'kế toán', 'phân bổ', 'tài sản', 'tồn kho', 'bút toán', 'routing', 'traceability', 'sản xuất', 'nguyên liệu', 'thành phẩm', 'nhà triển khai', 'bảng tính', 'nguyên nhân', 'dữ liệu', 'cấu hình', 'master data', 'vai trò', 'quyết định', 'chịu trách nhiệm', 'tình huống', 'lộ trình', 'khoảng cách']

CONC_VI = 'Sơ đồ minh họa khái niệm từ bài viết, không phải số liệu đo lường.'
CONC_EN = 'Conceptual diagram from the article, not measured data.'

VI = dict(
    mt=62,
    t={1: 'Go-live kết thúc implementation, chưa phải adoption',
       2: 'Năm dấu hiệu adoption đã thực sự xảy ra',
       3: 'Tình huống minh họa: sáu tháng sau go-live',
       4: 'Năm nguyên nhân tồn tại khoảng cách',
       5: 'Lộ trình sau go-live để thu hẹp khoảng cách',
       6: 'Bảy dấu hiệu: đã triển khai nhưng chưa được áp dụng?',
       0: 'Từ ERP implementation đến adoption:\nkhoảng cách ít ai nói tới'},
    s={1: 'Khoảng cách giữa hai điểm này thường lớn hơn các thông báo sau go-live cho thấy.',
       2: 'Đo bằng thay đổi trong vận hành và ra quyết định, không phải tỷ lệ đăng nhập.',
       3: 'Doanh nghiệp chế biến thực phẩm giả định, khoảng 120 nhân sự, 5 module, triển khai 9 tháng.',
       4: 'Phần lớn thuộc về tổ chức, dữ liệu, quy trình và governance, không phải kỹ thuật.',
       5: 'Thu hẹp khoảng cách là giai đoạn tiếp theo, với mục tiêu và phương pháp khác implementation.',
       6: 'Mỗi dấu hiệu là một biểu hiện của việc ERP chưa đi vào vận hành thật.'},
    f={1: 'Sơ đồ minh họa khái niệm từ bài viết, không phải số liệu đo lường.',
       2: 'Dấu hiệu theo phân tích trong bài viết, không phải thống kê.',
       3: 'Tình huống tổng hợp minh họa trong bài viết, không phải case thật hay số liệu đo lường.',
       4: 'Phân tích từ bài viết, không phải thống kê.',
       5: 'Phân tích từ bài viết, không phải thống kê.',
       6: 'Checklist và ngưỡng 3/7 là quy ước tự đánh giá của bài viết, không phải phương pháp luận được chứng nhận.'},
    ia='Implementation', iad='Hoàn thành khi hệ thống chạy được về kỹ thuật và nhà triển khai bàn giao',
    ib='Adoption', ibd='Bắt đầu khi hệ thống thay đổi cách doanh nghiệp vận hành và ra quyết định',
    gol='Go-live', gap='Khoảng cách',
    e1='Go-live là điểm kết thúc implementation, không phải điểm bắt đầu adoption.',
    c2=[('Báo cáo dùng để ra quyết định', 'Không chỉ để tuân thủ hay báo cáo định kỳ.'),
        ('Quy trình chạy qua ERP', 'Không có hệ thống Excel hoặc email song song.'),
        ('Lãnh đạo tin dữ liệu', 'Trả lời câu hỏi kinh doanh mà không cần kiểm tra lại ở nơi khác.'),
        ('Tìm trong hệ thống trước', 'Khi có vấn đề, nhân viên xem hệ thống trước khi hỏi đồng nghiệp.'),
        ('Tri thức nằm trong hệ thống', 'Không chỉ nằm trong đầu một nhóm người.')],
    e2='Phần lớn doanh nghiệp đạt implementation nhưng chưa đạt adoption đầy đủ.',
    c3=[('Kho', 'Vẫn giữ file Excel riêng vì không tin ERP; số liệu lệch khoảng 5–15% trong ví dụ tổng hợp.'),
        ('Sản xuất', 'Lệnh sản xuất có trong ERP nhưng kế hoạch theo kinh nghiệm quản lý sàn; kết quả nhập theo lô cuối ngày hoặc tuần.'),
        ('Kế toán', 'Xuất dữ liệu ra Excel hằng tháng để làm báo cáo theo mẫu quen thuộc.'),
        ('Quản trị', 'CEO vẫn nhận báo cáo tuần qua email từng bộ phận, không dùng dashboard ERP.')],
    e3='ERP đang là kho lưu trữ song song: chi phí đã trả, giá trị chưa đạt.',
    c4=[('Dữ liệu chưa tin cậy khi go-live', 'Sai lệch ban đầu làm mất niềm tin; người dùng quay về cách quen thuộc.'),
        ('Cấu hình không khớp thực tế', 'Người dùng tìm cách làm vòng quanh; nhập liệu thành hình thức.'),
        ('Không có lộ trình sau go-live', 'Kế hoạch dừng ở implementation, không có giai đoạn 2 cho adoption.'),
        ('Thiếu governance', 'Không rõ ai chịu trách nhiệm dữ liệu và cấu hình; vấn đề nhỏ tích lũy.'),
        ('Có dữ liệu nhưng không khai thác', 'Thiếu công cụ truy vấn, phân tích, trình bày nên không tạo insight.')],
    e4='Nguyên nhân chủ yếu thuộc về tổ chức, dữ liệu, quy trình và governance.',
    c5=[('Đánh giá hiện trạng trung thực', 'Khoảng 6–12 tháng sau go-live, nhìn cả chất lượng dữ liệu lẫn hành vi người dùng.'),
        ('Xử lý chất lượng dữ liệu trước', 'Mọi cải thiện adoption khác đều phụ thuộc vào đây.'),
        ('Báo cáo, dashboard cho lãnh đạo', 'Phù hợp cách lãnh đạo ra quyết định; một trong những việc có đòn bẩy cao nhất.'),
        ('Cấu trúc governance rõ ràng', 'System Owner, Master Data Manager, quy trình Change Request, giám sát chất lượng định kỳ.'),
        ('Quản lý tri thức ERP', 'Lưu cấu hình, lý do quyết định và liên kết giữa các module để không mất khi nhân sự đổi.')],
    e5='Cần lộ trình sau go-live có chủ đích, không chờ hệ thống tự ổn định.',
    q6=['Có người giữ file Excel “ngầm” mà họ tin hơn ERP',
        'Báo cáo ERP luôn phải kiểm tra lại thủ công',
        'Nhân viên mới học cách làm thật từ đồng nghiệp',
        'Một số module hoặc trường gần như trống',
        'Khi có sự cố, mọi người mở Excel trước',
        'Mức dùng ERP giảm rõ rệt vào giai đoạn cao điểm',
        'Chưa từng đo ERP có giảm lỗi hay rút ngắn thời gian không'],
    e6='Từ 3/7 dấu hiệu trở lên: ERP đã được triển khai nhưng chưa được áp dụng thực sự.',
    kick='OKELAS · Insights · ERP',
    ng='Go-live', na='Adoption',
    cl='Implementation: hệ thống chạy được về kỹ thuật',
    cr='Adoption: hệ thống thay đổi cách vận hành và ra quyết định',
    cm='Lộ trình sau go-live có chủ đích', cgap='Khoảng cách',
)

EN = dict(
    mt=62,
    t={1: 'Go-live ends implementation, not adoption',
       2: 'Five signs that adoption has actually happened',
       3: 'An illustrative scenario: six months after go-live',
       4: 'Five reasons the gap exists',
       5: 'A post go-live roadmap to close the gap',
       6: 'Seven signs: implemented but not adopted?',
       0: 'ERP Implementation vs. Adoption:\nWhy Go-Live Is Just the Beginning'},
    s={1: 'The distance between the two is usually larger than post-go-live announcements imply.',
       2: 'Measured by changes in operations and decisions, not login rates.',
       3: 'A hypothetical food processor: about 120 employees, five modules, nine-month implementation.',
       4: 'Mostly organizational, data, process and governance causes, not technical ones.',
       5: 'Closing the gap is the next phase, with different goals and methods than implementation.',
       6: 'Each sign shows ERP has not entered real operations.'},
    f={1: 'Conceptual diagram from the article, not measured data.',
       2: 'Signs from the article’s analysis, not statistics.',
       3: 'A composite scenario from the article, not a real case or measured data.',
       4: 'Analysis from the article, not statistics.',
       5: 'Analysis from the article, not statistics.',
       6: 'The checklist and 3-of-7 threshold are the article’s self-assessment convention, not a certified methodology.'},
    ia='Implementation', iad='Complete once the system works technically and the partner hands over',
    ib='Adoption', ibd='Begins when the system changes how the business runs and decides',
    gol='Go-live', gap='The gap',
    e1='Go-live is where implementation ends, not where adoption begins.',
    c2=[('Reports drive decisions', 'Not just compliance or periodic reporting.'),
        ('Processes run through ERP', 'No parallel spreadsheet or email process.'),
        ('Leaders trust the data', 'They answer business questions without verifying elsewhere.'),
        ('Staff check the system first', 'When problems arise, before asking a colleague.'),
        ('Knowledge lives in the system', 'Not only in a few people’s heads.')],
    e2='Most organizations achieve implementation but not full adoption.',
    c3=[('Warehouse', 'Staff keep their own Excel file as they distrust ERP; figures differ by 5–15% in the composite example.'),
        ('Production', 'Orders exist in ERP but floor managers plan from experience; results entered in daily or weekly batches.'),
        ('Accounting', 'ERP data is exported to Excel monthly to build reports in the familiar format.'),
        ('Management reporting', 'The CEO still receives weekly emailed reports, not ERP dashboards.')],
    e3='ERP acts as a parallel data store: costs incurred, expected value not realized.',
    c4=[('Data not reliable at go-live', 'Early discrepancies erode trust; users fall back on familiar methods.'),
        ('Configuration does not match reality', 'Workarounds emerge; data entry becomes a formality.'),
        ('No post-go-live roadmap', 'The plan ended at implementation, with no phase 2 for adoption.'),
        ('No governance', 'Unclear accountability for data and configuration; small problems compound.'),
        ('Data not used', 'Without query, analysis and presentation tools, it generates no insight.')],
    e4='The causes are mostly organizational, data, process and governance.',
    c5=[('Honest current-state assessment', 'Around 6–12 months after go-live, covering data quality and user behavior.'),
        ('Fix data quality first', 'All other adoption work depends on it.'),
        ('Leadership-ready reporting', 'Aligned to how decisions are made; one of the highest-leverage actions.'),
        ('Clear governance structure', 'System Owner, Master Data Manager, change request process, periodic quality monitoring.'),
        ('ERP knowledge management', 'Document configuration, rationale and module links so knowledge survives turnover.')],
    e5='It takes a deliberate post-go-live roadmap, not waiting for the system to settle.',
    q6=['Someone keeps a personal Excel “shadow system” they trust more than ERP',
        'ERP reports need manual double-checking',
        'New hires learn the real way of working from colleagues',
        'Some modules or fields are mostly empty',
        'When something goes wrong, people check the spreadsheet first',
        'ERP usage drops noticeably in busy periods',
        'Nobody has measured whether ERP reduced errors or cycle times'],
    e6='3 or more of 7 signs: ERP is implemented but not truly adopted.',
    kick='OKELAS · Insights · ERP',
    ng='Go-live', na='Adoption',
    cl='Implementation: the system works technically',
    cr='Adoption: the system changes how the business runs and decides',
    cm='A deliberate post-go-live roadmap', cgap='The gap',
)

ALT = {
    'vi': {
        1: 'Implementation hoàn thành khi hệ thống chạy được về kỹ thuật, adoption bắt đầu khi hệ thống thay đổi cách vận hành và ra quyết định; giữa hai điểm có một khoảng cách thường lớn hơn các thông báo sau go-live.',
        2: 'Năm dấu hiệu adoption đã thực sự xảy ra: báo cáo dùng để ra quyết định, quy trình chạy qua ERP, lãnh đạo tin dữ liệu, nhân viên tìm trong hệ thống trước và tri thức nằm trong hệ thống.',
        3: 'Tình huống minh họa sáu tháng sau go-live ở một doanh nghiệp chế biến thực phẩm giả định: kho giữ Excel riêng, sản xuất lập kế hoạch theo kinh nghiệm, kế toán xuất Excel hằng tháng và CEO vẫn nhận báo cáo tuần qua email.',
        4: 'Năm nguyên nhân tồn tại khoảng cách: dữ liệu chưa tin cậy khi go-live, cấu hình không khớp thực tế, không có lộ trình sau go-live, thiếu governance và dữ liệu không được khai thác.',
        5: 'Lộ trình sau go-live gồm năm việc: đánh giá hiện trạng trung thực, xử lý chất lượng dữ liệu trước, báo cáo và dashboard cho lãnh đạo, cấu trúc governance rõ ràng và quản lý tri thức ERP.',
        6: 'Bảy dấu hiệu ERP đã triển khai nhưng chưa được áp dụng, với ngưỡng từ ba dấu hiệu trở lên.',
        0: 'Một nút go-live và một nút adoption nét đứt được nối bằng đường nét đứt có nhãn khoảng cách, thể hiện lộ trình sau go-live có chủ đích.'},
    'en': {
        1: 'Implementation is complete once the system works technically, while adoption begins when the system changes how the business runs and decides; the gap between the two is usually larger than post-go-live announcements imply.',
        2: 'Five signs that adoption has actually happened: reports drive decisions, processes run through ERP, leaders trust the data, staff check the system first and knowledge lives in the system.',
        3: 'An illustrative scenario six months after go-live at a hypothetical food processor: the warehouse keeps its own Excel, production plans from experience, accounting exports to Excel monthly and the CEO still receives weekly emailed reports.',
        4: 'Five reasons the gap exists: data not reliable at go-live, configuration that does not match reality, no post-go-live roadmap, no governance and data that is not used.',
        5: 'A post go-live roadmap with five parts: an honest current-state assessment, fixing data quality first, leadership-ready reporting, a clear governance structure and ERP knowledge management.',
        6: 'Seven signs that ERP is implemented but not adopted, with a threshold of three or more.',
        0: 'A go-live node and a dashed adoption node joined by a dashed line labeled the gap, showing a deliberate post-go-live roadmap.'},
}

VI = bind(VI)
EN = curly(EN)
LANGS = {'vi': VI, 'en': EN}
NAMES = {1: 'golive-is-not-adoption', 2: 'five-adoption-signs', 3: 'illustrative-scenario', 4: 'five-gap-causes',
         5: 'post-golive-roadmap', 6: 'seven-signs-checklist'}


def numc(f, x, y, n, col='p', r=15):
    f.circle(x, y, r, col)
    f._line(x, y - 10, str(n), 15, 700, 'wh', 'middle', 20)


def cards(f, L, k, key, fill, stroke, n, numbered=False, big=False):
    head(f, L, k)
    items = L[key]
    gap, y = 15, 134
    cw = round((1080 - gap * (n - 1)) / n)
    ts, ds = (18, 14) if big else (16, 13)
    top = 62 if numbered else 20
    need = 0
    for t, d in items:
        need = max(need, top + f.measure(t, ts, 700, cw - 32) + 10 + f.measure(d, ds, 400, cw - 32, 1.42) + 20)
    ch = round(need)
    for i, (t, d) in enumerate(items):
        x = 60 + i * (cw + gap)
        f.rect(x, y, cw, ch, fill, stroke, 16, 1.8)
        if numbered:
            numc(f, x + 32, y + 32, i + 1, stroke)
        th = f.para(x + 16, y + top, t, ts, 700, 'hd', cw - 32)
        f.para(x + 16, y + top + th + 10, d, ds, 400, 'tx', cw - 32, lhr=1.42)
    f.ink(y + ch + 16, L['e%d' % k])


def fig1(f, L):
    head(f, L, 1)
    y0, bh = 150, 150
    f.rect(60, y0, 400, bh, 'pt', 'p', 16, 2.2)
    f._line(84, y0 + 22, L['ia'], 22, 700, 'hd', 'start', 30)
    f.para(84, y0 + 66, L['iad'], 15, 400, 'tx', 352, lhr=1.42)
    f.rect(740, y0, 400, bh, 'at', 'a', 16, 2.2, '6 5')
    f._line(764, y0 + 22, L['ib'], 22, 700, 'hd', 'start', 30)
    f.para(764, y0 + 66, L['ibd'], 15, 400, 'tx', 352, lhr=1.42)
    my = y0 + bh / 2 + 6
    f.pill(460 - 4, y0 - 20, L['gol'], 'a', 'at', 13, 'start', 26, 12)
    f.line(476, my, 724, my, 'a', 3, '8 6')
    f.poly([(736, my), (716, my - 9), (716, my + 9)], 'a')
    f.pill(600 - 46, my - 40, L['gap'], 'a', 'bg', 13, 'start', 26, 12)
    f.ink(y0 + bh + 24, L['e1'])


def fig2(f, L): cards(f, L, 2, 'c2', 'pt', 'p', 5, numbered=True)
def fig3(f, L): cards(f, L, 3, 'c3', 'at', 'a', 4, big=True)
def fig4(f, L): cards(f, L, 4, 'c4', 'at', 'a', 5, numbered=True)
def fig5(f, L): cards(f, L, 5, 'c5', 'pt', 'p', 5, numbered=True)


def fig6(f, L):
    head(f, L, 6)
    gap, y = 15, 134
    cw = round((1080 - gap * 3) / 4)
    need = 0
    for q in L['q6']:
        need = max(need, f.measure(q, 15, 700, cw - 76) + 32)
    ch = max(round(need), 84)
    for i, q in enumerate(L['q6']):
        r, c = divmod(i, 4)
        x, yy = 60 + c * (cw + gap), y + r * (ch + gap)
        f.rect(x, yy, cw, ch, 'pt', 'p', 14, 1.8)
        numc(f, x + 30, yy + ch / 2, i + 1, 'p')
        qh = f.measure(q, 15, 700, cw - 76)
        f.para(x + 56, yy + (ch - qh) / 2, q, 15, 700, 'hd', cw - 70)
    f.ink(y + 2 * ch + gap + 16, L['e6'])


def figcover(f, L):
    f.rect(0, 0, 1200, 630, 'bg', None, 0)
    f.rect(0, 0, 14, 630, 'p', None, 0)
    f._line(60, 44, L['kick'], 16, 700, 's', 'start', 22)
    f.para(60, 84, L['t'][0], 40, 700, 'hd', 1040, lhr=1.25)
    cy = 390
    f.circle(220, cy, 56, 'ink')
    f._line(220, cy - 13, L['ng'], 20, 700, 'onink', 'middle', 26)
    f.circle(980, cy, 56, 'at', 'a', 2.4, '6 5')
    f._line(980, cy - 13, L['na'], 20, 700, 'hd', 'middle', 26)
    f.line(284, cy, 904, cy, 'a', 3, '8 6')
    f.poly([(916, cy), (896, cy - 9), (896, cy + 9)], 'a')
    f.pill(600 - 50, cy - 14, L['cgap'], 'a', 'bg', 14, 'start', 28, 14)
    f.para(600, cy + 28, L['cm'], 15, 700, 'a', 400, 'middle')
    f.para(100, 480, L['cl'], 15, 700, 's', 300)
    f.para(840, 480, L['cr'], 15, 700, 'a', 300)
    f.mark(H_COVER - 30)


H_COVER = 630
FIGS = {1: fig1, 2: fig2, 3: fig3, 4: fig4, 5: fig5, 6: fig6}


def build(sel=None):
    for lang, L in LANGS.items():
        for k in list(FIGS) + [0]:
            if sel and k not in sel:
                continue
            label = ALT[lang][k]
            fn = figcover if k == 0 else FIGS[k]
            name = f'erpi-00-og-cover-{lang}' if k == 0 else f'erpi-{k:02d}-{NAMES[k]}-{lang}'
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
