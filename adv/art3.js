/* ================= ARTE DIPINTA — resto del paese e l'isola ================= */
(()=>{ if (!window.ADV || !window.AV_KIT || !window.AV_ART) return;
const {S,OL,ln,wob,box,F_,it,defs,stars,moon,clouds,glow,win,stains,cobbles,planks,lamp,shadowE,fog}=AV_KIT; const ART=AV_ART;
const vign=`<rect width="480" height="300" fill="url(#a_vign)"/>`;
const ch=()=>(window.AV&&AV.st&&AV.st.ch)||1;
const ddefs=()=>`<defs><linearGradient id="a_dawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a7fc4"/><stop offset=".55" stop-color="#f4a79a"/><stop offset="1" stop-color="#ffd59a"/></linearGradient>
 <linearGradient id="a_lagoon" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3fb8c9"/><stop offset="1" stop-color="#1b6f8a"/></linearGradient>
 <radialGradient id="a_sun" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff6c9"/><stop offset=".35" stop-color="#ffd27a" stop-opacity=".9"/><stop offset="1" stop-color="#ff9a3c" stop-opacity="0"/></radialGradient>
 <linearGradient id="a_lava" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe066"/><stop offset=".4" stop-color="#ff7b29"/><stop offset="1" stop-color="#b8261c"/></linearGradient>
 <linearGradient id="a_cave" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c1626"/><stop offset="1" stop-color="#3a2c3e"/></linearGradient></defs>`;
const floorWood=R=>`<rect y="232" width="480" height="68" fill="#5c3a20"/>`+planks(232,R,'#6e4527','#5c3a20')+`<path d="M0 232 H480" stroke="${OL}" stroke-width="2.5"/><rect y="232" width="480" height="5" fill="#000" opacity=".35"/>`;
const palm=(x,y,h,R,lean=0)=>{ let o=`<path d="M${x} ${y} Q${x+lean*.5} ${y-h*.5} ${x+lean} ${y-h}" stroke="${OL}" stroke-width="11" fill="none" stroke-linecap="round"/><path d="M${x} ${y} Q${x+lean*.5} ${y-h*.5} ${x+lean} ${y-h}" stroke="#8a5a33" stroke-width="8" fill="none" stroke-linecap="round"/>`; for(let i=0;i<8;i++){ const t=i/8; const px=x+lean*t*t, py=y-h*t; o+=`<path d="M${px-4} ${py} q4 -3 8 0" stroke="#5a3720" stroke-width="1.4" fill="none"/>`; }
  const tx=x+lean, ty=y-h; for(let i=0;i<7;i++){ const a=-Math.PI+i*Math.PI/6+(R()-.5)*.3, L=40+R()*18; const ex=tx+Math.cos(a)*L, ey=ty+Math.sin(a)*L*.6+18; o+=`<path d="M${tx} ${ty} Q${(tx+ex)/2} ${ty-14} ${ex.toFixed(1)} ${ey.toFixed(1)} Q${(tx+ex)/2+4} ${ty-4} ${tx} ${ty+2}Z" fill="${i%2?'#2d8a4e':'#3fa863'}" ${ln(1.4)}/>`; }
  o+=`<circle cx="${tx-4}" cy="${ty+6}" r="5" fill="#6b4226" ${ln(1)}/><circle cx="${tx+5}" cy="${ty+7}" r="5" fill="#6b4226" ${ln(1)}/>`; return o; };

/* ---------------- GIARDINO (notte) ---------------- */
ART.garden=()=>{ const R=S(201); let o=defs()+`<rect width="480" height="300" fill="url(#a_night)"/>`+stars(R,50,110)+moon(400,36,12);
  o+=`<path d="${wob([[0,120],[480,120],[480,206],[0,206]],R,1)}" fill="#c9a77a" ${ln(1.6)}/>`+Array.from({length:24},(_,i)=>`<path d="M${i*20+2} 120 V206" stroke="#000" stroke-opacity=".2"/>`).join('')+`<path d="M0 124 H480" stroke="#000" stroke-opacity=".3" stroke-width="2"/><rect y="120" width="480" height="86" fill="url(#a_shadeDown)" opacity=".5"/>`;
  o+=`<rect y="200" width="480" height="100" fill="#1f3a24"/>`+Array.from({length:90},()=>{ const x=R()*480, y=204+R()*94; return `<path d="M${x.toFixed(1)} ${y.toFixed(1)} l2 -6 l2 6" stroke="#2f5a34" stroke-width="1" fill="none"/>`; }).join('');
  // albero (hotspot 110,80)
  o+=`<path d="M106 206 Q100 150 110 110" stroke="${OL}" stroke-width="16" fill="none"/><path d="M106 206 Q100 150 110 110" stroke="#5a3720" stroke-width="12" fill="none"/>`+Array.from({length:9},()=>`<circle cx="${60+R()*100}" cy="${40+R()*80}" r="${24+R()*14}" fill="${R()<.5?'#1f4a2a':'#2d5a34'}" ${ln(1.4)}/>`).join('')+Array.from({length:8},()=>`<circle cx="${60+R()*100}" cy="${50+R()*70}" r="3.6" fill="#e63946" ${ln(.8)}/>`).join('');
  // barbecue (hotspot 230,200)
  o+=shadowE(230,236,26,4)+`<path d="M216 228 l-6 10 M244 228 l6 10 M230 228 v10" stroke="${OL}" stroke-width="2.4"/><path d="M206 196 h48 q0 32 -24 32 q-24 0 -24 -32z" fill="#2a2e36" ${ln(1.8)}/><path d="M204 194 h52" stroke="#9aa1ab" stroke-width="3"/><path d="M220 180 q4 -8 0 -16" stroke="#cfd6e8" stroke-opacity=".3" stroke-width="3" fill="none" class="smoke"/>`;
  // aiuola (hotspot 178,238)
  o+=`<path d="${wob([[150,252],[206,250],[208,232],[148,234]],R,1)}" fill="#4a2a14" ${ln(1.4)}/>`+Array.from({length:9},(_,i)=>`<path d="M${154+i*6} 240 v-8" stroke="#2d6a4f" stroke-width="1.6"/><circle cx="${154+i*6}" cy="${230-(i%2)*3}" r="3" fill="${['#e63946','#ffd166','#ff8fab'][i%3]}" ${ln(.6)}/>`).join('');
  // amaca (hotspot 380,212)
  o+=`<path d="M330 236 V170 M430 236 V170" stroke="${OL}" stroke-width="5"/><path d="M330 236 V170 M430 236 V170" stroke="#5a3720" stroke-width="3"/><path d="M332 180 Q380 236 428 180 Q380 214 332 180Z" fill="#e76f51" ${ln(1.6)}/>`+Array.from({length:5},(_,i)=>`<path d="M${342+i*18} ${190+Math.sin(i/4*Math.PI)*16} l2 6" stroke="#ffd166" stroke-width="2"/>`).join('');
  o+=Array.from({length:10},()=>`<circle cx="${R()*480}" cy="${130+R()*90}" r="1.2" fill="#e9ff8a" class="twk"/>`).join('')+fog(214,R,'#b8c4e8',.1)+vign; return o; };

/* ---------------- SOFFITTA ---------------- */
ART.attic=()=>{ const R=S(203); let o=defs()+`<rect width="480" height="300" fill="#2a1e16"/><path d="M0 232 L0 120 L240 10 L480 120 L480 232Z" fill="#6b4a2c" ${ln(2)}/>`+Array.from({length:10},(_,i)=>`<path d="M${i*48+24} 232 L${240+(i*48+24-240)*.2} ${Math.max(14,120-Math.abs(i*48+24-240)*.46)}" stroke="#4a3018" stroke-width="5"/>`).join('')+stains(0,20,480,212,R,14,'#000',.12)+`<path d="M0 120 L240 10 L480 120" stroke="${OL}" stroke-width="10" fill="none"/><path d="M0 120 L240 10 L480 120" stroke="#5a3720" stroke-width="6" fill="none"/>`;
  o+=`<path d="${box(212,50,56,46,R,1)}" fill="#3a2412" ${ln(1.8)}/><path d="${box(217,55,46,36,R,.6)}" fill="url(#a_night)"/>${moon(250,66,5)}<path d="M240 55 V91 M217 73 H263" stroke="#3a2412" stroke-width="3"/><path d="M200 96 L120 232 L360 232 L280 96Z" fill="#c9d6ff" opacity=".06"/>`;
  o+=Array.from({length:6},(_,i)=>`<path d="M${20+i*12} ${60+i*4} q30 10 60 0" stroke="#ddd" stroke-opacity=".18" fill="none"/>`).join('');
  o+=floorWood(R);
  // lenzuolo/fantasma (hotspot 34,220)
  o+=`<path d="M20 248 Q16 210 34 196 Q52 210 48 248 q-4 -6 -7 0 q-4 -6 -7 0 q-4 -6 -7 0 q-3 -6 -7 0z" fill="#e9e5da" ${ln(1.6)}/><circle cx="29" cy="212" r="2" fill="#222"/><circle cx="38" cy="212" r="2" fill="#222"/>`;
  // baule (hotspot 80,220)
  o+=shadowE(80,248,40,4)+`<path d="${box(46,214,70,32,R,1)}" fill="#7a4a26" ${ln(1.8)}/><path d="M46 214 Q81 196 116 214Z" fill="#8a5a33" ${ln(1.6)}/><path d="M58 206 V246 M104 206 V246" stroke="#2a2e36" stroke-width="3"/><path d="M76 222 h10 v10 h-10z" fill="#c9a227" ${ln(1)}/>`;
  // ping pong (hotspot 240,200)
  o+=shadowE(240,240,74,5,.45)+`<path d="${wob([[166,196],[314,196],[322,208],[158,208]],R,1)}" fill="#1f6b4a" ${ln(1.8)}/><path d="M240 196 v12" stroke="#f1faee" stroke-width="2"/><path d="M162 202 H318" stroke="#f1faee" stroke-width="1" opacity=".7"/><path d="M238 186 h4 v12 h-4z" fill="#ddd" opacity=".8"/><path d="M174 208 V238 M306 208 V238" stroke="${OL}" stroke-width="4"/><circle cx="210" cy="190" r="2.4" fill="#f1faee" ${ln(.6)}/>`;
  // scatolone (hotspot 350,185)
  o+=`<path d="${box(326,170,50,36,R,1)}" fill="#c9a77a" ${ln(1.6)}/><path d="M326 170 l10 -8 h30 l10 8" fill="#d9b78a" ${ln(1.2)}/><path d="M330 186 h16" stroke="#7a1e1e" stroke-width="1.6"/><text x="351" y="198" text-anchor="middle" font-size="5" fill="#3a2412" font-family="Fredoka, sans-serif">${it()?'NATALE':'XMAS'}</text>`;
  // telescopio (hotspot 420,150)
  o+=`<path d="M404 236 L420 190 L436 236 M420 190 V236" stroke="${OL}" stroke-width="3"/><path d="M400 168 L452 140 L456 148 L404 176Z" fill="#c9a227" ${ln(1.6)}/><path d="M452 140 l8 -4 l4 10 l-8 4z" fill="#2a2e36" ${ln(1)}/>`;
  o+=`<path d="M300 0 V40" stroke="${OL}"/><circle cx="300" cy="46" r="6" fill="#ffe7a0" ${ln(1)}/>${glow(300,48,80,.7)}`+vign; return o; };

/* ---------------- BUNKER ---------------- */
ART.bunker=()=>{ const R=S(205); let o=defs()+`<rect width="480" height="232" fill="#4a5048"/>`+Array.from({length:7},(_,r)=>Array.from({length:10},(_,c)=>`<path d="${box(c*50+(r%2)*25-25,r*34,50,34,R,.6)}" fill="none" stroke="#000" stroke-opacity=".22"/>`).join('')).join('')+stains(0,0,480,232,R,18,'#1d2a1a',.18)+`<rect width="480" height="232" fill="url(#a_shadeDown)" opacity=".5"/>`;
  o+=`<path d="M0 14 H480" stroke="${OL}" stroke-width="8"/><path d="M0 14 H480" stroke="#6d7175" stroke-width="5"/><path d="M200 14 V28" stroke="${OL}"/><path d="M190 28 h20 v6 h-20z" fill="#2a2e36" ${ln(1)}/><path d="M192 34 h16" stroke="#ffe7a0" stroke-width="2"/>${glow(200,38,90,.7)}`;
  // scaffali (hotspot 95,130)
  o+=`<path d="${box(50,76,90,156,R,1)}" fill="#3a3f4a" ${ln(1.8)}/>`+[110,146,182].map(y=>`<path d="M52 ${y} H138" stroke="${OL}" stroke-width="3"/>`).join('')+[[60,96],[86,98],[112,100],[62,134],[94,136],[120,132],[70,170],[104,172]].map(([x,y],i)=>`<path d="${box(x,y,i%2?18:14,i%3?14:12,R,.5)}" fill="${['#5a6b3a','#c9a227','#8a5a33','#9aa1ab'][i%4]}" ${ln(.9)}/>`).join('');
  // foglio (hotspot 177,93)
  o+=`<path d="${box(161,70,32,44,R,1)}" fill="#e9e2cf" ${ln(1.4)}/>`+Array.from({length:6},(_,i)=>`<path d="M166 ${78+i*6} h${16+R()*6}" stroke="#555" stroke-width=".8"/>`).join('')+`<circle cx="177" cy="72" r="1.6" fill="#e63946"/>`;
  // radio da campo (hotspot 240,175)
  o+=`<path d="${box(196,180,90,52,R,1)}" fill="#5a3720" ${ln(1.6)}/><path d="${box(202,158,76,26,R,1)}" fill="#4a5a3a" ${ln(1.8)}/><circle cx="216" cy="171" r="6" fill="#2a2e36" ${ln(1)}/><circle cx="234" cy="171" r="6" fill="#2a2e36" ${ln(1)}/><path d="${box(246,164,26,12,R,.5)}" fill="#52ff8a" opacity=".7" class="aflk"/><path d="M272 158 L290 120" stroke="${OL}" stroke-width="1.6"/>`;
  // radar (hotspot 372,152)
  o+=`<path d="${box(340,130,64,44,R,1)}" fill="#2a2e36" ${ln(1.8)}/><circle cx="372" cy="152" r="17" fill="#0b2a12" ${ln(1)}/><circle cx="372" cy="152" r="11" fill="none" stroke="#52ff8a" stroke-opacity=".4"/><path d="M372 152 L386 142" stroke="#52ff8a" stroke-width="1.6" class="aflk"/><circle cx="380" cy="160" r="1.6" fill="#52ff8a"/>`;
  o+=`<rect y="232" width="480" height="68" fill="#3a3f38"/>`+stains(0,232,480,68,R,10,'#000',.3)+`<path d="M0 232 H480" stroke="${OL}" stroke-width="2.5"/>`;
  // branda (hotspot 345,210)
  o+=shadowE(345,238,58,4)+`<path d="${box(290,206,110,10,R,1)}" fill="#5a6b3a" ${ln(1.6)}/><path d="M296 216 l8 18 M304 216 l-8 18 M384 216 l8 18 M392 216 l-8 18" stroke="${OL}" stroke-width="2"/><path d="${box(294,200,26,8,R,.6)}" fill="#e9e2cf" ${ln(1)}/>`;
  // porta blindata (hotspot 440,146)
  o+=`<path d="${box(418,60,46,172,R,1)}" fill="#6d7175" ${ln(2)}/><circle cx="441" cy="146" r="14" fill="none" stroke="${OL}" stroke-width="3"/><path d="M441 132 V160 M427 146 H455" stroke="${OL}" stroke-width="3"/>`+[70,96,200,222].map(y=>`<circle cx="424" cy="${y}" r="2" fill="#2a2e36"/><circle cx="458" cy="${y}" r="2" fill="#2a2e36"/>`).join('')+`<path d="M420 62 l40 0" stroke="#ffd166" stroke-width="3" stroke-dasharray="6 6"/>`;
  o+=vign; return o; };

/* ---------------- DISCOTECA ---------------- */
ART.disco=()=>{ const R=S(207); let o=defs()+`<rect width="480" height="232" fill="#140a24"/>`+Array.from({length:10},(_,i)=>{ const c=['#ff4d9d','#4cc9f0','#ffd166','#7b2cbf'][i%4]; return `<path d="M${40+i*45} 0 L${i*45-10} 232 L${i*45+90} 232Z" fill="${c}" opacity=".08" class="aflk"/>`; }).join('')+Array.from({length:30},()=>`<circle cx="${R()*480}" cy="${R()*232}" r="${1+R()*2.4}" fill="${['#ff4d9d','#4cc9f0','#ffd166','#fff'][Math.floor(R()*4)]}" opacity=".7" class="twk"/>`).join('');
  o+=`<path d="M240 0 V30" stroke="#9aa1ab"/><circle cx="240" cy="42" r="14" fill="#cfd6e0" ${ln(1.6)}/>`+Array.from({length:12},(_,i)=>`<path d="M${229+(i%4)*6} ${32+Math.floor(i/4)*7} h5 v5 h-5z" fill="${i%3?'#f1faee':'#9fd3e0'}"/>`).join('')+`<text x="90" y="80" font-size="22" font-weight="700" fill="#ff4d9d" font-family="Fredoka, sans-serif" stroke="${OL}" stroke-width="3" paint-order="stroke" class="aflk">DISCO</text><text x="96" y="98" font-size="9" fill="#4cc9f0" font-family="Fredoka, sans-serif">${it()?'dal 1979':'since 1979'}</text>`;
  // pista (hotspot 200,250)
  o+=`<rect y="232" width="480" height="68" fill="#0e0718"/>`+Array.from({length:5},(_,r)=>Array.from({length:12},(_,c)=>{ const y=232+r*14, x=c*40+(r%2)*20-20; return `<rect x="${x}" y="${y}" width="38" height="12" fill="${['#ff4d9d','#4cc9f0','#ffd166','#7b2cbf'][(r*3+c)%4]}" opacity="${.3+((r+c)%3)*.15}" class="${(r+c)%3===0?'aflk':''}"/>`; }).join('')).join('')+`<path d="M0 232 H480" stroke="${OL}" stroke-width="2.5"/>`;
  // consolle (hotspot 405,185)
  o+=shadowE(405,236,50,4)+`<path d="${box(360,176,90,58,R,1)}" fill="#2a2e36" ${ln(2)}/><path d="${box(364,168,82,10,R,.6)}" fill="#3a3f4a" ${ln(1.4)}/><circle cx="384" cy="172" r="7" fill="#111" ${ln(1)}/><circle cx="424" cy="172" r="7" fill="#111" ${ln(1)}/><circle cx="384" cy="172" r="2" fill="#ff4d9d"/><circle cx="424" cy="172" r="2" fill="#4cc9f0"/><path d="M372 196 h66 M372 210 h66" stroke="#4cc9f0" stroke-width="2" class="aflk"/><text x="405" y="228" text-anchor="middle" font-size="7" font-weight="700" fill="#ffd166" font-family="Fredoka, sans-serif">DJ</text>`;
  o+=vign; return o; };

/* ---------------- PRIVÉ ---------------- */
ART.prive=()=>{ const R=S(209); let o=defs()+`<rect width="480" height="232" fill="#3a0e1e"/>`+Array.from({length:16},(_,i)=>`<path d="M${i*30} 0 V232" stroke="#4a1428" stroke-width="12"/><path d="M${i*30+6} 0 V232" stroke="#c9a227" stroke-opacity=".15"/>`).join('')+`<rect width="480" height="232" fill="url(#a_shadeDown)" opacity=".5"/>`;
  // lampadario (hotspot 240,40)
  o+=`<path d="M240 0 V20" stroke="#c9a227" stroke-width="2"/><path d="M206 30 Q240 64 274 30" fill="none" stroke="#c9a227" stroke-width="3"/>`+Array.from({length:7},(_,i)=>`<path d="M${210+i*10} ${36+Math.sin(i/6*Math.PI)*16} v10" stroke="#e9f1ff" stroke-width="1.4"/><circle cx="${210+i*10}" cy="${48+Math.sin(i/6*Math.PI)*16}" r="2.4" fill="#e9f1ff" ${ln(.6)}/>`).join('')+`<path d="M200 28 h80" stroke="#c9a227" stroke-width="4"/>${glow(240,40,130,1)}`;
  o+=floorWood(R)+`<path d="M60 300 L140 240 H340 L420 300Z" fill="#7a1e1e" opacity=".9"/>`;
  // divanetto (hotspot 120,205)
  o+=shadowE(120,236,72,5,.5)+`<path d="M56 226 V176 Q56 162 120 162 Q184 162 184 176 V226Z" fill="#8a1e3a" ${ln(2)}/>`+[80,104,128,152].map(x=>`<circle cx="${x}" cy="184" r="2" fill="#c9a227"/>`).join('')+`<path d="${box(50,206,140,22,R,1)}" fill="#a3284a" ${ln(1.8)}/><path d="M60 228 v8 M180 228 v8" stroke="#c9a227" stroke-width="3"/>`;
  // champagne (hotspot 360,200)
  o+=`<path d="${box(330,214,60,20,R,1)}" fill="#c9a227" ${ln(1.6)}/><path d="M340 214 q20 -10 40 0" fill="#9aa1ab" ${ln(1.2)}/><path d="M352 212 v-30 q0 -4 3 -6 v-12 h6 v12 q3 2 3 6 v30z" fill="#1f4a2a" ${ln(1.4)}/><path d="M355 164 h6 v-4 h-6z" fill="#c9a227"/><path d="M372 214 v-12 l-5 -10 h12 l-5 10 v12" fill="#ffe7a0" opacity=".85" ${ln(1)}/>`;
  o+=vign; return o; };

/* ---------------- BOSCO (notte) ---------------- */
ART.woods=()=>{ const R=S(211); let o=defs()+`<rect width="480" height="300" fill="#0d1424"/>`+stars(R,30,60)+moon(240,30,10);
  for (let layer=0;layer<3;layer++){ const col=['#13203a','#16281e','#1d3624'][layer]; for(let i=0;i<9;i++){ const x=i*60-20+R()*30, h=120+R()*80-layer*20; o+=`<path d="M${x} 240 L${x+30} ${240-h} L${x+60} 240Z" fill="${col}" ${ln(1)}/>`; } }
  // alberi (hotspot 36,160)
  o+=`<path d="M30 300 V60" stroke="${OL}" stroke-width="22"/><path d="M30 300 V60" stroke="#3a2412" stroke-width="18"/><path d="M0 120 L36 40 L76 130Z M-6 170 L36 80 L84 180Z" fill="#1f4a2a" ${ln(1.6)}/>`;
  o+=`<rect y="230" width="480" height="70" fill="#1d2a18"/>`+Array.from({length:50},()=>{ const x=R()*480, y=234+R()*64; return `<path d="M${x.toFixed(1)} ${y.toFixed(1)} l2 -6 l2 6" stroke="#2f4a24" stroke-width="1" fill="none"/>`; }).join('')+`<path d="M0 230 H480" stroke="${OL}" stroke-width="2"/>`;
  // tronco (hotspot 145,210)
  o+=shadowE(145,236,50,4)+`<path d="${box(100,206,90,24,R,1.2)}" fill="#6b4226" ${ln(1.8)}/><ellipse cx="190" cy="218" rx="7" ry="12" fill="#c9a77a" ${ln(1.4)}/><ellipse cx="190" cy="218" rx="3" ry="6" fill="none" stroke="#8a5a33"/><path d="M110 212 h60 M114 222 h50" stroke="#3a2412" stroke-width="1"/>`;
  // falò (hotspot 262,222)
  o+=`<path d="M244 240 L280 232 M246 232 L282 240" stroke="#3a2412" stroke-width="5"/><path d="M252 236 Q248 214 262 200 Q276 214 272 236Z" fill="#ff7b29" class="aflk"/><path d="M256 236 Q256 222 262 212 Q268 222 268 236Z" fill="#ffd166" class="aflk"/>${glow(262,224,110,1)}<path d="M262 196 q-6 -12 2 -24 q8 -12 0 -24" stroke="#999" stroke-opacity=".25" stroke-width="4" fill="none" class="smoke"/>`;
  // funghi (hotspot 440,248)
  o+=[[426,252],[440,246],[454,254]].map(([x,y])=>`<path d="M${x-2} ${y+8} v-8 h4 v8z" fill="#f1faee" ${ln(.8)}/><path d="M${x-8} ${y} q8 -12 16 0z" fill="#c0392b" ${ln(1)}/><circle cx="${x-3}" cy="${y-4}" r="1.2" fill="#fff"/><circle cx="${x+3}" cy="${y-3}" r="1" fill="#fff"/>`).join('');
  o+=Array.from({length:12},()=>`<circle cx="${R()*480}" cy="${120+R()*100}" r="1.2" fill="#e9ff8a" class="twk"/>`).join('')+fog(226,R,'#9fb3d9',.14)+vign; return o; };

/* ---------------- CAMPANILE ---------------- */
ART.campanile=()=>{ const R=S(213); let o=defs()+`<rect width="480" height="300" fill="#4a3a2c"/>`+Array.from({length:12},(_,r)=>Array.from({length:12},(_,c)=>`<path d="${wob([[c*40+(r%2)*20-20,r*26],[c*40+(r%2)*20+18,r*26],[c*40+(r%2)*20+18,r*26+24],[c*40+(r%2)*20-20,r*26+24]],R,1.4)}" fill="${R()<.5?'#5a4836':'#64503c'}" stroke="#2a1e14" stroke-width="1"/>`).join('')).join('')+`<rect width="480" height="300" fill="url(#a_shadeDown)" opacity=".4"/>`;
  // finestrone (hotspot 240,70)
  o+=`<path d="M166 126 V60 Q240 -10 314 60 V126Z" fill="url(#a_night)" ${ln(2.4)}/>`+stars(R,16,110).replace(/cx="(\d+(?:\.\d+)?)"/g,(m,v)=>`cx="${(166+(+v/480)*148).toFixed(1)}"`)+moon(270,60,9)+`<path d="M240 20 V126 M166 90 H314" stroke="#3a2a1e" stroke-width="4"/>`;
  // orologio (hotspot 240,170)
  o+=`<circle cx="240" cy="170" r="34" fill="#e9dcae" ${ln(2.2)}/><circle cx="240" cy="170" r="28" fill="none" stroke="#3a2412" stroke-width="1.2"/>`+Array.from({length:12},(_,i)=>{ const a=i/12*Math.PI*2; return `<path d="M${240+Math.sin(a)*24} ${170-Math.cos(a)*24} L${240+Math.sin(a)*28} ${170-Math.cos(a)*28}" stroke="#3a2412" stroke-width="2"/>`; }).join('')+`<path d="M240 170 L240 150 M240 170 L252 174" stroke="${OL}" stroke-width="3" stroke-linecap="round"/>`;
  // trave e campane (hotspot bell0..3)
  o+=`<path d="M0 64 H480" stroke="${OL}" stroke-width="10"/><path d="M0 64 H480" stroke="#5a3720" stroke-width="7"/>`;
  const bell=(x,y,w,h)=>`<path d="M${x} 64 V${y-h/2}" stroke="${OL}" stroke-width="2"/><path d="M${x-w*.3} ${y-h/2} Q${x-w*.32} ${y+h*.1} ${x-w/2} ${y+h/2} H${x+w/2} Q${x+w*.32} ${y+h*.1} ${x+w*.3} ${y-h/2}Z" fill="#c9a227" ${ln(2)}/><path d="M${x-w*.2} ${y-h*.4} Q${x-w*.24} ${y+h*.1} ${x-w*.36} ${y+h*.4}" stroke="#fff6c9" stroke-opacity=".5" stroke-width="2.4" fill="none"/><path d="M${x-w/2} ${y+h/2} H${x+w/2}" stroke="#8a6a10" stroke-width="3"/><circle cx="${x}" cy="${y+h/2+4}" r="${w*.08}" fill="#5a4210" ${ln(1)}/>`;
  o+=bell(70,110,64,70)+bell(150,100,48,54)+bell(330,105,54,62)+bell(410,95,40,46);
  o+=`<path d="M70 146 V232" stroke="#c9a77a" stroke-width="2" opacity=".8"/>`;
  o+=`<rect y="232" width="480" height="68" fill="#3a2a1e"/>`+planks(232,R,'#4a3422','#3e2c1c')+`<path d="M0 232 H480" stroke="${OL}" stroke-width="2.5"/>`+vign; return o; };

/* ---------------- STAZIONE ---------------- */
ART.stazione=()=>{ const R=S(215); let o=defs()+`<rect width="480" height="300" fill="url(#a_night)"/>`+stars(R,40,90)+moon(430,30,10);
  o+=`<path d="M0 30 H480 V40 H0Z" fill="#2a2e36" ${ln(1.4)}/>`+Array.from({length:8},(_,i)=>`<path d="M${30+i*60} 40 V96" stroke="${OL}" stroke-width="4"/><path d="M${30+i*60} 40 V96" stroke="#3a3f4a" stroke-width="2.4"/>`).join('');
  // treno (hotspot 355,138)
  o+=`<path d="${box(250,104,210,70,R,1.4)}" fill="#c0392b" ${ln(2)}/><path d="M250 150 H460" stroke="#ffd166" stroke-width="5"/>`+[262,300,338,376,414].map(x=>`<path d="${box(x,114,28,22,R,.6)}" fill="url(#a_glass)" ${ln(1.2)}/>`).join('')+`${glow(350,126,120,.5)}<text x="355" y="166" text-anchor="middle" font-size="8" font-weight="700" fill="#f1faee" font-family="Fredoka, sans-serif">LITTORINA</text><path d="M250 174 H460" stroke="${OL}" stroke-width="4"/>`+[280,330,390,440].map(x=>`<circle cx="${x}" cy="178" r="7" fill="#2a2e36" ${ln(1.4)}/>`).join('');
  o+=`<rect y="184" width="480" height="10" fill="#6d6152"/><path d="M0 188 H480 M0 192 H480" stroke="#9aa1ab" stroke-width="1.6"/>`;
  // biglietteria (hotspot 115,130)
  o+=`<path d="${box(20,60,190,172,R,1.4)}" fill="#d9b88a" ${ln(2)}/>`+stains(20,60,190,172,R,8)+`<path d="${box(14,52,202,12,R,1)}" fill="#7a2e22" ${ln(1.6)}/><text x="115" y="80" text-anchor="middle" font-size="9" font-weight="700" fill="#3a2412" font-family="Fredoka, sans-serif">${it()?'BIGLIETTERIA':'TICKETS'}</text>
   <path d="${box(40,96,80,60,R,1)}" fill="url(#a_glass)" ${ln(1.6)}/>${glow(80,126,70,.6)}<path d="M80 96 V156" stroke="${OL}" stroke-width="1.4"/><path d="${box(140,110,50,122,R,1)}" fill="url(#a_wood)" ${ln(1.6)}/>`;
  // orologio (hotspot 110,92)
  o+=`<circle cx="110" cy="92" r="0" /><path d="M110 64 V76" stroke="${OL}" stroke-width="2"/><circle cx="160" cy="92" r="0"/>`;
  o+=`<circle cx="110" cy="92" r="13" fill="#f1e8cf" ${ln(1.8)}/><path d="M110 92 V84 M110 92 L116 95" stroke="${OL}" stroke-width="1.4"/>`;
  o+=cobbles(232,R,'#4e4a58','#625e70')+`<path d="M0 232 H480" stroke="${OL}" stroke-width="2"/>`;
  // panchina (hotspot 190,220) e armadietti (hotspot 290,224)
  o+=shadowE(190,240,36,4)+`<path d="${box(160,212,60,6,R,.6)}" fill="#8a5a33" ${ln(1.2)}/><path d="${box(160,222,60,6,R,.6)}" fill="#8a5a33" ${ln(1.2)}/><path d="M166 228 V242 M214 228 V242" stroke="${OL}" stroke-width="3"/>`;
  o+=shadowE(290,256,46,4)+`<path d="${box(248,196,84,58,R,1)}" fill="#6d7175" ${ln(1.8)}/>`+Array.from({length:8},(_,i)=>`<path d="${box(252+(i%4)*20,200+Math.floor(i/4)*26,18,24,R,.5)}" fill="#7d858e" ${ln(1)}/><text x="${261+(i%4)*20}" y="${210+Math.floor(i/4)*26}" text-anchor="middle" font-size="5" fill="#1e1e22" font-family="monospace">${84+i}</text><circle cx="${266+(i%4)*20}" cy="${214+Math.floor(i/4)*26}" r="1.4" fill="#1e1e22"/>`).join('');
  o+=lamp(232,70,162)+fog(222,R,'#9fb3d9',.1)+vign; return o; };

/* ---------------- ARCHIVIO ---------------- */
ART.archivio=()=>{ const R=S(217); let o=defs()+`<rect width="480" height="232" fill="#5a5048"/>`+Array.from({length:7},(_,r)=>Array.from({length:10},(_,c)=>`<path d="${box(c*50+(r%2)*25-25,r*34,50,34,R,.6)}" fill="none" stroke="#000" stroke-opacity=".2"/>`).join('')).join('')+stains(0,0,480,232,R,14,'#000',.15)+`<rect width="480" height="232" fill="url(#a_shadeDown)" opacity=".45"/>`;
  o+=`<path d="M240 0 V16" stroke="${OL}"/><path d="M226 16 h28 l-4 10 h-20z" fill="#2a9d8f" ${ln(1.2)}/>${glow(240,28,110,.8)}`;
  // schedari (hotspot 105,146)
  o+=shadowE(105,236,80,5,.45)+[0,1,2].map(i=>`<path d="${box(26+i*54,60,52,172,R,1)}" fill="#6c737b" ${ln(1.8)}/>`+[0,1,2,3,4].map(j=>`<path d="${box(30+i*54,66+j*33,44,28,R,.5)}" fill="#7d858e" ${ln(1)}/><path d="M${46+i*54} ${76+j*33} h12" stroke="#2a2e36" stroke-width="2.4"/><rect x="${44+i*54}" y="${82+j*33}" width="16" height="5" fill="#e9e2cf"/>`).join('')).join('')+`<path d="M86 132 l14 -4 l2 8 l-14 4z" fill="#e9e2cf" ${ln(.6)}/>`;
  // mappa (hotspot 255,80)
  o+=`<path d="${box(200,40,110,80,R,1.2)}" fill="#e9d5a0" ${ln(1.8)}/><path d="M214 100 Q236 60 270 84 T300 70" stroke="#2f5d74" stroke-width="2" fill="none"/><path d="M240 90 l5 -12 l5 12z" fill="#7a3a1e"/><path d="M280 64 l4 4 M284 64 l-4 4" stroke="#c0392b" stroke-width="2"/><path d="M286 40 L310 40 L310 70 L296 62 L290 52Z" fill="#5a5048" ${ln(1)}/>`;
  // ritratto del nonno (hotspot 375,90)
  o+=`<path d="${box(340,44,70,92,R,1)}" fill="#c9a227" ${ln(1.8)}/><path d="${box(346,50,58,80,R,.6)}" fill="#2a3a4a"/><ellipse cx="375" cy="84" rx="14" ry="17" fill="#eab48a" ${ln(1)}/><path d="M361 76 q14 -16 28 0 q-6 -6 -14 -4 q-8 -2 -14 4z" fill="#eee"/><path d="M366 94 q9 5 18 0" stroke="#eee" stroke-width="3" fill="none"/><circle cx="369" cy="82" r="1.4" fill="#222"/><circle cx="381" cy="82" r="1.4" fill="#222"/><path d="M352 130 q23 -26 46 0" fill="#3a2412"/>`;
  o+=`<rect y="232" width="480" height="68" fill="#3a3530"/>`+stains(0,232,480,68,R,8,'#000',.3)+`<path d="M0 232 H480" stroke="${OL}" stroke-width="2.5"/>`;
  // scrivania (hotspot 230,180)
  o+=shadowE(230,236,74,5,.45)+`<path d="${box(160,172,140,10,R,1)}" fill="#5a3720" ${ln(1.8)}/><path d="M168 182 V232 M292 182 V232" stroke="${OL}" stroke-width="5"/><path d="M168 182 V232 M292 182 V232" stroke="#3a2412" stroke-width="3"/><path d="M190 172 l2 -10 h26 l2 10z" fill="#e9e2cf" ${ln(1)}/><path d="M250 172 v-6 h20 v6" fill="#7a1e1e" ${ln(1)}/>`;
  // porta blindata (hotspot 440,140)
  o+=`<path d="${box(414,54,52,178,R,1)}" fill="#6d7175" ${ln(2)}/><circle cx="440" cy="140" r="15" fill="none" stroke="${OL}" stroke-width="3"/><path d="M440 125 V155 M425 140 H455" stroke="${OL}" stroke-width="3"/>`+vign; return o; };

/* ---------------- ISOLA (alba) ---------------- */
const daySky=(R,sunX=380,sunY=90)=>`<rect width="480" height="300" fill="url(#a_dawn)"/><circle cx="${sunX}" cy="${sunY}" r="70" fill="url(#a_sun)"/><circle cx="${sunX}" cy="${sunY}" r="18" fill="#fff4cf"/>`+clouds(R,5,20,110,'#ffd6c4');
ART.isola=()=>{ const R=S(301), f=F_(); let o=defs()+ddefs()+daySky(R,380,96);
  // mare (hotspot 240,150)
  o+=`<rect y="128" width="480" height="70" fill="url(#a_lagoon)"/>`+Array.from({length:22},()=>{ const x=R()*480, y=132+R()*60; return `<path d="M${x.toFixed(1)} ${y.toFixed(1)} q6 -3 12 0" stroke="#fff" stroke-opacity="${(.3+R()*.4).toFixed(2)}" fill="none"/>`; }).join('')+Array.from({length:6},(_,i)=>`<path d="M${368-i*3+R()*8} ${134+i*9} h${12+R()*14}" stroke="#fff6c9" stroke-opacity="${(.8-i*.1).toFixed(2)}" stroke-width="2" stroke-linecap="round"/>`).join('');
  o+=`<path d="M0 196 Q120 184 240 194 T480 190 V300 H0Z" fill="#f1d9a0" ${ln(1.6)}/><path d="M0 196 Q120 184 240 194 T480 190" stroke="#fff" stroke-width="4" fill="none" opacity=".8" class="drift"/>`+Array.from({length:50},()=>`<circle cx="${R()*480}" cy="${204+R()*94}" r="${.6+R()}" fill="#c9a86a"/>`).join('')+`<rect y="190" width="480" height="110" fill="url(#a_shadeUp)" opacity=".25"/>`;
  // relitto (hotspot 250,200)
  o+=shadowE(250,240,110,6,.3)+`<path d="${wob([[150,236],[160,200],[230,188],[330,196],[350,236]],R,2)}" fill="#6b4226" ${ln(2.2)}/>`+Array.from({length:6},(_,i)=>`<path d="M${168+i*30} ${200-i%2*4} L${172+i*30} 236" stroke="#3a2412" stroke-width="2"/>`).join('')+`<path d="M196 192 L180 120" stroke="${OL}" stroke-width="7"/><path d="M196 192 L180 120" stroke="#8a5a33" stroke-width="4.4"/><path d="M184 136 L230 150 L188 170Z" fill="#e9e2cf" opacity=".85" ${ln(1.2)}/><text x="290" y="226" font-size="7" font-weight="700" fill="#f1faee" font-family="Fredoka, sans-serif" transform="rotate(-6 290 226)">BAFFO II</text><path d="M330 236 l20 -14 l16 14" fill="none" stroke="${OL}" stroke-width="2"/>`;
  // palme (hotspot 40,130 e 440,120)
  o+=palm(36,284,170,R,16)+palm(446,276,166,R,-20);
  // sabbia smossa
  o+=`<path d="M110 252 q30 -8 60 0 q-30 8 -60 0z" fill="#e0c385" ${ln(1)}/>`;
  // falò (hotspot 330,256)
  if (f.fire) o+=`<path d="M314 266 L346 258 M316 258 L348 266" stroke="#3a2412" stroke-width="5"/><path d="M322 262 Q318 240 330 226 Q342 240 338 262Z" fill="#ff7b29" class="aflk"/><path d="M326 262 Q326 248 330 240 Q334 248 334 262Z" fill="#ffd166" class="aflk"/>${glow(330,250,80,.9)}`;
  else o+=`<path d="M314 266 L346 258 M316 258 L348 266" stroke="#3a2412" stroke-width="5"/>`+Array.from({length:7},(_,i)=>{ const a=i/7*Math.PI*2; return `<ellipse cx="${330+Math.cos(a)*20}" cy="${264+Math.sin(a)*6}" rx="5" ry="3" fill="#8a8e92" ${ln(.8)}/>`; }).join('');
  o+=`<path d="M410 250 q6 -8 12 0 q-6 4 -12 0z" fill="#e76f51" ${ln(.8)}/><path d="M90 280 l6 -4 l6 4" stroke="#e76f51" stroke-width="2" fill="none"/>`+vign.replace('.55','.3'); return o; };

/* ---------------- GIUNGLA ---------------- */
ART.giungla=()=>{ const R=S(303), f=F_(); let o=defs()+ddefs()+`<rect width="480" height="300" fill="#1f4a2a"/>`;
  for (let l=0;l<3;l++){ const col=['#173a22','#225a32','#2d6a3a'][l]; for (let i=0;i<14;i++){ const x=R()*500-10, y=40+R()*160, r=30+R()*40; o+=`<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r*.6}" fill="${col}" ${ln(1)}/>`; } }
  o+=Array.from({length:8},()=>{ const x=R()*480; return `<path d="M${x} 0 L${x-40} 300" stroke="#fff6c9" stroke-opacity=".07" stroke-width="18"/>`; }).join('');
  o+=`<rect y="230" width="480" height="70" fill="#3a2a18"/>`+Array.from({length:30},()=>{ const x=R()*480, y=232+R()*66; return `<path d="M${x} ${y} q6 -10 12 0" fill="#2d6a3a" ${ln(.6)}/>`; }).join('')+`<path d="M0 230 H480" stroke="${OL}" stroke-width="2"/>`;
  // liane (hotspot 240,80)
  o+=[226,240,254].map((x,i)=>`<path d="M${x} 0 Q${x+(i-1)*10} 80 ${x} 160" stroke="${OL}" stroke-width="5" fill="none"/><path d="M${x} 0 Q${x+(i-1)*10} 80 ${x} 160" stroke="#5c8a2a" stroke-width="3" fill="none"/>`+Array.from({length:5},(_,k)=>`<path d="M${x} ${20+k*28} q6 -4 10 2" fill="#3fa863" ${ln(.6)}/>`).join('')).join('');
  // banani (hotspot 126,170)
  o+=`<path d="M120 232 Q118 190 124 150" stroke="${OL}" stroke-width="10" fill="none"/><path d="M120 232 Q118 190 124 150" stroke="#7a9a3a" stroke-width="7" fill="none"/>`+Array.from({length:6},(_,i)=>{ const a=-Math.PI+i*Math.PI/5; return `<path d="M124 150 Q${124+Math.cos(a)*30} ${140+Math.sin(a)*14-14} ${124+Math.cos(a)*56} ${150+Math.sin(a)*24}" stroke="${OL}" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M124 150 Q${124+Math.cos(a)*30} ${140+Math.sin(a)*14-14} ${124+Math.cos(a)*56} ${150+Math.sin(a)*24}" stroke="#3fa863" stroke-width="9" fill="none" stroke-linecap="round"/>`; }).join('')+(f.banana?'':`<g transform="translate(118 160)">${[0,1,2,3].map(i=>`<path d="M${i*5} 0 q4 14 -2 22" stroke="${OL}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M${i*5} 0 q4 14 -2 22" stroke="#f4d03f" stroke-width="5" fill="none" stroke-linecap="round"/>`).join('')}</g>`);
  // scimmia (hotspot 400,90)
  o+=`<path d="M340 70 Q400 60 470 76" stroke="${OL}" stroke-width="9" fill="none"/><path d="M340 70 Q400 60 470 76" stroke="#6b4226" stroke-width="6" fill="none"/><g transform="translate(400 92)"><path d="M-8 -20 q-10 30 0 26" stroke="#5a3720" stroke-width="3" fill="none"/><ellipse cx="0" cy="0" rx="12" ry="14" fill="#7a4a26" ${ln(1.6)}/><circle cx="0" cy="-18" r="10" fill="#7a4a26" ${ln(1.6)}/><ellipse cx="0" cy="-15" rx="7" ry="6" fill="#d9a774"/><circle cx="-3" cy="-19" r="1.6" fill="#111"/><circle cx="3" cy="-19" r="1.6" fill="#111"/><path d="M-3 -12 q3 2 6 0" stroke="#111" fill="none"/><circle cx="-11" cy="-20" r="4" fill="#d9a774" ${ln(1)}/><circle cx="11" cy="-20" r="4" fill="#d9a774" ${ln(1)}/>${f.monkeyFed?'':`<circle cx="-22" cy="16" r="8" fill="#6b4a2b" ${ln(1.4)}/>`}</g>`;
  // rami secchi (hotspot 280,222)
  o+=`<path d="M250 228 l60 -8 M256 220 l50 10 M262 232 l40 -16" stroke="${OL}" stroke-width="4"/><path d="M250 228 l60 -8 M256 220 l50 10 M262 232 l40 -16" stroke="#8a6a3a" stroke-width="2.4"/>`;
  // sentiero (hotspot 460,200)
  o+=`<path d="M440 232 Q456 200 470 160 L480 160 L480 232Z" fill="#5a4026" ${ln(1.2)}/><path d="M452 196 l10 -4 l4 8" stroke="#ffd166" stroke-width="2" fill="none"/>`;
  o+=Array.from({length:6},()=>`<circle cx="${R()*480}" cy="${R()*200}" r="2" fill="${['#e63946','#ffd166','#ff8fab'][Math.floor(R()*3)]}" ${ln(.6)}/>`).join('')+vign.replace('.55','.4'); return o; };

/* ---------------- LAGUNA ---------------- */
ART.laguna=()=>{ const R=S(305); let o=defs()+ddefs()+daySky(R,90,60);
  o+=`<path d="M0 60 Q80 30 160 50 L190 300 H0Z" fill="#4a5a3a" ${ln(1.8)}/><path d="M480 50 Q400 24 320 46 L290 300 H480Z" fill="#4a5a3a" ${ln(1.8)}/>`+Array.from({length:10},()=>{ const x=R()<.5?R()*150:330+R()*150, y=60+R()*160; return `<ellipse cx="${x}" cy="${y}" rx="${14+R()*16}" ry="${8+R()*8}" fill="#2d6a3a" ${ln(1)}/>`; }).join('');
  // cascata (hotspot 240,100)
  o+=`<path d="M196 16 Q240 6 284 16 L282 210 Q240 216 198 210Z" fill="#9fe0f0" ${ln(2)}/>`+Array.from({length:12},(_,i)=>`<path d="M${202+i*7} 20 Q${204+i*7} 110 ${200+i*7.2} 206" stroke="#fff" stroke-opacity="${.3+(i%3)*.15}" stroke-width="2" fill="none" class="aflk"/>`).join('');
  // acqua (hotspot 240,230)
  o+=`<path d="M60 210 Q240 196 420 210 L460 260 Q240 274 20 260Z" fill="url(#a_lagoon)" ${ln(1.8)}/>`+Array.from({length:14},()=>`<ellipse cx="${200+R()*80}" cy="${212+R()*8}" rx="${4+R()*8}" ry="2" fill="#fff" opacity=".7"/>`).join('')+Array.from({length:12},()=>{ const x=80+R()*320, y=222+R()*34; return `<path d="M${x} ${y} q6 -3 12 0" stroke="#fff" stroke-opacity=".5" fill="none"/>`; }).join('');
  o+=`<path d="M0 260 Q240 280 480 260 V300 H0Z" fill="#e0c385" ${ln(1.4)}/>`;
  // scogli (hotspot 60,262) e sassi (hotspot 400,254)
  o+=`<path d="${wob([[36,272],[44,254],[70,250],[86,266]],R,1.6)}" fill="#6d6b80" ${ln(1.6)}/><path d="${wob([[388,262],[392,250],[410,248],[416,260]],R,1)}" fill="#8a8e92" ${ln(1.4)}/><ellipse cx="404" cy="262" rx="6" ry="3" fill="#9aa1ab" ${ln(1)}/>`+vign.replace('.55','.3'); return o; };

/* ---------------- VILLAGGIO ---------------- */
ART.villaggio=()=>{ const R=S(307), f=F_(); let o=defs()+ddefs()+daySky(R,250,70);
  // vulcano (hotspot 360,80)
  o+=`<path d="M290 140 L338 56 L382 56 L440 140Z" fill="#6b4a3a" ${ln(2)}/><path d="M338 56 Q360 64 382 56 L376 62 Q360 70 344 62Z" fill="#ff7b29"/><path d="M350 52 q-6 -20 6 -32 q12 -12 2 -26" stroke="#9aa1ab" stroke-opacity=".5" stroke-width="8" fill="none" class="smoke"/><path d="M344 62 l-6 30 M376 62 l10 26" stroke="#ff7b29" stroke-width="2" opacity=".7"/>`;
  o+=Array.from({length:12},()=>{ const x=R()*480; return `<ellipse cx="${x}" cy="${150+R()*20}" rx="${30+R()*30}" ry="18" fill="#2d6a3a" ${ln(1)}/>`; }).join('');
  o+=`<rect y="200" width="480" height="100" fill="#c9a06a"/>`+Array.from({length:40},()=>`<circle cx="${R()*480}" cy="${204+R()*94}" r="${.6+R()}" fill="#9a7a4a"/>`).join('')+`<path d="M0 200 H480" stroke="${OL}" stroke-width="2"/>`;
  // capanne (hotspot 70,165 e 190,165)
  const hut=(x,c)=>`${shadowE(x,232,52,4)}<path d="${box(x-40,170,80,62,R,1.4)}" fill="#a87a4a" ${ln(1.8)}/>`+Array.from({length:8},(_,i)=>`<path d="M${x-38+i*10} 172 V230" stroke="#7a5030" stroke-width="1.4"/>`).join('')+`<path d="${wob([[x-56,176],[x,116],[x+56,176]],R,1.4)}" fill="${c}" ${ln(2)}/>`+Array.from({length:6},(_,i)=>`<path d="M${x-48+i*18} 172 l6 -16" stroke="#7a6a20" stroke-width="1.6"/>`).join('')+`<path d="M${x-12} 232 V196 Q${x} 186 ${x+12} 196 V232Z" fill="#2a1a10" ${ln(1.4)}/>`;
  o+=hut(70,'#c9b04a')+hut(190,'#b8a03a');
  // ponte (hotspot 450,160)
  o+=`<path d="M420 200 L420 130 M480 200 L480 130" stroke="${OL}" stroke-width="5"/><path d="M420 130 Q450 150 480 130" stroke="#c9a77a" stroke-width="3" fill="none"/>`+(f.bridgeFixed?`<path d="M420 150 L480 150" stroke="#c9a77a" stroke-width="5"/>`+Array.from({length:6},(_,i)=>`<path d="M${424+i*10} 146 v8" stroke="#7a5030" stroke-width="3"/>`).join(''):`<path d="M420 150 L436 170 M444 140 L452 162" stroke="#c9a77a" stroke-width="3"/>`)+`<text x="450" y="124" text-anchor="middle" font-size="6" fill="#3a2412" font-family="Fredoka, sans-serif">${it()?'VULCANO →':'VOLCANO →'}</text>`;
  // totem (hotspot 300,110)
  o+=shadowE(300,236,30,4)+[0,1,2,3].map(i=>{ const y=30+i*50, c=['#c0392b','#2a9d8f','#e9c46a','#7a4a26'][i]; return `<path d="${box(276,y,48,50,R,1)}" fill="${c}" ${ln(1.8)}/><circle cx="288" cy="${y+18}" r="5" fill="#f1faee" ${ln(1)}/><circle cx="312" cy="${y+18}" r="5" fill="#f1faee" ${ln(1)}/><circle cx="288" cy="${y+18}" r="2" fill="#111"/><circle cx="312" cy="${y+18}" r="2" fill="#111"/><path d="M286 ${y+36} q14 ${i%2?8:-6} 28 0" stroke="#111" stroke-width="2.4" fill="none"/>`; }).join('')+`<path d="M262 40 l14 10 M338 40 l-14 10" stroke="${OL}" stroke-width="6"/><path d="M262 40 l14 10 M338 40 l-14 10" stroke="#e76f51" stroke-width="4"/>`;
  // pappagallo (hotspot 144,104)
  o+=`<path d="M124 120 H170" stroke="#6b4226" stroke-width="4"/><g transform="translate(144 100)"><path d="M-6 0 q-4 20 4 26 l6 -8 q6 -10 2 -18z" fill="#e63946" ${ln(1.4)}/><circle cx="0" cy="-6" r="8" fill="#e63946" ${ln(1.4)}/><path d="M6 -8 q8 2 4 8 q-2 -4 -6 -3z" fill="#ffd166" ${ln(1)}/><circle cx="2" cy="-8" r="1.6" fill="#111"/><path d="M-6 6 q-8 6 -4 14" fill="#2a6fdb" ${ln(1)}/></g>`;
  // fuoco (hotspot 240,250)
  o+=`<path d="M222 262 L258 254 M224 254 L260 262" stroke="#3a2412" stroke-width="5"/><path d="M230 258 Q226 234 240 220 Q254 234 250 258Z" fill="#ff7b29" class="aflk"/><path d="M234 258 Q234 244 240 234 Q246 244 246 258Z" fill="#ffd166" class="aflk"/>${glow(240,248,80,.8)}`+vign.replace('.55','.3'); return o; };

/* ---------------- VULCANO ---------------- */
ART.vulcano=()=>{ const R=S(309), f=F_(); let o=defs()+ddefs()+`<rect width="480" height="300" fill="#3a1e24"/><rect width="480" height="120" fill="#7a2e22" opacity=".6"/>`+Array.from({length:30},()=>`<circle cx="${R()*480}" cy="${R()*200}" r="${1+R()*1.5}" fill="#ffb347" opacity=".7" class="twk"/>`).join('');
  // cratere (hotspot 240,40)
  o+=`<path d="M140 80 Q240 20 340 80 Q240 100 140 80Z" fill="url(#a_lava)" ${ln(2)}/>${glow(240,60,160,.9)}<path d="M200 50 q-10 -30 10 -50 M270 48 q10 -30 -6 -50" stroke="#9aa1ab" stroke-opacity=".35" stroke-width="10" fill="none" class="smoke"/>`;
  o+=`<path d="M0 120 L120 80 L180 110 L300 100 L360 120 L480 90 V300 H0Z" fill="#4a2a2a" ${ln(2)}/>`+stains(0,90,480,210,R,20,'#000',.25);
  // fiume di lava (hotspot 240,220)
  o+=`<path d="M190 300 Q210 240 200 190 Q196 160 240 140 Q284 160 280 190 Q270 240 290 300Z" fill="url(#a_lava)" ${ln(2)}/>`+Array.from({length:10},()=>`<ellipse cx="${210+R()*60}" cy="${170+R()*120}" rx="${3+R()*6}" ry="2" fill="#fff6c9" opacity=".6" class="aflk"/>`).join('')+glow(240,230,180,.7);
  if (!f.lavaCrossed) o+=[[214,180],[250,222],[264,262]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="14" ry="6" fill="#555" ${ln(1.6)}/><ellipse cx="${x-3}" cy="${y-2}" rx="6" ry="2" fill="#777"/>`).join('');
  // capanna del nonno (hotspot 70,200)
  o+=shadowE(70,262,56,5)+`<path d="${box(26,200,88,60,R,1.4)}" fill="#7a5a3a" ${ln(1.8)}/><path d="${wob([[16,204],[70,160],[124,204]],R,1.4)}" fill="#5a4026" ${ln(2)}/><path d="${box(60,224,22,36,R,.8)}" fill="#1a0e06" ${ln(1.4)}/>${glow(71,240,40,.4)}`;
  // cancelli (hotspot gate1..3)
  o+=[[360,170,60],[410,150,60],[455,130,60]].map(([x,y,h],i)=>`<path d="${box(x-18,y-h/2,36,h,R,1)}" fill="#2a2e36" ${ln(1.8)}/>`+Array.from({length:4},(_,k)=>`<path d="M${x-12+k*8} ${y-h/2+4} V${y+h/2-4}" stroke="#6d7175" stroke-width="2"/>`).join('')+`<text x="${x}" y="${y-h/2-4}" text-anchor="middle" font-size="6" fill="#ffd166" font-family="Fredoka, sans-serif">${['I','II','III'][i]}</text>`).join('');
  o+=vign; return o; };

/* ---------------- GROTTA ---------------- */
ART.grotta=()=>{ const R=S(311); let o=defs()+ddefs()+`<rect width="480" height="300" fill="url(#a_cave)"/>`+Array.from({length:20},()=>{ const x=R()*480, w=10+R()*20, h=20+R()*50; return `<path d="M${x} 0 L${x+w/2} ${h} L${x+w} 0Z" fill="#2a2030" ${ln(1)}/>`; }).join('')+stains(0,0,480,300,R,14,'#000',.25);
  o+=`<rect y="240" width="480" height="60" fill="#2a2030"/><path d="M0 240 Q240 230 480 240" stroke="${OL}" stroke-width="2" fill="none"/>`;
  // statue (hotspot 60,130 e 420,130)
  const statue=(x)=>`${shadowE(x,248,30,4)}<path d="${box(x-22,210,44,36,R,1)}" fill="#6d6b80" ${ln(1.8)}/><path d="M${x-14} 210 V90 Q${x-14} 70 ${x} 66 Q${x+14} 70 ${x+14} 90 V210Z" fill="#8a889a" ${ln(2)}/><circle cx="${x}" cy="56" r="14" fill="#8a889a" ${ln(2)}/><path d="M${x-6} 54 h4 M${x+2} 54 h4 M${x-5} 62 q5 3 10 0" stroke="${OL}" stroke-width="1.4"/><path d="M${x-14} 110 l-14 20 M${x+14} 110 l14 20" stroke="${OL}" stroke-width="6"/><path d="M${x-14} 110 l-14 20 M${x+14} 110 l14 20" stroke="#8a889a" stroke-width="4"/><path d="M${x+28} 130 V60" stroke="${OL}" stroke-width="4"/><ellipse cx="${x+28}" cy="58" rx="8" ry="5" fill="#c9a227" ${ln(1.4)}/>`;
  o+=statue(60)+statue(420);
  // tesoro (hotspot 240,190)
  o+=`<g transform="translate(240 210)"><path d="M-110 30 Q-80 -20 -40 -10 Q0 -40 40 -10 Q80 -20 110 30Z" fill="#c9a227" ${ln(2.2)}/>`+Array.from({length:26},(_,i)=>`<circle cx="${-96+(i*37)%192}" cy="${14-(i*13)%32}" r="7" fill="#f4d03f" ${ln(1.2)}/><path d="M${-99+(i*37)%192} ${11-(i*13)%32} q3 -2 6 0" stroke="#fff6c9" stroke-width="1.2" fill="none"/>`).join('')+`<path d="${box(-32,-52,64,42,R,1)}" fill="#6b4a2b" ${ln(2.2)}/><path d="M-32 -38 H32" stroke="#c9a227" stroke-width="3"/><circle cy="-30" r="4" fill="#c9a227" ${ln(1)}/></g>${glow(240,200,200,.8)}<g class="twk">${Array.from({length:18},()=>`<path d="M${130+R()*220} ${150+R()*70} l1.5 -4 l1.5 4 l4 1.5 l-4 1.5 l-1.5 4 l-1.5 -4 l-4 -1.5z" fill="#fff6c9"/>`).join('')}</g>`;
  // tunnel (hotspot 455,260)
  o+=`<path d="M430 300 V250 Q455 224 480 250 V300Z" fill="#0b0810" ${ln(2)}/><path d="M440 290 q15 -20 30 0" fill="#1d4a6a" opacity=".6"/>`+vign; return o; };

/* ---------------- abilitazione per tutti i capitoli ---------------- */
// il municipio del capitolo 2 ha la teca del Mestolo
const mun=ART.municipio; ART.municipio=()=>{ let o=mun(); if (ch()===2) o=o.replace(/<rect width="480" height="300" fill="url\(#a_vign\)"\/>$/,'')+`<g transform="translate(240 160)"><path d="M-34 40 h68 v30 h-68z" fill="#6b3f24" ${ln(2)}/><path d="M-30 -6 h60 v46 h-60z" fill="#bfe3f0" fill-opacity=".35" ${ln(2.4)}/><path d="M14 -2 L2 24" stroke="${OL}" stroke-width="6" stroke-linecap="round"/><path d="M14 -2 L2 24" stroke="#f4d03f" stroke-width="3" stroke-linecap="round"/><ellipse cx="-2" cy="30" rx="9" ry="6" fill="#f4d03f" ${ln(2)}/><path d="M-26 0 L-14 0" stroke="#fff" stroke-opacity=".7" stroke-width="2"/><text y="62" text-anchor="middle" font-size="6" fill="#f4d03f" font-family="Fredoka, sans-serif">MESTOLO D'ORO</text></g>`+vign; return o; };
window.AV_ART_ALLCH=true;
})();
