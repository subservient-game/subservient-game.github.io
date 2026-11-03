/* ================= ARTE DIPINTA — capitolo 1, interni e spiaggia/parco ================= */
(()=>{ if (!window.ADV || !window.AV_KIT || !window.AV_ART) return;
const {S,OL,ln,wob,box,F_,it,defs,stars,moon,clouds,glow,win,stains,cobbles,planks,lamp,shadowE,fog}=AV_KIT; const ART=AV_ART;
const vign=`<rect width="480" height="300" fill="url(#a_vign)"/>`;
function wall(col,R,{paper=true,wains=null,y1=232}={}){ let o=`<rect width="480" height="${y1}" fill="${col}"/>`; if (paper) o+=`<rect width="480" height="${y1}" fill="url(#a_paper)"/>`; o+=stains(0,0,480,y1,R,10,'#3a2410',.06); if (wains){ o+=`<rect y="${y1-70}" width="480" height="70" fill="${wains}"/><path d="M0 ${y1-70} H480" stroke="${OL}" stroke-width="2"/><path d="M0 ${y1-66} H480" stroke="#fff" stroke-opacity=".15" stroke-width="2"/>`+Array.from({length:9},(_,i)=>`<path d="${box(8+i*54,y1-58,44,48,R,.8)}" fill="none" stroke="#000" stroke-opacity=".25" stroke-width="1.2"/>`).join(''); } return o+`<rect width="480" height="${y1}" fill="url(#a_shadeDown)" opacity=".35"/><rect width="480" height="10" fill="#000" opacity=".25"/>`; }
function floorWood(R){ return `<rect y="232" width="480" height="68" fill="#5c3a20"/>`+planks(232,R,'#6e4527','#5c3a20')+`<path d="M0 232 H480" stroke="${OL}" stroke-width="2.5"/><rect y="232" width="480" height="5" fill="#000" opacity=".35"/>`; }
function floorTiles(R,a='#d9d2c3',b='#b8ae9a'){ let o=`<rect y="232" width="480" height="68" fill="${a}"/>`; for(let r=0;r<5;r++){ const y=232+Math.pow(r/5,1.4)*68, y2=232+Math.pow((r+1)/5,1.4)*68; for(let c=-6;c<18;c++){ const x1=240+(c*40-240)*(1+r*.18), x2=240+((c+1)*40-240)*(1+r*.18), x3=240+((c+1)*40-240)*(1+(r+1)*.18), x4=240+(c*40-240)*(1+(r+1)*.18); if ((r+c)%2) o+=`<path d="M${x1.toFixed(1)} ${y.toFixed(1)} L${x2.toFixed(1)} ${y.toFixed(1)} L${x3.toFixed(1)} ${y2.toFixed(1)} L${x4.toFixed(1)} ${y2.toFixed(1)}Z" fill="${b}"/>`; } } return o+`<rect y="232" width="480" height="68" fill="url(#a_shadeUp)" opacity=".35"/><path d="M0 232 H480" stroke="${OL}" stroke-width="2.5"/>`; }
function ceilLamp(x,len=30,shade='#c9a227'){ return `<path d="M${x} 0 V${len}" stroke="${OL}" stroke-width="1.4"/><path d="M${x-16} ${len+14} L${x+16} ${len+14} L${x+8} ${len} L${x-8} ${len}Z" fill="${shade}" ${ln(1.4)}/><path d="M${x-14} ${len+14} H${x+14}" stroke="#fff3c4" stroke-width="2"/>${glow(x,len+18,110,.9)}<path d="M${x-14} ${len+15} L${x-90} 232 L${x+90} 232 L${x+14} ${len+15}Z" fill="url(#a_cone)" opacity=".35"/>`; }
function nightWin(x,y,w,h,R,curt='#7a1e1e'){ return `<path d="${box(x-4,y-4,w+8,h+8,R,1)}" fill="#e9e2cf" ${ln(1.6)}/><path d="${box(x,y,w,h,R,.6)}" fill="url(#a_night)" ${ln(1)}/>${moon(x+w*.7,y+h*.3,Math.min(w,h)*.1)}<path d="M${x+w/2} ${y} V${y+h} M${x} ${y+h/2} H${x+w}" stroke="#e9e2cf" stroke-width="3"/><path d="M${x-10} ${y-8} Q${x} ${y+h/2} ${x-6} ${y+h+10} L${x+8} ${y+h+10} Q${x+4} ${y+h/2} ${x+12} ${y-8}Z M${x+w+10} ${y-8} Q${x+w} ${y+h/2} ${x+w+6} ${y+h+10} L${x+w-8} ${y+h+10} Q${x+w-4} ${y+h/2} ${x+w-12} ${y-8}Z" fill="${curt}" ${ln(1.2)}/><path d="${box(x-8,y+h+4,w+16,5,R,.5)}" fill="#e9e2cf" ${ln(1)}/><path d="M${x} ${y+h} L${x-60} 300 L${x+w+60} 300 L${x+w} ${y+h}Z" fill="#9fb3ff" opacity=".05"/>`; }
function frame(x,y,w,h,R,inner){ return `<path d="${box(x,y,w,h,R,.8)}" fill="#8a5a33" ${ln(1.6)}/><path d="${box(x+4,y+4,w-8,h-8,R,.5)}" fill="#e9dcae" ${ln(1)}/>${inner||''}`; }

/* ---------------- SOGGIORNO ---------------- */
ART.living=()=>{ const R=S(101); let o=defs()+wall('#d8c9a3',R,{wains:'#6e4a2c'});
  o+=nightWin(194,42,72,64,R);
  o+=frame(300,40,60,46,R,`<path d="M308 78 L322 58 L332 70 L340 62 L352 78Z" fill="#5a8a5a"/><circle cx="342" cy="54" r="5" fill="#e76f51"/>`)+`<circle cx="384" cy="58" r="12" fill="#f1e8cf" ${ln(1.6)}/><path d="M384 58 V50 M384 58 L390 61" stroke="${OL}" stroke-width="1.3"/>`;
  // libreria (hotspot 100,80)
  o+=`<path d="${box(62,38,76,86,R,1)}" fill="url(#a_wood)" ${ln(1.8)}/>`+[64,92].map(y=>`<path d="M64 ${y} H136" stroke="${OL}" stroke-width="2"/>`).join('')+Array.from({length:16},(_,i)=>{ const row=i<8?0:1, k=i%8, x=67+k*8.4, h=18+R()*6, y=(row?90:62)-h; return `<path d="${box(x,y,7,h,R,.4)}" fill="${['#7a1e1e','#2f5d74','#c9a227','#2d6a4f','#6a3a7a','#b5401e'][Math.floor(R()*6)]}" ${ln(.8)}/>`; }).join('')+`<path d="M68 120 h28 v-6 h-28z" fill="#e9dcae" ${ln(.8)}/><path d="M104 120 q8 -16 18 0z" fill="#9aa1ab" ${ln(.8)}/>`;
  o+=ceilLamp(240,20);
  o+=floorWood(R)+`<ellipse cx="240" cy="270" rx="150" ry="20" fill="#7a1e1e" ${ln(1.6)}/><ellipse cx="240" cy="270" rx="130" ry="15" fill="none" stroke="#c9a227" stroke-width="1.6" stroke-dasharray="5 4"/><ellipse cx="240" cy="270" rx="60" ry="6" fill="#a83232"/>`;
  // divano (hotspot 110,205)
  o+=shadowE(110,234,70,5,.45)+`<path d="${box(46,172,128,36,R,1.2)}" fill="#2f5d74" ${ln(2)}/><path d="${box(40,196,140,30,R,1.2)}" fill="#3a7090" ${ln(2)}/><path d="${box(34,188,18,40,R,1)}" fill="#2f5d74" ${ln(1.8)}/><path d="${box(168,188,18,40,R,1)}" fill="#2f5d74" ${ln(1.8)}/><path d="M110 198 V224" stroke="#000" stroke-opacity=".25" stroke-width="1.5"/><path d="M50 176 Q110 168 170 176" stroke="#fff" stroke-opacity=".15" stroke-width="3" fill="none"/><path d="M50 228 v6 M170 228 v6" stroke="${OL}" stroke-width="3"/>
   <path d="${box(52,172,26,20,R,1)}" fill="#c0392b" ${ln(1.4)}/><path d="M56 178 h18 M56 184 h18" stroke="#fff" stroke-opacity=".3"/>`;
  // pianta (hotspot 198,195)
  o+=`<path d="${box(188,200,22,30,R,1)}" fill="#b5401e" ${ln(1.6)}/>`+Array.from({length:7},(_,i)=>{ const a=-1.5+i*.5; return `<path d="M199 202 Q${199+Math.cos(a-1.57)*14} ${190+Math.sin(a)*4} ${199+Math.cos(a-1.57)*20} ${168+R()*8}" stroke="#2d6a4f" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M199 202 Q${199+Math.cos(a-1.57)*14} ${190+Math.sin(a)*4} ${199+Math.cos(a-1.57)*20} ${168+R()*8}" stroke="#52b788" stroke-width="2.5" fill="none" stroke-linecap="round"/>`; }).join('');
  // tv (hotspot 330,172) su mobile
  o+=shadowE(330,234,46,4)+`<path d="${box(290,196,82,36,R,1)}" fill="url(#a_wood)" ${ln(1.8)}/><path d="M296 210 h70 M331 198 v32" stroke="${OL}" stroke-width="1.2"/><path d="${box(298,140,64,46,R,1)}" fill="#3a3f4a" ${ln(2)}/><path d="${box(303,145,46,36,R,.6)}" fill="#3a5a8a" ${ln(1)}/><path d="M306 148 l16 0 l-16 14z" fill="#fff" opacity=".15"/><circle cx="356" cy="152" r="2.2" fill="#c9a227"/><circle cx="356" cy="160" r="2.2" fill="#c9a227"/><path d="M318 140 l-8 -14 M342 140 l8 -14" stroke="${OL}" stroke-width="1.4"/>${glow(326,163,60,.35)}`;
  // radio (hotspot 418,196)
  o+=`<path d="${box(404,212,30,20,R,1)}" fill="url(#a_wood)" ${ln(1.6)}/><path d="M406 232 v4 M432 232 v4" stroke="${OL}" stroke-width="2"/><path d="${box(398,182,40,30,R,1)}" fill="#8a3a1c" ${ln(1.8)}/><circle cx="410" cy="197" r="8" fill="#c9a77a" ${ln(1.2)}/><path d="M405 192 h10 M404 197 h12 M405 202 h10" stroke="#5a3720" stroke-width="1"/><path d="${box(422,188,12,8,R,.4)}" fill="#ffd166" ${ln(.8)}/><circle cx="428" cy="204" r="2.4" fill="#2a2e36"/><path d="M432 182 L446 160" stroke="${OL}" stroke-width="1.6"/>
   <g class="flick"><path d="M440 176 q6 -4 10 0 M444 170 q6 -4 10 0" stroke="#ffd166" stroke-width="1.2" fill="none" opacity=".7"/></g>`;
  // lampada da terra
  o+=`<path d="M462 120 V230" stroke="${OL}" stroke-width="3"/><path d="M452 232 h20" stroke="${OL}" stroke-width="4"/><path d="M448 122 L476 122 L470 100 L454 100Z" fill="#f1e1a6" ${ln(1.6)}/>${glow(462,118,70,.8)}`;
  o+=vign; return o; };

/* ---------------- CUCINA ---------------- */
ART.kitchen=()=>{ const R=S(103); let o=defs()+wall('#e8d9b5',R,{paper:false});
  o+=Array.from({length:24},(_,i)=>`<path d="M${(i%12)*40} ${110+Math.floor(i/12)*0} h40" stroke="none"/>`).join('')+`<rect y="100" width="480" height="70" fill="#f1faee"/>`+Array.from({length:24},(_,i)=>`<path d="${box(i*20,100+((i%2)?0:0),20,14,R,.3)}" fill="none" stroke="#9fc3c7" stroke-width=".7"/>`).join('')+Array.from({length:5},(_,r)=>Array.from({length:24},(_,c)=>`<rect x="${c*20}" y="${100+r*14}" width="20" height="14" fill="${(r+c)%2?'#d6eef0':'#f1faee'}" stroke="#9fc3c7" stroke-width=".5"/>`).join('')).join('');
  o+=nightWin(320,30,64,56,R,'#2a9d8f')+`<path d="M200 0 V24" stroke="${OL}"/><path d="M186 38 L214 38 L208 24 L192 24Z" fill="#e9e2cf" ${ln(1.2)}/>${glow(200,40,90,.8)}`;
  // pensili
  o+=`<path d="${box(100,30,180,50,R,1)}" fill="#7a9a6a" ${ln(1.8)}/>`+[100,145,190,235].map(x=>`<path d="${box(x+4,34,38,42,R,.5)}" fill="none" stroke="${OL}" stroke-width="1"/><circle cx="${x+36}" cy="56" r="1.6" fill="#c9a227"/>`).join('');
  o+=floorTiles(R,'#e9e2cf','#b5401e');
  // bancone con fornelli, lavandino
  o+=`<path d="${box(100,180,200,52,R,1)}" fill="#7a9a6a" ${ln(1.8)}/><path d="${box(96,172,208,10,R,.8)}" fill="#c9bfa8" ${ln(1.6)}/>`+[100,150,200,250].map(x=>`<path d="${box(x+5,186,40,40,R,.6)}" fill="none" stroke="${OL}" stroke-width="1"/><path d="M${x+20} 192 h10" stroke="#c9a227" stroke-width="2"/>`).join('');
  // fornelli (hotspot 160,165)
  o+=`<ellipse cx="146" cy="170" rx="11" ry="3" fill="#2a2e36" ${ln(1)}/><ellipse cx="176" cy="170" rx="11" ry="3" fill="#2a2e36" ${ln(1)}/><g class="flick"><path d="M140 168 q6 -5 12 0" stroke="#4cc9f0" stroke-width="1.4" fill="none"/></g><path d="M166 166 h20 v-14 h-20z" fill="#9aa1ab" ${ln(1.2)}/><path d="M164 152 h24" stroke="${OL}" stroke-width="2"/>`;
  // lavandino (hotspot 236,172)
  o+=`<path d="M214 172 h44 l-4 10 h-36z" fill="#cfd6e0" ${ln(1.2)}/><path d="M236 172 V154 q0 -6 8 -6 h4" stroke="#9aa1ab" stroke-width="3" fill="none"/><path d="M236 172 V154 q0 -6 8 -6 h4" stroke="${OL}" stroke-width="1" fill="none" opacity=".5"/><path d="M226 168 l4 -10 h8 l-2 10z" fill="#f1faee" ${ln(.8)}/>`;
  // moka (hotspot 280,150)
  o+=`<path d="M272 172 l2 -12 h12 l2 12z" fill="#9aa1ab" ${ln(1.2)}/><path d="M274 160 l2 -10 h8 l2 10z" fill="#b8bec6" ${ln(1.2)}/><path d="M276 150 l4 -5 l4 5z" fill="#2a2e36"/><path d="M286 156 q6 0 4 8" stroke="${OL}" stroke-width="1.4" fill="none"/>`;
  // frigo (hotspot 51,150)
  o+=shadowE(51,234,34,4)+`<path d="M22 232 V100 Q22 86 36 86 H66 Q80 86 80 100 V232Z" fill="#f1ece0" ${ln(2)}/><path d="M22 140 H80" stroke="${OL}" stroke-width="1.6"/><path d="M70 104 v24 M70 152 v40" stroke="#9aa1ab" stroke-width="4" stroke-linecap="round"/><path d="M30 94 q20 -4 44 0" stroke="#fff" stroke-width="3" fill="none" opacity=".6"/><circle cx="40" cy="160" r="4" fill="#e63946"/><path d="M48 170 h10 v12 h-10z" fill="#ffd166" transform="rotate(8 53 176)"/>`;
  // tavolo (hotspot 410,190)
  o+=shadowE(410,236,52,5,.45)+`<path d="${box(364,182,92,8,R,1)}" fill="#a87a4a" ${ln(1.6)}/><path d="M362 186 Q410 196 458 186 L452 204 Q410 210 368 204Z" fill="#e63946" opacity=".9" ${ln(1)}/>`+Array.from({length:6},(_,i)=>`<path d="M${370+i*14} 190 l7 14 M${377+i*14} 190 l-7 14" stroke="#fff" stroke-opacity=".5"/>`).join('')+`<path d="M372 204 V232 M448 204 V232" stroke="${OL}" stroke-width="4"/><path d="M400 182 l2 -10 h12 l2 10z" fill="#f1faee" ${ln(.8)}/><path d="M432 182 q0 -8 6 -8 q6 0 6 8z" fill="#ffd166" ${ln(.8)}/>`;
  o+=vign; return o; };

/* ---------------- BAGNO ---------------- */
ART.bathroom=()=>{ const R=S(107); let o=defs()+`<rect width="480" height="232" fill="#cfe3e6"/>`+Array.from({length:12},(_,r)=>Array.from({length:24},(_,c)=>`<rect x="${c*20+(r%2)*10}" y="${r*20}" width="20" height="20" fill="${(r*7+c*3)%11===0?'#9fc3c7':'#dceff1'}" stroke="#a9c8cc" stroke-width=".6"/>`).join('')).join('')+stains(0,0,480,232,R,8,'#3a5a5a',.07)+`<rect width="480" height="232" fill="url(#a_shadeDown)" opacity=".3"/>`;
  o+=nightWin(400,40,46,40,R,'#f1faee')+ceilLamp(200,14,'#f1faee');
  o+=floorTiles(R,'#f1faee','#2a2e36');
  // doccia (hotspot 335,120)
  o+=`<path d="${box(290,46,92,186,R,1)}" fill="#e6f3f5" opacity=".6" ${ln(1.8)}/><path d="M296 52 V226 M376 52 V226" stroke="#fff" stroke-opacity=".5" stroke-width="3"/><path d="M290 46 H382" stroke="#9aa1ab" stroke-width="4"/><path d="M300 46 q4 60 -2 186 h20 q-8 -100 0 -186z" fill="#ffd6e0" opacity=".85" ${ln(1)}/><path d="M360 60 v-8 h10" stroke="#9aa1ab" stroke-width="3" fill="none"/><path d="M352 66 h16 l-4 -6 h-8z" fill="#9aa1ab" ${ln(1)}/>`+Array.from({length:6},(_,i)=>`<path d="M${352+i*3} 70 v${8+i%3*4}" stroke="#9fd3e0" stroke-opacity=".6"/>`).join('');
  // asciugamano (hotspot 432,140)
  o+=`<path d="M414 112 H452" stroke="#9aa1ab" stroke-width="3"/><path d="M416 112 h32 v52 q-16 6 -32 0z" fill="#ffd166" ${ln(1.4)}/><path d="M416 150 h32" stroke="#e76f51" stroke-width="4"/>`;
  // lavandino e specchio (hotspot 190,176)
  o+=`<path d="${box(170,90,44,56,R,1)}" fill="#c9d6e0" ${ln(1.8)}/><path d="M176 96 l12 0 l-12 14z" fill="#fff" opacity=".4"/><path d="M168 172 h46 q-4 14 -23 14 q-19 0 -23 -14z" fill="#f1faee" ${ln(1.6)}/><path d="M186 186 h10 v46 h-10z" fill="#f1faee" ${ln(1.4)}/><path d="M191 172 V162 q0 -5 6 -5" stroke="#9aa1ab" stroke-width="2.6" fill="none"/><path d="M204 168 l3 -8 h6 l-1 8z" fill="#a8dadc" ${ln(.6)}/>`;
  // water e carta igienica (hotspot 78,212 e 136,196)
  o+=shadowE(78,236,34,4)+`<path d="${box(52,170,36,34,R,1)}" fill="#f1faee" ${ln(1.6)}/><path d="M48 206 h62 q-2 18 -24 22 l2 6 h-20 l2 -6 q-20 -6 -22 -22z" fill="#f1faee" ${ln(1.8)}/><path d="M50 206 h58" stroke="#c9d6e0" stroke-width="3"/><path d="M60 178 h10" stroke="#9aa1ab" stroke-width="2"/>
   <path d="M128 192 h18" stroke="#9aa1ab" stroke-width="2"/><rect x="129" y="192" width="14" height="14" rx="3" fill="#fff" ${ln(1.2)}/><path d="M136 206 v14 h6" stroke="#fff" stroke-width="5"/><path d="M136 206 v14 h6" stroke="${OL}" stroke-width=".6" fill="none" opacity=".5"/>`;
  o+=`<path d="M250 232 q10 -4 18 0 q-4 4 -18 0z" fill="#9fd3e0" opacity=".6"/>`+vign; return o; };

/* ---------------- CAMERA DA LETTO ---------------- */
ART.bedroom=()=>{ const R=S(109); let o=defs()+wall('#b9a3c9',R,{wains:'#5a4070'});
  o+=nightWin(70,36,60,60,R,'#4a2a6a')+frame(150,40,40,52,R,`<circle cx="170" cy="62" r="8" fill="#e76f51"/><path d="M158 84 q12 -12 24 0z" fill="#2d6a4f"/>`)+`<path d="M200 60 l18 -6 l6 16 l-18 6z" fill="#ffd166" ${ln(1)}/><path d="M232 52 l22 4 l-4 18 l-22 -4z" fill="#a8dadc" ${ln(1)}/>`;
  o+=floorWood(R)+`<path d="${box(140,248,140,30,R,1)}" fill="#4a2a6a" ${ln(1.4)}/>`;
  // letto (hotspot 170,196)
  o+=shadowE(170,236,70,5,.45)+`<path d="${box(108,150,14,84,R,1)}" fill="url(#a_wood)" ${ln(1.8)}/><path d="${box(116,196,124,30,R,1)}" fill="#5a3720" ${ln(1.8)}/><path d="${box(118,184,120,18,R,1)}" fill="#f1faee" ${ln(1.6)}/><path d="${box(150,180,92,28,R,1.4)}" fill="#e76f51" ${ln(1.8)}/><path d="M156 186 h80 M156 196 h80" stroke="#c0392b" stroke-width="2"/><path d="${box(124,174,30,14,R,1.2)}" fill="#fff" ${ln(1.4)}/>`;
  // comodino e abat-jour (hotspot 251,190)
  o+=`<path d="${box(238,200,28,32,R,1)}" fill="url(#a_wood)" ${ln(1.6)}/><path d="M244 212 h16" stroke="#c9a227" stroke-width="2"/><path d="M252 200 v-12" stroke="${OL}" stroke-width="2"/><path d="M242 188 h20 l-4 -12 h-12z" fill="#ffd166" ${ln(1.2)}/>${glow(252,186,70,.9)}`;
  // armadio (hotspot 308,160)
  o+=shadowE(308,236,40,4)+`<path d="${box(272,96,72,136,R,1.2)}" fill="url(#a_wood)" ${ln(2)}/><path d="M308 100 V228" stroke="${OL}" stroke-width="1.6"/><path d="${box(278,104,26,118,R,.6)}" fill="none" stroke="#000" stroke-opacity=".3"/><path d="${box(312,104,26,118,R,.6)}" fill="none" stroke="#000" stroke-opacity=".3"/><circle cx="302" cy="166" r="2" fill="#c9a227"/><circle cx="314" cy="166" r="2" fill="#c9a227"/><path d="M270 96 h76" stroke="${OL}" stroke-width="4"/><path d="M280 90 h24 v6 h-24z" fill="#a8dadc" ${ln(1)}/>`;
  // scrivania con computer (hotspot 398,168)
  o+=`<path d="${box(364,190,72,8,R,1)}" fill="#a87a4a" ${ln(1.6)}/><path d="M370 198 V232 M430 198 V232" stroke="${OL}" stroke-width="4"/><path d="${box(374,146,48,36,R,1)}" fill="#e9e2cf" ${ln(1.8)}/><path d="${box(379,151,38,24,R,.6)}" fill="#1d3557" ${ln(1)}/><path d="M384 158 h22 M384 164 h16" stroke="#4cc9f0" stroke-width="1.4"/><path d="M392 182 h12 l2 8 h-16z" fill="#e9e2cf" ${ln(1)}/><path d="${box(378,186,34,4,R,.4)}" fill="#cfcfcf" ${ln(.8)}/>${glow(398,163,50,.45)}`;
  // chitarra (hotspot 464,200)
  o+=`<g transform="rotate(-10 464 210)"><path d="M461 170 v-34 h6 v34" fill="#5a3720" ${ln(1.2)}/><path d="M458 136 h12 v-8 h-12z" fill="#3a2412" ${ln(1)}/><path d="M464 168 q-16 0 -14 18 q-8 4 -6 16 q2 14 20 14 q18 0 20 -14 q2 -12 -6 -16 q2 -18 -14 -18z" fill="#c9762a" ${ln(1.8)}/><circle cx="464" cy="192" r="5" fill="#2a1a10"/><path d="M462 136 V206 M466 136 V206" stroke="#eee" stroke-width=".5"/></g>`;
  o+=vign; return o; };

/* ---------------- GARAGE ---------------- */
ART.garage=()=>{ const R=S(113); let o=defs()+`<rect width="480" height="232" fill="#8a8e92"/>`+Array.from({length:7},(_,r)=>Array.from({length:12},(_,c)=>`<path d="${box(c*40+(r%2)*20-20,r*34,40,34,R,.6)}" fill="none" stroke="#000" stroke-opacity=".18"/>`).join('')).join('')+stains(0,0,480,232,R,16,'#2a2a2a',.1)+`<rect width="480" height="232" fill="url(#a_shadeDown)" opacity=".45"/>`;
  o+=`<path d="${box(250,20,90,60,R,1)}" fill="#3a3f4a" ${ln(1.6)}/>`+Array.from({length:6},(_,i)=>`<path d="M252 ${28+i*9} H338" stroke="#5a5f68" stroke-width="2.4"/>`).join('')+`<path d="M244 0 V12 M346 0 V12" stroke="${OL}"/><path d="M280 14 h30 l-4 -10 h-22z" fill="#f1faee" ${ln(1)}/>${glow(295,16,80,.8)}`;
  // pannello forato con attrezzi (hotspot 110,100)
  o+=`<path d="${box(30,40,160,120,R,1.2)}" fill="#b08a5a" ${ln(2)}/>`+Array.from({length:60},(_,i)=>`<circle cx="${40+(i%15)*10}" cy="${50+Math.floor(i/15)*28}" r="1.1" fill="#5a3720"/>`).join('')+
   `<path d="M48 60 l10 50 M44 60 h18" stroke="${OL}" stroke-width="3"/><path d="M48 60 l10 50" stroke="#c9a227" stroke-width="1.6"/><path d="M76 56 v46" stroke="${OL}" stroke-width="3"/><path d="M76 56 v46" stroke="#8a5a33" stroke-width="2"/><path d="M66 56 h20 v10 h-20z" fill="#9aa1ab" ${ln(1.2)}/>
   <path d="M102 58 v58" stroke="${OL}" stroke-width="3.4"/><path d="M102 58 v58" stroke="#8a5a33" stroke-width="2.2"/>${(!F_().axe||!window.avHas||!avHas('ascia'))&&!F_().receipt?'':''}<path d="M94 58 q12 -6 18 4 l-4 12 q-8 -8 -14 -16z" fill="#c9d6e0" ${ln(1.2)}/>
   <path d="M130 60 q0 20 6 30 q6 -10 6 -30" fill="none" stroke="${OL}" stroke-width="2"/><path d="M128 100 h16 v6 h-16z" fill="#e63946" ${ln(1)}/><path d="M160 58 l14 0 l-2 40 l-10 0z" fill="#9aa1ab" ${ln(1.2)}/><path d="M160 116 l20 -6 l4 14 l-20 6z" fill="#ffd166" ${ln(1)}/><path d="M56 130 h40 l-6 14 h-28z" fill="#2a9d8f" ${ln(1)}/>`;
  // gomme (hotspot 206,135)
  o+=[0,1,2,3].map(i=>`<ellipse cx="206" cy="${168-i*18}" rx="22" ry="9" fill="#1e1e22" ${ln(1.6)}/><ellipse cx="206" cy="${166-i*18}" rx="10" ry="3.6" fill="#3a3a40"/>`).join('');
  o+=`<rect y="232" width="480" height="68" fill="#6d7175"/>`+stains(0,232,480,68,R,10,'#111',.25)+`<ellipse cx="300" cy="270" rx="40" ry="8" fill="#111" opacity=".35"/><path d="M0 232 H480" stroke="${OL}" stroke-width="2.5"/><rect y="232" width="480" height="68" fill="url(#a_shadeUp)" opacity=".4"/>`;
  // banco attrezzi (hotspot 420,190)
  o+=shadowE(420,238,60,5,.45)+`<path d="${box(364,150,112,10,R,1)}" fill="#8a5a33" ${ln(1.8)}/><path d="M370 160 V234 M470 160 V234" stroke="${OL}" stroke-width="5"/><path d="M370 160 V234 M470 160 V234" stroke="#5a3720" stroke-width="3"/><path d="M370 206 H470" stroke="${OL}" stroke-width="3"/>
   <path d="M378 150 v-14 h20 v14z" fill="#e63946" ${ln(1.2)}/><path d="M380 136 h16 v-4 h-16z" fill="#2a2e36"/><path d="M412 150 l4 -10 h18 l4 10z" fill="#2a2e36" ${ln(1.2)}/><path d="M446 150 v-24 h6 v24" fill="#9aa1ab" ${ln(1)}/><path d="M380 206 v-18 h30 v18" fill="#3a3f4a" ${ln(1.2)}/>`;
  // tanica (hotspot 450,224)
  o+=`<path d="${box(440,212,22,24,R,1)}" fill="#c0392b" ${ln(1.6)}/><path d="M444 212 v-6 h8 v6" fill="none" stroke="${OL}" stroke-width="2"/><path d="M444 220 l14 12 M458 220 l-14 12" stroke="#7a1e1e" stroke-width="1.4"/>`;
  o+=vign; return o; };

/* ---------------- CANTINA ---------------- */
ART.cellar=()=>{ const R=S(127), f=F_(); let o=defs()+`<rect width="480" height="232" fill="#3a2c24"/>`+Array.from({length:10},(_,r)=>Array.from({length:14},(_,c)=>{ const x=c*36+(r%2)*18-18, y=r*24; return `<path d="${wob([[x+2,y+2],[x+34,y+3],[x+33,y+22],[x+3,y+21]],R,2)}" fill="${R()<.5?'#4a3a30':'#54443a'}" stroke="#1e140e" stroke-width="1"/>`; }).join('')).join('')+`<rect width="480" height="232" fill="url(#a_shadeDown)" opacity=".5"/>`;
  o+=`<path d="M0 0 Q240 60 480 0" fill="#1e140e" opacity=".6"/>`+`<path d="M120 0 V16" stroke="${OL}"/><circle cx="120" cy="22" r="6" fill="#ffe7a0" ${ln(1)}/>${glow(120,24,90,.9)}`;
  // salumi appesi (hotspot 340,128)
  o+=`<path d="M255 100 H425" stroke="#5a3720" stroke-width="4"/>`+Array.from({length:7},(_,i)=>{ const x=264+i*24, h=34+R()*20; return `<path d="M${x} 100 v6" stroke="#ddd"/><path d="M${x-7} ${106} q-2 ${h/2} ${7} ${h} q9 ${-h/2} 7 ${-h}z" fill="${i%2?'#8a2a1e':'#b5653a'}" ${ln(1.4)}/><path d="M${x-3} ${112} v${h-12}" stroke="#fff" stroke-opacity=".2" stroke-width="2"/>`; }).join('');
  o+=`<rect y="232" width="480" height="68" fill="#2a1e16"/>`+stains(0,232,480,68,R,10,'#000',.3)+`<path d="M0 232 H480" stroke="${OL}" stroke-width="2.5"/>`;
  if (f.trapdoor) o+=`<path d="${box(190,252,60,20,R,1)}" fill="#120a06" ${ln(1.6)}/><path d="M190 252 L176 236 H236 L250 252Z" fill="url(#a_wood)" ${ln(1.4)}/>`;
  else o+=`<path d="${box(190,252,60,20,R,1)}" fill="url(#a_wood)" ${ln(1.4)}/><path d="M200 252 v20 M220 252 v20 M240 252 v20" stroke="#000" stroke-opacity=".3"/><circle cx="234" cy="262" r="3" fill="none" stroke="#9aa1ab" stroke-width="1.6"/>`;
  // botti (hotspot 100,200)
  o+=[[46,186],[124,186],[85,148]].map(([x,y])=>`${shadowE(x,y+48,34,4,.4)}<ellipse cx="${x}" cy="${y+18}" rx="34" ry="30" fill="#7a4a26" ${ln(2)}/><ellipse cx="${x}" cy="${y+18}" rx="26" ry="23" fill="#8a5a33" ${ln(1)}/><ellipse cx="${x}" cy="${y+18}" rx="30" ry="27" fill="none" stroke="#2a2e36" stroke-width="2.4"/><circle cx="${x}" cy="${y+30}" r="3" fill="#3a2412"/><path d="M${x-14} ${y+6} q14 -6 28 0" stroke="#fff" stroke-opacity=".15" stroke-width="2" fill="none"/>`).join('');
  // bottiglie (hotspot 445,198)
  o+=`<path d="${box(418,148,54,86,R,1)}" fill="url(#a_wood)" ${ln(1.8)}/>`+[170,194,218].map(y=>`<path d="M420 ${y} H470" stroke="${OL}" stroke-width="2"/>`).join('')+Array.from({length:12},(_,i)=>{ const x=426+(i%4)*12, y=168+Math.floor(i/4)*24; return `<ellipse cx="${x}" cy="${y-5}" rx="5" ry="4.4" fill="${['#2d4a2a','#5a1e1e'][i%2]}" ${ln(.8)}/><circle cx="${x}" cy="${y-5}" r="1.6" fill="#c9a227"/>`; }).join('');
  o+=`<path d="M20 30 q10 10 0 22 q-6 -8 0 -22" fill="none" stroke="#ddd" stroke-opacity=".3"/><path d="M14 40 l14 4 M18 30 l6 22" stroke="#ddd" stroke-opacity=".25" stroke-width=".6"/>`+vign+`<rect width="480" height="300" fill="#000" opacity=".1"/>`; return o; };

/* ---------------- OSPEDALE ---------------- */
ART.hospital=()=>{ const R=S(131); let o=defs()+wall('#cfe0d8',R,{paper:false,wains:'#8fb3a8'});
  o+=Array.from({length:3},(_,i)=>`<path d="M${80+i*160} 0 V8" stroke="${OL}"/><path d="${box(60+i*160,8,40,6,R,.4)}" fill="#f1faee" ${ln(1)}/>${glow(80+i*160,16,80,.5)}`).join('');
  // croce rossa (hotspot 75,75)
  o+=`<circle cx="75" cy="75" r="34" fill="#f1faee" ${ln(1.8)}/><path d="M66 50 h18 v16 h16 v18 h-16 v16 h-18 v-16 h-16 v-18 h16z" fill="#e63946" ${ln(1.4)}/>`;
  // monitor (hotspot 190,95)
  o+=`<path d="${box(150,70,80,50,R,1)}" fill="#2a2e36" ${ln(2)}/><path d="${box(155,75,70,40,R,.6)}" fill="#0b1a12" ${ln(1)}/><path d="M158 96 h14 l4 -10 l5 20 l5 -14 l3 4 h40" stroke="#52ff8a" stroke-width="1.6" fill="none" class="flick"/><text x="218" y="84" font-size="6" fill="#52ff8a" font-family="monospace">72</text><path d="M190 120 v14" stroke="${OL}" stroke-width="3"/>${glow(190,95,50,.3)}`;
  o+=`<path d="${box(260,40,60,44,R,1)}" fill="#f1faee" ${ln(1.4)}/><text x="290" y="56" text-anchor="middle" font-size="6" font-weight="700" fill="#1d3557" font-family="Fredoka, sans-serif">${it()?'SILENZIO':'SILENCE'}</text><text x="290" y="70" text-anchor="middle" font-size="12">🤫</text>`;
  o+=floorTiles(R,'#e9eef0','#a8c4c8');
  // armadietto (hotspot 54,188)
  o+=shadowE(54,236,30,4)+`<path d="${box(26,150,56,82,R,1)}" fill="#e9eef0" ${ln(1.8)}/><path d="${box(30,154,48,36,R,.6)}" fill="#bfe0e6" opacity=".7" ${ln(1)}/>`+[0,1,2].map(i=>`<path d="M${36+i*14} 186 v-10 h8 v10z" fill="${['#ffd166','#e76f51','#a8dadc'][i]}" ${ln(.6)}/>`).join('')+`<path d="M54 194 V230" stroke="${OL}" stroke-width="1.2"/><circle cx="50" cy="212" r="1.6" fill="#9aa1ab"/><circle cx="58" cy="212" r="1.6" fill="#9aa1ab"/>`;
  // sedie d'attesa (hotspot 158,190)
  o+=[124,150,176].map(x=>`<path d="${box(x-2,172,24,22,R,1)}" fill="#2a9d8f" ${ln(1.4)}/><path d="${box(x-2,192,24,8,R,.6)}" fill="#2a9d8f" ${ln(1.4)}/><path d="M${x+2} 200 v32 M${x+18} 200 v32" stroke="${OL}" stroke-width="2.4"/>`).join('')+`<path d="M120 204 H200" stroke="#9aa1ab" stroke-width="3"/>`;
  // lettino (hotspot 340,215)
  o+=shadowE(340,238,74,5,.4)+`<path d="${box(270,198,140,14,R,1)}" fill="#f1faee" ${ln(1.8)}/><path d="${box(272,190,34,10,R,1)}" fill="#fff" ${ln(1.4)}/><path d="M276 212 V232 M404 212 V232" stroke="${OL}" stroke-width="3"/><circle cx="276" cy="234" r="3" fill="#2a2e36"/><circle cx="404" cy="234" r="3" fill="#2a2e36"/><path d="M300 198 q50 -6 106 2" stroke="#a8dadc" stroke-width="5" fill="none"/>
   <path d="M424 100 V232" stroke="#9aa1ab" stroke-width="3"/><path d="M414 104 h20 v26 q-10 6 -20 0z" fill="#d6eef0" opacity=".85" ${ln(1)}/><path d="M424 130 Q420 170 400 196" stroke="#9aa1ab" stroke-width="1" fill="none"/>`;
  // erogatore (hotspot 456,200)
  o+=`<path d="${box(444,206,26,28,R,1)}" fill="#e9eef0" ${ln(1.6)}/><path d="M446 170 h22 v36 h-22z" fill="#9fd3e0" opacity=".8" ${ln(1.4)}/><path d="M450 214 h4 M460 214 h4" stroke="#e63946" stroke-width="2"/>`;
  o+=vign; return o; };

/* ---------------- PIZZERIA ---------------- */
ART.pizzeria=()=>{ const R=S(137); let o=defs()+wall('#e9d5a8',R,{wains:'#7a2e22'});
  o+=`<path d="M0 0 H480 V20 H0Z" fill="#5a3720"/>`+Array.from({length:12},(_,i)=>`<path d="M${i*40} 20 v-20" stroke="#3a2412" stroke-width="2"/>`).join('')+`<path d="M10 40 Q120 54 240 40 T470 40" stroke="#2d6a4f" stroke-width="2" fill="none"/>`+Array.from({length:14},(_,i)=>`<circle cx="${20+i*33}" cy="${44+Math.sin(i)*4}" r="3.2" fill="${['#e63946','#f1faee','#2d6a4f'][i%3]}" ${ln(.6)}/>`).join('');
  o+=`<path d="${box(40,60,70,50,R,1)}" fill="#f1faee" ${ln(1.4)}/><path d="M48 104 q28 -40 54 0z" fill="#3a6a9a"/><path d="M60 88 l12 -16 l10 14z" fill="#8a8e92"/><text x="75" y="70" text-anchor="middle" font-size="5.5" fill="#3a2412" font-family="serif">NAPOLI</text>`;
  // menù (hotspot 242,120)
  o+=`<path d="${box(212,82,62,80,R,1)}" fill="#1e1e22" ${ln(1.8)}/><text x="243" y="96" text-anchor="middle" font-size="8" font-weight="700" fill="#ffd166" font-family="Fredoka, sans-serif">MENÙ</text>`+['Margherita','Diavola','Capricciosa','4 Formaggi','Marinara'].map((t,i)=>`<text x="218" y="${110+i*11}" font-size="5.2" fill="#f1faee" font-family="Fredoka, sans-serif">${t}</text><text x="268" y="${110+i*11}" text-anchor="end" font-size="5.2" fill="#ffd166" font-family="Fredoka, sans-serif">${5+i}</text>`).join('');
  o+=floorTiles(R,'#efe6d0','#7a2e22');
  // tavolo (hotspot 155,200)
  o+=shadowE(155,238,52,5,.45)+`<path d="M108 196 Q155 186 202 196 L196 214 Q155 222 114 214Z" fill="#f1faee" ${ln(1.6)}/>`+Array.from({length:7},(_,i)=>`<path d="M${114+i*13} 194 l6 22" stroke="#e63946" stroke-width="3" opacity=".8"/>`).join('')+`<path d="M122 214 V234 M188 214 V234" stroke="${OL}" stroke-width="4"/><ellipse cx="150" cy="192" rx="16" ry="4" fill="#f4d03f" ${ln(1)}/><circle cx="146" cy="191" r="2" fill="#e63946"/><circle cx="154" cy="192" r="2" fill="#e63946"/><path d="M178 192 v-14 q0 -4 4 -4 q4 0 4 4 v14z" fill="#2d6a4f" ${ln(1)}/><path d="M181 168 v6" stroke="#c9a227" stroke-width="2"/>${glow(182,170,30,.6)}`;
  // forno (hotspot 390,200)
  o+=shadowE(390,240,66,5,.5)+`<path d="${wob([[330,234],[330,180],[352,146],[390,134],[428,146],[450,180],[450,234]],R,1.6)}" fill="#b5653a" ${ln(2.2)}/>`+Array.from({length:16},()=>`<path d="${box(334+R()*104,140+R()*90,14,7,R,.8)}" fill="none" stroke="#7a3a1e" stroke-width="1"/>`).join('')+`<path d="M358 234 V200 Q390 166 422 200 V234Z" fill="#1e0e06" ${ln(2)}/><path d="M364 234 Q390 210 416 234" fill="#ff7b29" class="flick"/><path d="M372 234 Q390 218 408 234" fill="#ffd166" class="flick"/>${glow(390,222,80,1)}<path d="M382 134 V96 h16 v38" fill="#7a3a1e" ${ln(1.6)}/>
   <path d="M330 210 l-60 30" stroke="${OL}" stroke-width="3"/><path d="M330 210 l-60 30" stroke="#a87a4a" stroke-width="1.6"/><ellipse cx="266" cy="242" rx="14" ry="5" fill="#a87a4a" ${ln(1.2)}/>`;
  o+=vign; return o; };

/* ---------------- KARAOKE ---------------- */
ART.karaoke=()=>{ const R=S(139); let o=defs()+`<rect width="480" height="232" fill="#1e1030"/>`+Array.from({length:16},(_,i)=>`<path d="M${i*30} 0 V232" stroke="#2c1846" stroke-width="14"/>`).join('')+`<rect width="480" height="232" fill="url(#a_shadeDown)" opacity=".5"/>`;
  o+=[[60,'#ff4d9d'],[420,'#4cc9f0']].map(([x,c])=>`<path d="M${x} 0 L${x-60} 232 L${x+60} 232Z" fill="${c}" opacity=".12" class="flick"/>`).join('');
  // schermo (hotspot 240,80)
  o+=`<path d="${box(168,34,144,90,R,1)}" fill="#2a2e36" ${ln(2)}/><path d="${box(174,40,132,76,R,.6)}" fill="#1d3557" ${ln(1)}/><text x="240" y="72" text-anchor="middle" font-size="9" font-weight="700" fill="#ffd166" font-family="Fredoka, sans-serif">♪ ${it()?'Volare oh oh':'Volare oh oh'} ♪</text><path d="M188 84 H292" stroke="#ff4d9d" stroke-width="3"/><path d="M188 84 H240" stroke="#ffd166" stroke-width="3"/>${glow(240,78,90,.4)}`;
  // palla stroboscopica (hotspot 240,120)
  o+=`<path d="M240 0 V108" stroke="#9aa1ab"/><circle cx="240" cy="120" r="13" fill="#cfd6e0" ${ln(1.6)}/>`+Array.from({length:12},(_,i)=>`<path d="M${229+(i%4)*6} ${110+Math.floor(i/4)*7} h5 v5 h-5z" fill="${i%3?'#f1faee':'#9fd3e0'}" opacity=".9"/>`).join('')+Array.from({length:14},()=>`<circle cx="${R()*480}" cy="${R()*232}" r="${1+R()*2}" fill="#fff" opacity=".5" class="twk"/>`).join('');
  o+=`<rect y="232" width="480" height="68" fill="#140a20"/>`+Array.from({length:6},(_,r)=>Array.from({length:12},(_,c)=>`<rect x="${c*40+(r%2)*20-20}" y="${236+r*11}" width="38" height="9" fill="${['#ff4d9d','#4cc9f0','#ffd166','#7b2cbf'][(r+c)%4]}" opacity=".35"/>`).join('')).join('')+`<path d="M0 232 H480" stroke="${OL}" stroke-width="2.5"/>`;
  // palco e microfono (hotspot 240,175)
  o+=`<path d="${box(150,214,180,18,R,1)}" fill="#4a2a6a" ${ln(1.8)}/><path d="M240 214 V160" stroke="${OL}" stroke-width="3"/><path d="M240 214 V160" stroke="#9aa1ab" stroke-width="1.6"/><path d="M230 214 h20" stroke="${OL}" stroke-width="3"/><ellipse cx="240" cy="154" rx="5" ry="7" fill="#3a3f4a" ${ln(1.4)}/>`;
  // casse (hotspot 65,190 e 415,190)
  o+=[65,415].map(x=>`${shadowE(x,234,30,4)}<path d="${box(x-25,150,50,84,R,1)}" fill="#2a2e36" ${ln(2)}/><circle cx="${x}" cy="174" r="12" fill="#1e1e22" ${ln(1.4)}/><circle cx="${x}" cy="174" r="5" fill="#3a3f4a"/><circle cx="${x}" cy="208" r="17" fill="#1e1e22" ${ln(1.4)}/><circle cx="${x}" cy="208" r="7" fill="#3a3f4a"/>`).join('');
  o+=vign; return o; };

/* ---------------- PALESTRA ---------------- */
ART.gym=()=>{ const R=S(149); let o=defs()+wall('#3d5a80',R,{paper:false});
  o+=Array.from({length:7},(_,i)=>`<path d="M0 ${30+i*26} H480" stroke="#000" stroke-opacity=".15"/>`).join('')+`<path d="${box(330,30,110,66,R,1)}" fill="#e9e2cf" ${ln(1.6)}/><path d="${box(336,36,98,54,R,.6)}" fill="url(#a_night)"/>${moon(410,52,6)}<path d="M385 36 V90 M336 62 H434" stroke="#e9e2cf" stroke-width="3"/>
   <text x="210" y="60" text-anchor="middle" font-size="24" font-weight="700" fill="#ffd166" font-family="Fredoka, sans-serif" stroke="${OL}" stroke-width="3" paint-order="stroke">GYM 💪</text><text x="210" y="80" text-anchor="middle" font-size="7" fill="#f1faee" font-family="Fredoka, sans-serif">${it()?'NO PAIN NO GAIN · NO FUMO':'NO PAIN NO GAIN · NO SMOKING'}</text>`+`<path d="M120 0 V10 M300 0 V10" stroke="${OL}"/><path d="M100 10 h40 v5 h-40z M280 10 h40 v5 h-40z" fill="#f1faee" ${ln(1)}/>${glow(120,18,80,.6)}${glow(300,18,80,.6)}`;
  o+=`<rect y="232" width="480" height="68" fill="#2a2e36"/>`+Array.from({length:12},(_,i)=>`<path d="M${i*40} 232 L${240+(i*40-240)*1.8} 300" stroke="#000" stroke-opacity=".3"/>`).join('')+`<path d="M0 232 H480" stroke="${OL}" stroke-width="2.5"/>`;
  // sacco (hotspot 30,170)
  o+=`<path d="M30 0 V124" stroke="${OL}" stroke-width="2"/><path d="M19 124 Q18 170 20 212 Q30 220 40 212 Q42 170 41 124Z" fill="#a3201f" ${ln(1.8)}/><path d="M19 140 H41 M19 196 H41" stroke="#2a2e36" stroke-width="3"/>`;
  // tapis roulant (hotspot 110,200)
  o+=shadowE(110,236,60,5,.45)+`<path d="${wob([[52,232],[60,214],[168,214],[168,232]],R,1)}" fill="#3a3f4a" ${ln(1.8)}/><path d="M62 220 H166" stroke="#1e1e22" stroke-width="5"/><path d="M160 214 L150 168" stroke="${OL}" stroke-width="4"/><path d="M140 168 h24 v10 h-24z" fill="#2a2e36" ${ln(1.4)}/><path d="M144 171 h10 v4 h-10z" fill="#52ff8a"/>`;
  // rastrelliera manubri (hotspot 200,160)
  o+=`<path d="${box(160,170,80,8,R,.8)}" fill="#3a3f4a" ${ln(1.4)}/><path d="M166 178 V232 M234 178 V232" stroke="${OL}" stroke-width="3"/><path d="${box(160,198,80,6,R,.8)}" fill="#3a3f4a" ${ln(1.2)}/>`+[0,1,2,3].map(i=>`<path d="M${170+i*18} 164 h12" stroke="${OL}" stroke-width="3"/><circle cx="${170+i*18}" cy="164" r="${4+i}" fill="#1e1e22" ${ln(1)}/><circle cx="${182+i*18}" cy="164" r="${4+i}" fill="#1e1e22" ${ln(1)}/>`).join('');
  // bilanciere (hotspot 340,220)
  o+=shadowE(340,242,60,4,.45)+`<path d="M286 222 H394" stroke="${OL}" stroke-width="4"/><path d="M286 222 H394" stroke="#cfd6e0" stroke-width="2"/>`+[296,306,374,384].map((x,i)=>`<path d="${box(x-4,i%3?204:198,8,i%3?36:48,R,.6)}" fill="${i%3?'#2a2e36':'#e63946'}" ${ln(1.4)}/>`).join('');
  // borraccia (hotspot 440,225)
  o+=`<path d="M432 236 v-20 q0 -4 4 -6 v-6 h8 v6 q4 2 4 6 v20z" fill="#4cc9f0" ${ln(1.4)}/><path d="M436 222 h8" stroke="#fff" stroke-opacity=".6" stroke-width="2"/>`;
  o+=vign; return o; };

/* ---------------- BARBIERE ---------------- */
ART.barber=()=>{ const R=S(151); let o=defs()+wall('#f1e3c4',R,{paper:false,wains:'#2a2e36'});
  o+=Array.from({length:12},(_,i)=>`<path d="M${i*40} 0 V162" stroke="#e0cfa8" stroke-width="16"/>`).join('')+`<path d="M0 162 H480" stroke="${OL}" stroke-width="2"/>`;
  // poster (hotspot 58,95)
  o+=`<path d="${box(30,60,56,70,R,1)}" fill="#e9dcae" ${ln(1.6)}/><circle cx="58" cy="88" r="12" fill="#eab48a" ${ln(1)}/><path d="M46 82 q12 -14 24 0 q-4 -4 -12 -2 q-8 -2 -12 2z" fill="#222"/><path d="M50 94 q8 4 16 0" stroke="#222" stroke-width="2" fill="none"/><text x="58" y="124" text-anchor="middle" font-size="5.5" font-weight="700" fill="#7a1e1e" font-family="Fredoka, sans-serif">${it()?'TAGLIO 1960':'CUT 1960'}</text>`;
  // specchio (hotspot 265,130)
  o+=`<path d="${box(228,78,74,104,R,1)}" fill="#c9a227" ${ln(2)}/><path d="${box(234,84,62,92,R,.6)}" fill="#bcd4e0" ${ln(1)}/><path d="M240 90 l16 0 l-16 30z M270 160 l20 -40 v10 l-14 30z" fill="#fff" opacity=".35"/><path d="M220 186 h90" stroke="${OL}" stroke-width="5"/><path d="M220 186 h90" stroke="#e9e2cf" stroke-width="3"/>`+[0,1,2].map(i=>`<path d="M${238+i*24} 186 v-10 h8 v10z" fill="${['#2a9d8f','#e76f51','#ffd166'][i]}" ${ln(.8)}/>`).join('');
  o+=floorTiles(R,'#f1faee','#1e1e22');
  // poltrona (hotspot 150,204)
  o+=shadowE(150,240,44,5,.45)+`<path d="M150 214 V236 M134 236 h32" stroke="${OL}" stroke-width="4"/><path d="M150 214 V236" stroke="#cfd6e0" stroke-width="2"/><path d="${box(124,166,52,40,R,1.2)}" fill="#a3201f" ${ln(2)}/><path d="${box(118,198,64,18,R,1)}" fill="#c0392b" ${ln(1.8)}/><path d="M114 192 h14 v8 h-14z M172 192 h14 v8 h-14z" fill="#cfd6e0" ${ln(1.2)}/><path d="M140 158 h20 v10 h-20z" fill="#c0392b" ${ln(1.2)}/>`;
  // insegna a strisce (hotspot 448,135)
  o+=`<path d="${box(436,70,24,130,R,1)}" fill="#f1faee" ${ln(1.8)}/>`+Array.from({length:7},(_,i)=>`<path d="M436 ${80+i*18} L460 ${70+i*18} V${78+i*18} L436 ${88+i*18}Z" fill="${i%2?'#1d3557':'#e63946'}"/>`).join('')+`<path d="M432 66 h32 v6 h-32z M432 198 h32 v6 h-32z" fill="#c9a227" ${ln(1.2)}/>`;
  o+=ceilLamp(200,10,'#f1faee')+vign; return o; };

/* ---------------- SPIAGGIA (notte) ---------------- */
ART.beach=()=>{ const R=S(157); let o=defs()+`<rect width="480" height="300" fill="url(#a_night)"/>`+stars(R,70,140)+moon(120,44,14)+clouds(R,3,30,100,'#25306a');
  o+=`<rect y="150" width="480" height="70" fill="url(#a_sea)"/>`+Array.from({length:26},()=>{ const x=R()*480, y=154+R()*60; return `<path d="M${x.toFixed(1)} ${y.toFixed(1)} q6 -3 12 0" stroke="#7fa6d9" stroke-opacity="${(.25+R()*.35).toFixed(2)}" fill="none"/>`; }).join('')+Array.from({length:7},(_,i)=>`<path d="M${112-i*2+R()*6} ${156+i*8} h${10+R()*14}" stroke="#fff4cf" stroke-opacity="${(.6-i*.06).toFixed(2)}" stroke-width="2" stroke-linecap="round"/>`).join('');
  o+=`<path d="M0 214 Q120 204 240 212 T480 208 V300 H0Z" fill="#c9b07a" ${ln(1.6)}/><path d="M0 214 Q120 204 240 212 T480 208" stroke="#f1faee" stroke-opacity=".6" stroke-width="3" fill="none" class="drift"/>`+Array.from({length:40},()=>`<circle cx="${R()*480}" cy="${222+R()*76}" r="${.6+R()*1}" fill="#8a7448"/>`).join('')+`<rect y="210" width="480" height="90" fill="url(#a_shadeUp)" opacity=".45"/>`;
  // ombrellone chiuso e sedia sdraio
  o+=`<path d="M60 250 L64 150" stroke="${OL}" stroke-width="3"/><path d="M58 152 q6 -6 12 0 l-4 40 h-4z" fill="#e63946" ${ln(1.2)}/><path d="M400 240 l30 -20 l10 8 l-30 22z" fill="#2a9d8f" ${ln(1.2)}/><path d="M404 244 l6 10 M430 226 l6 14" stroke="${OL}" stroke-width="2"/>`;
  // castello di sabbia (hotspot 260,240)
  o+=`<path d="${wob([[240,254],[240,234],[246,234],[246,228],[252,228],[252,234],[268,234],[268,228],[274,228],[274,234],[280,234],[280,254]],R,.8)}" fill="#d9c08a" ${ln(1.4)}/><path d="M256 224 v-10 l8 4 l-8 4" fill="#e63946" stroke="${OL}" stroke-width=".8"/><path d="M256 254 v-10 q4 -4 8 0 v10" fill="#8a7448"/>`;
  // telo (hotspot 120,262)
  o+=`<path d="${wob([[82,256],[160,252],[164,270],[84,274]],R,1)}" fill="#f1faee" ${ln(1.4)}/>`+[0,1,2].map(i=>`<path d="M${92+i*24} 255 l2 18" stroke="#e63946" stroke-width="6"/>`).join('');
  o+=`<path d="M330 216 q8 -10 18 0" stroke="#3a2412" stroke-width="2" fill="none"/><circle cx="352" cy="266" r="4" fill="#f1faee" ${ln(.8)}/><path d="M350 262 q2 4 4 0" stroke="#e76f51" fill="none"/>`+fog(214,R,'#c9d6f2',.12)+vign; return o; };

/* ---------------- PARCO (notte) ---------------- */
ART.park=()=>{ const R=S(163); let o=defs()+`<rect width="480" height="300" fill="url(#a_night)"/>`+stars(R,50,120)+moon(380,40,12);
  o+=Array.from({length:8},(_,i)=>{ const x=i*68-10+R()*20, r=34+R()*20; return `<circle cx="${x}" cy="${150-R()*20}" r="${r}" fill="#132a1e" ${ln(1.2)}/><path d="M${x} ${180} V${150}" stroke="#2a1a10" stroke-width="6"/>`; }).join('')+Array.from({length:40},()=>`<circle cx="${R()*480}" cy="${100+R()*80}" r="1" fill="#e9ff8a" opacity=".7" class="twk"/>`).join('');
  o+=`<rect y="196" width="480" height="104" fill="#1f3a24"/>`+Array.from({length:80},()=>{ const x=R()*480, y=200+R()*98; return `<path d="M${x.toFixed(1)} ${y.toFixed(1)} l2 -6 l2 6" stroke="#2f5a34" stroke-width="1" fill="none"/>`; }).join('')+`<path d="M180 300 Q230 240 300 212 L340 212 Q300 250 290 300Z" fill="#6d6152" ${ln(1.2)}/>`;
  // fontana (hotspot 330,200)
  o+=shadowE(330,242,56,6,.45)+`<ellipse cx="330" cy="226" rx="52" ry="14" fill="#8a8e92" ${ln(2)}/><ellipse cx="330" cy="222" rx="44" ry="10" fill="#2f5d74" ${ln(1)}/><path d="M318 222 V184 h24 V222" fill="#9aa1ab" ${ln(1.6)}/><ellipse cx="330" cy="184" rx="22" ry="6" fill="#8a8e92" ${ln(1.6)}/><path d="M330 184 V162" stroke="#9aa1ab" stroke-width="5"/><circle cx="330" cy="160" r="5" fill="#9aa1ab" ${ln(1.2)}/>
   <path d="M330 158 q-14 -6 -20 24 M330 158 q14 -6 20 24" stroke="#9fd3e0" stroke-width="2" fill="none" opacity=".8" class="flick"/><path d="M300 220 q10 -4 20 0 M340 222 q10 -4 20 0" stroke="#fff" stroke-opacity=".4" fill="none"/><circle cx="352" cy="220" r="2" fill="#c9a227"/>`;
  // panchina (hotspot 140,207)
  o+=shadowE(140,240,62,5,.45)+`<path d="${box(82,186,116,8,R,.8)}" fill="#7a4a26" ${ln(1.4)}/><path d="${box(82,196,116,8,R,.8)}" fill="#7a4a26" ${ln(1.4)}/><path d="${box(82,212,116,8,R,.8)}" fill="#8a5a33" ${ln(1.4)}/><path d="M90 220 V238 M190 220 V238 M90 186 V220 M190 186 V220" stroke="${OL}" stroke-width="4"/><path d="M90 220 V238 M190 220 V238" stroke="#2a2e36" stroke-width="2.4"/>`;
  o+=lamp(232,90,142)+fog(220,R,'#b8c4e8',.12)+vign; return o; };
})();
