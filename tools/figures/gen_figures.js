#!/usr/bin/env node
// Dùng: node tools/figures/gen_figures.js [--out <dir>] [--preview <dir>]
// Ghi SVG vào <out>/<slug>/<id>-{vi,en}.svg (mặc định src/assets/images/insights). Với --preview còn ghi PNG sáng/tối để kiểm tra.
import fs from 'fs';
import path from 'path';
import os from 'os';
import {chromium} from 'playwright';
import {fileURLToPath} from 'url';
import {createRequire} from 'module';
const require=createRequire(import.meta.url);
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
const specs=require('./figures.spec.cjs');
function fontCss(){try{const p=path.resolve(process.cwd(),'node_modules/@fontsource-variable/inter/index.css');let c=fs.readFileSync(p,'utf8');const d=path.dirname(p);return c.replace(/url\(\.\/([^)]+)\)/g,(_,f)=>`url(file://${path.join(d,f)})`)}catch(_){return ''}}
(async()=>{
 const a=process.argv,oi=a.indexOf('--out'),pi=a.indexOf('--preview');const out=oi>0?a[oi+1]:'src/assets/images/insights';const prev=pi>0?a[pi+1]:null;
 const css=fontCss();console.log(css?'Font: @fontsource-variable/inter':'CẢNH BÁO: không thấy @fontsource-variable/inter');
 const b=await chromium.launch();const pg=await b.newPage({viewport:{width:1200,height:800}});
 const html=`<html><head><style>${css}body{margin:0;font-family:Inter,'Inter Variable',sans-serif}</style></head><body></body></html>`;
 const hf=path.join(os.tmpdir(),'figs.html');fs.writeFileSync(hf,html);await pg.goto('file://'+hf);await pg.addScriptTag({content:fs.readFileSync(path.join(__dirname,'builder.js'),'utf8')});
 await pg.evaluate(()=>Promise.all([document.fonts.load('600 20px Inter'),document.fonts.load('700 32px Inter'),document.fonts.load('400 17px Inter')]));
 const made=[],warns=[];
 for(const f of specs)for(const li of [0,1]){const lang=li?'en':'vi';if(!f.anchor[lang])continue;
  const r=await pg.evaluate(([f,li])=>window.build(f,li),[f,li]);
  const dir=path.join(out,f.slug[lang]);fs.mkdirSync(dir,{recursive:true});const file=path.join(dir,`${f.id}-${lang}.svg`);fs.writeFileSync(file,r.svg+'\n');made.push(file);
  // kiểm tra tràn chữ
  await pg.setContent(`<html><head><style>${css}body{margin:0}</style></head><body>${r.svg}</body></html>`);await pg.evaluate(()=>document.fonts.ready);
  const over=await pg.evaluate(()=>[...document.querySelectorAll('text')].map(t=>{const b=t.getBBox();return {t:t.textContent,r:b.x+b.width}}).filter(o=>o.r>1142).map(o=>o.t.slice(0,30)+' '+Math.round(o.r)));
  if(over.length)r.warn.push('tràn: '+over.join(' | '));
  if(r.warn.length)warns.push(`${f.id}-${lang}: ${r.warn.join('; ')}`);
  if(prev){fs.mkdirSync(prev,{recursive:true});await pg.setViewportSize({width:1200,height:r.h});
   await pg.screenshot({path:path.join(prev,`${f.id}-${lang}-light.png`)});
   await pg.emulateMedia({colorScheme:'dark'});await pg.screenshot({path:path.join(prev,`${f.id}-${lang}-dark.png`)});await pg.emulateMedia({colorScheme:'light'})}}
 await b.close();console.log(`Đã tạo ${made.length} SVG`);console.log(warns.length?'CẢNH BÁO:\n'+warns.join('\n'):'Không cảnh báo.')})();
