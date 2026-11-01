#!/usr/bin/env python3
"""Chèn hình thân bài trending vào 16 bài. Idempotent (bỏ qua nếu file hình đã có trong bài).
Dùng: python3 tools/figures/insert_figures.py [--content src/content/insights] [--dry-run]
Đọc spec từ figures.spec.js (qua node). Không sửa gì khác ngoài việc chèn khối ảnh + caption.
"""
import json,subprocess,sys,os,io
args=sys.argv[1:];dry='--dry-run' in args
content=args[args.index('--content')+1] if '--content' in args else 'src/content/insights'
here=os.path.dirname(os.path.abspath(__file__))
spec=json.loads(subprocess.check_output(['node','-e',f"console.log(JSON.stringify(require('{here}/figures.spec.cjs')))"]))
ok=skip=miss=0;report=[]
for f in spec:
    for li,lang in enumerate(['vi','en']):
        if not f['anchor'][lang]:report.append(f"SKIP-BY-SPEC {f['id']}-{lang} (không có chỗ chèn)");continue
        slug=f['slug'][lang];path=os.path.join(content,slug+'.md')
        fn=f"{f['id']}-{lang}.svg"
        if not os.path.exists(path):report.append(f'MISS-FILE {path}');miss+=1;continue
        raw=open(path,'rb').read();nl='\r\n' if b'\r\n' in raw else '\n'
        txt=raw.decode('utf-8');bom=txt.startswith('﻿')
        lines=txt.replace('\r\n','\n').split('\n')
        if any(fn in l for l in lines):report.append(f'SKIP (đã có) {slug} {fn}');skip+=1;continue
        a=f['anchor'][lang];idx=[i for i,l in enumerate(lines) if l.lstrip('﻿').startswith(a['match'])]
        if len(idx)!=1:report.append(f'MISS-ANCHOR {slug} {fn}: "{a["match"]}" khớp {len(idx)} dòng');miss+=1;continue
        i=idx[0];img=f"![{f['alt'][li]}](~/assets/images/insights/{slug}/{fn})";cap=f"*{f['cap'][li]}*"
        if a['mode']=='after':lines[i+1:i+1]=['',img,'',cap]
        else:lines[i:i]=[img,'',cap,'']
        if not dry:
            out='\n'.join(lines).replace('\n',nl)
            open(path,'wb').write(out.encode('utf-8'))
        report.append(f"OK {a['mode']} {slug} {fn} @dòng {i+1}");ok+=1
print('\n'.join(report));print(f'Tổng: chèn {ok}, bỏ qua {skip}, lỗi {miss}'+(' (dry-run)' if dry else ''))
sys.exit(1 if miss else 0)
