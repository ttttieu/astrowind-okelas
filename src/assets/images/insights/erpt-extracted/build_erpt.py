import sys, re
import cairosvg
sys.path.insert(0, '/home/claude/erpf')
from lib import Fig, LIGHT, DARK, tw
import build_erpf as B
from build_erpf import bind, curly, chip, head, make, var_check, two_cols

OUT = '/home/claude/erpt/out'
CHK = '/home/claude/erpt/check'

B.PAIRS += ['scope creep', 'go-live', 'kick-off', 'giai đoạn', 'nhà triển khai', 'ngân sách', 'dự phòng', 'đánh giá', 'tác động', 'quy trình', 'yêu cầu', 'thay đổi', 'nguyên nhân', 'gốc rễ', 'nợ kỹ thuật', 'người có thẩm quyền', 'chi phí', 'rủi ro', 'bảo trì', 'nâng cấp', 'user adoption', 'change management', 'super user', 'người dùng', 'nhân viên', 'chart of accounts', 'số dư đầu kỳ', 'chi phí', 'kế toán', 'phân bổ', 'tài sản', 'tồn kho', 'bút toán', 'routing', 'traceability', 'sản xuất', 'nguyên liệu', 'thành phẩm', 'nhà triển khai', 'bảng tính', 'nguyên nhân', 'dữ liệu', 'cấu hình', 'master data', 'vai trò', 'quyết định', 'chịu trách nhiệm', 'tình huống', 'lộ trình', 'khoảng cách', 'cấp độ', 'bối cảnh', 'trí tuệ tổ chức', 'tri thức', 'câu hỏi', 'phân tích', 'dự báo', 'giao dịch']

CONC_VI = 'Sơ đồ minh họa khái niệm từ bài viết, không phải số liệu đo lường.'
CONC_EN = 'Conceptual diagram from the article, not measured data.'


VI = dict(
    mt=62,
    t={1: 'Năm nhóm sự kiện ERP ghi nhận mỗi ngày',
       2: 'Ba lý do dữ liệu ERP chưa được khai thác',
       3: 'Bốn cấp độ khai thác dữ liệu ERP',
       4: 'Bốn điều kiện để lên cấp độ cao hơn',
       5: 'Từ dữ liệu ERP đến trí tuệ tổ chức',
       0: 'Sau ERP: doanh nghiệp cần làm gì\nđể khai thác dữ liệu ERP?'},
    s={1: 'Dữ liệu vận hành phát sinh liên tục; khối lượng thực tế khác nhau theo từng doanh nghiệp.',
       2: 'Thiếu chất lượng dữ liệu, câu hỏi rõ ràng và bối cảnh để diễn giải.',
       3: 'Hầu hết doanh nghiệp SME sản xuất đang ở cấp 1 hoặc cấp 2.',
       4: 'Chỉ thêm công cụ là chưa đủ.',
       5: 'ERP cung cấp nền tảng dữ liệu; hai lớp còn lại cần được xây thêm.'},
    f={1: 'Sơ đồ minh họa khái niệm từ bài viết, không phải số liệu đo lường.',
       2: 'Phân tích từ bài viết, không phải thống kê.',
       3: 'Khung phân cấp từ bài viết; nhận định về vị trí của SME là quan sát của OKELAS, không phải thống kê.',
       4: 'Phân tích từ bài viết, không phải thống kê.',
       5: 'Sơ đồ minh họa khái niệm từ bài viết, không phải số liệu đo lường.'},
    c1=[('Mua hàng', 'Tạo, phê duyệt, nhận hàng, thanh toán.'),
        ('Kho và sản xuất', 'Nhập nguyên liệu, xuất sản xuất, nhập thành phẩm.'),
        ('Lệnh sản xuất', 'Số lượng, thời gian và hao hụt thực tế.'),
        ('Bán hàng', 'Đơn hàng, giao hàng, hóa đơn, thu tiền.'),
        ('Kế toán', 'Bút toán tương ứng với các giao dịch trên.')],
    e1='Phần lớn dữ liệu này mới chỉ được dùng để ghi nhận giao dịch.',
    c2=[('Dữ liệu chưa đủ chất lượng', 'Cùng một sản phẩm phân loại khác nhau, chi phí ghi không nhất quán, dữ liệu sản xuất nhập gộp cuối ngày; người dùng không tin báo cáo.'),
        ('Câu hỏi chưa được định nghĩa rõ', 'ERP không tự biết báo cáo nào quan trọng. Cần xác định muốn biết điều gì và sẽ dùng để quyết định gì.'),
        ('Thiếu bối cảnh để diễn giải', 'ERP ghi nhận cái gì đã xảy ra, không ghi nhận vì sao; bối cảnh nằm trong đầu người và mất khi họ nghỉ việc.')],
    e2='Không có dữ liệu tin cậy, câu hỏi rõ và bối cảnh, dữ liệu chỉ là kho lưu trữ.',
    lv=[('Cấp 1', 'Ghi nhận giao dịch', 'Nhập và lưu giao dịch; báo cáo chủ yếu là danh sách.'),
        ('Cấp 2', 'Báo cáo vận hành', 'Tổng hợp định kỳ, chủ yếu nhìn về quá khứ.'),
        ('Cấp 3', 'Phân tích và insight', 'Phân tích nhiều chiều: từ “bao nhiêu” sang “tại sao”.'),
        ('Cấp 4', 'Dự báo và hỗ trợ quyết định', 'Dự báo nhu cầu, tối ưu tồn kho, phát hiện bất thường sớm.')],
    lvp='Phần lớn SME',
    e3='Từ cấp 3 trở lên, dữ liệu ERP bắt đầu tạo lợi thế cạnh tranh.',
    c4=[('Dữ liệu sạch và nhất quán', 'Đầu tư quản trị dữ liệu trước khi đầu tư BI.'),
        ('Câu hỏi kinh doanh rõ ràng', 'Bắt đầu từ các quyết định thường xuyên, rồi xác định dữ liệu cần thiết.'),
        ('Bối cảnh để diễn giải', 'Kết hợp dữ liệu với kiến thức về quy trình, thị trường, sự kiện; lưu giữ thay vì nằm trong đầu người.'),
        ('Hiểu cấu trúc dữ liệu ERP', 'Nắm ý nghĩa các trường và liên kết giữa module; thường mất khi nhà triển khai rời đi.')],
    e4='Chỉ thêm công cụ BI hay dashboard là chưa đủ.',
    eq=[('Dữ liệu ERP', 'Cho biết điều gì đã xảy ra.'),
        ('Bối cảnh', 'Giải thích vì sao dữ liệu như vậy.'),
        ('Kiến thức tổ chức', 'Quy trình, con người và cách vận hành thực tế.'),
        ('Trí tuệ tổ chức', 'Hiểu điều đang xảy ra, lý giải nguyên nhân, quyết định dựa trên bằng chứng.')],
    e5='ERP cung cấp nền tảng dữ liệu; bối cảnh và kiến thức tổ chức tạo ra trí tuệ tổ chức.',
    kick='OKELAS · Insights · ERP',
)

EN = dict(
    mt=62,
    t={1: 'Five groups of events ERP records every day',
       2: 'Three reasons ERP data goes unused',
       3: 'Four levels of ERP data utilization',
       4: 'Four requirements to move to a higher level',
       5: 'From ERP data to organizational intelligence',
       0: 'After ERP: Turning ERP Data\nInto Organizational Intelligence'},
    s={1: 'Operational data accumulates continuously; actual volumes vary by company.',
       2: 'Missing data quality, defined questions and context for interpretation.',
       3: 'Most manufacturing SMEs sit at level 1 or 2.',
       4: 'More tools alone are not enough.',
       5: 'ERP provides the data foundation; the other two layers must be built.'},
    f={1: 'Conceptual diagram from the article, not measured data.',
       2: 'Analysis from the article, not statistics.',
       3: 'Framework from the article; where SMEs sit is OKELAS’s observation, not a statistic.',
       4: 'Analysis from the article, not statistics.',
       5: 'Conceptual diagram from the article, not measured data.'},
    c1=[('Purchasing', 'Orders created, approved, received and paid.'),
        ('Inventory', 'Material receipts, issues to production, finished goods.'),
        ('Production orders', 'Actual quantities, times and yield loss.'),
        ('Sales', 'Orders, deliveries, invoices and collections.'),
        ('Accounting', 'Entries matching the transactions above.')],
    e1='Most of this data is only used to record transactions.',
    c2=[('Data quality is insufficient', 'Same product categorized differently, costs recorded inconsistently, production entered in daily batches; users stop trusting reports.'),
        ('The right questions are not defined', 'ERP cannot tell which reports matter. Decide what you want to know and what decisions it will inform.'),
        ('Context is missing', 'ERP records what happened, not why; context lives in people’s heads and leaves when they do.')],
    e2='Without reliable data, clear questions and context, data is just storage.',
    lv=[('Level 1', 'Transaction recording', 'Enter and store transactions; reports are mainly lists.'),
        ('Level 2', 'Operational reporting', 'Periodic summaries, mostly backward-looking.'),
        ('Level 3', 'Analysis and insight', 'Multi-dimensional analysis: from “how much” to “why”.'),
        ('Level 4', 'Forecasting and decision support', 'Demand forecasts, inventory optimization, early anomaly detection.')],
    lvp='Most SMEs',
    e3='From level 3 upward, ERP data starts to create competitive advantage.',
    c4=[('Clean, consistent data', 'Invest in data governance before BI.'),
        ('Clearly defined business questions', 'Start from recurring decisions, then identify the data needed.'),
        ('Context for interpretation', 'Combine data with process, market and event knowledge, captured rather than kept in heads.'),
        ('ERP knowledge', 'Understand field meanings and module links; often lost when implementation partners leave.')],
    e4='More BI tools or dashboards alone are not enough.',
    eq=[('ERP data', 'Shows what happened.'),
        ('Context', 'Explains why the data looks this way.'),
        ('Organizational knowledge', 'Processes, people and how work really runs.'),
        ('Organizational intelligence', 'Understanding what is happening, explaining why and deciding on evidence.')],
    e5='ERP gives the data foundation; context and organizational knowledge create intelligence.',
    kick='OKELAS · Insights · ERP',
)

ALT = {
    'vi': {
        1: 'Năm nhóm sự kiện ERP ghi nhận mỗi ngày: mua hàng, kho và sản xuất, lệnh sản xuất, bán hàng và kế toán.',
        2: 'Ba lý do dữ liệu ERP chưa được khai thác: dữ liệu chưa đủ chất lượng, câu hỏi chưa được định nghĩa rõ và thiếu bối cảnh để diễn giải.',
        3: 'Bốn cấp độ khai thác dữ liệu ERP: ghi nhận giao dịch, báo cáo vận hành, phân tích và insight, dự báo và hỗ trợ quyết định; phần lớn SME ở cấp 1 hoặc 2.',
        4: 'Bốn điều kiện để lên cấp độ cao hơn: dữ liệu sạch và nhất quán, câu hỏi kinh doanh rõ ràng, bối cảnh để diễn giải và hiểu cấu trúc dữ liệu ERP.',
        5: 'Dữ liệu ERP cộng bối cảnh cộng kiến thức tổ chức tạo ra trí tuệ tổ chức: hiểu điều đang xảy ra, lý giải nguyên nhân và quyết định dựa trên bằng chứng.',
        0: 'Bốn bậc thang tăng dần thể hiện bốn cấp độ khai thác dữ liệu ERP, từ ghi nhận giao dịch đến dự báo và hỗ trợ quyết định.'},
    'en': {
        1: 'Five groups of events ERP records every day: purchasing, inventory, production orders, sales and accounting.',
        2: 'Three reasons ERP data goes unused: insufficient data quality, undefined questions and missing context for interpretation.',
        3: 'Four levels of ERP data utilization: transaction recording, operational reporting, analysis and insight, forecasting and decision support; most SMEs sit at level 1 or 2.',
        4: 'Four requirements to move higher: clean and consistent data, clearly defined business questions, context for interpretation and ERP knowledge.',
        5: 'ERP data plus context plus organizational knowledge produces organizational intelligence: understanding what is happening, explaining why and deciding on evidence.',
        0: 'Four ascending steps showing four levels of ERP data utilization, from transaction recording to forecasting and decision support.'},
}

VI = bind(VI)
EN = curly(EN)
LANGS = {'vi': VI, 'en': EN}
NAMES = {1: 'five-event-groups', 2: 'three-reasons-unused', 3: 'four-utilization-levels', 4: 'four-requirements',
         5: 'data-to-intelligence'}


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


def fig1(f, L): cards(f, L, 1, 'c1', 'pt', 'p', 5)
def fig2(f, L): cards(f, L, 2, 'c2', 'at', 'a', 3, big=True)
def fig4(f, L): cards(f, L, 4, 'c4', 'pt', 'p', 4, numbered=True)


def fig3(f, L):
    head(f, L, 3)
    gap, y = 15, 134
    cw = round((1080 - gap * 3) / 4)
    hs = [135, 160, 185, 210]
    base = y + hs[-1] + 4
    for i, (lab, t, d) in enumerate(L['lv']):
        h = hs[i]
        x, top = 60 + i * (cw + gap), base - h
        fill, st = ('pt', 'p') if i < 2 else ('at', 'a')
        f.rect(x, top, cw, h, fill, st, 16, 1.8)
        f._line(x + 16, top + 14, lab, 13, 700, st, 'start', 18)
        th = f.para(x + 16, top + 38, t, 17, 700, 'hd', cw - 32)
        dh = f.para(x + 16, top + 38 + th + 8, d, 13, 400, 'tx', cw - 32, lhr=1.42)
        if 38 + th + 8 + dh + 14 > h:
            raise ValueError('level text overflows bar')
        if i < 2:
            f.pill(x + 16, top - 32, L['lvp'], 'p', 'bg', 12, 'start', 24, 10)
    f.ink(base + 16, L['e3'])


def fig5(f, L):
    head(f, L, 5)
    n, ow = 4, 44
    bw = round((1080 - 3 * ow) / 4)
    y, bh = 140, 150
    fills = [('pt', 'p'), ('at', 'a'), ('at', 'a'), ('ink', None)]
    ops = ['+', '+', '=']
    for i, (t, d) in enumerate(L['eq']):
        x = 60 + i * (bw + ow)
        fill, st = fills[i]
        last = fill == 'ink'
        f.rect(x, y, bw, bh, fill, st, 16, 1.8)
        tc, dc = ('onink', 'onink') if last else ('hd', 'tx')
        th = f.para(x + 16, y + 18, t, 18, 700, tc, bw - 32)
        dh = f.para(x + 16, y + 18 + th + 8, d, 13, 400, dc, bw - 32, lhr=1.42)
        if 18 + th + 8 + dh + 14 > bh:
            raise ValueError('eq text overflows')
        if i < 3:
            f._line(x + bw + ow / 2, y + bh / 2 - 17, ops[i], 30, 700, 'mut', 'middle', 34)
    f.ink(y + bh + 24, L['e5'])


def figcover(f, L):
    f.rect(0, 0, 1200, 630, 'bg', None, 0)
    f.rect(0, 0, 14, 630, 'p', None, 0)
    f._line(60, 44, L['kick'], 16, 700, 's', 'start', 22)
    f.para(60, 84, L['t'][0], 40, 700, 'hd', 1040, lhr=1.25)
    bw, g, x0, base = 230, 20, 100, 560
    for i, (lab, t, d) in enumerate(L['lv']):
        h = 90 + i * 55
        x, top = x0 + i * (bw + g), base - h
        fill, st = ('pt', 'p') if i < 2 else ('at', 'a')
        f.rect(x, top, bw, h, fill, st, 16, 2)
        f._line(x + 16, top + 14, lab, 14, 700, st, 'start', 20)
        f.para(x + 16, top + 40, t, 17, 700, 'hd', bw - 32)
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
            name = f'erpt-00-og-cover-{lang}' if k == 0 else f'erpt-{k:02d}-{NAMES[k]}-{lang}'
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
