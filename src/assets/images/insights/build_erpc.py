import sys, re
import cairosvg
sys.path.insert(0, '/home/claude/erpf')
from lib import Fig, LIGHT, DARK, tw
import build_erpf as B
from build_erpf import bind, curly, chip, head, make, var_check, two_cols

OUT = '/home/claude/erpc/out'
CHK = '/home/claude/erpc/check'

B.PAIRS += ['scope creep', 'go-live', 'kick-off', 'giai đoạn', 'nhà triển khai', 'ngân sách', 'dự phòng', 'đánh giá', 'tác động', 'quy trình', 'yêu cầu', 'thay đổi', 'nguyên nhân', 'gốc rễ']

CONC_VI = 'Sơ đồ minh họa khái niệm từ bài viết, không phải số liệu đo lường.'
CONC_EN = 'Conceptual diagram from the article, not measured data.'

CONC_VI = 'Sơ đồ minh họa khái niệm từ bài viết, không phải số liệu đo lường.'
CONC_EN = 'Conceptual diagram from the article, not measured data.'

VI = dict(
    mt=60,
    t={1: 'Bốn yêu cầu nghe đều hợp lý',
       2: 'Bốn lý do scope creep phổ biến trong ERP',
       3: 'Năm dấu hiệu nhận biết scope creep sớm',
       4: 'Ba nguồn scope creep trong doanh nghiệp sản xuất',
       5: 'Quy trình xử lý yêu cầu thay đổi',
       0: 'Scope creep trong ERP:\nkhi dự án lớn dần ngoài kế hoạch'},
    s={1: 'Từng yêu cầu có lý do chính đáng; vấn đề nằm ở tổng của chúng.',
       2: 'Nguyên nhân gốc rễ là thiếu người hoặc quy trình quyết định yêu cầu.',
       3: 'Các dấu hiệu này thường xuất hiện trong vài tháng đầu của dự án.',
       4: 'Đặc thù sản xuất khiến phạm vi dễ mở rộng hơn dự kiến ban đầu.',
       5: 'Mỗi yêu cầu sau kick-off đi cùng một đường: mô tả, đánh giá tác động, quyết định.'},
    f={1: 'Ví dụ từ bài viết, không phải số liệu đo lường.',
       2: 'Phân tích từ bài viết, không phải thống kê.',
       3: 'Dấu hiệu theo phân tích trong bài viết, không phải thống kê.',
       4: 'Phân tích từ bài viết, không phải thống kê.',
       5: CONC_VI},
    c1=[('Thêm module vào giai đoạn một', 'Vì “không thể vận hành thiếu”.'),
        ('Chỉnh một quy trình', 'Để hoạt động “hơi khác” một chút.'),
        ('Thêm bộ phận ngay giai đoạn đầu', 'Thay vì triển khai sau.'),
        ('Một báo cáo cần có từ ngày đầu', 'Cần có ngay khi vận hành.')],
    e1='Mỗi yêu cầu đều có lý do; cộng lại, không ai kiểm soát được quy mô dự án.',
    c2=[('ERP liên quan đến toàn bộ tổ chức', 'Mọi bộ phận đều có yêu cầu và coi yêu cầu của mình là khẩn cấp.'),
        ('Yêu cầu xuất hiện trong lúc triển khai', 'Người dùng thấy thiếu sót khi xem demo hoặc prototype.'),
        ('Tác động của thay đổi nhỏ bị đánh giá thấp', 'Thêm một trường có thể ảnh hưởng phê duyệt, logic tính toán và báo cáo.'),
        ('Thiếu governance', 'Không ai quyết định yêu cầu nào vào giai đoạn một, để sau hay bị từ chối.')],
    root='Nguyên nhân gốc rễ',
    e2='Khi không có cấu trúc, mặc định là “thêm vào”, vì đồng ý tránh được xung đột trước mắt.',
    c3=[('Danh sách yêu cầu tăng sau kick-off', 'Dài hơn so với lúc bắt đầu dự án.'),
        ('Không có quy trình chính thức', 'Yêu cầu đến qua email, họp; không có form, đánh giá tác động hay người phê duyệt.'),
        ('Go-live lùi nhiều lần', 'Không rõ nguyên nhân; scope creep có thể ẩn ở đây.'),
        ('Cảnh báo bị bỏ qua', 'Nhà triển khai cảnh báo tác động nhưng yêu cầu vẫn được chấp thuận.'),
        ('Ngân sách dự phòng cạn sớm', 'Quỹ này dành cho rủi ro kỹ thuật, không để bù mở rộng scope.')],
    e3='Scope creep đôi khi hiện ra ở timeline trước khi hiện ra ở ngân sách.',
    c4=[('Quy trình sản xuất khác chuẩn ERP', 'Customize ERP theo quy trình hiện tại khiến scope mở rộng nhanh.'),
        ('Truy xuất nguồn gốc và hồ sơ chất lượng', 'Với ISO, GMP, FSMS, lot tracking, quality record và audit trail của ERP chuẩn có thể chưa đủ.'),
        ('Tích hợp với hệ thống hiện có', 'Phần mềm kho, hệ thống cân, thiết bị sản xuất thường được thêm muộn.')],
    e4='Ba nguồn này thường lộ ra sau khi dự án đã bắt đầu.',
    st=['Mô tả yêu cầu', 'Đánh giá tác động', 'Thời gian · chi phí · kỹ thuật'],
    dec='Người có thẩm quyền quyết định',
    out=['Đưa vào giai đoạn 1', 'Để sang giai đoạn 2', 'Từ chối'],
    e5='Kiểm soát scope không phải từ chối mọi thay đổi: là quyết định có ý thức.',
    kick='OKELAS · Insights · ERP',
    cb='Phạm vi ban đầu', cg='Từng yêu cầu nhỏ đều hợp lý, nhưng cộng dồn',
)

EN = dict(
    mt=62,
    t={1: 'Four requests that each sound reasonable',
       2: 'Four reasons scope creep is common in ERP',
       3: 'Five early warning signs of scope creep',
       4: 'Three sources of scope creep in manufacturing',
       5: 'The change request process',
       0: 'ERP Scope Creep:\nWhen the Project Grows Faster Than the Budget'},
    s={1: 'Each request is justified on its own; the problem is their sum.',
       2: 'The root cause is no clear owner or process for deciding requests.',
       3: 'These signs typically appear in the first months of a project.',
       4: 'Manufacturing specifics make scope expand more easily than planned.',
       5: 'Every request after kick-off follows one path: describe, assess impact, decide.'},
    f={1: 'Examples from the article, not measured data.',
       2: 'Analysis from the article, not statistics.',
       3: 'Signs from the article’s analysis, not statistics.',
       4: 'Analysis from the article, not statistics.',
       5: CONC_EN},
    c1=[('Add a module to phase one', '“We can’t operate without it.”'),
        ('Adjust one process', 'To work “slightly differently”.'),
        ('Bring a department into phase one', 'Instead of implementing it later.'),
        ('A report needed from day one', 'Required as soon as operations begin.')],
    e1='Each request has a reason; together, no one controls the size of the project.',
    c2=[('ERP touches the entire organization', 'Every department has requirements and considers them urgent.'),
        ('Requirements surface during implementation', 'Users spot gaps when they see a demo or prototype.'),
        ('Small changes are underestimated', 'One added field can affect an approval workflow, calculation logic and reports.'),
        ('Absent governance', 'No one decides what is in phase one, deferred or declined.')],
    root='Root cause',
    e2='Without structure the default drifts to “add it”, because agreeing avoids immediate conflict.',
    c3=[('Requirements list grows after kick-off', 'It is longer than when the project began.'),
        ('No formal process for new requests', 'Requests arrive by email or in meetings; no form, impact assessment or approver.'),
        ('Go-live pushed back repeatedly', 'Cause unclear; scope creep can hide here.'),
        ('Warnings are overridden', 'The partner flags impact, but requests are approved anyway.'),
        ('Contingency used up early', 'It is for technical risk, not for scope expansion.')],
    e3='Scope creep can show up in the timeline before it shows up in the budget.',
    c4=[('Production processes differ from ERP standard', 'Adapting ERP to existing processes makes scope expand quickly.'),
        ('Traceability and quality records', 'For ISO, GMP and food safety, standard lot tracking, quality records and audit trails may fall short.'),
        ('Integration with existing systems', 'Warehouse software, weighing scales and production equipment are often added late.')],
    e4='These sources often surface only after the project has started.',
    st=['Describe the request', 'Assess impact', 'Time · cost · technical complexity'],
    dec='A person with real authority decides',
    out=['Add to phase one', 'Defer to phase two', 'Decline'],
    e5='Scope control is not rejecting every change: it is deciding consciously.',
    kick='OKELAS · Insights · ERP',
    cb='Original scope', cg='Each small request is reasonable, but they add up',
)

ALT = {
    'vi': {
        1: 'Bốn yêu cầu điển hình nghe đều hợp lý: thêm module vào giai đoạn một, chỉnh một quy trình, thêm bộ phận ngay giai đoạn đầu và một báo cáo cần có từ ngày đầu; cộng lại, không ai kiểm soát được quy mô dự án.',
        2: 'Bốn lý do scope creep phổ biến trong ERP: ERP liên quan toàn bộ tổ chức, yêu cầu xuất hiện trong lúc triển khai, tác động của thay đổi nhỏ bị đánh giá thấp và thiếu governance, là nguyên nhân gốc rễ.',
        3: 'Năm dấu hiệu nhận biết scope creep sớm: danh sách yêu cầu tăng sau kick-off, không có quy trình chính thức, go-live lùi nhiều lần, cảnh báo của nhà triển khai bị bỏ qua và ngân sách dự phòng cạn sớm.',
        4: 'Ba nguồn scope creep trong doanh nghiệp sản xuất: quy trình khác chuẩn ERP, yêu cầu truy xuất nguồn gốc và hồ sơ chất lượng, và tích hợp với hệ thống hiện có.',
        5: 'Quy trình xử lý yêu cầu thay đổi: mô tả yêu cầu, đánh giá tác động về thời gian, chi phí và kỹ thuật, rồi người có thẩm quyền quyết định đưa vào giai đoạn 1, để sang giai đoạn 2 hoặc từ chối.',
        0: 'Một khối phạm vi ban đầu và các khối nhỏ cộng dồn thêm, mỗi khối cao hơn khối trước, thể hiện phạm vi dự án lớn dần qua từng yêu cầu.'},
    'en': {
        1: 'Four typical requests that each sound reasonable: add a module to phase one, adjust one process, bring a department into phase one and a report needed from day one; together, no one controls the size of the project.',
        2: 'Four reasons scope creep is common in ERP: ERP touches the whole organization, requirements surface during implementation, small changes are underestimated and governance is absent, the root cause.',
        3: 'Five early warning signs of scope creep: a requirements list that grows after kick-off, no formal process, go-live pushed back repeatedly, overridden partner warnings and contingency used up early.',
        4: 'Three sources of scope creep in manufacturing: production processes that differ from ERP standard, traceability and quality record requirements, and integration with existing systems.',
        5: 'The change request process: describe the request, assess impact on time, cost and technical complexity, then a person with real authority decides to add it to phase one, defer it to phase two or decline it.',
        0: 'An original scope block followed by small blocks stacking up, each taller than the last, showing project scope growing one request at a time.'},
}

VI = bind(VI)
EN = curly(EN)
LANGS = {'vi': VI, 'en': EN}
NAMES = {1: 'four-reasonable-requests', 2: 'four-causes', 3: 'five-warning-signs',
         4: 'manufacturing-sources', 5: 'change-request-flow'}


def numc(f, x, y, n, col='p', r=15):
    f.circle(x, y, r, col)
    f._line(x, y - 10, str(n), 15, 700, 'wh', 'middle', 20)


def cards(f, L, k, key, fill, stroke, n, numbered=False, lastroot=False, big=False):
    head(f, L, k)
    items = L[key]
    gap, y = 15, 134
    cw = round((1080 - gap * (n - 1)) / n)
    ts, ds = (18, 14) if big else (16, 13)
    top = 62 if numbered else (52 if lastroot else 20)
    need = 0
    for t, d in items:
        need = max(need, top + f.measure(t, ts, 700, cw - 32) + 10 + f.measure(d, ds, 400, cw - 32, 1.42) + 20)
    ch = round(need)
    for i, (t, d) in enumerate(items):
        x = 60 + i * (cw + gap)
        last = lastroot and i == n - 1
        f.rect(x, y, cw, ch, fill, stroke, 16, 3 if last else 1.8)
        if numbered:
            numc(f, x + 32, y + 32, i + 1, stroke)
        if last:
            f.pill(x + 16, y + 16, L['root'], 'a', 'bg', 12, 'start', 24, 10)
        th = f.para(x + 16, y + top, t, ts, 700, 'hd', cw - 32)
        f.para(x + 16, y + top + th + 10, d, ds, 400, 'tx', cw - 32, lhr=1.42)
    f.ink(y + ch + 16, L['e%d' % k])


def fig1(f, L): cards(f, L, 1, 'c1', 'pt', 'p', 4, big=True)
def fig2(f, L): cards(f, L, 2, 'c2', 'at', 'a', 4, lastroot=True, big=True)
def fig3(f, L): cards(f, L, 3, 'c3', 'at', 'a', 5, numbered=True)
def fig4(f, L): cards(f, L, 4, 'c4', 'pt', 'p', 3, numbered=True, big=True)


def fig5(f, L):
    head(f, L, 5)
    y0 = 134
    bh = 150
    f.rect(60, y0 + 22, 250, bh, 'pt', 'p', 16, 1.8)
    f.box_text(60, y0 + 22, 250, bh, L['st'][0], 20, 700, 'hd', 16)
    f.arrow(316, y0 + 22 + bh / 2, 364, y0 + 22 + bh / 2, 'gm', 2.5, 10)
    f.rect(370, y0 + 22, 330, bh, 'pt', 'p', 16, 1.8)
    f.box_text(370, y0 + 22, 330, 60, L['st'][1], 20, 700, 'hd', 16)
    f.box_text(370, y0 + 22 + 70, 330, 60, L['st'][2], 14, 400, 'tx', 20)
    f.pill(800, y0, L['dec'], 'a', 'at', 12, 'start', 24, 10)
    oh, og, oy = 52, 14, y0 + 40
    fills = [('pt', 'p'), ('at', 'a'), ('gt', 'gm')]
    mid = y0 + 22 + bh / 2
    for i, t in enumerate(L['out']):
        y = oy + i * (oh + og)
        f.arrow(706, mid, 794, y + oh / 2, 'gm', 2.5, 9)
        fl, st = fills[i]
        f.rect(800, y, 340, oh, fl, st, 12, 1.8, '6 5' if i == 2 else None)
        f.box_text(800, y, 340, oh, t, 17, 700, 'hd', 10)
    f.ink(oy + 3 * oh + 2 * og + 20, L['e5'])


def figcover(f, L):
    f.rect(0, 0, 1200, 630, 'bg', None, 0)
    f.rect(0, 0, 14, 630, 'p', None, 0)
    f._line(60, 44, L['kick'], 16, 700, 's', 'start', 22)
    f.para(60, 84, L['t'][0], 40, 700, 'hd', 1040, lhr=1.25)
    base, bw, gp = 500, 120, 30
    hs = [80, 120, 160, 200, 240]
    for i, h in enumerate(hs):
        x = 130 + i * (bw + gp)
        if i == 0:
            f.rect(x, base - h, bw, h, 'pt', 'p', 12, 2.4)
        else:
            f.rect(x, base - h, bw, h, 'at', 'a', 12, 2.4, '6 5')
    f.para(130, base + 18, L['cb'], 15, 700, 's', 200)
    f.para(130 + bw + gp, base + 18, L['cg'], 15, 700, 'a', 4 * (bw + gp) - gp)
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
            name = f'erpc-00-og-cover-{lang}' if k == 0 else f'erpc-{k:02d}-{NAMES[k]}-{lang}'
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
