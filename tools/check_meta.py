#!/usr/bin/env python3
"""Kiểm tra meta (frontmatter), CTA và link của bài theo chuẩn OKELAS (05 v3).

Dùng:
    python tools/check_meta.py <bài.md> [<bài2.md> ...] --repo <thư mục repo> [--publish]
    python tools/check_meta.py src/content/insights/*.md --repo .        # rà toàn bộ bài đã public

Với --repo, script đọc trực tiếp từ repo (không giả định):
  - enum category / contentType / funnelStage và danh sách field từ src/content.config.ts
    (schema Astro đang hoạt động);
  - danh sách URL đang chạy, từ src/content/insights/*.md (lang + category + tên file);
  - kiểm tra ảnh trong thân bài có tồn tại, file trùng slug, và cặp bản dịch (translationId).
Không có --repo: dùng giá trị mặc định lấy từ repo ngày 31/10/2026 và bỏ qua các kiểm tra cần repo.

Phân loại: FAIL (làm hỏng build/hiển thị hoặc sai chuẩn) -> exit 1; WARN (cần xem xét).
Với nhiều file: in tóm tắt theo mã lỗi kèm ví dụ; thêm --all để in từng file.
"""
import argparse
import glob
import os
import re
import sys
from collections import Counter, defaultdict

FRONT_RE = re.compile(r"\A﻿?---\r?\n(.*?)\r?\n---\r?\n", re.S)
COMMENT_RE = re.compile(r"<!--.*?-->", re.S)
IMG_RE = re.compile(r"!\[[^\]]*\]\(([^)\s]+)[^)]*\)")
LINK_RE = re.compile(r"(?<!!)\[([^\]]+)\]\(\s*<?([^)\s>]+)>?(?:\s+\"[^\"]*\")?\s*\)")
INSIGHT_RE = re.compile(r"^(/en)?/insights/([a-z0-9-]+)/([a-z0-9-]+)/?$")
READINESS_RE = re.compile(r"^(/en)?/readiness/([a-z0-9-]+)/?$")
CONTACT_RE = re.compile(r"^(/en)?/contact/?$")
LABEL_RE = re.compile(r"^\s*-\s+\[[^\]]+\]\([^)]+\)\s+\*\(([^)]+)\)\*\s*$", re.M)
DIACRITIC = re.compile(r"[ăâđêôơưáàảãạéèẻẽẹíìỉĩịóòỏõọúùủũụýỳỷỹỵ]", re.I)

DEFAULT_ENUMS = {
    "category": {"business-operations", "knowledge-management", "erp", "ai", "compliance", "workflow", "trending"},
    "contentType": {"Opening", "Analysis", "Case & Evidence", "Pillar"},
    "funnelStage": {"Awareness", "Understanding", "Consideration"},
}
ASSESSMENTS = {"erp", "digitalization", "ai", "workflow", "knowledge"}
REQUIRED = ["title", "description", "publishDate", "translationId", "lang", "category", "contentType",
            "funnelStage", "audience", "primaryKeyword", "secondaryKeywords", "assessmentHref",
            "ctaPrimaryText", "ctaSubtitle"]
IMAGE_FIELDS = ["coverImage", "ogImage", "coverImageAlt"]
KM_PRESET = {
    "vi": ("Làm Knowledge Management Maturity Assessment", "Xác định mức độ trưởng thành và điểm cần cải thiện đầu tiên"),
    "en": ("Take the Knowledge Management Maturity Assessment", "Identify your maturity level and the first improvement to make"),
}
LABELS = {"vi": {"bài trước", "bài tiếp theo", "bài liên quan", "pillar"},
          "en": {"previous", "next", "related", "pillar"}}


def read_text(path):
    with open(path, encoding="utf-8") as f:
        return f.read().replace("\r\n", "\n")


def parse_frontmatter(text):
    m = FRONT_RE.match(text)
    if not m:
        return None, text
    raw, rest = m.group(1), text[m.end():]
    try:
        import yaml  # type: ignore
        return (yaml.safe_load(raw) or {}), rest
    except ImportError:
        pass
    data, cur = {}, None
    for line in raw.splitlines():
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        if re.match(r"^\s+-\s+", line) and cur:
            if not isinstance(data.get(cur), list):
                data[cur] = []
            data[cur].append(re.sub(r"^\s+-\s+", "", line).strip().strip("\"'"))
            continue
        kv = re.match(r"^([A-Za-z_]\w*)\s*:\s*(.*)$", line)
        if not kv:
            continue
        cur, val = kv.group(1), re.sub(r"\s+#.*$", "", kv.group(2)).strip()
        if val.startswith("[") and val.endswith("]"):
            inner = val[1:-1].strip()
            data[cur] = [x.strip().strip("\"'") for x in inner.split(",")] if inner else []
        elif val == "":
            data[cur] = None
        elif val.lower() in ("true", "false"):
            data[cur] = val.lower() == "true"
        else:
            data[cur] = val.strip("\"'")
    return data, rest


def load_repo(repo):
    info = {"enums": {k: set(v) for k, v in DEFAULT_ENUMS.items()}, "schema": None,
            "urls": set(), "pairs": defaultdict(set), "dir": None, "notes": []}
    cfg = os.path.join(repo, "src", "content.config.ts")
    if os.path.exists(cfg):
        txt = read_text(cfg)
        m = re.search(r"const insightsCollection(.*?)const metadataDefinition", txt, re.S)
        block = m.group(1) if m else txt
        info["schema"] = set(re.findall(r"^\s+(\w+)\s*:\s*z\b", block, re.M))
        pats = {"category": r"\bcategory\s*:\s*z\s*\.enum\(\s*\[(.*?)\]\s*\)",
                "contentType": r"\bcontentType\s*:\s*z\s*\.enum\(\s*\[(.*?)\]\s*\)",
                "funnelStage": r"\bfunnelStage\s*:\s*z\s*\.array\(\s*z\s*\.enum\(\s*\[(.*?)\]\s*\)"}
        for key, pat in pats.items():
            mm = re.search(pat, block, re.S)
            if mm:
                info["enums"][key] = set(re.findall(r"['\"]([^'\"]+)['\"]", mm.group(1)))
    else:
        info["notes"].append("không thấy src/content.config.ts; dùng enum mặc định")
    d = os.path.join(repo, "src", "content", "insights")
    info["dir"] = os.path.abspath(d)
    for p in glob.glob(os.path.join(d, "*.md")):
        fm, _ = parse_frontmatter(read_text(p))
        if not fm:
            continue
        cat, lang, tid = fm.get("category"), fm.get("lang"), fm.get("translationId")
        stem = os.path.splitext(os.path.basename(p))[0]
        if cat and lang:
            info["urls"].add(("/en" if lang == "en" else "") + f"/insights/{cat}/{stem}")
        if tid and lang:
            info["pairs"][tid].add((lang, stem))
    return info


def check_file(path, args, repo):
    res = []  # (kind, code, text)

    def add(kind, code, text):
        res.append((kind, code, text))

    text = read_text(path)
    fm, rest = parse_frontmatter(text)
    if fm is None:
        add("FAIL", "FM-NONE", "không có frontmatter")
        return res
    stem = os.path.splitext(os.path.basename(path))[0]
    has_notes = "EDITABLE:notes START" in rest
    body = COMMENT_RE.sub("", rest)
    enums = repo["enums"] if repo else DEFAULT_ENUMS

    def empty(v):
        return v is None or v == "" or v == []

    for k in REQUIRED:
        if k not in fm:
            add("FAIL", "FM-MISSING", f"thiếu {k}")
        elif empty(fm[k]):
            add("FAIL", "FM-EMPTY", f"trống: {k}")

    lang = str(fm.get("lang") or "")
    if lang not in ("vi", "en"):
        add("FAIL", "ENUM-lang", f"lang phải là vi/en (đang là {lang!r})")
    for key in ("category", "contentType"):
        v = fm.get(key)
        if v and str(v) not in enums[key]:
            add("FAIL", f"ENUM-{key}", f"{key} «{v}» không hợp lệ; schema nhận: {', '.join(sorted(enums[key]))}")
    stages = fm.get("funnelStage") or []
    for s in ([stages] if isinstance(stages, str) else stages):
        if s not in enums["funnelStage"]:
            add("FAIL", "ENUM-funnelStage", f"funnelStage «{s}» không hợp lệ; schema nhận: {', '.join(sorted(enums['funnelStage']))}")

    title, desc = str(fm.get("title") or ""), str(fm.get("description") or "")
    if re.search(r"[—–-]\s*OKELAS\s*$", title, re.I):
        add("FAIL", "TITLE-SUFFIX", "title có hậu tố «— OKELAS» (site tự thêm)")
    if len(title) > 110:
        add("WARN", "TITLE-LEN", f"title dài {len(title)} ký tự")
    if desc and len(desc) < 80:
        add("WARN", "DESC-SHORT", f"description ngắn ({len(desc)} ký tự)")
    if len(desc) > 200:
        add("WARN", "DESC-LONG", f"description dài {len(desc)} ký tự (>200)")

    # assessment + CTA (layout)
    ah = str(fm.get("assessmentHref") or "")
    kind_assess = None
    if ah:
        m, c = READINESS_RE.match(ah), CONTACT_RE.match(ah)
        if m:
            kind_assess = m.group(2)
            if m.group(2) not in ASSESSMENTS:
                add("FAIL", "ASSESS-SLUG", f"assessmentHref «{ah}»: không có trên site (hợp lệ: {', '.join(sorted(ASSESSMENTS))})")
            if lang == "en" and not m.group(1):
                add("FAIL", "ASSESS-LANG", "bài EN phải dùng assessmentHref có /en")
            if lang == "vi" and m.group(1):
                add("FAIL", "ASSESS-LANG", "bài VI không dùng /en trong assessmentHref")
        elif c:
            kind_assess = "contact"
        else:
            add("FAIL", "ASSESS-FORM", f"assessmentHref «{ah}» không theo khuôn /readiness/<tên>")
    cta_t, cta_s = str(fm.get("ctaPrimaryText") or ""), str(fm.get("ctaSubtitle") or "")
    if cta_t and lang in ("vi", "en"):
        has_vn = bool(DIACRITIC.search(cta_t))
        if lang == "en" and has_vn:
            add("FAIL", "CTA-LANG", f"bài EN nhưng ctaPrimaryText có tiếng Việt: «{cta_t}»")
        if lang == "vi" and not has_vn:
            add("WARN", "CTA-LANG", f"bài VI nhưng ctaPrimaryText là tiếng Anh: «{cta_t}»")
    if cta_s and lang == "vi" and not DIACRITIC.search(cta_s):
        add("WARN", "CTA-LANG", f"bài VI nhưng ctaSubtitle là tiếng Anh: «{cta_s}»")
    if kind_assess == "knowledge" and lang in KM_PRESET and cta_t and cta_s:
        if (cta_t, cta_s) != KM_PRESET[lang]:
            add("WARN", "CTA-KM-PRESET", "CTA của assessment KM khác chuẩn (05 §4.2)")

    # ảnh bìa (frontmatter)
    present_img = [k for k in IMAGE_FIELDS if not empty(fm.get(k))]
    if present_img:
        for k in ("coverImage", "ogImage"):
            v = str(fm.get(k) or "")
            if not v:
                add("FAIL", "IMG-FM", f"{k} trống trong khi trường ảnh khác đã có")
            elif not re.match(r"^~/assets/images/insights/.+\.(png|jpe?g|webp|svg)$", v):
                add("WARN", "IMG-PATH", f"{k} «{v}» không theo khuôn ~/assets/images/insights/...")
            elif repo and not os.path.exists(os.path.join(args.repo, "src", v[2:])):
                add("WARN", "IMG-NOFILE", f"{k}: không thấy file {v}")
        if empty(fm.get("coverImageAlt")):
            add("FAIL", "IMG-ALT", "thiếu coverImageAlt")
        if repo and repo["schema"] is not None:
            dead = [k for k in present_img if k not in repo["schema"]]
            if dead:
                add("WARN", "IMG-DEAD", "schema đang chạy (src/content.config.ts) chưa khai báo " + ", ".join(dead) + " nên bị bỏ khi build")
    if repo and repo["schema"] is not None:
        stray = [k for k in fm if k not in repo["schema"] and k not in IMAGE_FIELDS]
        if stray:
            add("WARN", "FM-STRAY", "field ngoài schema (bị bỏ khi build): " + ", ".join(sorted(stray)))

    # keyword
    pk = str(fm.get("primaryKeyword") or "").casefold()
    if pk:
        first = " ".join(re.sub(r"[#>*\-\[\]()]", " ", IMG_RE.sub("", body)).split()[:150]).casefold()
        hay = " ".join([title.casefold(), desc.casefold(), first])
        toks = [t for t in re.findall(r"[^\W_]+", pk) if len(t) > 1]
        share = (sum(1 for t in toks if t in hay) / len(toks)) if toks else 1.0
        if share < 0.6:
            add("WARN", "KW-PLACE", f"chỉ {share:.0%} từ của primaryKeyword xuất hiện trong title, description hoặc 150 từ đầu")

    # thân bài
    if re.search(r"^# [^\n]+", body, re.M):
        add("FAIL", "BODY-H1", "thân bài có H1 («# …»); layout đã render H1 từ title")
    if re.search(r"\{[^}\n]+\}", body):
        add("FAIL", "BODY-PLACEHOLDER", "còn placeholder {…}")
    for u in IMG_RE.findall(body):
        if u.startswith("~/"):
            if repo and not os.path.exists(os.path.join(args.repo, "src", u[2:])):
                add("FAIL", "BODY-IMG-MISSING", f"ảnh trong bài không tồn tại: {u}")
        elif u.startswith("/assets/") and repo and os.path.exists(os.path.join(args.repo, "public", u.lstrip("/"))):
            pass  # đường dẫn public hợp lệ (50 bài đã public dùng kiểu này)
        elif not re.match(r"^https?:", u):
            add("WARN", "BODY-IMG-PATH", f"ảnh không dùng ~/assets/... hoặc file public có thật: {u}")

    links = LINK_RE.findall(body)
    urls = [u for _, u in links]
    ready_links = [u for u in urls if READINESS_RE.match(u)]
    # CTA trong bài = câu hỏi in đậm kết thúc bằng "?" nằm ở ~25% cuối bài, KHÔNG phải mục đánh số kiểu "**1. …?**"
    blines = body.split("\n")
    cut = int(len(blines) * 0.75)
    cta_q = [i for i, l in enumerate(blines)
             if i >= cut and re.match(r"^\*\*(?!\d+[.)]\s)[^*\n]{8,}\?\*\*\s*$", l)]
    for i in cta_q[-1:]:
        near = "\n".join(blines[i + 1:i + 8])
        near_urls = [u for _, u in LINK_RE.findall(near)]
        if ah and ah in near_urls:
            pass
        elif any(u.startswith(("/insights/", "/en/insights/")) for u in near_urls):
            add("WARN", "CTA-BODY-ARTICLE", "CTA trong bài trỏ tới bài viết, không tới assessment (hợp lệ; khối 'Next step' của layout vẫn dẫn tới assessment)")
        elif ah:
            add("FAIL", "CTA-BODY-LINK", f"CTA trong bài có câu hỏi nhưng không có link ngay sau câu hỏi (assessmentHref «{ah}» hoặc bài viết)")
    for u in ready_links:
        if ah and u != ah and READINESS_RE.match(u):
            add("WARN", "CTA-BODY-MISMATCH", f"link assessment trong bài «{u}» khác assessmentHref «{ah}»")
    if [u for u in urls if CONTACT_RE.match(u)] and "Consideration" not in set(stages if isinstance(stages, list) else [stages]):
        add("WARN", "CONTACT-STAGE", "có dòng liên hệ nhưng funnelStage không có Consideration")

    known = set(repo["urls"]) if repo else set()
    if args.known_urls:
        known |= {ln.strip().rstrip("/") for ln in read_text(args.known_urls).splitlines()
                  if ln.strip() and not ln.startswith("#")}
    insight_n = 0
    for u in urls:
        if re.match(r"^(https?:|mailto:|#)", u):
            continue
        if not u.startswith("/"):
            add("FAIL", "LINK-REL", f"link nội bộ phải bắt đầu bằng «/»: {u}")
            continue
        im = INSIGHT_RE.match(u)
        if not im:
            sm = re.match(r"^(/en)?/insights/([a-z0-9-]+)/?$", u)
            if sm and sm.group(2) not in enums["category"] and sm.group(2) != "all":
                add("FAIL", "LINK-NOCAT", f"link /insights/<slug> thiếu category (sẽ 404): {u}")
                continue
        if im:
            insight_n += 1
            if lang == "vi" and im.group(1):
                add("FAIL", "LINK-LANG", f"bài VI không link /en: {u}")
            if lang == "en" and not im.group(1):
                add("FAIL", "LINK-LANG", f"bài EN phải link /en/insights/...: {u}")
            if im.group(2) not in enums["category"]:
                add("FAIL", "LINK-CAT", f"category trong URL không hợp lệ: {u}")
            if known and u.rstrip("/") not in known:
                add("FAIL", "LINK-404", f"URL không có trên site: {u}")
            continue
        rm = READINESS_RE.match(u)
        if rm:
            if rm.group(2) not in ASSESSMENTS:
                add("FAIL", "ASSESS-SLUG", f"assessment không có trên site: {u}")
            if (lang == "en") != bool(rm.group(1)):
                add("FAIL", "LINK-LANG", f"tiền tố /en sai ngôn ngữ: {u}")
            continue
        cm = CONTACT_RE.match(u)
        if cm:
            if (lang == "en") != bool(cm.group(1)):
                add("FAIL", "LINK-LANG", f"tiền tố /en sai ngôn ngữ: {u}")
            continue
        add("WARN", "LINK-FORM", f"link nội bộ ngoài khuôn đã biết: {u}")
    if re.search(r"\*\*(Đọc thêm|Further reading):\*\*", body):
        labels = [l.strip().lower() for l in LABEL_RE.findall(body)]
        bad = [l for l in labels if l not in LABELS.get(lang, set())]
        if bad:
            add("WARN", "LABEL", "nhãn «Đọc thêm» sai: " + ", ".join(sorted(set(bad))))
        if str(fm.get("contentType")) != "Pillar" and labels and "pillar" not in labels:
            add("WARN", "LABEL-PILLAR", "«Đọc thêm» thiếu (pillar)")
        if insight_n < 2:
            add("WARN", "LINK-FEW", f"chỉ {insight_n} link /insights/ (03 §8: tối thiểu pillar + cùng cluster)")

    # repo: slug + cặp dịch
    if repo:
        if not re.match(r"^[a-z0-9]+(-[a-z0-9]+)*$", stem):
            add("WARN", "SLUG-FORM", f"tên file/slug «{stem}» không phải kebab-case chữ thường")
        here = os.path.abspath(os.path.dirname(path)) == repo["dir"]
        if not here and os.path.exists(os.path.join(repo["dir"], stem + ".md")):
            add("FAIL", "SLUG-DUP", f"đã có src/content/insights/{stem}.md")
        tid = fm.get("translationId")
        if tid:
            others = {l for (l, s) in repo["pairs"].get(tid, set()) if s != stem}
            if lang and lang in others:
                add("WARN", "PAIR-DUP", f"translationId «{tid}» đã dùng cho một bài {lang} khác")
            if lang and not (others - {lang}):
                add("WARN", "PAIR-MISSING", f"chưa thấy bản {'EN' if lang == 'vi' else 'VI'} cùng translationId «{tid}»")

    if args.publish:
        if fm.get("draft") is not False:
            add("FAIL", "PUBLISH-DRAFT", "--publish: draft phải là false")
        if has_notes:
            add("FAIL", "PUBLISH-NOTES", "--publish: còn khối EDITABLE:notes")
    elif fm.get("draft") is False and not (repo and os.path.abspath(os.path.dirname(path)) == repo["dir"]):
        add("WARN", "DRAFT-FALSE", "draft: false ở bản làm việc; người duyệt mới là người đổi")
    return res


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("files", nargs="+")
    ap.add_argument("--repo", help="thư mục gốc của repo website (đọc schema, URL, ảnh từ đây)")
    ap.add_argument("--known-urls", help="file URL nội bộ bổ sung (mỗi dòng một URL)")
    ap.add_argument("--publish", action="store_true")
    ap.add_argument("--all", action="store_true", help="in kết quả từng file khi chạy nhiều file")
    args = ap.parse_args()

    repo = load_repo(args.repo) if args.repo else None
    if repo:
        print(f"[repo] {len(repo['urls'])} URL, schema {'có' if repo['schema'] is not None else 'không đọc được'}; "
              f"enum category={len(repo['enums']['category'])}, contentType={len(repo['enums']['contentType'])}, "
              f"funnelStage={len(repo['enums']['funnelStage'])}" + (" | " + "; ".join(repo["notes"]) if repo["notes"] else ""))

    results = {f: check_file(f, args, repo) for f in args.files}
    any_fail = any(k == "FAIL" for r in results.values() for k, _, _ in r)

    if len(args.files) <= 3 or args.all:
        for f, r in results.items():
            if len(args.files) > 1:
                print(f"\n== {f}")
            for kind, code, text in r:
                print(f"{kind}: [{code}] {text}")
            nf, nw = sum(k == "FAIL" for k, _, _ in r), sum(k == "WARN" for k, _, _ in r)
            print(f"-> {'FAIL' if nf else ('PASS (có cảnh báo)' if nw else 'PASS')}  [{nf} lỗi, {nw} cảnh báo]")
    else:
        by_code = defaultdict(list)
        for f, r in results.items():
            for kind, code, text in r:
                by_code[(kind, code)].append((f, text))
        n_fail_files = sum(1 for r in results.values() if any(k == "FAIL" for k, _, _ in r))
        n_clean = sum(1 for r in results.values() if not r)
        print(f"\n{len(args.files)} file: {n_clean} sạch, {n_fail_files} có FAIL, "
              f"{len(args.files) - n_clean - n_fail_files} chỉ có WARN\n")
        for (kind, code), items in sorted(by_code.items(), key=lambda kv: (kv[0][0] != "FAIL", -len(kv[1]))):
            f0, t0 = items[0]
            print(f"{kind:4} {code:<18} {len(items):>4} file | ví dụ: {os.path.basename(f0)}: {t0}")
    print("\nRESULT:", "FAIL" if any_fail else "PASS")
    sys.exit(1 if any_fail else 0)


if __name__ == "__main__":
    main()
