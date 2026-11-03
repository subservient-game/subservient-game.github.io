/* ================= PERSONAGGI — stile cartoon da avventura =================
   Contorni scuri, nasi diversi per ognuno, sopracciglia e guance, lentiggini solo a chi le ha. */
(()=>{ if (!window.ADV) return;
const css=document.createElement('style');
const SEL=(c)=>`body.adv #hol .${c}, body.adv #npcs .${c}`;
css.textContent=`${['skin','outfit','pants','legs','shin','shoe','sleeveU','sleeveF','skinD','outfitD:not(.cuff)'].map(SEL).join(',')}{stroke:#1e1410;stroke-width:1.15px;stroke-linejoin:round;paint-order:stroke}
 body.adv #hol #hairFront path, body.adv #hol #hairBack path, body.adv #npcs [data-j="hairFront"] path, body.adv #npcs [data-j="hairBack"] path{stroke:#1e1410;stroke-width:1.1px;stroke-linejoin:round}
 body.adv #hol #beard path, body.adv #npcs [data-j="beard"] path{stroke:#1e1410;stroke-width:.8px}
 body.adv #hol #glasses circle, body.adv #npcs [data-j="glasses"] circle{stroke-width:1.2px}`;
document.head.appendChild(css);
const hash=s=>{ let h=2166136261; for (const c of String(s)) { h^=c.charCodeAt(0); h=Math.imul(h,16777619); } return h>>>0; };
const NOSES=[
 'M-1 -18 C1 -15 4 -12 6 -10.5 C5 -9 2 -8.6 -1 -9.6 C-2 -10.5 -2 -12 -1 -13 Z',
 'M-1 -16 C-3 -13 -4 -10 -1 -9 C2 -8 6 -8.5 6 -11.5 C6 -14 3 -14.5 1 -14 C1 -15 0 -16 -1 -16Z',
 'M-1 -18 C2 -15 7 -12 9.5 -10 C8 -8.5 3 -8.4 -1 -9.4 C-2 -11 -2 -14 -1 -18Z',
 'M0 -14 C2 -14 3.5 -12 3 -10.5 C2 -9.3 -1 -9.3 -1.5 -10.5 C-2 -12 -1.5 -14 0 -14Z',
 'M-1 -18.5 C3 -17 7 -13 7.5 -9.5 C6 -8.5 3 -8.6 1 -9.6 C-1 -10.5 -1.5 -13 -1 -18.5Z',
 'M-1 -18 C1.5 -16 2 -15 2.5 -13.5 C4.5 -12 5.5 -10.5 4.5 -9.6 C2.5 -8.8 0 -9 -1.2 -9.8 C-1.6 -12 -1.5 -15 -1 -18Z'];                              // aquilino
const CHEEK=`<g class="acheek" opacity=".35"><ellipse cx="-9.5" cy="-10" rx="3.2" ry="2" fill="#e8705a"/><ellipse cx="9.5" cy="-10" rx="3.2" ry="2" fill="#e8705a"/></g>`;
const LINES=`<path class="awr" d="M-13 -21 q2 -1.5 4 0 M9 -21 q2 -1.5 4 0 M-5 -27.5 q5 -1.5 10 0" stroke="#000" stroke-opacity=".22" stroke-width=".8" fill="none"/>`;
function decorate(P, key, look, isPlayer){
  try{
    const head=P.head; if (!head) return;
    head.querySelectorAll('.anose,.acheek,.awr,.anoseg').forEach(e=>e.remove());
    const h=hash(key);
    const g=document.createElementNS(NS,'g'); g.setAttribute('class','anoseg');
    const nd=NOSES[isPlayer?3:h%NOSES.length], sc=isPlayer?1.1:(1+((h>>>5)%4)*.08);
    let html=`<g transform="translate(1 -12) scale(${sc}) translate(-1 12)"><path d="${nd}" class="skin anose" style="stroke-width:.9px"/><path d="${nd}" fill="#7a3b1a" opacity=".16" transform="translate(-.6 .5)" style="stroke:none"/><path d="M.6 -10.4 q1.3 .7 2.4 0" stroke="#1e1410" stroke-opacity=".55" stroke-width=".7" fill="none"/><path d="M0 -16 q1 2 1.5 3.5" stroke="#fff" stroke-opacity=".35" stroke-width=".9" fill="none"/></g>`+CHEEK;
    const old=look && (/eeeeee|cccccc|aaaaaa/i.test(look.hairColor||'') || look.hair==='bald' || look.hair==='receding');
    if (old) html+=LINES;
    g.innerHTML=html;
    const mouth=P.mouth||head.querySelector('[data-j="mouth"]'); if (mouth) head.insertBefore(g, mouth); else head.appendChild(g);
    // il vecchio nasino a linea non serve più
    head.querySelectorAll(':scope > path').forEach(p=>{ const d=p.getAttribute('d')||''; if (d.startsWith('M.6 -16 q2.6 2.8')||d.startsWith('M0 -15 q2 2.6')) p.style.display='none'; });
    if (P.freckles && !isPlayer) P.freckles.style.display = (look && look.freckles===true) ? '' : 'none';
  }catch(e){}
}
function wrap(){
  const oldN=window.npcLook; if (oldN) window.npcLook=function(n, look){ const r=oldN.apply(this,arguments); decorate(n.P, (n.avId||n.name||'x'), look, false); return r; };
  const oldA=window.applyLook; if (oldA) window.applyLook=function(){ const r=oldA.apply(this,arguments); decorate(J, 'me', (typeof H!=='undefined'&&H.look)||{}, true); return r; };
  try{ decorate(J,'me',(H&&H.look)||{},true); (typeof NPCS!=='undefined'?NPCS:[]).forEach(n=>decorate(n.P,(n.avId||n.name||'x'),n.look,false)); }catch(e){}
}
if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',wrap); else wrap();
window.avDecorateChar=decorate;
})();
