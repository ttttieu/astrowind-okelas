#!/usr/bin/env python3
"""Kiểm tra bài mới BAO PHỦ bài gốc (không yêu cầu hai bản giống hệt nhau).

Dùng:
    python tools/check_coverage.py <slug>.original.md <slug>.md [tùy chọn]

Nguyên tắc
- Mọi chữ của bài gốc phải còn trong bài mới, đúng thứ tự (so theo từ, bỏ qua
  hoa/thường, dấu câu, định dạng markdown, URL của link).
- Được phép CHÈN THÊM: link, ảnh, caption/câu dẫn ngắn... Phần chèn không làm FAIL
  nhưng được liệt kê; đoạn chèn dài hơn --max-insert từ bị cảnh báo.
- FAIL (exit 1) khi:
    * thiếu hoặc đổi chữ so với bài gốc (độ bao phủ < --min-coverage, mặc định 100%);
    * một link có sẵn trong bài gốc bị mất;
    * (nếu có --allowed-links) bài mới dùng URL ngoài danh sách;
    * (nếu có --strict-insert) có đoạn chèn dài hơn --max-insert.
- Phạm vi so sánh: nếu file có khối BODY:START/END (hoặc LOCKED:START/END cũ) thì chỉ
  so trong khối đó; nếu không thì so toàn bộ phần sau frontmatter, bỏ các khối EDITABLE.
"""
import argparse
import difflib
import re
import sys
import unicodedata
from collections import Counter

BODY_RE = re.compile(
    r"<!--\s*(?:BODY|LOCKED):START.*?-->\n?(.*?)<!--\s*(?:BODY|LOCKED):END\s*-->", re.S
)
EDITABLE_RE = re.compile(
    r"<!--\s*EDITABLE:(\w+)\s+START.*?<!--\s*EDITABLE:\1\s+END\s*-->", re.S
)
COMMENT_RE = re.compile(r"<!--.*?-->", re.S)
FRONTMATTER_RE = re.compile(r"\A---\n.*?\n---\n", re.S)
IMG_RE = re.compile(r"!\[[^\]]*\]\([^)]*\)")
LINK_RE = re.compile(r"\[([^\]]+)\]\(\s*<?([^)\s>]+)>?(?:\s+\"[^\"]*\")?\s*\)")
HTML_TAG_RE = re.compile(r"<[^>]+>")
BARE_URL_RE = re.compile(r"https?://\S+")
HEADING_RE = re.compile(r"^(#{1,6})\s+(.*)$")
WORD_RE = re.compile(r"[^\W_]+")


def read(path):
    with open(path, encoding="utf-8") as f:
        return unicodedata.normalize("NFC", f.read().replace("\r\n", "\n").lstrip("\ufeff"))


def extract_body(text):
    """Trả về (body, có_marker)."""
    text = FRONTMATTER_RE.sub("", text, count=1)
    blocks = BODY_RE.findall(text)
    if blocks:
        body, marked = "\n".join(blocks), True
    else:
        body, marked = EDITABLE_RE.sub("", text), False
    return COMMENT_RE.sub("", body), marked


def words(s):
    return WORD_RE.findall(s.casefold())


def analyze(body):
    n_img = len(IMG_RE.findall(body))
    body = IMG_RE.sub("", body)
    links = [(m.group(1), m.group(2)) for m in LINK_RE.finditer(body)]
    body = LINK_RE.sub(r"\1", body)
    body = HTML_TAG_RE.sub(" ", body)
    body = BARE_URL_RE.sub(" ", body)
    headings = []
    for line in body.splitlines():
        m = HEADING_RE.match(line.strip())
        if m:
            headings.append((len(m.group(1)), " ".join(words(m.group(2)))))
    return {"tokens": words(body), "links": links, "images": n_img, "headings": headings}


def snippet(tokens, limit=40):
    s = " ".join(tokens[:limit])
    return s + (" …" if len(tokens) > limit else "")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("original")
    ap.add_argument("working")
    ap.add_argument("--min-coverage", type=float, default=1.0,
                    help="tỉ lệ từ gốc phải còn (mặc định 1.0 = 100%%)")
    ap.add_argument("--max-insert", type=int, default=25,
                    help="đoạn chèn dài hơn số từ này bị cảnh báo (mặc định 25)")
    ap.add_argument("--strict-insert", action="store_true",
                    help="coi cảnh báo chèn dài là FAIL")
    ap.add_argument("--allowed-links", help="file danh sách URL được phép (mỗi dòng một URL, # là chú thích)")
    ap.add_argument("--verbose", action="store_true", help="liệt kê cả các đoạn chèn ngắn")
    args = ap.parse_args()

    body_o, _ = extract_body(read(args.original))
    body_w, marked_w = extract_body(read(args.working))
    o, w = analyze(body_o), analyze(body_w)

    fail = False
    warn = False
    a, b = o["tokens"], w["tokens"]
    if not a:
        print("FAIL: bài gốc không có nội dung để so sánh.")
        sys.exit(1)
    if not marked_w:
        print("WARN: bản làm việc không có khối BODY:START/END; so toàn bộ phần sau frontmatter.")
        warn = True

    sm = difflib.SequenceMatcher(None, a, b, autojunk=False)
    ops = sm.get_opcodes()
    matched = sum(i2 - i1 for tag, i1, i2, _, _ in ops if tag == "equal")
    coverage = matched / len(a)

    print(f"Bài gốc: {len(a)} từ | bài mới (thân bài): {len(b)} từ | "
          f"bao phủ: {coverage:.2%} ({matched}/{len(a)})")

    # 1) Chữ bị mất / bị đổi
    problems = [(t, i1, i2, j1, j2) for t, i1, i2, j1, j2 in ops if t in ("delete", "replace")]
    if coverage < args.min_coverage:
        fail = True
        print(f"\nFAIL: độ bao phủ {coverage:.2%} < yêu cầu {args.min_coverage:.2%}.")
    if problems:
        label_ctx = "(bỏ qua chi tiết)" if coverage >= args.min_coverage else ""
        print(f"\nChữ của bài gốc bị mất hoặc đổi: {len(problems)} chỗ {label_ctx}")
        for n, (t, i1, i2, j1, j2) in enumerate(problems[:40], 1):
            ctx = " ".join(a[max(0, i1 - 6):i1])
            if t == "delete":
                print(f"  [{n}] MẤT {i2 - i1} từ sau «…{ctx}»: «{snippet(a[i1:i2])}»")
            else:
                print(f"  [{n}] ĐỔI sau «…{ctx}»:\n        gốc: «{snippet(a[i1:i2])}»\n        mới: «{snippet(b[j1:j2])}»")
        if len(problems) > 40:
            print(f"  … còn {len(problems) - 40} chỗ khác")

    # 2) Phần chèn thêm
    inserts = [(i1, b[j1:j2]) for t, i1, i2, j1, j2 in ops if t in ("insert", "replace")]
    total_ins = sum(len(x) for _, x in inserts)
    long_ins = [(i1, x) for i1, x in inserts if len(x) > args.max_insert]
    print(f"\nChèn thêm vào thân bài: {len(inserts)} chỗ, {total_ins} từ "
          f"({total_ins / len(a):.1%} so với bài gốc); ảnh: {o['images']} → {w['images']}")
    if long_ins:
        warn = True
        if args.strict_insert:
            fail = True
        print(f"WARN: {len(long_ins)} đoạn chèn dài hơn {args.max_insert} từ (cần lý do trong EDITABLE:notes):")
        for i1, x in long_ins:
            ctx = " ".join(a[max(0, i1 - 6):i1])
            print(f"  + {len(x)} từ sau «…{ctx}»: «{snippet(x, 30)}»")
    if args.verbose:
        for i1, x in inserts:
            if len(x) <= args.max_insert:
                ctx = " ".join(a[max(0, i1 - 6):i1])
                print(f"  + {len(x)} từ sau «…{ctx}»: «{snippet(x, 30)}»")

    # 3) Link
    urls_o = Counter(u for _, u in o["links"])
    urls_w = Counter(u for _, u in w["links"])
    lost = [u for u in urls_o if urls_w[u] < 1]
    added = [u for u in urls_w if u not in urls_o]
    print(f"\nLink: gốc {sum(urls_o.values())} → mới {sum(urls_w.values())}; link thêm: {len(added)}")
    for u in added:
        print(f"  + {u} (×{urls_w[u]})")
    if lost:
        fail = True
        print("FAIL: link có sẵn trong bài gốc bị mất:")
        for u in lost:
            print(f"  - {u}")
    over = [u for u in added if urls_w[u] > 2]
    for u in over:
        warn = True
        print(f"WARN: {u} được link {urls_w[u]} lần (quy định tối đa 2).")
    if args.allowed_links:
        with open(args.allowed_links, encoding="utf-8") as f:
            allowed = {ln.strip() for ln in f if ln.strip() and not ln.startswith("#")}
        bad = [u for u in added if u not in allowed]
        if bad:
            fail = True
            print("FAIL: URL ngoài danh sách được phép:")
            for u in bad:
                print(f"  ! {u}")

    # 4) Heading
    levels_w = {}
    for lvl, txt in w["headings"]:
        levels_w.setdefault(txt, set()).add(lvl)
    for lvl, txt in o["headings"]:
        if txt in levels_w and lvl not in levels_w[txt]:
            warn = True
            print(f"WARN: heading «{txt}» đổi cấp (gốc H{lvl} → mới H{sorted(levels_w[txt])[0]}).")

    result = "FAIL" if fail else ("PASS (có cảnh báo)" if warn else "PASS")
    print(f"\nRESULT: {result}")
    sys.exit(1 if fail else 0)


if __name__ == "__main__":
    main()
