/* ================= ANIMAZIONI DEI PERSONAGGI E DELLE SCENE =================
   - bocca che si muove mentre si parla
   - i personaggi sbattono le palpebre, si guardano intorno, fanno piccoli gesti
   - vita nelle scene: falene attorno ai lampioni, finestre che si accendono e spengono, gabbiani, foglie */
(()=>{ if (!window.ADV) return;
const MOUTH_SEQ=['open','o','flat','big','o','smile','open','flat'];
function speakerParts(who){ if (who==='me') return {mouth:J.mouth, head:J.head, n:null}; if (who==='voice') return null; const n=(AV.npcs||[]).find(x=>x.avId===who); return n?{mouth:n.P.mouth, head:n.P.head, n}:null; }
function wrapSay(){ const old=window.avSay; if (!old) return;
  window.avSay=function(who,text){ const pr=old.apply(this,arguments); try{ const sp=speakerParts(who); if (sp && sp.mouth && typeof MOUTHS!=='undefined'){ const keep=sp.mouth.innerHTML; let i=0, alive=true; const dur=Math.min(6500, 400+String(text||'').length*55); const t0=performance.now();
      const iv=setInterval(()=>{ if (!alive) return; if (performance.now()-t0>dur){ stop(); return; } sp.mouth.innerHTML=MOUTHS[MOUTH_SEQ[i++%MOUTH_SEQ.length]]||keep; },115);
      function stop(){ if (!alive) return; alive=false; clearInterval(iv); sp.mouth.innerHTML=keep; }
      Promise.resolve(pr).finally(stop); } }catch(e){} return pr; }; }

/* palpebre e vita dei personaggi non giocanti */
const BL=()=>typeof BLINK_SVG!=='undefined'?BLINK_SVG:'';
function blink(n){ try{ const e=n.P.eyes; if (!e || e.__bl) return; if (typeof EYES!=='undefined' && e.innerHTML!==EYES.normal && !e.innerHTML.includes('class="iris"')) return; const keep=e.innerHTML; e.__bl=1; e.innerHTML=BL(); setTimeout(()=>{ if (e.innerHTML===BL()||e.innerHTML.includes('d="M-10 -17.2')) e.innerHTML=keep; e.__bl=0; },130); }catch(x){} }
const GEST=['look','think','shrug','yawn','scratch','wave','point'];
function life(){ try{ if (typeof AV==='undefined' || !AV.npcs) return; const now=performance.now();
  for (const n of AV.npcs){ if (n.room!==H.room) continue;
    if (!n.__nb || now>n.__nb){ blink(n); n.__nb=now+2200+Math.random()*3800; }
    if (n.keep || AV.busy) continue;
    if (!n.__ng){ n.__ng=now+5000+Math.random()*9000; continue; }
    if (now>n.__ng){ n.__ng=now+7000+Math.random()*12000; const r=Math.random();
      if (r<.45){ n.dir=(H.X>n.X?1:-1)*(Math.random()<.7?1:-1); }
      else { const g=GEST[Math.floor(Math.random()*GEST.length)]; if (typeof POSES!=='undefined' && POSES[g]){ npcPose(n,g); setTimeout(()=>{ if (!n.keep && n.pose===POSES[g]) npcPose(n,'idle'); },1400+Math.random()*900); } } } } }catch(e){} }

/* vita nelle scene (strato effetti, sopra lo sfondo e sotto il testo) */
const OL='#1e1410';
function ambient(r){ const L=document.getElementById('advAmb')||(()=>{ const g=document.createElementNS(NS,'g'); g.id='advAmb'; g.setAttribute('pointer-events','none'); const back=document.getElementById('back'); back.parentNode.insertBefore(g, back.nextSibling); return g; })();
  L.innerHTML=''; if (!window.AV_ART || !AV_ART[r]) return;
  const night=(window.AV_NIGHT||[]).includes(r)||['piazza','porto','cimitero','faro','stazione','beach','park','garden','woods'].includes(r);
  let o='';
  // falene attorno ai lampioni
  const lamps={piazza:[[197,111],[451,119]],porto:[[223,81]],park:[[215,105]],stazione:[[215,85]]}[r]||[];
  for (const [x,y] of lamps) for (let i=0;i<3;i++) o+=`<g class="amoth" style="--x:${x}px;--y:${y}px;animation-delay:${-i*1.3}s;animation-duration:${3+i*.7}s"><circle r="1.3" fill="#fff6d8"/></g>`;
  // gabbiani sul mare
  if (['porto','faro','beach','isola','laguna'].includes(r)) for (let i=0;i<2;i++) o+=`<g class="agull" style="animation-delay:${-i*9}s;animation-duration:${22+i*6}s"><path d="M0 0 q5 -5 10 0 q5 -5 10 0" stroke="${night?'#dfe7ff':'#fff'}" stroke-width="1.6" fill="none" transform="translate(0 ${40+i*24})"><animate attributeName="d" values="M0 0 q5 -5 10 0 q5 -5 10 0;M0 -2 q5 2 10 2 q5 0 10 -2;M0 0 q5 -5 10 0 q5 -5 10 0" dur=".7s" repeatCount="indefinite"/></path></g>`;
  // foglie che cadono / lucciole
  if (['park','garden','woods','giungla'].includes(r)) for (let i=0;i<6;i++) o+=`<g class="aleaf" style="--x:${(i*83)%460}px;animation-delay:${-i*1.9}s;animation-duration:${8+i%3*2}s"><path d="M0 0 q4 -4 8 0 q-4 4 -8 0z" fill="${r==='giungla'?'#3fa863':'#c98a2c'}" stroke="${OL}" stroke-width=".5"/></g>`;
  // pesci che saltano
  const fp={porto:[330,176],beach:[280,180],isola:[150,160],faro:[200,190]}[r]; if (fp) o+=`<g class="afish" style="--fx:${fp[0]}px;--fy:${fp[1]}px"><path d="M0 0 q6 -5 12 0 q-6 5 -12 0z M12 0 l5 -4 v8z" fill="${night?'#8fb3d9':'#ffb347'}" stroke="${OL}" stroke-width=".6"/></g>`;
  L.innerHTML=o; }
const css=document.createElement('style'); css.textContent=`
 .amoth{animation:aMoth 3s linear infinite} @keyframes aMoth{0%{transform:translate(calc(var(--x) + 8px),var(--y))}25%{transform:translate(calc(var(--x) + 1px),calc(var(--y) - 7px))}50%{transform:translate(calc(var(--x) - 8px),calc(var(--y) + 1px))}75%{transform:translate(calc(var(--x) - 1px),calc(var(--y) + 8px))}100%{transform:translate(calc(var(--x) + 8px),var(--y))}}
 .agull{animation:aGull 24s linear infinite} @keyframes aGull{0%{transform:translate(-40px,0)}100%{transform:translate(520px,-20px)}}
 .aleaf{animation:aLeaf 9s linear infinite} @keyframes aLeaf{0%{transform:translate(var(--x),-10px) rotate(0)}50%{transform:translate(calc(var(--x) + 30px),120px) rotate(200deg)}100%{transform:translate(calc(var(--x) - 10px),250px) rotate(380deg);opacity:0}}
 .afish{animation:aFish 11s ease-in-out infinite;opacity:0} @keyframes aFish{0%,70%{transform:translate(var(--fx),var(--fy));opacity:0}74%{opacity:1}80%{transform:translate(calc(var(--fx) + 30px),calc(var(--fy) - 30px)) rotate(-30deg)}86%{transform:translate(calc(var(--fx) + 60px),calc(var(--fy) + 2px)) rotate(40deg);opacity:1}88%,100%{opacity:0}}`;
document.head.appendChild(css);

function boot(){ wrapSay(); setInterval(life,250);
  const od=window.drawRoom; if (od) window.drawRoom=function(r){ const out=od.apply(this,arguments); try{ ambient(r); }catch(e){} return out; };
  try{ if (typeof H!=='undefined' && H.room) ambient(H.room); }catch(e){} }
if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
