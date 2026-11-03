/* ================= ARTE DIPINTA — capitolo 1, notte alle 3 =================
   Fondali ridisegnati con profondità, luci calde, contorni a mano e dettagli.
   Le posizioni degli oggetti restano quelle dei punti cliccabili. */
(()=>{ if (!window.ADV) return;
const S=(seed)=>{ let s=seed>>>0||1; return ()=>((s=Math.imul(s^s>>>15,1|s)+0x6D2B79F5|0, ((s^s>>>14)>>>0)/4294967296)); };
const OL='#1e1410';             // colore del contorno
const ln=(w=1.6)=>`stroke="${OL}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const wob=(pts,rnd,a=1.2,close=true)=>{ return 'M'+pts.map(([x,y],i)=>`${(x+(rnd()-.5)*a).toFixed(1)} ${(y+(rnd()-.5)*a).toFixed(1)}`).join(' L')+(close?'Z':''); };
const box=(x,y,w,h,rnd,a)=>wob([[x,y],[x+w,y],[x+w,y+h],[x,y+h]],rnd,a);
const F_=()=>(window.AV&&AV.st&&AV.st.f)||{};
const it=()=>LANG==='it';

/* ---- kit ---- */
function defs(){ return `<defs>
 <linearGradient id="a_night" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1030"/><stop offset=".55" stop-color="#1d2a5a"/><stop offset="1" stop-color="#3b3f73"/></linearGradient>
 <radialGradient id="a_moon" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fffbe6"/><stop offset=".55" stop-color="#fff2b8" stop-opacity=".9"/><stop offset="1" stop-color="#fff2b8" stop-opacity="0"/></radialGradient>
 <radialGradient id="a_glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd27a" stop-opacity=".75"/><stop offset=".4" stop-color="#ffb347" stop-opacity=".28"/><stop offset="1" stop-color="#ff9a3c" stop-opacity="0"/></radialGradient>
 <radialGradient id="a_glowW" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff6d8" stop-opacity=".55"/><stop offset="1" stop-color="#fff6d8" stop-opacity="0"/></radialGradient>
 <linearGradient id="a_cone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe7a8" stop-opacity=".45"/><stop offset="1" stop-color="#ffe7a8" stop-opacity="0"/></linearGradient>
 <linearGradient id="a_sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b3a6b"/><stop offset="1" stop-color="#0c1d3d"/></linearGradient>
 <linearGradient id="a_shadeDown" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></linearGradient>
 <linearGradient id="a_shadeUp" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></linearGradient>
 <linearGradient id="a_wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6b4226"/><stop offset="1" stop-color="#3e2414"/></linearGradient>
 <linearGradient id="a_glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffd98a"/><stop offset="1" stop-color="#e08a2c"/></linearGradient>
 <linearGradient id="a_glassDark" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2c3a6a"/><stop offset="1" stop-color="#141c3a"/></linearGradient>
 <radialGradient id="a_vign" cx=".5" cy=".45" r=".7"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient>
 <pattern id="a_brick" width="24" height="12" patternUnits="userSpaceOnUse"><rect width="24" height="12" fill="none"/><path d="M0 0.5 H24 M0 6.5 H24 M6 0.5 V6.5 M18 6.5 V12" stroke="#000" stroke-opacity=".28" stroke-width="1"/></pattern>
 <pattern id="a_planks" width="40" height="300" patternUnits="userSpaceOnUse"><path d="M0.5 0 V300" stroke="#000" stroke-opacity=".35"/><path d="M12 40 q4 6 0 12 M28 120 q-4 6 0 12 M18 210 q3 5 0 10" stroke="#000" stroke-opacity=".18" fill="none"/></pattern>
 <pattern id="a_paper" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M15 4 q4 6 0 11 q-4 -5 0 -11Z M0 22 q3 4 0 8 M30 22 q-3 4 0 8" fill="#000" fill-opacity=".07" stroke="none"/></pattern>
</defs>`; }
function stars(rnd,n=40,h=140){ let o=''; for(let i=0;i<n;i++){ const x=rnd()*480, y=rnd()*h, r=rnd()<.15?1.3:.7; o+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="#fff" opacity="${(.4+rnd()*.6).toFixed(2)}" class="${rnd()<.3?'twk':''}"/>`; } return o; }
function moon(x,y,r){ return `<circle cx="${x}" cy="${y}" r="${r*3}" fill="url(#a_moon)" opacity=".35"/><circle cx="${x}" cy="${y}" r="${r}" fill="#fff4cf"/><circle cx="${x+r*.3}" cy="${y-r*.2}" r="${r*.22}" fill="#e9d9a4" opacity=".6"/><circle cx="${x-r*.35}" cy="${y+r*.3}" r="${r*.15}" fill="#e9d9a4" opacity=".6"/>`; }
function clouds(rnd,n,y0,y1,col='#2d3a6e'){ let o=''; for(let i=0;i<n;i++){ const x=rnd()*520-20, y=y0+rnd()*(y1-y0), w=40+rnd()*60; o+=`<g opacity=".55" class="drift"><ellipse cx="${x}" cy="${y}" rx="${w}" ry="${w*.18}" fill="${col}"/><ellipse cx="${x+w*.3}" cy="${y-5}" rx="${w*.45}" ry="${w*.15}" fill="${col}"/></g>`; } return o; }
function glow(x,y,r,o=1){ return `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#a_glow)" opacity="${o}"/>`; }
function win(x,y,w,h,rnd,{lit=false,shut='#3f6b3a',open=true,flower=false,curtain='#c0392b'}={}){
  let o=`<rect x="${x-2}" y="${y-3}" width="${w+4}" height="${h+6}" fill="#000" opacity=".25"/>`;
  o+=`<path d="${box(x,y,w,h,rnd,.8)}" fill="${lit?'url(#a_glass)':'url(#a_glassDark)'}" ${ln(1.4)}/>`;
  if (lit){ o+=`<path d="M${x+2} ${y+2} Q${x+w*.3} ${y+h*.5} ${x+2} ${y+h-1}Z M${x+w-2} ${y+2} Q${x+w*.7} ${y+h*.5} ${x+w-2} ${y+h-1}Z" fill="${curtain}" opacity=".85"/>`; o+=glow(x+w/2,y+h/2,w*1.6,.55); }
  else o+=`<path d="M${x+3} ${y+3} L${x+w*.45} ${y+3} L${x+3} ${y+h*.5}Z" fill="#fff" opacity=".12"/>`;
  o+=`<path d="M${x+w/2} ${y} V${y+h} M${x} ${y+h*.45} H${x+w}" stroke="${OL}" stroke-width="1.1"/>`;
  if (open){ o+=`<path d="${box(x-w*.55,y,w*.5,h,rnd,.6)}" fill="${shut}" ${ln(1.2)}/><path d="${box(x+w+w*.05,y,w*.5,h,rnd,.6)}" fill="${shut}" ${ln(1.2)}/>`;
    for(let k=1;k<6;k++){ const yy=y+k*h/6; o+=`<path d="M${x-w*.5} ${yy} H${x-w*.1} M${x+w*1.1} ${yy} H${x+w*1.5}" stroke="#000" stroke-opacity=".35" stroke-width=".8"/>`; } }
  else { o+=`<path d="${box(x,y,w,h,rnd,.6)}" fill="${shut}" ${ln(1.2)}/>`; for(let k=1;k<7;k++){ const yy=y+k*h/7; o+=`<path d="M${x+1} ${yy} H${x+w-1}" stroke="#000" stroke-opacity=".35" stroke-width=".8"/>`; } o+=`<path d="M${x+w/2} ${y} V${y+h}" stroke="${OL}" stroke-width="1"/>`; }
  o+=`<path d="${box(x-4,y+h,w+8,3.5,rnd,.5)}" fill="#d8c7a0" ${ln(1)}/>`;
  if (flower){ o+=`<rect x="${x+2}" y="${y+h-6}" width="${w-4}" height="6" fill="#a0522d" ${ln(1)}/>`; for(let k=0;k<4;k++) o+=`<circle cx="${x+5+k*(w-10)/3}" cy="${y+h-8}" r="2.6" fill="${['#e63946','#ff8fab','#ffd166','#e63946'][k]}" stroke="${OL}" stroke-width=".6"/>`; }
  return o; }
function stains(x,y,w,h,rnd,n=10,col='#000',op=.08){ let o=''; for(let i=0;i<n;i++){ o+=`<ellipse cx="${(x+rnd()*w).toFixed(1)}" cy="${(y+rnd()*h).toFixed(1)}" rx="${(4+rnd()*14).toFixed(1)}" ry="${(2+rnd()*8).toFixed(1)}" fill="${col}" opacity="${(op*(.4+rnd())).toFixed(3)}"/>`; } return o; }
function cobbles(y0,rnd,base='#5b5566',hi='#7a7488'){ let o=`<rect y="${y0}" width="480" height="${300-y0}" fill="${base}"/>`;
  for(let row=0;row<12;row++){ const t=row/11, y=y0+Math.pow(t,1.5)*(300-y0), sz=5+t*14; const off=(row%2)*sz*.6;
    for(let x=-sz+off;x<490;x+=sz*1.2){ o+=`<ellipse cx="${(x+(rnd()-.5)*2).toFixed(1)}" cy="${y.toFixed(1)}" rx="${(sz*.52).toFixed(1)}" ry="${(sz*.26+t*2).toFixed(1)}" fill="${rnd()<.5?hi:base}" stroke="#000" stroke-opacity=".35" stroke-width=".7"/>`; } }
  return o+`<rect y="${y0}" width="480" height="${300-y0}" fill="url(#a_shadeUp)" opacity=".5"/>`; }
function planks(y0,rnd,c1='#6b4226',c2='#5a3720'){ let o=''; const n=14; for(let i=0;i<n;i++){ const xt=-40+i*40, xb=240+(xt+20-240)*1.9; const xt2=xt+40, xb2=240+(xt2+20-240)*1.9; o+=`<path d="M${xt} ${y0} L${xt2} ${y0} L${xb2} 300 L${xb} 300Z" fill="${i%2?c1:c2}" stroke="#000" stroke-opacity=".4" stroke-width=".8"/>`; for(let k=0;k<2;k++){ const ty=y0+10+rnd()*(290-y0), tx=xt+20+(240-(xt+20))*0+((ty-y0)/(300-y0))*(xb-xt)+rnd()*20; o+=`<circle cx="${tx.toFixed(1)}" cy="${ty.toFixed(1)}" r=".9" fill="#1a0e06"/>`; } } return o; }
function lamp(x,y,h){ return `<g><path d="M${x-1.5} ${y} V${y+h}" stroke="${OL}" stroke-width="4"/><path d="M${x-1.5} ${y} V${y+h}" stroke="#3a3f4a" stroke-width="2.4"/><path d="M${x-7} ${y+h} h11 l2 5 h-15z" fill="#2a2e36" ${ln(1)}/>
  <path d="M${x-1.5} ${y+6} q-14 -4 -16 6" stroke="${OL}" stroke-width="2.6" fill="none"/><path d="M${x-24} ${y+12} h15 l-3 -9 h-9z" fill="#2a2e36" ${ln(1.2)}/><path d="M${x-22} ${y+12} h11 l-1.5 7 h-8z" fill="#ffe7a0" ${ln(1)}/>
  ${glow(x-16.5,y+15,46,1)}<path d="M${x-23} ${y+19} L${x-55} ${y+h+8} L${x+22} ${y+h+8} L${x-10} ${y+19}Z" fill="url(#a_cone)" opacity=".55"/></g>`; }
function shadowE(x,y,rx,ry=4,o=.35){ return `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#000" opacity="${o}"/>`; }
function roofTiles(x,y,w,h,col,rnd){ let o=`<path d="${wob([[x-6,y+h],[x+w+6,y+h],[x+w,y],[x,y]],rnd,1)}" fill="${col}" ${ln(1.6)}/>`; for(let r=0;r<3;r++){ const yy=y+(r+1)*h/3.2; for(let k=0;k<w/8;k++) o+=`<path d="M${x+k*8-2} ${yy} q4 -4 8 0" stroke="#000" stroke-opacity=".35" fill="none" stroke-width=".9"/>`; } return o; }
function laundry(x1,y1,x2,y2,rnd){ let o=`<path d="M${x1} ${y1} Q${(x1+x2)/2} ${Math.max(y1,y2)+10} ${x2} ${y2}" stroke="#ddd" stroke-width=".8" fill="none" opacity=".8"/>`; const n=5; for(let i=1;i<n;i++){ const t=i/n, x=x1+(x2-x1)*t, y=y1+(y2-y1)*t+Math.sin(t*Math.PI)*10; const c=['#f1faee','#e63946','#a8dadc','#ffd166','#fff'][i%5]; o+=`<path d="M${x-5} ${y} h10 l-1 ${8+rnd()*6} h-8z" fill="${c}" ${ln(.8)} opacity=".95"/>`; } return o; }
function cat(x,y){ return `<g transform="translate(${x} ${y})"><path d="M0 0 q-2 -10 4 -12 l2 -5 l2 4 q3 0 5 -1 l2 -4 l1 6 q3 4 -1 12z" fill="#111" /><circle cx="5" cy="-11" r=".9" fill="#ffd166"/><circle cx="10" cy="-11" r=".9" fill="#ffd166"/><path d="M0 -1 q-8 2 -6 -10" stroke="#111" stroke-width="2" fill="none" class="tail"/></g>`; }
function fog(y,rnd,col='#9fb3d9',op=.18){ let o=''; for(let i=0;i<6;i++){ o+=`<ellipse class="drift" cx="${rnd()*480}" cy="${y+rnd()*20}" rx="${80+rnd()*80}" ry="${8+rnd()*8}" fill="${col}" opacity="${op}"/>`; } return o; }
const css=document.createElement('style'); css.textContent=`.twk{animation:aTwk 3s ease-in-out infinite}.twk:nth-child(3n){animation-delay:1.2s}@keyframes aTwk{50%{opacity:.15}}
 .drift{animation:aDrift 40s linear infinite alternate}@keyframes aDrift{to{transform:translateX(30px)}}
 .flick{animation:aFl 2.6s steps(6) infinite}@keyframes aFl{20%{opacity:.75}40%{opacity:1}60%{opacity:.85}}
 .beam{transform-origin:338px 26px;animation:aBeam 6s linear infinite}@keyframes aBeam{0%{transform:scaleX(1)}50%{transform:scaleX(-1)}100%{transform:scaleX(1)}}
 .smoke{animation:aSm 7s ease-in-out infinite}@keyframes aSm{50%{transform:translate(6px,-8px);opacity:.25}}
 .tail{transform-origin:0 0;animation:aTail 3s ease-in-out infinite}@keyframes aTail{50%{transform:rotate(14deg)}}`; document.head.appendChild(css);

const ART={};
/* ---------------- PIAZZA ---------------- */
ART.piazza=()=>{ const R=S(11); let o=defs()+`<rect width="480" height="300" fill="url(#a_night)"/>`+stars(R,55,120)+moon(410,38,13)+clouds(R,4,20,90);
  // campanile e cupola lontani
  o+=`<g opacity=".9"><path d="${wob([[226,140],[226,40],[254,40],[254,140]],R,1)}" fill="#3a3b63" ${ln(1.2)}/><path d="M222 40 L240 14 L258 40Z" fill="#2c2d52" ${ln(1.2)}/><path d="M233 56 h14 v18 h-14z" fill="#151633"/><path d="M240 50 v28" stroke="#ffd27a" stroke-opacity=".5"/><circle cx="240" cy="92" r="7" fill="#e9dcae" ${ln(1)}/><path d="M240 92 v-5 M240 92 h3" stroke="${OL}" stroke-width="1"/></g>`;
  // palazzi
  const B=[[ -4,52,128,'#d9a441','#b5401e'],[124,78,122,'#c5533a','#7a2e1c'],[246,34,118,'#e08a4b','#8a3a1c'],[364,64,120,'#7f9c8c','#5a3020']];
  for (const [x,y,w,c,roof] of B){ o+=roofTiles(x,y-14,w,16,roof,R)+`<path d="${wob([[x,y],[x+w,y],[x+w,222],[x,222]],R,1.4)}" fill="${c}" ${ln(1.8)}/>`+stains(x,y,w,222-y,R,9)+`<rect x="${x}" y="${y}" width="${w}" height="${222-y}" fill="url(#a_shadeDown)" opacity=".55"/><path d="M${x} ${y+6} H${x+w}" stroke="#000" stroke-opacity=".3" stroke-width="3"/>`;
    const cols=Math.floor(w/32); for(let j=0;j<3;j++) for(let i=0;i<cols;i++){ const wx=x+14+i*(w-20)/cols, wy=y+18+j*38; if (wy>182) continue; const lit=R()<.28; o+=win(wx,wy,12,20,R,{lit,open:R()<.7,flower:R()<.35,shut:['#3f6b3a','#2f5d74','#6b3a2a'][Math.floor(R()*3)]}); } }
  // balcone e panni stesi
  o+=`<path d="M262 128 h56 v4 h-56z" fill="#2a2a33" ${ln(1)}/>`+Array.from({length:9},(_,i)=>`<path d="M${264+i*6.5} 132 v14" stroke="#2a2a33" stroke-width="1.4"/>`).join('')+`<path d="M260 146 h60" stroke="#2a2a33" stroke-width="2"/>`;
  o+=laundry(118,100,252,92,R)+laundry(358,116,470,108,R);
  // portico del caffè a sinistra
  o+=`<path d="M2 150 H122 L126 166 H-2Z" fill="#2a9d8f" ${ln(1.4)}/>`+Array.from({length:8},(_,i)=>`<path d="M${2+i*15} 166 q7 8 15 0" fill="${i%2?'#f1faee':'#2a9d8f'}" ${ln(1)}/>`).join('')+`<text x="62" y="162" text-anchor="middle" font-size="10" font-weight="700" fill="#fff" font-family="Fredoka, sans-serif" stroke="${OL}" stroke-width="2.5" paint-order="stroke">CAFFÈ NICO</text>
   <path d="${box(16,174,92,48,R,1)}" fill="#3a1f12" ${ln(1.4)}/><path d="${box(22,180,80,38,R,1)}" fill="url(#a_glass)" ${ln(1)}/>${glow(62,198,90,.9)}<path d="M40 180 v38 M62 180 v38 M84 180 v38" stroke="${OL}" stroke-width="1"/>`;
  // pavimento
  o+=cobbles(220,R);
  o+=`<path d="M0 220 H480" stroke="${OL}" stroke-width="2"/><rect y="218" width="480" height="5" fill="#000" opacity=".35"/>`;
  // tavolino del caffè (hotspot 160,205)
  o+=shadowE(160,250,28,4)+`<path d="${box(156,214,8,34,R,.6)}" fill="#3a3f4a" ${ln(1.2)}/><ellipse cx="160" cy="212" rx="24" ry="6" fill="#e9e2cf" ${ln(1.4)}/><path d="M150 248 h20" stroke="${OL}" stroke-width="3"/><path d="M152 204 l6 0 l-1 7 l-4 0z" fill="#fff" ${ln(.8)}/><path d="M163 205 q4 -6 2 -10" stroke="#fff" stroke-opacity=".5" fill="none" class="smoke"/>
   <path d="M126 248 l4 -40 h18 l-2 6 h-14 l-3 34z" fill="#5a3a22" ${ln(1.2)}/><path d="M194 248 l-4 -40 h-18 l2 6 h14 l3 34z" fill="#5a3a22" ${ln(1.2)}/>`;
  // bacheca (hotspot 319,167)
  o+=`<path d="M300 186 v40 M338 186 v40" stroke="${OL}" stroke-width="3"/><path d="${box(294,148,52,40,R,1.2)}" fill="#8a5a33" ${ln(1.6)}/><path d="${box(299,153,42,30,R,.8)}" fill="#c9a77a" ${ln(1)}/>
   <path d="M302 156 h12 v10 h-12z" fill="#fff" transform="rotate(-6 308 161)" ${ln(.6)}/><path d="M318 157 h16 v12 h-16z" fill="#ffd166" transform="rotate(5 326 163)" ${ln(.6)}/><path d="M305 170 h12 v10 h-12z" fill="#a8dadc" ${ln(.6)}/><circle cx="308" cy="157" r="1.3" fill="#e63946"/><circle cx="326" cy="158" r="1.3" fill="#e63946"/>
   <text x="320" y="146" text-anchor="middle" font-size="6.5" font-weight="700" fill="#ffd166" font-family="Fredoka, sans-serif" stroke="${OL}" stroke-width="2" paint-order="stroke">${it()?'BACHECA':'BOARD'}</text>`;
  // carretto dei gelati (hotspot 360,200)
  o+=shadowE(362,250,36,4)+`<path d="M362 196 V150" stroke="${OL}" stroke-width="3"/><path d="M324 162 Q362 128 400 162Z" fill="#ffd6e0" ${ln(1.6)}/><path d="M338 160 Q362 140 386 160" stroke="#ff8fab" stroke-width="3" fill="none"/>
   <path d="${box(328,194,68,40,R,1)}" fill="#f6efe3" ${ln(1.6)}/><rect x="328" y="210" width="68" height="8" fill="#ff8fab"/><text x="362" y="206" text-anchor="middle" font-size="6.5" font-weight="700" fill="#c0392b" font-family="Fredoka, sans-serif">GELATI</text>
   <circle cx="342" cy="242" r="8" fill="#3a3f4a" ${ln(1.6)}/><circle cx="342" cy="242" r="2" fill="#aaa"/><circle cx="384" cy="242" r="8" fill="#3a3f4a" ${ln(1.6)}/><circle cx="384" cy="242" r="2" fill="#aaa"/>
   <g transform="translate(352 190)"><path d="M0 0 l5 -10 l5 10z" fill="#e0b56e" ${ln(.8)}/><circle cx="5" cy="-12" r="5" fill="#ff8fab" ${ln(.8)}/></g>`;
  // lampioni con luce
  o+=lamp(214,96,128)+lamp(468,104,120);
  o+=cat(440,222)+fog(226,R,'#8aa0d0',.12)+`<rect width="480" height="300" fill="url(#a_vign)"/>`;
  return o; };

/* ---------------- PORTO ---------------- */
ART.porto=()=>{ const R=S(23), f=F_(); let o=defs()+`<rect width="480" height="160" fill="url(#a_night)"/>`+stars(R,50,110)+moon(330,34,12)+clouds(R,3,20,80);
  // colline lontane con luci del paese
  o+=`<path d="M0 128 Q50 96 110 112 T230 100 T360 108 T480 96 V150 H0Z" fill="#1d2448" ${ln(1)}/>`+Array.from({length:14},()=>`<circle cx="${(R()*480).toFixed(1)}" cy="${(112+R()*26).toFixed(1)}" r="1" fill="#ffd27a" opacity=".85"/>`).join('');
  o+=`<path d="M440 96 v-26 l4 -4 l4 4 v26z" fill="#2a2f55" ${ln(1)}/><path d="M444 66 L520 50 L520 82Z" fill="#fff6c9" opacity=".08" class="flick"/>`;
  // mare con riflesso della luna
  o+=`<rect y="140" width="480" height="90" fill="url(#a_sea)"/>`+Array.from({length:22},()=>{ const x=R()*480, y=146+R()*80; return `<path d="M${x.toFixed(1)} ${y.toFixed(1)} q6 -3 12 0" stroke="#7fa6d9" stroke-opacity="${(.25+R()*.35).toFixed(2)}" fill="none"/>`; }).join('')+
   Array.from({length:9},(_,i)=>`<path d="M${322-i*2+R()*6} ${150+i*9} h${10+R()*14}" stroke="#fff4cf" stroke-opacity="${(.7-i*.06).toFixed(2)}" stroke-width="2" stroke-linecap="round"/>`).join('');
  // magazzino (hotspot 107,172)
  o+=`<path d="${wob([[14,62],[200,62],[200,228],[14,228]],R,1.6)}" fill="#8e3e2c" ${ln(2)}/><rect x="14" y="62" width="186" height="166" fill="url(#a_brick)"/>`+stains(14,62,186,166,R,10)+`<rect x="14" y="62" width="186" height="166" fill="url(#a_shadeDown)" opacity=".5"/>
   <path d="${wob([[4,64],[107,22],[210,64]],R,1.2)}" fill="#4e231a" ${ln(2)}/><path d="M30 58 L107 28 L184 58" stroke="#000" stroke-opacity=".3" fill="none" stroke-width="2"/>
   <path d="${box(70,80,74,20,R,.8)}" fill="#20222a" ${ln(1.4)}/><text x="107" y="94" text-anchor="middle" font-size="9" font-weight="700" fill="#ffd166" font-family="Fredoka, sans-serif">MAGAZZINO 7</text>
   <path d="${box(57,116,100,112,R,1)}" fill="#2a1a10" ${ln(2)}/>`;
  if (f.doorOpen){ o+=`<path d="${box(61,120,92,108,R,.8)}" fill="#0b0705"/>${glow(107,205,60,.35)}<g fill="#c9a227">${[0,1,2].map(i=>`<ellipse cx="${84+i*22}" cy="214" rx="9" ry="3" ${ln(.6)}/>`).join('')}</g><path d="M57 116 L30 124 L30 226 L57 228Z" fill="#5a3720" ${ln(1.6)}/>`; }
  else { o+=`<path d="${box(61,120,44,106,R,.8)}" fill="url(#a_wood)" ${ln(1.4)}/><path d="${box(109,120,44,106,R,.8)}" fill="url(#a_wood)" ${ln(1.4)}/><path d="M61 120 L105 226 M105 120 L61 226 M109 120 L153 226 M153 120 L109 226" stroke="#1a0e06" stroke-width="3"/>
    <g transform="translate(107 176)"><path d="M-7 -6 Q-7 -16 0 -16 Q7 -16 7 -6" stroke="#999" stroke-width="3" fill="none"/><rect x="-9" y="-6" width="18" height="14" rx="2" fill="#c9a227" ${ln(1.2)}/><circle cy="1" r="2" fill="#333"/></g>`; }
  o+=`<path d="M174 92 h14 l-2 10 h-10z" fill="#2a2e36" ${ln(1)}/><path d="M176 102 h10 l-1 6 h-8z" fill="#ffe7a0"/>${glow(181,106,40,.9)}`;
  // pontile in legno
  o+=`<rect y="226" width="480" height="74" fill="#5a3720"/>`+planks(226,R,'#6e4527','#5c3a20')+`<path d="M0 226 H480" stroke="${OL}" stroke-width="2.5"/><rect y="226" width="480" height="6" fill="#000" opacity=".4"/>`;
  // casse (hotspot 250,205)
  o+=shadowE(252,229,40,4)+[[222,202],[256,202],[239,176]].map(([x,y])=>`<path d="${box(x,y,32,26,R,1)}" fill="#a87a4a" ${ln(1.5)}/><path d="M${x+2} ${y+2} L${x+30} ${y+24} M${x+30} ${y+2} L${x+2} ${y+24}" stroke="#6b4a2b" stroke-width="2"/>`).join('')+`<text x="255" y="196" text-anchor="middle" font-size="6" font-weight="700" fill="#3a2614" font-family="Fredoka, sans-serif">PESCE</text>`;
  // rete e corda
  o+=`<path d="M200 228 q20 -6 30 4" stroke="#c9a77a" stroke-width="2.2" fill="none"/><path d="M286 230 q14 -14 30 -2 q-10 8 -30 2z" fill="#4a5a52" opacity=".9" ${ln(1)}/><path d="M290 228 l22 -6 M294 224 l16 6" stroke="#2a3a32" stroke-width=".8"/>`;
  // barca (hotspot 385,200)
  o+=`<g class="sway" style="transform-origin:385px 210px">${shadowE(385,224,90,5,.3)}<path d="${wob([[296,196],[474,196],[452,224],[318,224]],R,1.2)}" fill="#b83232" ${ln(2)}/><path d="M298 200 H472" stroke="#f1faee" stroke-width="3"/><path d="M318 218 H452" stroke="#000" stroke-opacity=".3" stroke-width="3"/>
   <path d="${box(346,168,64,28,R,1)}" fill="#e9e5da" ${ln(1.6)}/><path d="${box(354,174,13,11,R,.5)}" fill="url(#a_glass)" ${ln(1)}/><path d="${box(374,174,13,11,R,.5)}" fill="url(#a_glassDark)" ${ln(1)}/>${glow(360,180,26,.6)}
   <path d="M402 168 V100" stroke="${OL}" stroke-width="3.5"/><path d="M402 104 L434 140 L402 140Z" fill="#e9e5da" opacity=".9" ${ln(1.2)}/><path d="M402 100 L470 196 M402 100 L300 196" stroke="#888" stroke-width=".7" opacity=".8"/>
   <text x="385" y="216" text-anchor="middle" font-size="8" font-weight="700" fill="#f1faee" font-family="Fredoka, sans-serif">BAFFO II</text></g>`;
  // bitte e lampione (hotspot lamp 230,120)
  o+=`<g fill="#2a2e36">${[[212,214],[462,214]].map(([x,y])=>`<path d="${box(x,y,13,14,R,.6)}" ${ln(1.2)}/><rect x="${x-1}" y="${y}" width="15" height="4" fill="#3d434e" ${ln(.8)}/>`).join('')}</g>`+lamp(240,66,160);
  o+=`<g class="fly1"><path d="M0 0 q5 -5 10 0 q5 -5 10 0" stroke="#dfe7ff" stroke-width="1.6" fill="none" transform="translate(280 56)"/></g>`+fog(214,R,'#9fb3d9',.12)+`<rect width="480" height="300" fill="url(#a_vign)"/>`;
  return o; };

/* ---------------- BISCA ---------------- */
ART.bisca=()=>{ const R=S(37); let o=defs()+`<rect width="480" height="300" fill="#24161a"/>`;
  o+=`<path d="${wob([[0,0],[480,0],[480,232],[0,232]],R,1)}" fill="#4a2a2a"/><rect width="480" height="232" fill="url(#a_brick)" opacity=".9"/>`+stains(0,0,480,232,R,18,'#000',.12)+`<rect width="480" height="232" fill="url(#a_shadeDown)" opacity=".4"/>
   <path d="M0 160 H480" stroke="#1a0e0e" stroke-width="3"/><rect y="160" width="480" height="72" fill="#3a1e1a"/>`+Array.from({length:16},(_,i)=>`<path d="M${i*30} 162 V230" stroke="#000" stroke-opacity=".3"/>`).join('');
  // tubi sul soffitto
  o+=`<path d="M0 14 H480" stroke="${OL}" stroke-width="7"/><path d="M0 14 H480" stroke="#5a5f68" stroke-width="4.5"/><path d="M0 26 H480" stroke="${OL}" stroke-width="4"/><path d="M0 26 H480" stroke="#6d4c3a" stroke-width="2.5"/>`+[60,200,340].map(x=>`<rect x="${x}" y="9" width="8" height="10" fill="#3a3f4a" ${ln(1)}/>`).join('');
  // semi delle carte e poster corse
  o+=`<text x="88" y="66" font-size="16" fill="#c9a227" font-family="serif" stroke="${OL}" stroke-width="1" paint-order="stroke">♠ ♥ ♦ ♣</text>
   <path d="${box(372,50,64,46,R,1)}" fill="#e9dcae" ${ln(1.4)}/><text x="404" y="62" text-anchor="middle" font-size="6" font-weight="700" fill="#7a1e1e" font-family="Fredoka, sans-serif">GRAN PREMIO</text><path d="M384 84 q6 -14 14 -10 l6 -6 l4 4 l-4 4 q4 6 0 10 l2 6 h-4 l-2 -6 h-8 l-4 6 h-4z" fill="#3a2614"/>
   <circle cx="452" cy="132" r="14" fill="#e9dcae" ${ln(1.4)}/><circle cx="452" cy="132" r="9" fill="#c0392b"/><circle cx="452" cy="132" r="4" fill="#e9dcae"/><circle cx="452" cy="132" r="1.5" fill="#1d4a2a"/><path d="M450 130 l-10 -8" stroke="#555" stroke-width="1.2"/>`;
  // cartello regole (hotspot 330,120)
  o+=`<path d="${box(300,100,60,40,R,1)}" fill="#1a120e" ${ln(1.6)}/><path d="${box(303,103,54,34,R,.6)}" fill="none" stroke="#c9a227" stroke-width="1.6"/>
   <text x="330" y="114" text-anchor="middle" font-size="7.5" font-weight="700" fill="#ffd166" font-family="Fredoka, sans-serif">${it()?'REGOLE':'RULES'}</text><text x="330" y="124" text-anchor="middle" font-size="5.2" fill="#e9dcae" font-family="Fredoka, sans-serif">${it()?'1. Niente bari':'1. No cheating'}</text><text x="330" y="132" text-anchor="middle" font-size="5.2" fill="#e9dcae" font-family="Fredoka, sans-serif">${it()?'2. Si paga in Pippi':'2. Pay in Pippi'}</text>`;
  // scaffale bottiglie (hotspot 68,190)
  o+=`<path d="${box(36,140,64,92,R,1)}" fill="url(#a_wood)" ${ln(1.6)}/>`+[166,196,224].map(y=>`<path d="M38 ${y} H98" stroke="${OL}" stroke-width="2.2"/>`).join('')+[[44,166],[56,166],[70,166],[84,166],[46,196],[62,196],[78,196],[90,196],[50,224],[70,224],[86,224]].map(([x,y],i)=>`<path d="M${x-3} ${y} v-12 q0 -3 2 -4 v-5 h2 v5 q2 1 2 4 v12z" fill="${['#2d6a4f','#7a1e1e','#c9a227','#4a2a6a'][i%4]}" ${ln(.8)}/>`).join('')+`<rect x="36" y="140" width="64" height="92" fill="url(#a_shadeDown)" opacity=".5"/>`;
  // pavimento
  o+=`<rect y="232" width="480" height="68" fill="#2a1a14"/>`+planks(232,R,'#3e2618','#33200f')+`<path d="M0 232 H480" stroke="${OL}" stroke-width="2.5"/>`;
  // lampada verde e cono di luce sul tavolo
  o+=`<path d="M240 0 V68" stroke="#111" stroke-width="1.4"/><path d="M240 160 L120 232 L360 232Z" fill="url(#a_cone)" opacity=".0"/><path d="M212 84 L268 84 L300 214 L180 214Z" fill="url(#a_cone)" opacity=".7"/>
   <path d="${wob([[214,86],[266,86],[256,66],[224,66]],R,.8)}" fill="#1f6b4a" ${ln(1.6)}/><path d="M218 86 H262" stroke="#ffe7a0" stroke-width="2"/>${glow(240,92,70,.9)}`;
  // tavolo verde (hotspot 230,200)
  o+=shadowE(230,236,98,6,.5)+`<path d="M196 226 l-6 10 M264 226 l6 10" stroke="${OL}" stroke-width="5"/><path d="M196 226 l-6 10 M264 226 l6 10" stroke="#3e2414" stroke-width="3"/>
   <ellipse cx="230" cy="206" rx="92" ry="22" fill="#4a2a14" ${ln(1.8)}/><ellipse cx="230" cy="202" rx="84" ry="17" fill="#1f6b3a" ${ln(1.2)}/><ellipse cx="226" cy="198" rx="54" ry="8" fill="#2d8a4e" opacity=".5"/>
   <path d="M196 200 h10 v7 h-10z M214 196 h10 v7 h-10z" fill="#f1faee" ${ln(.6)}/><circle cx="244" cy="200" r="3.2" fill="#c0392b" ${ln(.6)}/><circle cx="252" cy="203" r="3.2" fill="#111" ${ln(.6)}/><circle cx="249" cy="197" r="3.2" fill="#2a6fdb" ${ln(.6)}/><path d="M266 194 h12 l2 8 h-12z" fill="#ffd166" ${ln(.6)}/>
   <path d="M260 190 q4 -10 0 -18 q-4 -8 2 -16" stroke="#cfcfcf" stroke-opacity=".35" stroke-width="3" fill="none" class="smoke"/>`;
  // slot machine (hotspot 410,180)
  o+=shadowE(410,236,32,4)+`<path d="${box(382,130,56,102,R,1)}" fill="#a3201f" ${ln(1.8)}/><path d="${box(388,138,44,18,R,.6)}" fill="#ffd166" ${ln(1)}/><text x="410" y="151" text-anchor="middle" font-size="7" font-weight="700" fill="#7a1e1e" font-family="Fredoka, sans-serif">JACKPOT</text>
   <path d="${box(390,162,40,24,R,.6)}" fill="#f1faee" ${ln(1.2)}/><text x="410" y="179" text-anchor="middle" font-size="11" fill="#c0392b">🍒7🔔</text><rect x="396" y="200" width="28" height="6" fill="#111" ${ln(.8)}/><path d="${box(388,212,44,16,R,.6)}" fill="#6a1514" ${ln(1)}/>
   <path d="M438 170 L452 140" stroke="${OL}" stroke-width="4"/><path d="M438 170 L452 140" stroke="#aaa" stroke-width="2.4"/><circle cx="453" cy="138" r="5" fill="#e63946" ${ln(1.2)}/>${glow(410,172,50,.35)}`;
  o+=fog(120,R,'#d9c2a0',.06)+`<rect width="480" height="300" fill="url(#a_vign)"/>`;
  return o; };

/* ---------------- MUNICIPIO ---------------- */
ART.municipio=()=>{ const R=S(41), f=F_(); let o=defs()+`<rect width="480" height="232" fill="#d9c79a"/><rect width="480" height="232" fill="url(#a_paper)"/>`+stains(0,0,480,232,R,12,'#5a4020',.07);
  o+=`<rect y="140" width="480" height="92" fill="#5a3720" /><rect y="140" width="480" height="92" fill="url(#a_planks)" opacity=".6"/><path d="M0 140 H480" stroke="${OL}" stroke-width="2.5"/><path d="M0 146 H480" stroke="#7a5030" stroke-width="3"/>`+Array.from({length:8},(_,i)=>`<path d="${box(10+i*60,156,44,60,R,.8)}" fill="none" stroke="#3a2412" stroke-width="1.4"/>`).join('')+`<rect width="480" height="232" fill="url(#a_shadeDown)" opacity=".35"/>`;
  // finestra notturna (hotspot 415,70)
  o+=`<path d="${box(370,22,90,96,R,1)}" fill="#3a2412" ${ln(2)}/><path d="${box(376,28,78,84,R,.6)}" fill="url(#a_night)" ${ln(1)}/>`+moon(430,50,8)+`<path d="M415 28 V112 M376 70 H454" stroke="#3a2412" stroke-width="3"/><path d="M362 18 Q370 70 366 124 L378 124 Q372 70 382 18Z M468 18 Q460 70 464 124 L452 124 Q458 70 448 18Z" fill="#7a1e1e" ${ln(1.2)}/><path d="${box(366,118,98,5,R,.5)}" fill="#5a3720" ${ln(1)}/>`;
  // ritratto del sindaco (hotspot 240,63)
  o+=`<path d="${box(200,16,80,94,R,1)}" fill="#c9a227" ${ln(2)}/><path d="${box(207,23,66,80,R,.6)}" fill="#3a2a4a" ${ln(1)}/><ellipse cx="240" cy="54" rx="15" ry="18" fill="#eab48a" ${ln(1.2)}/><path d="M226 46 q14 -16 28 0" fill="#eee" /><path d="M232 62 q8 6 16 0" stroke="#333" stroke-width="2.4" fill="none"/><circle cx="234" cy="52" r="1.6" fill="#222"/><circle cx="246" cy="52" r="1.6" fill="#222"/>
   <path d="M216 103 q24 -32 48 0" fill="#1e1e2a" ${ln(1)}/><path d="M236 80 l4 12 l4 -12" fill="#c0392b"/><path d="M216 92 l48 -10" stroke="#2a9d8f" stroke-width="3" opacity=".9"/><text x="240" y="118" text-anchor="middle" font-size="5.5" font-weight="700" fill="#3a2412" font-family="Fredoka, sans-serif">B. PAPPALARDO</text>`;
  // bandiera (hotspot 125,50)
  o+=`<path d="M108 20 V120" stroke="${OL}" stroke-width="3"/><path d="M108 20 V120" stroke="#c9a227" stroke-width="1.6"/><circle cx="108" cy="18" r="3" fill="#c9a227" ${ln(1)}/><path d="M110 26 q12 4 14 0 q4 -2 10 0 V64 q-8 -2 -12 2 q-6 2 -12 -2Z" fill="#fff" ${ln(1.2)}/><path d="M110 26 q4 2 8 1 V65 q-4 0 -8 -1Z" fill="#2a9d47"/><path d="M128 26 q4 -1 6 0 V64 q-3 -1 -6 0Z" fill="#c0392b"/>`;
  // orologio e schedari
  o+=`<circle cx="320" cy="44" r="13" fill="#f1e8cf" ${ln(1.6)}/><path d="M320 44 V35 M320 44 L326 47" stroke="${OL}" stroke-width="1.4"/><text x="320" y="70" text-anchor="middle" font-size="5" fill="#3a2412" font-family="Fredoka, sans-serif">3:07</text>
   <path d="${box(150,140,40,92,R,1)}" fill="#6c737b" ${ln(1.6)}/>`+[150,170,190,210].map(y=>`<path d="M154 ${y+3} h32 v16 h-32z" fill="#7d858e" ${ln(1)}/><rect x="166" y="${y+9}" width="8" height="2.4" fill="#2a2e36"/>`).join('');
  // cassaforte (hotspot 73,193)
  o+=shadowE(73,234,40,4)+`<path d="${box(38,156,70,76,R,1)}" fill="#3d434e" ${ln(2)}/><path d="${box(43,161,60,66,R,.6)}" fill="#4f5662" ${ln(1)}/>`;
  if (f.safeOpen) o+=`<path d="M43 161 L22 168 L22 224 L43 227Z" fill="#4f5662" ${ln(1.6)}/><path d="${box(45,163,56,62,R,.5)}" fill="#141414"/><path d="M50 210 h40" stroke="#555" stroke-width="2"/>`;
  else o+=`<circle cx="73" cy="190" r="13" fill="#2a2e36" ${ln(1.4)}/><circle cx="73" cy="190" r="9" fill="#9aa1ab" ${ln(1)}/>`+Array.from({length:12},(_,i)=>{ const a=i/12*Math.PI*2; return `<path d="M${73+Math.cos(a)*9} ${190+Math.sin(a)*9} L${73+Math.cos(a)*11} ${190+Math.sin(a)*11}" stroke="#ddd" stroke-width=".8"/>`; }).join('')+`<path d="M73 190 L73 182" stroke="${OL}" stroke-width="2"/><path d="M92 176 v28" stroke="#9aa1ab" stroke-width="4" stroke-linecap="round"/>`;
  // pavimento
  o+=`<rect y="232" width="480" height="68" fill="#7a2e22"/>`+Array.from({length:10},(_,r)=>Array.from({length:12},(_,c)=>`<path d="M${c*44+(r%2)*22-10} ${236+r*7} h40" stroke="#000" stroke-opacity=".18"/>`).join('')).join('')+`<path d="M90 300 L150 240 H330 L390 300Z" fill="#8a1e1e" ${ln(1.2)}/><path d="M100 296 L154 244 H326 L380 296Z" fill="none" stroke="#c9a227" stroke-width="1.2"/><path d="M0 232 H480" stroke="${OL}" stroke-width="2.5"/>`;
  // scrivania (hotspot 360,200)
  o+=shadowE(360,236,80,5,.45)+`<path d="${box(290,176,140,12,R,1)}" fill="#5a3720" ${ln(1.8)}/><path d="${box(296,188,40,44,R,1)}" fill="url(#a_wood)" ${ln(1.6)}/><path d="${box(384,188,40,44,R,1)}" fill="url(#a_wood)" ${ln(1.6)}/>`+[198,214].map(y=>`<path d="M302 ${y} h28 M390 ${y} h28" stroke="#c9a227" stroke-width="2"/>`).join('')+
   `<path d="M300 176 l4 -14 h22 l2 14z" fill="#f1faee" ${ln(1)}/><path d="M303 168 h22 M302 172 h24" stroke="#ccc" stroke-width=".7"/><path d="M306 162 l2 -6 h18 l2 6z" fill="#e9e2cf" ${ln(.8)}/>
   <path d="M350 170 h16 v6 h-16z" fill="#2a2e36" ${ln(1)}/><path d="M354 170 v-8 h8 v8" fill="#5a3720" ${ln(1)}/><path d="M396 176 v-22 h-8 l10 -12 l10 12 h-8 v22" fill="#2f5d74" opacity="0"/><path d="M398 176 v-20" stroke="${OL}" stroke-width="2"/><path d="M386 156 h24 l-6 -12 h-12z" fill="#2a9d8f" ${ln(1.2)}/>${glow(398,160,46,.8)}`;
  o+=`<rect width="480" height="300" fill="url(#a_vign)"/>`;
  return o; };

/* ---------------- CIMITERO ---------------- */
ART.cimitero=()=>{ const R=S(53), f=F_(); let o=defs()+`<rect width="480" height="300" fill="url(#a_night)"/>`+stars(R,60,130)+moon(250,40,16)+clouds(R,4,30,100,'#232c58');
  o+=`<path d="M0 170 Q80 140 160 160 T320 150 T480 158 V230 H0Z" fill="#141a33"/>`+Array.from({length:7},(_,i)=>{ const x=150+i*46+R()*10, h=40+R()*30; return `<path d="M${x} 170 q-8 -${h} 0 -${h*1.4} q8 ${h*.4} 0 ${h*1.4}z" fill="#0f1428"/>`; }).join('');
  // muro di cinta
  o+=`<path d="${wob([[0,172],[480,172],[480,232],[0,232]],R,1.4)}" fill="#5c5a6e" ${ln(1.8)}/><rect y="172" width="480" height="60" fill="url(#a_brick)" opacity=".7"/>`+stains(0,172,480,60,R,14,'#1d3a2a',.18)+`<path d="M0 170 H480" stroke="#7a788c" stroke-width="5"/>`;
  // cipresso (hotspot 90,110)
  o+=`<path d="M90 40 Q72 90 74 150 Q76 186 90 190 Q104 186 106 150 Q108 90 90 40Z" fill="#14301f" ${ln(1.8)}/>`+Array.from({length:10},()=>`<path d="M${80+R()*20} ${60+R()*120} q4 -6 8 0" stroke="#1f4a2f" stroke-width="2" fill="none"/>`).join('')+`<path d="M88 190 v12" stroke="#3a2412" stroke-width="5"/>`;
  // cancello (hotspot 40,170)
  o+=`<path d="${box(4,108,14,124,R,1)}" fill="#6d6b80" ${ln(1.6)}/><path d="${box(62,108,14,124,R,1)}" fill="#6d6b80" ${ln(1.6)}/><circle cx="11" cy="104" r="6" fill="#7a788c" ${ln(1.2)}/><circle cx="69" cy="104" r="6" fill="#7a788c" ${ln(1.2)}/>`+Array.from({length:6},(_,i)=>`<path d="M${22+i*7} 230 V${126-Math.abs(i-2.5)*4}" stroke="${OL}" stroke-width="2.2"/><path d="M${22+i*7} ${124-Math.abs(i-2.5)*4} l-2 4 h4z" fill="${OL}"/>`).join('')+`<path d="M18 150 H62 M18 200 H62" stroke="${OL}" stroke-width="2.4"/><path d="M28 150 q12 16 24 0" stroke="${OL}" stroke-width="1.6" fill="none"/>`;
  // terreno
  o+=`<rect y="230" width="480" height="70" fill="#25301f"/>`+Array.from({length:60},()=>{ const x=R()*480, y=232+R()*66; return `<path d="M${x.toFixed(1)} ${y.toFixed(1)} l2 -6 l2 6" stroke="#3d5230" stroke-width="1" fill="none"/>`; }).join('')+`<path d="M90 300 Q200 250 240 232 L280 232 Q300 250 380 300Z" fill="#4a4636" opacity=".7"/><path d="M0 230 H480" stroke="${OL}" stroke-width="2"/>`;
  // tombe
  const tomb=(x,y,w,h,rot,txt)=>`<g transform="rotate(${rot} ${x} ${y+h})">${shadowE(x,y+h+2,w*.7,3,.4)}<path d="M${x-w/2} ${y+h} V${y+w/2} Q${x-w/2} ${y} ${x} ${y} Q${x+w/2} ${y} ${x+w/2} ${y+w/2} V${y+h}Z" fill="#8a889a" ${ln(1.6)}/><path d="M${x-w/2+3} ${y+h} V${y+w/2+2} Q${x-w/2+3} ${y+3} ${x} ${y+3}" stroke="#fff" stroke-opacity=".2" fill="none" stroke-width="2"/>${stains(x-w/2,y,w,h,R,4,'#2d5a3a',.25)}<text x="${x}" y="${y+h*.55}" text-anchor="middle" font-size="5" fill="#2a2a33" font-family="serif">${txt}</text></g>`;
  o+=tomb(120,196,26,36,-12,'R.I.P.')+tomb(300,186,40,48,0,'FAM. ROSSI');
  // tomba con vaso (hotspot 200,205)
  o+=tomb(200,172,44,60,0,'ASSUNTA')+`<path d="M190 232 h20 l-3 -14 h-14z" fill="#8a6a3a" ${ln(1.2)}/>`;
  if (f.gaveFlowers) o+=[[194,214,'#e63946'],[200,210,'#ff8fab'],[206,214,'#e63946'],[200,216,'#ffd166']].map(([x,y,c])=>`<path d="M200 218 L${x} ${y}" stroke="#2d6a4f" stroke-width="1.2"/><circle cx="${x}" cy="${y}" r="3.2" fill="${c}" ${ln(.7)}/>`).join('');
  if (f.luminoGiven) o+=`<path d="M214 232 h10 l-1 -9 h-8z" fill="#c0392b" ${ln(.8)}/><path d="M219 222 q-3 -5 0 -9 q3 4 0 9z" fill="#ffd166" class="flick"/>${glow(219,220,30,.9)}`;
  // cappella (hotspot 410,175)
  o+=shadowE(410,236,62,5,.5)+`<path d="${wob([[356,232],[356,140],[464,140],[464,232]],R,1.4)}" fill="#6d6b80" ${ln(2)}/><rect x="356" y="140" width="108" height="92" fill="url(#a_brick)" opacity=".5"/>`+stains(356,140,108,92,R,8,'#1d3a2a',.2)+`<path d="${wob([[348,142],[410,104],[472,142]],R,1.2)}" fill="#4a4860" ${ln(2)}/><path d="M410 104 V84 M402 92 H418" stroke="${OL}" stroke-width="4"/><path d="M410 104 V84 M402 92 H418" stroke="#9a98aa" stroke-width="2"/>
   <path d="M390 232 V182 Q390 166 410 166 Q430 166 430 182 V232Z" fill="#1a1622" ${ln(1.8)}/><path d="M395 232 V184 Q395 172 410 172 Q425 172 425 184 V232" fill="none" stroke="#3d3a4c" stroke-width="2"/><path d="M406 196 h8 M410 192 v8" stroke="#c9a227" stroke-width="1.4"/>`;
  o+=fog(222,R,'#b8c4e8',.2)+fog(240,R,'#b8c4e8',.14)+`<rect width="480" height="300" fill="url(#a_vign)"/>`;
  return o; };

/* ---------------- FARO ---------------- */
ART.faro=()=>{ const R=S(67); let o=defs()+`<rect width="480" height="300" fill="url(#a_night)"/>`+stars(R,70,150)+moon(80,40,12)+clouds(R,4,20,110,'#25306a');
  o+=`<g class="beam"><path d="M338 22 L620 2 L620 44Z" fill="#fff6c9" opacity=".16"/><path d="M338 22 L56 2 L56 44Z" fill="#fff6c9" opacity=".07"/></g>`;
  o+=`<rect y="150" width="480" height="90" fill="url(#a_sea)"/>`+Array.from({length:24},()=>{ const x=R()*480, y=154+R()*70; return `<path d="M${x.toFixed(1)} ${y.toFixed(1)} q6 -3 12 0" stroke="#7fa6d9" stroke-opacity="${(.25+R()*.35).toFixed(2)}" fill="none"/>`; }).join('')+Array.from({length:7},(_,i)=>`<path d="M${74-i*2+R()*6} ${160+i*9} h${8+R()*12}" stroke="#fff4cf" stroke-opacity="${(.6-i*.06).toFixed(2)}" stroke-width="2" stroke-linecap="round"/>`).join('');
  // scogliera
  o+=`<path d="${wob([[0,236],[30,206],[70,214],[110,196],[160,208],[220,198],[260,214],[300,202],[380,208],[430,198],[480,210],[480,300],[0,300]],R,2)}" fill="#3a3a48" ${ln(2)}/>`+Array.from({length:18},()=>{ const x=R()*480, y=214+R()*80, w=14+R()*26; return `<path d="${wob([[x,y],[x+w,y-4],[x+w+4,y+8],[x-2,y+10]],R,2)}" fill="${R()<.5?'#4a4a5a':'#2e2e3a'}" ${ln(1.2)}/>`; }).join('');
  o+=`<path d="M40 204 q40 -14 80 -4 q50 -12 100 2" stroke="#e9f1ff" stroke-opacity=".5" stroke-width="2" fill="none" class="drift"/>`;
  // casetta (hotspot 105,190)
  o+=shadowE(105,232,52,4)+`<path d="${box(58,160,94,70,R,1.2)}" fill="#c9bfa8" ${ln(1.8)}/>`+stains(58,160,94,70,R,6)+`<path d="${wob([[50,162],[105,128],[160,162]],R,1)}" fill="#7a2e22" ${ln(1.8)}/><path d="${box(72,186,22,44,R,.8)}" fill="url(#a_wood)" ${ln(1.4)}/>`+win(112,176,20,18,R,{lit:true,open:true,shut:'#2f5d74'})+`<path d="M136 128 v-14 h10 v24" fill="#7a2e22" ${ln(1.2)}/><path d="M141 110 q-4 -10 4 -18 q8 -8 2 -18" stroke="#cfd6e8" stroke-opacity=".35" stroke-width="4" fill="none" class="smoke"/>`;
  // faro (porta 338,210; lanterna 338,16)
  o+=shadowE(338,234,40,5,.5)+`<path d="${wob([[314,232],[322,40],[354,40],[362,232]],R,1)}" fill="#f1ece0" ${ln(2)}/>`+[60,100,140,180].map((y,i)=>`<path d="M${322-i*2-(y-40)*0.04} ${y} L${354+i*2+(y-40)*0.04} ${y} L${355+i*2+(y-40)*.04} ${y+18} L${321-i*2-(y-40)*.04} ${y+18}Z" fill="#c0392b" ${ln(1.2)}/>`).join('')+`<path d="M340 40 L346 232" stroke="#000" stroke-opacity=".15" stroke-width="10"/>
   <path d="M312 40 H364 v-6 H312Z" fill="#2a2e36" ${ln(1.4)}/><path d="${box(320,8,36,26,R,.6)}" fill="#fff6c9" ${ln(1.6)}/><path d="M326 8 v26 M338 8 v26 M350 8 v26" stroke="${OL}" stroke-width="1.2"/><path d="M316 8 L338 -6 L360 8Z" fill="#2a2e36" ${ln(1.4)}/>${glow(338,21,80,1)}
   <path d="${wob([[324,232],[324,196],[352,196],[352,232]],R,.8)}" fill="#3a2412" ${ln(1.6)}/><path d="M324 196 Q338 184 352 196" fill="#3a2412" ${ln(1.4)}/><circle cx="347" cy="214" r="1.6" fill="#c9a227"/>`+win(331,120,14,16,R,{lit:true,open:false,shut:'#2f5d74'}).replace(/<rect[^>]*opacity=".25"\/>/,'');
  // salvagente (hotspot 420,205)
  o+=`<path d="M420 236 V180" stroke="${OL}" stroke-width="3"/><circle cx="420" cy="200" r="14" fill="none" stroke="${OL}" stroke-width="9"/><circle cx="420" cy="200" r="14" fill="none" stroke="#f1faee" stroke-width="7"/>`+[0,1,2,3].map(i=>{ const a=i*Math.PI/2+.4; return `<path d="M${420+Math.cos(a)*10.5} ${200+Math.sin(a)*10.5} L${420+Math.cos(a)*17.5} ${200+Math.sin(a)*17.5}" stroke="#e63946" stroke-width="7"/>`; }).join('');
  o+=fog(232,R,'#c9d6f2',.14)+`<rect width="480" height="300" fill="url(#a_vign)"/>`;
  return o; };

/* ---------------- montaggio ---------------- */
window.AV_ART=ART;
const NIGHT=window.AV_NIGHT=['piazza','porto','cimitero','faro','beach','park','garden','woods'];
window.AV_KIT={S,OL,ln,wob,box,F_,it,defs,stars,moon,clouds,glow,win,stains,cobbles,planks,lamp,shadowE,roofTiles,laundry,cat,fog};
function nightTint(on){ try{ const v=on?'brightness(.82) saturate(.85) hue-rotate(-6deg)':''; holG.style.filter=v; const L=document.getElementById('npcs'); if (L) L.style.filter=v; }catch(e){} }
const useArt=r=>window.ADV && ART[r] && typeof CHN==='function' && CHN()===1;
const wrap=()=>{ const old=window.drawRoom; window.drawRoom=function(r){ const out=old.apply(this,arguments); try{ if (useArt(r)){ backL.innerHTML=ART[r](); frontL.innerHTML=''; } nightTint(useArt(r) && NIGHT.includes(r)); }catch(e){ console.warn('art',e); } return out; }; try{ if (window.ADV && typeof H!=='undefined' && H.room && useArt(H.room)) drawRoom(H.room); }catch(e){} };
if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',wrap); else wrap();
})();
