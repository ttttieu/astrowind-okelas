import sys, re
import cairosvg
sys.path.insert(0, '/home/claude/erpf')
from lib import Fig, LIGHT, DARK, tw
import build_erpf as B
from build_erpf import bind, curly, chip, head, make, var_check, two_cols

OUT = '/home/claude/erpd/out'
CHK = '/home/claude/erpd/check'

B.PAIRS += ['tồn kho', 'nhập kho', 'nhà cung cấp', 'khách hàng', 'bản ghi', 'master data', 'chịu trách nhiệm', 'go-live']

CONC_VI = 'Sơ đồ minh họa khái niệm từ bài viết, không phải số liệu đo lường.'
CONC_EN = 'Conceptual diagram from the article, not measured data.'

VI = dict(
    mt=60,
    t={1: 'ERP cần hai loại dữ liệu: master và transactional',
       2: 'Năm lý do dữ liệu hiện tại hiếm khi sẵn sàng',
       3: 'Cùng một từ, hai định nghĩa khác nhau',
       4: 'Bốn chi phí ẩn của việc chuẩn bị dữ liệu kém',
       5: 'Năm nhóm cần kiểm tra trước khi bắt đầu ERP',
       0: 'Data readiness: tại sao dữ liệu “sạch”\nkhó hơn doanh nghiệp nghĩ'},
    s={1: 'Một loại phải chính xác trước go-live; loại kia chỉ cần chuyển ở mức cần thiết.',
       2: 'Các vấn đề này thường chỉ lộ ra khi chuẩn bị migration.',
       3: 'Nếu không làm rõ trước migration, vấn đề chỉ lộ ra khi báo cáo cho số không ai tin.',
       4: 'Vấn đề dữ liệu hiếm khi xuất hiện như một rủi ro có tên; nó hiện ra dưới dạng các chi phí khác.',
       5: 'Mỗi nhóm kèm một câu hỏi đại diện cho checklist đầy đủ trong bài.'},
    f={1: CONC_VI,
       2: 'Phân tích từ bài viết, không phải thống kê.',
       3: 'Ví dụ từ bài viết, không phải số liệu đo lường.',
       4: 'Chi phí theo phân tích trong bài viết, không phải số liệu đo lường.',
       5: 'Câu hỏi tự đánh giá từ bài viết, là công cụ thảo luận định hướng, không phải phương pháp luận được chứng nhận.'},
    # fig 1
    a_t='Master data', a_d='Thực thể nền tảng, ít thay đổi, dùng trong mọi giao dịch',
    a_i=['Sản phẩm/SKU: mã, đơn vị tính, nhóm hàng, giá, BOM', 'Nhà cung cấp và khách hàng', 'Chart of accounts',
         'Cơ cấu tổ chức: chi nhánh, kho, trung tâm chi phí'],
    b_t='Transactional data', b_d='Lịch sử hoạt động đã phát sinh',
    b_i=['Đơn hàng, hóa đơn', 'Tồn kho và số dư kế toán',
         'Không cần chuyển toàn bộ: nhiều dự án chỉ chuyển số dư tại thời điểm cutover'],
    e1='Master data phải chính xác trước go-live. Chuyển bao nhiêu lịch sử là quyết định kinh doanh.',
    # fig 2
    p=[('Trùng lặp và không nhất quán', 'Một nhà cung cấp có nhiều bản ghi; một sản phẩm có nhiều tên ở các bộ phận.'),
       ('Dữ liệu không đầy đủ', 'Thiếu đơn vị tính, mã số thuế, điều khoản thanh toán; lộ ra khi ERP từ chối giao dịch.'),
       ('Nằm ở nhiều nơi', 'CRM, Excel cá nhân, phần mềm kế toán, kho: phiên bản nào là đúng?'),
       ('Định nghĩa không nhất quán', 'Cùng một từ, như “tồn kho” hay “khách hàng”, được hiểu khác nhau.'),
       ('Tồn kho sổ sách không khớp thực tế', 'Đưa số sai vào ERP là đưa sai lệch vào nền tảng vận hành.')],
    e2='Dữ liệu kém không tự mất đi khi chuyển vào ERP: nó trở thành nền của mọi báo cáo.',
    # fig 3
    rows=[('Tồn kho', 'Kho', 'Gồm cả hàng đang về', 'Kế toán', 'Chỉ tính hàng đã nhập kho thực tế'),
          ('Khách hàng', 'Hệ thống kinh doanh', 'Gồm cả khách tiềm năng', 'ERP', 'Chỉ cần khách đã có giao dịch')],
    e3='Nếu không thống nhất trước, dữ liệu vào ERP ở dạng không ai hiểu đầy đủ.',
    # fig 4
    hc=[('Kéo dài timeline', 'Làm sạch lâu hơn dự kiến làm lùi go-live, kéo theo chi phí nhân sự, triển khai và cơ hội.'),
        ('Quyết định dựa trên dữ liệu sai', 'Báo cáo sai khiến lãnh đạo quay về cách cũ hoặc ra quyết định sai.'),
        ('Sửa sau go-live đắt hơn', 'Bản ghi lỗi có thể đã được dùng trong nhiều giao dịch thật.'),
        ('Mất niềm tin vào hệ thống', 'Người dùng ngừng dùng ERP để ra quyết định; cả dữ liệu lẫn niềm tin đều khó dựng lại.')],
    hard='Khó phục hồi nhất',
    e4='Chi phí chuẩn bị dữ liệu luôn có; câu hỏi là trả trước go-live hay sau go-live.',
    # fig 5
    ck=[('Sản phẩm/SKU', 'Danh mục được quản lý tập trung hay rải rác?'),
        ('Nhà cung cấp và khách hàng', 'Có bản ghi trùng lặp không?'),
        ('Tồn kho', 'Tồn kho sổ sách có được đối chiếu thực tế định kỳ không?'),
        ('Kế toán', 'Chart of accounts đã phù hợp yêu cầu báo cáo chưa?'),
        ('Quản trị dữ liệu', 'Có người hoặc bộ phận chịu trách nhiệm chất lượng dữ liệu không?')],
    e5='Nhiều câu trả lời “không” hoặc “không chắc”: cần thêm thời gian chuẩn bị dữ liệu.',
    # cover
    kick='OKELAS · Insights · ERP',
    cl='Dữ liệu hiện tại, vài bản ghi lỗi', rc=['Báo cáo', 'Cảnh báo tồn kho', 'Đơn mua hàng'],
    cr='Dữ liệu kém trở thành nền của mọi báo cáo',
)

EN = dict(
    mt=62,
    t={1: 'ERP needs two kinds of data: master and transactional',
       2: 'Five reasons existing data is rarely ready',
       3: 'The same word, two definitions',
       4: 'Four hidden costs of inadequate data preparation',
       5: 'Five areas to check before starting ERP',
       0: 'ERP Data Readiness:\nThe Hidden Complexity of “Clean Data”'},
    s={1: 'One must be accurate before go-live; the other only needs to be migrated as far as necessary.',
       2: 'These problems usually surface only during migration preparation.',
       3: 'If not settled before migration, the problem shows only when reports produce numbers no one trusts.',
       4: 'Data problems rarely appear as named project risks; they show up as other costs.',
       5: 'Each area carries one representative question from the full checklist in the article.'},
    f={1: CONC_EN,
       2: 'Analysis from the article, not statistics.',
       3: 'Examples from the article, not measured data.',
       4: 'Costs from the article’s analysis, not measured data.',
       5: 'Self-assessment questions from the article, a discussion aid, not a certified methodology.'},
    a_t='Master data', a_d='Stable foundation entities used in every transaction',
    a_i=['Products/SKUs: codes, units of measure, groups, pricing, BOM', 'Vendors and customers', 'Chart of accounts',
         'Organizational structure: entities, warehouses, cost centers'],
    b_t='Transactional data', b_d='Historical records of past activity',
    b_i=['Orders and invoices', 'Inventory movements and accounting balances',
         'Full history is often unnecessary: many projects migrate only opening balances at cutover'],
    e1='Master data must be accurate before go-live. How much history to migrate is a business decision.',
    p=[('Duplicates and inconsistency', 'One vendor has several records; one product carries different names across departments.'),
       ('Incomplete records', 'Missing units of measure, tax IDs, payment terms; exposed when ERP blocks a transaction.'),
       ('Scattered across sources', 'CRM, staff spreadsheets, accounting software, warehouse tools: which version is correct?'),
       ('Inconsistent definitions', 'The same word, like “inventory” or “customer”, is understood differently.'),
       ('Book inventory does not match reality', 'Loading wrong numbers builds a faulty operational baseline.')],
    e2='Bad data does not get fixed by migration: it becomes the basis of every report.',
    rows=[('Inventory', 'Warehouse', 'Counts goods in transit', 'Accounting', 'Counts only goods actually received'),
          ('Customer', 'Sales system', 'Includes prospects', 'ERP', 'Needs only entities with transaction history')],
    e3='If not settled first, data enters ERP in a form no one fully understands.',
    hc=[('Timeline delays', 'Cleaning overruns push go-live back, adding personnel, implementation and opportunity costs.'),
        ('Decisions on wrong data', 'Inaccurate reports lead leaders to abandon ERP reporting or act on bad numbers.'),
        ('Costlier fixes later', 'Faulty records may already be tied to many live transactions.'),
        ('Lost confidence', 'Users stop relying on ERP for decisions; both the data and the trust are hard to rebuild.')],
    hard='Hardest to recover',
    e4='The cost of data preparation is always paid; the question is before go-live or after.',
    ck=[('Product catalog / SKUs', 'Is the catalog maintained in one place or spread across sources?'),
        ('Vendors and customers', 'Are there duplicate records?'),
        ('Inventory', 'Is book inventory reconciled to physical counts regularly?'),
        ('Accounting', 'Does the chart of accounts support reporting needs?'),
        ('Data governance', 'Is a named person or team accountable for data quality?')],
    e5='Several “no” or “uncertain” answers: allow more time for data preparation.',
    kick='OKELAS · Insights · ERP',
    cl='Current data, a few faulty records', rc=['Reports', 'Inventory alerts', 'Purchase orders'],
    cr='Bad data becomes the basis of every report',
)

ALT = {
    'vi': {
        1: 'ERP cần hai loại dữ liệu: master data (sản phẩm, nhà cung cấp, khách hàng, chart of accounts, cơ cấu tổ chức) phải chính xác trước go-live, và transactional data (đơn hàng, hóa đơn, tồn kho, số dư kế toán) mà mức độ chuyển là quyết định kinh doanh.',
        2: 'Năm lý do dữ liệu hiện tại hiếm khi sẵn sàng: trùng lặp và không nhất quán, không đầy đủ, nằm ở nhiều nơi, định nghĩa không nhất quán và tồn kho sổ sách không khớp thực tế.',
        3: 'Cùng một từ có hai định nghĩa: tồn kho ở kho gồm hàng đang về còn kế toán chỉ tính hàng đã nhập kho; khách hàng ở hệ thống kinh doanh gồm khách tiềm năng còn ERP chỉ cần khách đã có giao dịch.',
        4: 'Bốn chi phí ẩn của chuẩn bị dữ liệu kém: kéo dài timeline, quyết định dựa trên dữ liệu sai, sửa sau go-live đắt hơn và mất niềm tin vào hệ thống, là chi phí khó phục hồi nhất.',
        5: 'Năm nhóm cần kiểm tra trước ERP, mỗi nhóm một câu hỏi đại diện: sản phẩm/SKU, nhà cung cấp và khách hàng, tồn kho, kế toán và quản trị dữ liệu.',
        0: 'Một lưới bản ghi có vài ô lỗi đi vào khối ERP, và các lỗi xuất hiện lại ở báo cáo, cảnh báo tồn kho và đơn mua hàng.'},
    'en': {
        1: 'ERP needs two kinds of data: master data (products, vendors, customers, chart of accounts, organizational structure), which must be accurate before go-live, and transactional data (orders, invoices, inventory, balances), where how much to migrate is a business decision.',
        2: 'Five reasons existing data is rarely ready: duplicates and inconsistency, incomplete records, data scattered across sources, inconsistent definitions and book inventory that does not match reality.',
        3: 'The same word carries two definitions: inventory in the warehouse includes goods in transit while accounting counts only goods received; a customer in the sales system includes prospects while ERP needs only entities with transaction history.',
        4: 'Four hidden costs of inadequate data preparation: timeline delays, decisions on wrong data, costlier fixes after go-live and lost confidence in the system, the hardest to recover.',
        5: 'Five areas to check before ERP, each with one representative question: product catalog and SKUs, vendors and customers, inventory, accounting and data governance.',
        0: 'A grid of records with a few faulty cells enters the ERP block, and the faults reappear in reports, inventory alerts and purchase orders.'},
}

VI = bind(VI)
EN = curly(EN)
LANGS = {'vi': VI, 'en': EN}
NAMES = {1: 'two-kinds-of-data', 2: 'five-data-problems', 3: 'same-word-two-meanings',
         4: 'hidden-costs', 5: 'readiness-checklist'}


def numc(f, x, y, n, col='p', r=15):
    f.circle(x, y, r, col)
    f._line(x, y - 10, str(n), 15, 700, 'wh', 'middle', 20)


def fig1(f, L):
    head(f, L, 1)
    two_cols(f, L, 1,
             (L['a_t'], L['a_d'], L['a_i'], 'pt', 'p', None, 44),
             (L['b_t'], L['b_d'], L['b_i'], 'gt', 'gm', '6 5', 62))


def fig2(f, L):
    head(f, L, 2)
    cw, gap, y = 204, 15, 134
    need = 0
    for t, d in L['p']:
        need = max(need, 62 + f.measure(t, 16, 700, cw - 32) + 10 + f.measure(d, 13, 400, cw - 32, 1.42) + 18)
    ch = round(need)
    for i, (t, d) in enumerate(L['p']):
        x = 60 + i * (cw + gap)
        f.rect(x, y, cw, ch, 'at', 'a', 16, 1.8)
        numc(f, x + 32, y + 32, i + 1, 'a')
        th = f.para(x + 16, y + 62, t, 16, 700, 'hd', cw - 32)
        f.para(x + 16, y + 62 + th + 10, d, 13, 400, 'tx', cw - 32, lhr=1.42)
    f.ink(y + ch + 16, L['e2'])


def fig3(f, L):
    head(f, L, 3)
    rh, gy, y0 = 108, 14, 134
    for i, (term, ah, ab, bh, bb) in enumerate(L['rows']):
        y = y0 + i * (rh + gy)
        f.rect(60, y, 1080, rh, 'gt', 'gm', 16, 1.6)
        f.para(84, y + (rh - 22 * 1.38) / 2, term, 22, 700, 'hd', 190)
        for x, hh, bb_, fill, st, dash, col in ((290, ah, ab, 'pt', 'p', None, 's'), (722, bh, bb, 'at', 'a', '6 5', 'a')):
            f.rect(x, y + 12, 400, 84, fill, st, 14, 1.8, dash)
            f._line(x + 20, y + 22, hh, 13, 700, col, 'start', 18)
            f.para(x + 20, y + 46, bb_, 16, 700, 'hd', 360)
        f._line(676, y + rh / 2 - 20, '≠', 32, 700, 'mut', 'middle', 40)
    f.ink(y0 + 2 * rh + gy + 16, L['e3'])


def fig4(f, L):
    head(f, L, 4)
    cw, gap, y = 258, 16, 134
    need = 0
    for t, d in L['hc']:
        need = max(need, 56 + f.measure(t, 18, 700, cw - 40) + 10 + f.measure(d, 14, 400, cw - 40, 1.42) + 22)
    ch = round(need)
    for i, (t, d) in enumerate(L['hc']):
        x = 60 + i * (cw + gap)
        last = i == len(L['hc']) - 1
        f.rect(x, y, cw, ch, 'at', 'a', 16, 3 if last else 1.8)
        if last:
            f.pill(x + 20, y + 16, L['hard'], 'a', 'bg', 12, 'start', 24, 10)
        th = f.para(x + 20, y + 52, t, 18, 700, 'hd', cw - 40)
        f.para(x + 20, y + 52 + th + 10, d, 14, 400, 'tx', cw - 40, lhr=1.42)
    f.ink(y + ch + 16, L['e4'])


def fig5(f, L):
    head(f, L, 5)
    cw, gap, y = 204, 15, 134
    need = 0
    for t, d in L['ck']:
        need = max(need, 20 + f.measure(t, 16, 700, cw - 32) + 12 + f.measure(d, 14, 400, cw - 32, 1.42) + 20)
    ch = round(need)
    for i, (t, d) in enumerate(L['ck']):
        x = 60 + i * (cw + gap)
        f.rect(x, y, cw, ch, 'pt', 'p', 16, 1.8)
        th = f.para(x + 16, y + 20, t, 16, 700, 'hd', cw - 32)
        f.para(x + 16, y + 20 + th + 12, d, 14, 400, 'tx', cw - 32, lhr=1.42)
    f.ink(y + ch + 16, L['e5'])


def figcover(f, L):
    f.rect(0, 0, 1200, 630, 'bg', None, 0)
    f.rect(0, 0, 14, 630, 'p', None, 0)
    f._line(60, 44, L['kick'], 16, 700, 's', 'start', 22)
    f.para(60, 84, L['t'][0], 40, 700, 'hd', 1040, lhr=1.25)
    flawed = {(0, 1), (1, 3), (2, 0)}
    gx0, gy0, s, g = 130, 365, 26, 10
    for r in range(3):
        for c in range(4):
            x, y = gx0 + c * (s + g), gy0 + r * (s + g)
            if (r, c) in flawed:
                f.rect(x, y, s, s, 'at', 'a', 6, 2.2, '4 3')
            else:
                f.rect(x, y, s, s, 'pt', 'p', 6, 1.8)
    f.para(100, 492, L['cl'], 15, 700, 's', 260)
    f.arrow(300, 414, 470, 414, 'gm', 3, 11)
    f.rect(480, 354, 200, 120, 'ink', None, 18)
    f._line(580, 391, 'ERP', 40, 700, 'onink', 'middle', 50)
    cx, cw_, ch_ = 800, 240, 46
    for i, t in enumerate(L['rc']):
        y = 330 + i * (ch_ + 18)
        f.arrow(684, 414, cx - 6, y + ch_ / 2, 'gm', 2.5, 9)
        f.rect(cx, y, cw_, ch_, 'pt', 'p', 12, 1.8)
        f.box_text(cx, y, cw_ - 30, ch_, t, 15, 700, 'hd', 8)
        f.circle(cx + cw_ - 24, y + ch_ / 2, 8, 'a')
    f.para(cx, 522, L['cr'], 15, 700, 'a', 340)
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
            name = f'erpd-00-og-cover-{lang}' if k == 0 else f'erpd-{k:02d}-{NAMES[k]}-{lang}'
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
