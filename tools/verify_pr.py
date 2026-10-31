#!/usr/bin/env python3
"""Kiểm tra độc lập PR sửa bài: so thư mục làm việc với (1) base (origin/main) và (2) commit đã duyệt (mặc định cd37d89).

Dùng:  python3 tools/verify_pr.py [--approved cd37d89]

Kỳ vọng sau khi sửa đúng:
  - file khác bản đã duyệt (ngữ nghĩa): 0
  - ctaPrimaryText 87, ctaSubtitle 11, assessmentHref 1; không field nào khác
  - 96 file bài khác base; mỗi bài ít dòng thay đổi (định dạng gốc được giữ)
"""
import argparse, collections, re, subprocess, sys

try:
    import yaml
except ImportError:
    sys.exit("Cần PyYAML: pip install pyyaml --break-system-packages")

ap = argparse.ArgumentParser()
ap.add_argument("--approved", default="cd37d89")
ap.add_argument("--dir", default="src/content/insights")
args = ap.parse_args()


def sh(*a):
    return subprocess.run(list(a), capture_output=True, text=True).stdout


def split(t):
    t = t.lstrip("﻿")
    m = re.match(r"---\n(.*?)\n---\n", t, re.S)
    return (yaml.safe_load(m.group(1)) if m else {}), (t[m.end():] if m else t)


base = sh("git", "merge-base", "origin/main", "HEAD").strip()
tracked = sh("git", "ls-files", args.dir).split()
changed = []
for f in tracked:
    new = open(f, encoding="utf-8").read()
    if new != sh("git", "show", f"{base}:{f}"):
        changed.append(f)

diff_approved, fields, other = [], collections.Counter(), []
for f in changed:
    nfm, nbody = split(open(f, encoding="utf-8").read())
    afm, abody = split(sh("git", "show", f"{args.approved}:{f}"))
    bfm, bbody = split(sh("git", "show", f"{base}:{f}"))
    if nfm != afm or nbody != abody:
        diff_approved.append(f)
    for k in set(bfm) | set(nfm):
        if bfm.get(k) != nfm.get(k):
            fields[k] += 1
            if k not in ("ctaPrimaryText", "ctaSubtitle", "assessmentHref"):
                other.append((f, k))

print(f"file bài khác base: {len(changed)}   (kỳ vọng 96)")
print(f"file khác bản đã duyệt {args.approved} (ngữ nghĩa): {len(diff_approved)}   (kỳ vọng 0)")
for f in diff_approved[:10]:
    print("   ", f)
print(f"field đổi giá trị so với base: {dict(fields)}   (kỳ vọng ctaPrimaryText 87, ctaSubtitle 11, assessmentHref 1)")
print(f"đổi ngoài 3 field CTA: {len(other)}   (kỳ vọng 0)", other[:5])

# dòng thay đổi trên mỗi bài so với base
ns = sh("git", "diff", "--numstat", base, "--", args.dir).split("\n")
rows = [l.split("\t") for l in ns if l.strip()]
# git diff không gồm file chưa commit nếu so với HEAD; dùng working tree: so với base trực tiếp
rows = []
for f in changed:
    out = sh("git", "diff", "--no-index", "--numstat", "/dev/null", f)  # placeholder to keep structure
    break
wt = sh("git", "diff", "--numstat", base, "--", args.dir)
rows = [l.split("\t") for l in wt.split("\n") if l.strip()]
if rows:
    add = sum(int(r[0]) for r in rows); dele = sum(int(r[1]) for r in rows)
    print(f"tổng dòng so với base (cây làm việc): +{add} -{dele} trên {len(rows)} file; TB xóa/bài {dele/len(rows):.1f}   (kỳ vọng ~2-6)")
    rows.sort(key=lambda r: -int(r[1]))
    for r in rows[:5]:
        print(f"   +{r[0]} -{r[1]}  {r[2]}")

# mẫu để đối chiếu mắt
for s in ["ai-readiness-doanh-nghiep", "evidence-based-ai-kiem-chung", "ai-iso-gmp-compliance",
          "tai-sao-du-an-erp-that-bai", "workflow-co-can-ai-agent", "rag-limitations-enterprise-ai"]:
    path = f"{args.dir}/{s}.md"
    try:
        t = open(path, encoding="utf-8").read()
    except FileNotFoundError:
        continue
    print(f"\n[{s}]")
    for l in t.splitlines()[:45]:
        if re.match(r"(assessmentHref|ctaPrimaryText|ctaSubtitle):", l):
            print("  ", l)
