// Chạy trong trang Chromium (có Inter). window.build(fig, li) -> {svg, h, warn}
(function(){
const W=1200,M=60,CW=1080;
const cv=document.createElement('canvas').getContext('2d');
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const mw=(s,sz,w)=>{cv.font=`${w} ${sz}px Inter, 'Inter Variable', sans-serif`;return cv.measureText(s).width};
function wrap(s,sz,w,maxW){const words=String(s).split(' ');const lines=[];let cur='';
 for(const wd of words){const t=cur?cur+' '+wd:wd;if(mw(t,sz,w)<=maxW||!cur)cur=t;else{lines.push(cur);cur=wd}}
 if(cur)lines.push(cur);
 // tránh từ mồ côi ở dòng cuối: nếu dòng cuối 1 từ ngắn và có >1 dòng, kéo 1 từ xuống
 if(lines.length>1){const l=lines[lines.length-1];if(!l.includes(' ')&&l.length<=4){const p=lines[lines.length-2].split(' ');if(p.length>2){const mv=p.pop();const nl=mv+' '+l;if(mw(nl,sz,w)<=maxW){lines[lines.length-2]=p.join(' ');lines[lines.length-1]=nl}}}}
 return lines}
const T=(x,y,s,sz,w,cls,anchor)=>`<text x="${x}" y="${y}" font-size="${sz}" font-weight="${w}" class="${cls}"${anchor?` text-anchor="${anchor}"`:''}>${esc(s)}</text>`;
const PAD=22;
// Item: {tag,text,sub,list,style,sz}
function measure(it,w){const iw=w-2*PAD;let h=PAD;const o={};
 if(it.tag){h+=18+8}
 const sz=it.sz||22;o.tl=it.text?wrap(it.text,sz,600,iw):[];h+=o.tl.length*Math.round(sz*1.3);
 o.sl=it.sub?wrap(it.sub,17,400,iw):[];if(o.sl.length){h+=(o.tl.length?8:0)+o.sl.length*24}
 o.ll=(it.list||[]).map(s=>wrap(s,17,400,iw-18));if(o.ll.length){h+=10+o.ll.reduce((a,l)=>a+l.length*24+6,0)}
 h+=PAD;o.h=Math.max(h,it.minH||0);o.sz=sz;return o}
const cls=s=>({blue:'bb',purple:'bp',grey:'bg',ink:'bi'}[s||'grey']);
const tcls=(s,k)=>({blue:'tx',purple:'tp',grey:'tx',ink:'ti'}[s||'grey']);
function draw(it,m,x,y,w,h){let o=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" class="${cls(it.style)}"/>`;let cy=y+PAD;
 const tc=tcls(it.style);const mc=it.style==='ink'?'ti':'mut';
 if(it.tag){o+=T(x+PAD,cy+13,it.tag,13,600,mc==='ti'?'ti':(it.style==='purple'?'tp':'mut'));cy+=26}
 const sz=m.sz,lh=Math.round(sz*1.3);
 m.tl.forEach(l=>{o+=T(x+PAD,cy+sz,l,sz,600,tc);cy+=lh});
 if(m.sl.length){cy+=m.tl.length?8:0;m.sl.forEach(l=>{o+=T(x+PAD,cy+17,l,17,400,it.style==='ink'?'ti':'mut');cy+=24})}
 if(m.ll.length){cy+=10;m.ll.forEach(ls=>{o+=`<circle cx="${x+PAD+4}" cy="${cy+12}" r="3" class="dot"/>`;ls.forEach((l,i)=>{o+=T(x+PAD+18,cy+17,l,17,400,'mut');cy+=24});cy+=6})}
 return o}
const arrowR=(x1,x2,y)=>`<line x1="${x1}" y1="${y}" x2="${x2-12}" y2="${y}" class="ar" stroke-width="3" stroke-dasharray="6 6"/><path d="M${x2-14} ${y-9} l14 9 l-14 9z" class="arf"/>`;
const arrowD=(x,y1,y2)=>`<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2-12}" class="ar" stroke-width="3" stroke-dasharray="6 6"/><path d="M${x-9} ${y2-14} l9 14 l9 -14z" class="arf"/>`;
// Hàng item ngang: items với trọng số fx, khoảng cách gap; trả {svg,h,boxes}
function rowOf(items,x0,y,tw,gap,opt={}){const fx=items.map(i=>i.fx||1),sum=fx.reduce((a,b)=>a+b,0);const avail=tw-gap*(items.length-1);
 const ws=fx.map(f=>avail*f/sum);const ms=items.map((it,i)=>measure(it,ws[i]));const h=Math.max(...ms.map(m=>m.h));
 let x=x0,svg='',boxes=[];items.forEach((it,i)=>{svg+=draw(it,ms[i],x,y,ws[i],h);boxes.push({x,w:ws[i]});x+=ws[i]+gap});return {svg,h,boxes}}
function grid(items,cols,y,gap){let svg='',cy=y;for(let i=0;i<items.length;i+=cols){const r=rowOf(items.slice(i,i+cols),M,cy,CW,gap);svg+=r.svg;cy+=r.h+gap}return {svg,h:cy-y-gap}}
function body(f,li){const d=f.data,t=f.tpl;let y=0,svg='';const g=d.gap||20;
 const pick=v=>Array.isArray(v)?v[li]:v;
 const L=it=>{const o={};for(const k in it)o[k]=(k==='list')?(it.list.map?it.list.map(pick):pick(it.list)):(k==='style'||k==='fx'||k==='sz'||k==='minH'?it[k]:pick(it[k]));return o};
 if(t==='cols2'){const mid=d.arrow?64:g;const its=d.items.map(L);const ws=(CW-mid)/2;const m=its.map(i=>measure(i,ws));const h=Math.max(...m.map(a=>a.h));
  svg+=draw(its[0],m[0],M,0,ws,h)+draw(its[1],m[1],M+ws+mid,0,ws,h);
  if(d.arrow)svg+=d.arrow==='neq'?T(M+ws+mid/2,h/2+12,'≠',40,700,'tp','middle'):arrowR(M+ws+10,M+ws+mid-10,h/2);y=h}
 else if(t==='cards'){const r=grid(d.items.map(L),d.cols||3,0,g);svg+=r.svg;y=r.h}
 else if(t==='stack'){d.items.map(L).forEach((it,i,a)=>{const m=measure(it,CW);svg+=draw(it,m,M,y,CW,m.h);y+=m.h;if(i<a.length-1){if(d.arrows){svg+=arrowD(W/2,y+4,y+g+16);y+=g+20}else y+=g}})}
 else if(t==='flow'){const its=d.items.map(L);const per=d.perRow||its.length;const ag=d.arrowGap||50;let rows=[];
  for(let i=0;i<its.length;i+=per)rows.push(its.slice(i,i+per));let prev=null;
  rows.forEach((rw,ri)=>{const r=rowOf(rw,M,y,CW,ag,{});svg+=r.svg;
   r.boxes.forEach((b,i)=>{if(i<rw.length-1&&!rw[i].noArrow)svg+=arrowR(b.x+b.w+6,r.boxes[i+1].x-6,y+r.h/2)});
   if(prev){const a=prev.boxes[prev.boxes.length-1],b0=r.boxes[0];const ax=a.x+a.w/2,bx=b0.x+b0.w/2,ym=prev.y+prev.h+(y-prev.y-prev.h)/2;
    svg+=`<path d="M${ax} ${prev.y+prev.h+4} V${ym} H${bx} V${y-14}" class="ar" fill="none" stroke-width="3" stroke-dasharray="6 6"/><path d="M${bx-9} ${y-14} l9 14 l9 -14z" class="arf"/>`}
   prev={boxes:r.boxes,y,h:r.h};y+=r.h+(ri<rows.length-1?(d.rowGap||56):0)})}
 else if(t==='table'){const cols=d.cols.length;const fr=d.widths||d.cols.map(()=>1);const sum=fr.reduce((a,b)=>a+b,0);const gp=14;const avail=CW-gp*(cols-1);const ws=fr.map(f=>avail*f/sum);
  // header
  let x=M;d.cols.forEach((c,i)=>{const s=pick(c);if(s)svg+=T(x+4,16,s,14,700,'mut');x+=ws[i]+gp});y=34;
  d.rows.forEach(r=>{const cells=r.map((c,i)=>{const o=L(typeof c==='string'?{text:c}:c);if(i===0&&!o.style)o.style='grey';return o});
   const ms=cells.map((c,i)=>{if(i===0)c.sz=c.sz||19;else c.sz=c.sz||19;return measure(c,ws[i])});const h=Math.max(...ms.map(m=>m.h));
   let cx=M;cells.forEach((c,i)=>{svg+=draw(c,ms[i],cx,y,ws[i],h);cx+=ws[i]+gp});y+=h+gp});y-=gp}
 else if(t==='lanes'){const lw=d.labelW??230;d.rows.forEach((rw,ri)=>{const its=rw.items.map(L);const r=rowOf(its,M+lw,y,CW-lw,rw.gap??46);
   if(rw.label)svg+=T(M,y+r.h/2+6,pick(rw.label),18,700,'tx');svg+=r.svg;
   r.boxes.forEach((b,i)=>{if(i<its.length-1&&rw.arrows!==false)svg+=arrowR(b.x+b.w+4,r.boxes[i+1].x-4,y+r.h/2)});y+=r.h+(d.rowGap||26)});y-=(d.rowGap||26)}
 // chips
 if(d.chips){y+=28;const lab=pick(d.chips.label);svg+=T(M,y+16,lab,15,600,'mut');let x=M+mw(lab,15,600)+20;d.chips.items.forEach(c=>{const s=pick(c);const w=mw(s,17,600)+36;svg+=`<rect x="${x}" y="${y-4}" width="${w}" height="34" rx="17" class="bg"/>`+T(x+18,y+19,s,17,600,'tx');x+=w+12});y+=34}
 if(d.need){y+=28;const n=L(d.need);n.sz=n.sz||22;if(!n.style)n.style='ink';const m=measure(n,CW);svg+=draw(n,m,M,y,CW,m.h);y+=m.h}
 return {svg,h:y}}
window.build=function(f,li){const warn=[];const pick=v=>Array.isArray(v)?v[li]:v;let top=44,out='';
 if(f.illus){const s=li?'ILLUSTRATIVE SCENARIO':'TÌNH HUỐNG MINH HỌA';const w=mw(s,13,700)+28;out+=`<rect x="${M}" y="26" width="${w}" height="26" rx="13" class="chip"/>`+T(M+14,44,s,13,700,'tp');top=76}
 const tl=wrap(pick(f.title),32,700,CW);tl.forEach((l,i)=>out+=T(M,top+30+i*40,l,32,700,'hd'));let y=top+30+(tl.length-1)*40;
 if(pick(f.title).length>(li?62:60))warn.push('title dài '+pick(f.title).length);
 if(f.sub){const sl=wrap(pick(f.sub),18,400,CW);sl.forEach((l,i)=>out+=T(M,y+34+i*26,l,18,400,'mut'));y+=34+(sl.length-1)*26}
 const bodyTop=y+34;const b=body(f,li);let foot=[];
 if(f.illus)foot.push(li?'Illustrative scenario, not a real case or measured data.':'Tình huống minh họa, không phải trường hợp thực tế hay số liệu đo được.');
 (f.footer||[]).forEach(s=>foot.push(pick(s)));
 const fl=[];foot.forEach(s=>wrap(s,13,400,CW).forEach(l=>fl.push(l)));
 let total=bodyTop+b.h+(fl.length?28+fl.length*20:0)+34;let off=0;if(total<480){off=(480-total)*0.3;total=480}
 const gtop=bodyTop+off;
 let fy=bodyTop+off+b.h+34;
 let h=Math.ceil(total);if(h>780)warn.push('cao '+h+'>780');
 const fsv=fl.map((l,i)=>T(M,fy+i*20,l,13,400,'mut')).join('');
 const alt=pick(f.alt);
 const css=`.bgr{fill:#fff}.hd{fill:#08090a}.tx{fill:#1f2937}.mut{fill:#5b6472}.tp{fill:#6d28d9}.ti{fill:#fff}.dot{fill:#0161ef}.bb{fill:#eef4ff;stroke:#0161ef;stroke-width:2}.bp{fill:#f3ecff;stroke:#6d28d9;stroke-width:2;stroke-dasharray:8 6}.bg{fill:#f1f4f9;stroke:#c9d6ee;stroke-width:2}.bi{fill:#08090a}.chip{fill:#f3ecff;stroke:#6d28d9;stroke-width:1.5}.ar{stroke:#6d28d9}.arf{fill:#6d28d9}@media (prefers-color-scheme:dark){.bgr{fill:#08090a}.hd{fill:#f7f8f8}.tx{fill:#e5ecf6}.mut{fill:#9aa6b8}.tp{fill:#a78bfa}.ti{fill:#08090a}.dot{fill:#6ea8ff}.bb{fill:#0c1d3f;stroke:#3b82f6}.bp{fill:#1b1433;stroke:#a78bfa}.bg{fill:#14171c;stroke:#2d343d}.bi{fill:#f7f8f8}.chip{fill:#1b1433;stroke:#a78bfa}.ar{stroke:#a78bfa}.arf{fill:#a78bfa}}`;
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${h}" width="${W}" height="${h}" role="img" aria-label="${esc(alt)}" font-family="Inter, 'Inter Variable', system-ui, sans-serif"><style>${css}</style><rect width="${W}" height="${h}" class="bgr"/>${out}<g transform="translate(0 ${gtop})">${b.svg}</g>${fsv}</svg>`;
 return {svg,h,warn}}
})();
