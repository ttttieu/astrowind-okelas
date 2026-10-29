import sys, re
import cairosvg
sys.path.insert(0, '/home/claude/erpf')
from lib import Fig, LIGHT, DARK, tw
import build_erpf as B
from build_erpf import bind, curly, chip, head, make, var_check

OUT = '/home/claude/erpr/out'
CHK = '/home/claude/erpr/check'

B.PAIRS += ['nhập kho', 'chịu trách nhiệm', 'lãnh đạo', 'tồn kho']

VI = dict(
    mt=60,
    t={1: 'ERP đứng trên bốn nền tảng của tổ chức',
       2: 'Tám câu hỏi tự đánh giá mức độ sẵn sàng',
       3: 'Phép thử ba nhân viên: cùng một nghiệp vụ',
       4: 'Năm việc cần chuẩn bị khi chưa sẵn sàng cho ERP',
       0: 'Doanh nghiệp bạn đã thực sự\nsẵn sàng triển khai ERP chưa?'},
    s={1: 'Câu hỏi chọn phần mềm nào đến sau khi các nền tảng này đã đủ vững.',
       2: 'Số thứ tự theo bài viết; nhóm theo bốn chiều để dễ đọc.',
       3: 'Tình huống minh họa giả định, không phải thống kê hay case thực tế.',
       4: '“Chưa sẵn sàng” không có nghĩa ERP là hướng sai; nghĩa là cần chuẩn bị.'},
    f={1: 'Sơ đồ minh họa khái niệm từ bài viết, không phải số liệu đo lường.',
       2: 'Cách nhóm 8 câu hỏi theo bốn chiều là của OKELAS để dễ đọc; là công cụ thảo luận định hướng, không phải phương pháp luận được chứng nhận.',
       3: 'Tình huống minh họa giả định để giải thích câu hỏi 1, không phải thống kê hay case thực tế.',
       4: 'Sơ đồ minh họa khái niệm từ bài viết, không phải số liệu đo lường. Các việc không theo thứ tự cố định.'},
    # fig 1
    erp='ERP', erpd='ERP vận hành dựa trên quy trình',
    fd=[('Quy trình', 'Đủ rõ và nhất quán để cấu hình'),
        ('Dữ liệu', 'Đủ sạch để báo cáo được tin'),
        ('Con người', 'Sẵn sàng thay đổi cách làm việc'),
        ('Quản trị', 'Có người quyết định và chịu trách nhiệm')],
    e1='Thiếu các nền tảng này, ERP khuếch đại sự hỗn loạn hiện có, và việc sửa tốn kém hơn.',
    # fig 2
    dm=['Quy trình', 'Dữ liệu', 'Con người', 'Phạm vi và quản trị'],
    qs={1: 'Quy trình đã được ghi lại và nhất quán chưa?',
        2: 'Ai có thẩm quyền và thời gian quyết định trong dự án?',
        3: 'Dữ liệu master có đầy đủ, cập nhật, không trùng lặp không?',
        4: 'Tồn kho trên sổ có khớp thực tế không?',
        5: 'Phạm vi triển khai ban đầu đã xác định chưa?',
        6: 'Đã có kế hoạch change management chưa?',
        7: 'Ai chịu trách nhiệm hệ thống sau dự án?',
        8: 'Ban lãnh đạo có tham gia trực tiếp không?'},
    e2='Nhiều câu hỏi chưa có câu trả lời rõ là tín hiệu cần chuẩn bị, không phải lý do bỏ ERP.',
    # fig 3
    task='Hỏi ba nhân viên cùng một nghiệp vụ (ví dụ: nhập kho)',
    emp='Nhân viên', way='cách làm',
    l_t='Trả lời giống nhau', l_r='Quy trình nhất quán: ERP có cơ sở để cấu hình',
    r_t='Trả lời khác nhau', r_r='Mỗi người một cách: ERP khó cấu hình',
    e3='Nếu mỗi người một cách, quy trình cần được thống nhất trước khi cấu hình vào ERP.',
    # fig 4
    root4='Khi câu trả lời trung thực là “chưa sẵn sàng”',
    pp=[('Chuẩn hóa quy trình', 'Tài liệu hóa các quy trình vận hành chính.'),
        ('Làm sạch dữ liệu master', 'Làm trước khi chuyển dữ liệu (migration).'),
        ('Chọn phạm vi đầu nhỏ', 'Đủ nhỏ để có thể thành công.'),
        ('Chỉ định người chịu trách nhiệm', 'Cho dự án và cho hệ thống sau go-live.'),
        ('Truyền thông với nhân viên', 'Giải thích thay đổi gì và vì sao, trước khi dự án bắt đầu.')],
    e4='Câu trả lời “chưa sẵn sàng” là thông tin hữu ích: nó chỉ ra việc cần làm trước khi chọn phần mềm.',
    # cover
    kick='OKELAS · Insights · ERP',
    ca='Tám câu hỏi về tổ chức', cb='Chọn ERP và nhà triển khai', gate='Cổng sẵn sàng',
)

EN = dict(
    mt=62,
    t={1: 'ERP stands on four organizational foundations',
       2: 'Eight questions to assess your readiness',
       3: 'The three-employee test: one task, three answers',
       4: 'Five things to prepare when you are not yet ready',
       0: 'Is Your Business Actually\nReady for ERP?'},
    s={1: 'The question of which software to choose comes after these foundations are in place.',
       2: 'Numbered as in the article; grouped into four dimensions for readability.',
       3: 'Hypothetical illustrative scenario, not a statistic or a real case.',
       4: '“Not yet” does not mean ERP is the wrong direction; it means preparation is needed.'},
    f={1: 'Conceptual diagram from the article, not measured data.',
       2: 'Grouping the eight questions into four dimensions is OKELAS’s own, for readability; a discussion aid, not a certified methodology.',
       3: 'Hypothetical scenario to explain question 1, not a statistic or a real case.',
       4: 'Conceptual diagram from the article, not measured data. The items have no fixed order.'},
    erp='ERP', erpd='ERP is process-driven',
    fd=[('Processes', 'Clear and consistent enough to configure'),
        ('Data', 'Clean enough that reports are trusted'),
        ('People', 'Willing to change how they work'),
        ('Governance', 'Someone decides and takes responsibility')],
    e1='Without these foundations, ERP amplifies existing disorder, and fixing it costs more.',
    dm=['Processes', 'Data', 'People', 'Scope and governance'],
    qs={1: 'Are processes documented and consistently followed?',
        2: 'Does someone have the authority and time to decide throughout?',
        3: 'Is master data complete, current and free of duplicates?',
        4: 'Do recorded stock levels match physical stock?',
        5: 'Has the first-phase scope been defined?',
        6: 'Is there a change management plan?',
        7: 'Who owns the system after the project?',
        8: 'Are leaders actively involved, not just approving budget?'},
    e2='Several unclear answers signal a need to prepare, not a reason to drop ERP.',
    task='Ask three employees to describe the same task (e.g. goods receiving)',
    emp='Employee', way='approach',
    l_t='Same answers', l_r='Consistent process: ERP has something to configure',
    r_t='Different answers', r_r='Everyone does it their own way: hard to configure',
    e3='If everyone does it their own way, the process needs agreeing before it is configured in ERP.',
    root4='When the honest answer is “not yet”',
    pp=[('Standardize processes', 'Document the core operating processes.'),
        ('Clean master data', 'Do it before migration, not during it.'),
        ('Choose a small first scope', 'Small enough to succeed.'),
        ('Assign clear ownership', 'For the project and for the system after go-live.'),
        ('Communicate with employees', 'Explain what is changing and why, before the project begins.')],
    e4='A “not yet” answer is useful information: it shows what to do before choosing software.',
    kick='OKELAS · Insights · ERP',
    ca='Eight questions about the organization', cb='Choose ERP and implementation partner', gate='Readiness gate',
)

ALT = {
    'vi': {
        1: 'ERP, vận hành dựa trên quy trình, đứng trên bốn nền tảng của tổ chức: quy trình đủ rõ, dữ liệu đủ sạch, con người sẵn sàng thay đổi và quản trị có người chịu trách nhiệm; thiếu nền tảng thì ERP khuếch đại sự hỗn loạn.',
        2: 'Tám câu hỏi tự đánh giá mức độ sẵn sàng cho ERP, nhóm theo bốn chiều: quy trình, dữ liệu, con người, phạm vi và quản trị.',
        3: 'Hỏi ba nhân viên cùng một nghiệp vụ: nếu trả lời giống nhau thì quy trình nhất quán và ERP có cơ sở để cấu hình; nếu mỗi người một cách thì ERP khó cấu hình. Tình huống minh họa giả định.',
        4: 'Năm việc cần chuẩn bị khi chưa sẵn sàng: chuẩn hóa quy trình, làm sạch dữ liệu master, chọn phạm vi đầu nhỏ, chỉ định người chịu trách nhiệm và truyền thông với nhân viên.',
        0: 'Tám chấm, một nửa đặc và một nửa viền đứt, phải đi qua một cổng sẵn sàng trước khi tới khối ERP.'},
    'en': {
        1: 'ERP, which is process-driven, stands on four organizational foundations: clear processes, clean data, people willing to change and governance with clear responsibility; without them ERP amplifies disorder.',
        2: 'Eight self-assessment questions on ERP readiness, grouped into four dimensions: processes, data, people, and scope and governance.',
        3: 'Ask three employees to describe the same task: if answers match, the process is consistent and ERP has something to configure; if everyone does it their own way, ERP is hard to configure. Hypothetical illustration.',
        4: 'Five things to prepare when not yet ready: standardize processes, clean master data, choose a small first scope, assign clear ownership and communicate with employees.',
        0: 'Eight dots, half solid and half dashed, must pass through a readiness gate before reaching the ERP block.'},
}

VI = bind(VI)
EN = curly(EN)
LANGS = {'vi': VI, 'en': EN}
NAMES = {1: 'four-foundations', 2: 'eight-questions', 3: 'three-employee-test', 4: 'preparation-priorities'}


def fig1(f, L):
    head(f, L, 1)
    f.rect(60, 134, 1080, 78, 'ink', None, 16)
    f._line(600, 146, L['erp'], 28, 700, 'onink', 'middle', 36)
    f._line(600, 180, L['erpd'], 14, 400, 'onink', 'middle', 20)
    cw, gap, y, ch = 258, 16, 242, 112
    for i, (t, d) in enumerate(L['fd']):
        x = 60 + i * (cw + gap)
        f.arrow(x + cw / 2, y - 2, x + cw / 2, 216, 'gm', 2.5, 9)
        f.rect(x, y, cw, ch, 'pt', 'p', 16, 1.8)
        th = f.para(x + 20, y + 20, t, 20, 700, 'hd', cw - 40)
        dh = f.para(x + 20, y + 20 + th + 8, d, 14, 400, 'tx', cw - 40, lhr=1.4)
        if 20 + th + 8 + dh > ch - 12:
            raise ValueError('text overflows box: ' + d)
    f.ink(y + ch + 16, L['e1'])


def fig2(f, L):
    head(f, L, 2)
    cw, gap = 258, 16
    cols = [[1], [3, 4], [2, 6, 8], [5, 7]]
    hy, hh, ch, cg = 134, 44, 76, 8
    for c, qs in enumerate(cols):
        x = 60 + c * (cw + gap)
        f.rect(x, hy, cw, hh, 'gt', 'gm', 12, 1.6)
        f.box_text(x, hy, cw, hh, L['dm'][c], 16, 700, 'hd', 10)
        for j, n in enumerate(qs):
            y = hy + hh + 14 + j * (ch + cg)
            f.rect(x, y, cw, ch, 'pt', 'p', 14, 1.6)
            f.circle(x + 24, y + ch / 2, 13, 'p')
            f._line(x + 24, y + ch / 2 - 9, str(n), 14, 700, 'wh', 'middle', 18)
            f.box_text(x + 46, y, cw - 56, ch, L['qs'][n], 13, 700, 'hd', 0, 'left')
    bottom = hy + hh + 14 + 3 * ch + 2 * cg
    f.ink(bottom + 16, L['e2'])


def fig3(f, L):
    head(f, L, 3)
    f.rect(240, 134, 720, 46, 'gt', 'gm', 12, 1.6, '6 5')
    f.box_text(240, 134, 720, 46, L['task'], 15, 700, 'hd', 14)
    py, ph = 206, 276
    panels = [(60, L['l_t'], L['l_r'], 'pt', 'p', None, 's', [1, 1, 1]),
              (612, L['r_t'], L['r_r'], 'at', 'a', '6 5', 'a', [1, 2, 3])]
    for x, t, r, fill, st, dash, col, ways in panels:
        f.arrow(x + 264, 182, x + 264, py - 2, 'gm', 2.5, 9)
        f.rect(x, py, 528, ph, fill, st, 16, 1.8, dash)
        f.para(x + 24, py + 16, t, 22, 700, 'hd', 480)
        for i, w in enumerate(ways):
            chip(f, x + 24, py + 62 + i * 48, 480, 40, '%s %s: %s %d' % (L['emp'], 'ABC'[i], L['way'], w), st, 'bg', 14, 'hd')
        chip(f, x + 24, py + 62 + 3 * 48 + 6, 480, 52, r, st, 'bg', 15, col, None, 2)
    f.ink(py + ph + 16, L['e3'])


def fig4(f, L):
    head(f, L, 4)
    f.rect(60, 134, 1080, 52, 'gt', 'gm', 14, 1.6, '6 5')
    f.box_text(60, 134, 1080, 52, L['root4'], 17, 700, 'hd', 16)
    gap = 24
    cw = (1080 - 4 * gap) / 5
    y = 214
    need = 0
    for t, d in L['pp']:
        need = max(need, 20 + f.measure(t, 16, 700, cw - 32) + 10 + f.measure(d, 13, 400, cw - 32, 1.42) + 20)
    ch = round(need)
    for i, (t, d) in enumerate(L['pp']):
        x = 60 + i * (cw + gap)
        f.arrow(x + cw / 2, 188, x + cw / 2, y - 2, 'gm', 2, 8)
        f.rect(x, y, cw, ch, 'pt', 'p', 16, 1.8)
        th = f.para(x + 16, y + 20, t, 16, 700, 'hd', cw - 32)
        f.para(x + 16, y + 20 + th + 10, d, 13, 400, 'tx', cw - 32, lhr=1.42)
    f.ink(y + ch + 16, L['e4'])


def figcover(f, L):
    f.rect(0, 0, 1200, 630, 'bg', None, 0)
    f.rect(0, 0, 14, 630, 'p', None, 0)
    f._line(60, 44, L['kick'], 16, 700, 's', 'start', 22)
    f.para(60, 84, L['t'][0], 40, 700, 'hd', 1000, lhr=1.25)
    cy = 410
    pat = [['p', 'a', 'p', 'a'], ['a', 'p', 'a', 'p']]
    for r, row in enumerate(pat):
        for c, k in enumerate(row):
            x, y = 150 + c * 54, cy - 27 + r * 54
            if k == 'p':
                f.circle(x, y, 12, 'p')
            else:
                f.circle(x, y, 12, 'at', 'a', 2.2, '4 3')
    f.para(110, 500, L['ca'], 15, 700, 's', 330)
    f.arrow(370, cy, 484, cy, 'gm', 3, 11)
    gx = 520
    f.line(gx, 286, gx, 540, 'a', 3, '8 6')
    gw = tw(L['gate'], 14, 700) + 32
    f.pill(gx - gw / 2, 252, L['gate'], 'a', 'at', 14, 'start', 30, 16)
    f.arrow(556, cy, 680, cy, 'gm', 3, 11)
    f.rect(700, cy - 80, 260, 160, 'ink', None, 18)
    f._line(830, cy - 24, 'ERP', 40, 700, 'onink', 'middle', 50)
    f.para(700, 500, L['cb'], 15, 700, 's', 300)
    f.mark(H_COVER - 30)


H_COVER = 630
FIGS = {1: fig1, 2: fig2, 3: fig3, 4: fig4}


def build(sel=None):
    for lang, L in LANGS.items():
        for k in list(FIGS) + [0]:
            if sel and k not in sel:
                continue
            label = ALT[lang][k]
            fn = figcover if k == 0 else FIGS[k]
            name = f'erpr-00-og-cover-{lang}' if k == 0 else f'erpr-{k:02d}-{NAMES[k]}-{lang}'
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
