import html, re
from PIL import ImageFont

FD = '/usr/share/fonts/opentype/inter/'
FW = {400: 'Inter-Regular.otf', 700: 'Inter-Bold.otf'}
_fc = {}

FOOT = 84      # footer band height (rule at H-FOOT); workflow series used 62
GAP_BOTTOM = 16  # min gap between content and footer rule


def font(size, w):
    k = (size, w)
    if k not in _fc:
        _fc[k] = ImageFont.truetype(FD + FW[w], size)
    return _fc[k]


def tw(t, size, w):
    return font(size, w).getlength(t) * 1.025  # safety margin: cairo/browsers render slightly wider


LIGHT = dict(p='#0161EF', s='#0154CF', a='#6D28D9', bg='#FFFFFF', tx='#273244', mut='#5B677A',
             line='#D5DCE7', hd='#0B1220', pt='#EAF2FF', at='#F3EDFF', gt='#F2F4F8', ink='#0B1220',
             onink='#FFFFFF', wh='#FFFFFF', gm='#98A2B3')
DARK = dict(p='#2B74F5', s='#5FA0FF', a='#A78BFA', bg='#08090A', tx='#E5ECF6', mut='#9AA6B8',
            line='#2A2F38', hd='#F7F8F8', pt='#0E1D38', at='#1E1636', gt='#14161A', ink='#F7F8F8',
            onink='#08090A', wh='#FFFFFF', gm='#5B6575')


def greedy(words, size, w, maxw):
    lines, cur = [], ''
    for wd in words:
        t = (cur + ' ' + wd) if cur else wd
        if tw(t, size, w) <= maxw or not cur:
            cur = t
        else:
            lines.append(cur)
            cur = wd
    if cur:
        lines.append(cur)
    return lines


def wrap(text, size, w, maxw):
    out = []
    for para in text.split('\n'):
        words = para.split(' ')
        lines = greedy(words, size, w, maxw)
        if len(lines) > 1:
            n, m = len(lines), maxw
            while len(lines[-1].split(' ')) < 2 and m > maxw * 0.62:
                m -= 4
                l2 = greedy(words, size, w, m)
                if len(l2) > n:
                    break
                lines = l2
        out += lines
    for l in out:
        if tw(l, size, w) > maxw + 0.5:
            raise ValueError(f'line too wide ({tw(l, size, w):.0f}>{maxw}): {l}')
    return out


def esc(s):
    return html.escape(s.replace('\xa0', ' '), quote=False)


class Fig:
    def __init__(self, H, mode='svg', dark=False, label=''):
        self.H, self.W, self.mode, self.label = H, 1200, mode, label
        self.el = []
        self.pal = DARK if dark else LIGHT

    def c(self, name):
        if name.startswith('#'):
            return name
        return f'var(--{name})' if self.mode == 'svg' else self.pal[name]

    def rect(self, x, y, w, h, fill='bg', stroke=None, rx=14, sw=1.5, dash=None):
        s = f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{rx}" fill="{self.c(fill) if fill else "none"}"'
        if stroke:
            s += f' stroke="{self.c(stroke)}" stroke-width="{sw}"'
        if dash:
            s += f' stroke-dasharray="{dash}"'
        self.el.append(s + '/>')

    def line(self, x1, y1, x2, y2, color='line', sw=1.5, dash=None):
        s = f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{self.c(color)}" stroke-width="{sw}"'
        if dash:
            s += f' stroke-dasharray="{dash}"'
        self.el.append(s + '/>')

    def circle(self, cx, cy, r, fill='p', stroke=None, sw=1.5, dash=None):
        s = f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="{r}" fill="{self.c(fill) if fill else "none"}"'
        if stroke:
            s += f' stroke="{self.c(stroke)}" stroke-width="{sw}"'
        if dash:
            s += f' stroke-dasharray="{dash}"'
        self.el.append(s + '/>')

    def poly(self, pts, fill):
        p = ' '.join(f'{x:.1f},{y:.1f}' for x, y in pts)
        self.el.append(f'<polygon points="{p}" fill="{self.c(fill)}"/>')

    def arrow(self, x1, y1, x2, y2, color='mut', sw=2, head=9):
        import math
        a = math.atan2(y2 - y1, x2 - x1)
        bx, by = x2 - head * math.cos(a), y2 - head * math.sin(a)
        self.line(x1, y1, bx, by, color, sw)
        px, py = -math.sin(a), math.cos(a)
        self.poly([(x2, y2), (bx + px * head * 0.55, by + py * head * 0.55),
                   (bx - px * head * 0.55, by - py * head * 0.55)], color)

    def lh(self, size, r=1.38):
        return size * r

    def _line(self, x, top, s, size, weight, color, anchor, lh):
        base = top + (lh - 1.21 * size) / 2 + 0.969 * size
        self.el.append(
            f'<text x="{x:.1f}" y="{base:.1f}" font-size="{size}" font-weight="{weight}" '
            f'fill="{self.c(color)}" text-anchor="{anchor}">{esc(s)}</text>')

    def para(self, x, y, text, size, weight=400, color='tx', maxw=1000, anchor='start', lhr=1.38):
        lines = wrap(text, size, weight, maxw)
        lh = size * lhr
        for i, l in enumerate(lines):
            self._line(x, y + i * lh, l, size, weight, color, anchor, lh)
        return lh * len(lines)

    def measure(self, text, size, weight, maxw, lhr=1.38):
        return size * lhr * len(wrap(text, size, weight, maxw))

    def box_text(self, x, y, w, h, text, size, weight=400, color='tx', pad=10, align='center', lhr=1.32):
        lines = wrap(text, size, weight, w - 2 * pad)
        lh = size * lhr
        tot = lh * len(lines)
        if tot > h - 4:
            raise ValueError(f'text overflows box ({tot:.0f}>{h}): {text}')
        top = y + (h - tot) / 2
        ax = x + w / 2 if align == 'center' else x + pad
        for i, l in enumerate(lines):
            self._line(ax, top + i * lh, l, size, weight, color, 'middle' if align == 'center' else 'start', lh)

    def check_bottom(self, y):
        if y > self.H - FOOT - GAP_BOTTOM:
            raise ValueError(f'content bottom {y:.0f} collides with footer ({self.H - FOOT - GAP_BOTTOM})')

    def ink(self, y, text, size=18):
        lines = wrap(text, size, 700, 1032)
        lh = size * 1.38
        h = max(54, lh * len(lines) + 24)
        self.rect(60, y, 1080, h, 'ink', None, 12)
        top = y + (h - lh * len(lines)) / 2
        for i, l in enumerate(lines):
            self._line(600, top + i * lh, l, size, 700, 'onink', 'middle', lh)
        self.check_bottom(y + h)
        return h

    def pill(self, x, y, text, color='a', fill='at', size=12, align='start', h=24, padx=10):
        w = tw(text, size, 700) + 2 * padx
        if align == 'end':
            x = x - w
        self.rect(x, y, w, h, fill, color, h / 2, 1.2)
        self._line(x + w / 2, y + (h - size * 1.2) / 2, text, size, 700, color, 'middle', size * 1.2)
        return w

    def mark(self, y=None):
        """Small okelas.com ownership mark, bottom-left."""
        y = (self.H - 34) if y is None else y
        self._line(60, y, 'okelas.com', 13, 700, 'gm', 'start', 18)

    def frame(self, title, sub, foot, maxtitle):
        if len(title) > maxtitle:
            raise ValueError(f'title too long {len(title)}>{maxtitle}: {title}')
        if tw(title, 32, 700) > 1080:
            raise ValueError('title wider than frame: ' + title)
        self.para(60, 36, title, 32, 700, 'hd', 1080)
        if sub:
            self.para(60, 86, sub, 17, 400, 'mut', 1080)
        y = self.H - FOOT
        self.line(60, y, 1140, y, 'line', 1)
        n = self.para(60, y + 10, foot, 12, 400, 'mut', 1080, lhr=1.35)
        if n > 12 * 1.35 * 2 + 0.5:
            raise ValueError('footer note longer than 2 lines')
        self.mark()

    def svg(self):
        P, D = LIGHT, DARK
        head = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {self.W} {self.H}" width="{self.W}" height="{self.H}" '
                f'role="img" aria-label="{html.escape(self.label)}" '
                f'font-family="{"Inter, system-ui, sans-serif" if self.mode == "svg" else "Inter"}">')
        style = ''
        if self.mode == 'svg':
            lv = ''.join(f'--{k}:{v};' for k, v in P.items())
            dv = ''.join(f'--{k}:{v};' for k, v in D.items())
            style = (f'<style>svg{{{lv}}}@media (prefers-color-scheme: dark){{svg{{{dv}}}}}</style>')
        bg = f'<rect width="{self.W}" height="{self.H}" fill="{self.c("bg")}"/>'
        return head + style + bg + ''.join(self.el) + '</svg>'
