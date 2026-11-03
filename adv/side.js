/* ================= CAMMINATA DI PROFILO =================
   Quando un personaggio cammina o corre si vede di profilo, come nelle avventure classiche:
   testa di lato col naso, un occhio, gambe che fanno il passo vero, braccia che oscillano. */
(()=>{ if (!window.ADV) return;
const OL='#1e1410';
const S=(w=1.3)=>`stroke="${OL}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
function hairFor(look){ const h=(look&&look.hair)||'short', c=(look&&look.hairColor)||'#c8642a';
  if (h==='bald') return `<path d="M-12 -70 Q-13 -62 -10 -56" stroke="${c}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  if (h==='receding') return `<path d="M-14 -72 Q-12 -80 -4 -80 Q-12 -76 -12 -60 Z" fill="${c}" ${S(1)}/>`;
  let o=`<path d="M-14 -62 Q-16 -82 2 -82 Q16 -82 17 -70 Q8 -74 2 -72 Q-2 -68 -8 -66 Q-11 -62 -14 -60Z" fill="${c}" ${S(1.2)}/>`;
  if (['long','wavy','bun','highbun','pony','braids','twintails','bob','afropuffs','curly','afro'].includes(h)){
    if (['long','wavy','braids'].includes(h)) o=`<path d="M-15 -62 Q-18 -84 2 -83 Q17 -83 17 -70 Q8 -74 2 -72 Q-4 -66 -8 -62 L-10 -40 Q-16 -38 -18 -46Z" fill="${c}" ${S(1.2)}/>`;
    if (['bun','highbun'].includes(h)) o+=`<circle cx="-10" cy="${h==='highbun'?-86:-76}" r="7" fill="${c}" ${S(1.2)}/>`;
    if (h==='pony') o+=`<path d="M-12 -74 Q-26 -70 -22 -50 Q-18 -62 -10 -68Z" fill="${c}" ${S(1.1)}/>`;
    if (['afro','curly','afropuffs'].includes(h)) o=`<circle cx="-5" cy="-76" r="14" fill="${c}" ${S(1.2)}/><circle cx="-12" cy="-64" r="9" fill="${c}" ${S(1)}/><circle cx="5" cy="-80" r="8" fill="${c}"/>`;
  }
  if (h==='mohawk') o=`<path d="M-8 -78 L-4 -94 L2 -80 L6 -96 L10 -80 L14 -90 L14 -74 Q2 -76 -8 -72Z" fill="${c}" ${S(1.1)}/>`;
  if (h==='short'||!h) o+=`<path d="M-6 -82 L-10 -90 L-1 -84 Z M2 -83 L4 -92 L8 -83Z" fill="${c}" ${S(1)}/>`;
  return o; }
function build(look, female){
  const glasses=!(look&&look.glasses===false);
  const beard=look&&look.beard&&look.beard!=='none';
  const legs=(id)=>`<g data-s="${id}"><path d="M-5 0 Q-6 13 -4.5 26 L4.5 26 Q6 13 5 0Z" class="pants"/><g data-s="${id}k" transform="translate(0 25)"><path d="M-4.5 -1 L4.5 -1 Q4.4 11 3.6 22 L-3.6 22 Q-4.4 11 -4.5 -1Z" class="pants"/><path d="M-5 21 Q-5 26 0 27 L14 27 Q16 22 9 20 L-4 19Z" class="shoe" fill="#4a2a14" ${S(1.1)}/></g></g>`;
  const arm=(id)=>`<g data-s="${id}"><path d="M-4.5 -1 Q-5 9 -4 19 L4 19 Q5 9 4.5 -1 Q0 -4 -4.5 -1Z" class="outfit"/><g data-s="${id}e" transform="translate(0 18)"><path d="M-4 -1.5 L4 -1.5 Q4 8 3.4 16 L-3.4 16 Q-4 8 -4 -1.5Z" class="outfit"/><circle cy="19" r="4.6" class="skin" ${S(1)}/></g></g>`;
  return `<g data-s="root">
   <g data-s="back">${arm('aB')}${legs('lB')}</g>
   <path d="M-11 0 Q-14 -22 -10 -38 Q-6 -45 2 -45 Q11 -44 13 -36 Q16 -20 12 0 Q0 4 -11 0Z" class="outfit"/>
   <path d="M2 -45 Q11 -44 13 -36 Q16 -20 12 0 Q8 2 5 1.5 Q9 -20 2 -45Z" fill="#000" opacity=".12"/>
   <path d="M-11 -2 H12 L12 3 H-11Z" class="pants"/>
   <path d="M-3 -46 h7 l1 -6 h-8z" class="skin"/>
   <g data-s="head"><path d="M-14 -62 Q-15 -81 1 -81 Q16 -81 16 -66 Q17 -62 20 -60 Q21 -57 17 -56 Q15 -48 6 -47 Q-6 -46 -12 -52 Q-15 -56 -14 -62Z" class="skin" ${S(1.3)}/>
    <path d="M14 -64 Q22 -60 20 -55 Q17 -53 14 -55" class="skin" ${S(1.1)}/>
    <circle cx="-4" cy="-62" r="4" class="skinD" ${S(1)}/><path d="M-5 -64 q2 2 0 4" stroke="#000" stroke-opacity=".3" fill="none"/>
    <ellipse cx="8" cy="-66" rx="3" ry="3.4" fill="#fff" ${S(.9)}/><circle cx="9.6" cy="-65.6" r="1.8" class="iris" fill="#3a2a1a"/><circle cx="10.2" cy="-66.4" r=".6" fill="#fff"/>
    <path d="M4 -72 q4 -2 8 0" stroke="${OL}" stroke-width="1.6" fill="none"/>
    <path d="M9 -52 q4 1 6 -1" stroke="#6b3020" stroke-width="1.4" fill="none"/>
    ${beard?`<path d="M8 -55 q5 3 10 0 q-4 4 -10 0z" fill="${(look&&look.hairColor)||'#333'}" ${S(.7)}/>`:''}
    ${hairFor(look)}
    ${glasses?`<circle cx="8.5" cy="-66" r="5.4" fill="rgba(255,255,255,.18)" stroke="#2b2b2b" stroke-width="1.3"/><path d="M3 -66.5 L-3 -65" stroke="#2b2b2b" stroke-width="1.1"/>`:''}
   </g>
   <g data-s="front">${legs('lF')}${arm('aF')}</g>
  </g>`; }
function rig(g, P, look, female){
  if (!g) return null; let sg=g.querySelector(':scope > g.aside'); const sig=JSON.stringify(look||{});
  if (!sg){ sg=document.createElementNS(NS,'g'); sg.setAttribute('class','aside'); sg.style.display='none'; g.appendChild(sg); }
  if (sg.__sig!==sig){ sg.innerHTML=build(look,female); sg.__sig=sig; sg.__p={}; sg.querySelectorAll('[data-s]').forEach(e=>sg.__p[e.getAttribute('data-s')]=e); }
  return sg; }
function pose(sg, ph, run){ const p=sg.__p; const A=run?34:26, K=run?50:34, ARM=run?38:24;
  const s=Math.sin(ph), c=Math.cos(ph);
  const lF=s*A, lB=-s*A, kF=Math.max(0,-c)*K*(s>0?.4:1), kB=Math.max(0,c)*K*(s<0?.4:1);
  p.lF.setAttribute('transform',`translate(2 0) rotate(${-lF})`); p.lFk.setAttribute('transform',`translate(0 25) rotate(${kF})`);
  p.lB.setAttribute('transform',`translate(-2 0) rotate(${-lB})`); p.lBk.setAttribute('transform',`translate(0 25) rotate(${kB})`);
  p.aF.setAttribute('transform',`translate(1 -38) rotate(${lF*ARM/A*0.9})`); p.aFe.setAttribute('transform',`translate(0 18) rotate(${-(run?70:18)-Math.max(0,s)*10})`);
  p.aB.setAttribute('transform',`translate(-3 -38) rotate(${lB*ARM/A*0.9})`); p.aBe.setAttribute('transform',`translate(0 18) rotate(${-(run?70:18)-Math.max(0,-s)*10})`);
  p.back.setAttribute('opacity','.92');
  p.head.setAttribute('transform',`translate(0 ${Math.abs(c)*-1.2}) rotate(${run?4:1.5})`);
  p.root.setAttribute('transform',`translate(0 ${-Math.abs(c)*(run?3:1.8)}) rotate(${run?6:2})`); }
let t0=performance.now();
function tick(now){
  try{
    // protagonista
    const walking=H.pose==='walk'||H.pose==='run'||H.pose==='sneak';
    if (typeof holG!=='undefined'){ const sg=rig(holG, J, H.look||{}, H.kind==='f'); const hips=J.hips||document.getElementById('hips');
      if (walking && !H.seat && !H.lying){ sg.style.display=''; if (hips) hips.style.display='none'; pose(sg,(now-t0)/(H.pose==='run'?180:270)*Math.PI, H.pose==='run'); }
      else { sg.style.display='none'; if (hips) hips.style.display=''; } }
    // gli altri
    for (const n of (typeof NPCS!=='undefined'?NPCS:[])){ if (n.room!==H.room) continue; const w=n.pose===POSES.walk||n.pose===POSES.run;
      const sg=rig(n.g, n.P, n.look||{}, n.kind==='f'); const hips=n.g.querySelector(':scope > g[data-j="hips"]');
      if (w){ sg.style.display=''; if (hips) hips.style.display='none'; pose(sg,(now-t0)/(n.pose===POSES.run?180:270)*Math.PI+(n.X||0)*.01, n.pose===POSES.run); }
      else if (sg.style.display!=='none'){ sg.style.display='none'; if (hips) hips.style.display=''; } }
  }catch(e){}
  requestAnimationFrame(tick); }
function boot(){ requestAnimationFrame(tick); }
if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
