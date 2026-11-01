#!/usr/bin/env node
// Tạo cover 1200x630 cho bài trending từ spec.json. Dùng:  node tools/covers/gen_covers.js [--out <dir>]
// Chỉ ghi PNG vào <dir>/<slug>/tr-NN-og-cover-<lang>.png (mặc định: src/assets/images/insights).
// Không sửa file nào khác. In cảnh báo nếu chữ tràn.
import fs from 'fs';
import path from 'path';
import os from 'os';
import {chromium} from 'playwright';
import {fileURLToPath} from 'url';
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
const P='#0161ef',A='#6d28d9',TX='#08090a',MUT='#5b6472',BL='#eef4ff',PU='#f3ecff',GR='#f1f4f9',GL='#c9d6ee';
const e=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const T=(x,y,s,sz,w,f,extra='')=>`<text x="${x}" y="${y}" font-size="${sz}" font-weight="${w}" fill="${f}" ${extra}>${e(s)}</text>`;
const tag=(x,y,s)=>T(x,y,s,13,600,MUT,'letter-spacing="1.2"');
const box=(x,y,w,h,kind)=>{const k={blue:[BL,P,''],purple:[PU,A,'stroke-dasharray="8 6"'],grey:[GR,GL,'']}[kind];return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="${k[0]}" stroke="${k[1]}" stroke-width="2" ${k[2]}/>`};
const arrow=(x1,x2,y)=>`<line x1="${x1}" y1="${y}" x2="${x2-14}" y2="${y}" stroke="${A}" stroke-width="3" stroke-dasharray="6 6"/><path d="M${x2-16} ${y-10} l16 10 l-16 10z" fill="${A}"/>`;
const motifs={
 layers:d=>d.rows.map((r,i)=>{const y=340+i*80,k=i==0?'blue':'purple';return box(60,y,1080,68,k)+tag(84,y+26,r[0])+T(84,y+54,r[1],24,600,i==0?TX:A)}).join(''),
 chat:d=>{let o='';[60,330,600].forEach((x,i)=>{o+=box(x,380,240,96,'blue')+tag(x+24,418,`${d.tag} ${i+1}`)+T(x+24,452,d.bubbles[i],24,600,TX)});
  o+=arrow(850,921,428)+box(935,372,205,112,'purple');d.dest.forEach((l,i)=>o+=T(957,420+i*30,l,22,600,A));return o},
 pair:d=>box(60,370,520,130,'blue')+tag(84,408,d.a[0])+T(84,452,d.a[1],34,700,TX)+box(620,370,520,130,'purple')+tag(644,408,d.b[0])+T(644,452,d.b[1],34,700,A),
 flow2:d=>box(60,370,500,130,'blue')+tag(84,408,d.a[0])+T(84,452,d.a[1],26,700,TX)+arrow(580,650,435)+box(660,370,480,130,'purple')+tag(684,408,d.b[0])+T(684,452,d.b[1],26,700,A),
 flow3:d=>{let o='';const xs=[60,440,820],ks=['grey','blue','purple'],fc=[TX,TX,A];xs.forEach((x,i)=>{o+=box(x,370,320,130,ks[i])+tag(x+24,408,d.steps[i][0])+T(x+24,456,d.steps[i][1],26,700,fc[i])});return o+arrow(388,436,435)+arrow(768,816,435)},
 parallel:d=>box(60,370,340,130,'blue')+tag(84,408,d.a[0])+T(84,452,d.a[1],28,700,TX)+box(800,370,340,130,'blue')+tag(824,408,d.b[0])+T(824,452,d.b[1],28,700,TX)+box(440,370,320,130,'purple')+d.mid.map((l,i)=>T(470,426+i*34,l,28,700,A)).join('')+`<line x1="400" y1="435" x2="440" y2="435" stroke="${A}" stroke-width="3" stroke-dasharray="6 6"/><line x1="760" y1="435" x2="800" y2="435" stroke="${A}" stroke-width="3" stroke-dasharray="6 6"/>`,
 bars:d=>tag(60,372,d.a[0])+`<rect x="60" y="388" width="1080" height="64" rx="14" fill="${BL}" stroke="${P}" stroke-width="2"/><rect x="60" y="388" width="1080" height="10" rx="5" fill="${P}"/>`+T(84,428,d.a[1],22,600,TX)+tag(60,492,d.b[0])+`<rect x="60" y="508" width="1080" height="64" rx="14" fill="${PU}" stroke="${A}" stroke-width="2" stroke-dasharray="10 7"/>`+T(84,547,d.b[1],22,600,A)
};
function svg(m,d){const t=d.title.map((l,i)=>T(60,125+i*72,l,62,700,TX,'data-w="1"')).join('');const y=125+d.title.length*72-10;
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630" font-family="Inter, 'Inter Variable', sans-serif" role="img" aria-label="${e(d.alt)}"><rect width="1200" height="630" fill="#fff"/>${t}${T(60,y+22,d.sub,24,400,MUT)}${motifs[m](d)}${T(60,606,'okelas.com',16,400,MUT)}</svg>`}
function fontCss(){try{const p=path.resolve(process.cwd(),'node_modules/@fontsource-variable/inter/index.css');let c=fs.readFileSync(p,'utf8');const dir=path.dirname(p);return c.replace(/url\(\.\/([^)]+)\)/g,(_,f)=>`url(file://${path.join(dir,f)})`)}catch(_){return ''}}
(async()=>{
 const oi=process.argv.indexOf('--out');const out=oi>0?process.argv[oi+1]:'src/assets/images/insights';
 const spec=JSON.parse(fs.readFileSync(path.join(__dirname,'spec.json'),'utf8'));
 const css=fontCss();console.log(css?'Font: @fontsource-variable/inter':'Font: system Inter (không thấy @fontsource-variable/inter)');
 const b=await chromium.launch();const pg=await b.newPage({viewport:{width:1200,height:630}});const warn=[];const made=[];
 for(const s of spec)for(const lang of ['vi','en']){const d=s[lang];const html=`<html><head><style>${css}body{margin:0}</style></head><body>${svg(s.motif,d)}</body></html>`;
  const f=path.join(os.tmpdir(),`cov-${s.n}-${lang}.html`);fs.writeFileSync(f,html);await pg.goto('file://'+f);await pg.evaluate(()=>document.fonts.ready);
  const over=await pg.evaluate(()=>[...document.querySelectorAll('text')].map(t=>{const b=t.getBBox();return {t:t.textContent,r:b.x+b.width}}).filter(o=>o.r>1140).map(o=>`${o.t} (${Math.round(o.r)})`));
  if(over.length)warn.push(`${s.n}-${lang}: ${over.join(' | ')}`);
  const dir=path.join(out,d.slug);fs.mkdirSync(dir,{recursive:true});const file=path.join(dir,`tr-${s.n}-og-cover-${lang}.png`);await pg.screenshot({path:file});made.push(file)}
 await b.close();console.log(made.join('\n'));console.log(warn.length?'TRÀN CHỮ:\n'+warn.join('\n'):'Không có chữ tràn (>1140px).')})();
