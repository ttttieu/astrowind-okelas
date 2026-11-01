#!/usr/bin/env python3
"""Đặt image / coverImage / ogImage / coverImageAlt cho 16 bài trending từ tools/covers/spec.json.
Sửa từng dòng tại chỗ (không dump YAML), giữ nguyên BOM/xuống dòng. Chạy lại nhiều lần vẫn cho cùng kết quả.
Dùng: python3 tools/covers/apply_frontmatter.py [--dry]"""
import json, re, sys, pathlib
dry = "--dry" in sys.argv
spec = json.load(open("tools/covers/spec.json", encoding="utf-8"))
KEYS = ("image", "coverImage", "ogImage", "coverImageAlt")
changed = 0
for s in spec:
    for lang in ("vi", "en"):
        d = s[lang]; p = pathlib.Path(f"src/content/insights/{d['slug']}.md")
        if not p.exists(): sys.exit(f"THIẾU FILE BÀI: {p}")
        raw = p.read_bytes().decode("utf-8"); nl = "\r\n" if "\r\n" in raw else "\n"
        lines = raw.split(nl)
        if not re.match(r"^﻿?---\s*$", lines[0]): sys.exit(f"{p}: không có frontmatter")
        end = next(i for i in range(1, len(lines)) if lines[i].strip() == "---")
        fm = lines[1:end]
        if not any(re.match(r"lang:\s*" + lang + r"\s*$", l) for l in fm): sys.exit(f"{p}: lang không phải {lang}")
        if not any(re.match(r"category:\s*trending\s*$", l) for l in fm): sys.exit(f"{p}: category không phải trending")
        img = f"~/assets/images/insights/{d['slug']}/tr-{s['n']}-og-cover-{lang}.png"
        alt = d["alt"].replace("\\", "\\\\").replace('"', '\\"')
        new = {"image": f"image: '{img}'", "coverImage": f"coverImage: '{img}'", "ogImage": f"ogImage: '{img}'", "coverImageAlt": f'coverImageAlt: "{alt}"'}
        # xóa dòng cũ (giữ vị trí dòng đầu tiên gặp), chèn khối mới
        pos = None; out = []
        for l in fm:
            m = re.match(r"(image|coverImage|ogImage|coverImageAlt):", l)
            if m:
                if pos is None: pos = len(out)
                continue
            out.append(l)
        if pos is None:
            pos = next((i + 1 for i, l in enumerate(out) if l.startswith("publishDate:")), len(out))
        out[pos:pos] = [new[k] for k in KEYS]
        res = lines[:1] + out + lines[end:]
        txt = nl.join(res)
        if txt != raw:
            changed += 1
            if not dry: p.write_bytes(txt.encode("utf-8"))
        print(("[dry] " if dry else "") + ("sửa  " if txt != raw else "giữ  ") + p.name)
print(f"{changed}/16 file thay đổi")
