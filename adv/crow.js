/* Animazione: il corvo che ruba il Mestolo in piazza */
(()=>{ if (!window.ADV) return;
const OL='#1e1410';
const CROW=(up)=>`<g><path d="M-14 2 Q-4 -10 10 -4 Q18 -2 22 2 Q12 4 4 8 Q-8 10 -14 2Z" fill="#111" stroke="${OL}" stroke-width="1.2"/>
 <path d="M-14 2 L-26 -2 L-24 6 Z" fill="#111"/><circle cx="14" cy="-3" r="6" fill="#111"/><circle cx="16" cy="-4" r="1.6" fill="#ffd166"/><path d="M19 -2 L28 0 L19 2Z" fill="#c9a227" stroke="${OL}" stroke-width=".6"/>
 ${up?`<path d="M-2 -4 Q-10 -30 6 -34 Q4 -16 6 -4Z" fill="#1a1a1a" stroke="${OL}" stroke-width="1"/>`:`<path d="M-2 0 Q-12 22 4 26 Q4 12 6 2Z" fill="#1a1a1a" stroke="${OL}" stroke-width="1"/>`}</g>`;
const LADLE=`<g><path d="M0 0 L22 -18" stroke="${OL}" stroke-width="4" stroke-linecap="round"/><path d="M0 0 L22 -18" stroke="#f4d03f" stroke-width="2.4" stroke-linecap="round"/><ellipse cx="-3" cy="3" rx="7" ry="5" fill="#f4d03f" stroke="${OL}" stroke-width="1.2"/><circle cx="-5" cy="1" r="1.4" fill="#fff6c9"/></g>`;
const NOTE=`<g><path d="M-6 -4 h12 v8 h-12z" fill="#e9e2cf" stroke="${OL}" stroke-width="1"/><path d="M-6 -4 q-3 4 0 8 M6 -4 q3 4 0 8" stroke="${OL}" stroke-width="1" fill="none"/><path d="M-3 0 h6" stroke="#7a1e1e" stroke-width="1"/></g>`;
const tw=(ms,fn)=>new Promise(res=>{ const t0=performance.now(); (function st(n){ const k=Math.min(1,(n-t0)/ms); fn(k); if (k<1) requestAnimationFrame(st); else res(); })(t0); });
const ease=k=>k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;
window.avCrowSteal=async function(){ try{
  const L=(typeof fxL!=='undefined'?fxL:scene); const g=document.createElementNS(NS,'g'); L.appendChild(g);
  const hx=H.X+(H.dir||1)*16, hy=STAND-78;
  const lad=document.createElementNS(NS,'g'); lad.innerHTML=LADLE; g.appendChild(lad); lad.setAttribute('transform',`translate(${hx} ${hy})`);
  const crow=document.createElementNS(NS,'g'); g.appendChild(crow);
  let flap=0; const fl=setInterval(()=>{ flap^=1; crow.firstChild&&crow.removeChild(crow.firstChild); const c=document.createElementNS(NS,'g'); c.innerHTML=CROW(flap); crow.appendChild(c.firstChild); },110);
  crow.innerHTML=CROW(1);
  const sx=240, sy=-20, dir=hx<sx?-1:1;
  await tw(1000,k=>{ const e=ease(k); const x=sx+(hx-sx)*e, y=sy+(hy-30-sy)*e+Math.sin(k*Math.PI)*-30; crow.setAttribute('transform',`translate(${x} ${y}) scale(${dir} 1) scale(2.2)`); });
  for (let i=0;i<4;i++){ const fe=document.createElementNS(NS,'path'); fe.setAttribute('d','M0 0 q3 -4 6 0 q-3 2 -6 0z'); fe.setAttribute('fill','#111'); g.appendChild(fe); const fx=hx+(Math.random()-.5)*30, fy=hy-20; tw(1600,k=>fe.setAttribute('transform',`translate(${fx+Math.sin(k*8+i)*8} ${fy+k*90}) rotate(${k*200})`)).then(()=>fe.remove()); }
  try{ setPose('scared'); }catch(e){}
  await tw(350,k=>{ const x=hx, y=hy-30+k*10; crow.setAttribute('transform',`translate(${x} ${y}) scale(${dir} 1) scale(2.2)`); });
  const note=document.createElementNS(NS,'g'); note.innerHTML=NOTE; g.appendChild(note);
  const ex=dir>0?560:-80, ey=-60, nx=hx, ny=hy-20;
  const fall=tw(1100,k=>note.setAttribute('transform',`translate(${nx+Math.sin(k*6)*14} ${ny+k*(STAND-ny)}) rotate(${Math.sin(k*9)*30})`));
  await tw(1300,k=>{ const e=k*k; const x=hx+(ex-hx)*e, y=hy-20+(ey-hy)*e; crow.setAttribute('transform',`translate(${x} ${y}) scale(${-dir} 1) scale(2.2)`); lad.setAttribute('transform',`translate(${x-(-dir)*6} ${y+14}) rotate(${-dir*20})`); });
  await fall; clearInterval(fl); crow.remove(); lad.remove();
  setTimeout(()=>{ tw(500,k=>note.setAttribute('opacity',1-k)).then(()=>g.remove()); },900);
 }catch(e){ console.warn(e); } };
})();
