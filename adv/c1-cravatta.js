/* ================= CAPITOLO 1 — LA CRAVATTA DEL NONNO: Jacques vuole anche la cravatta ================= */
Object.assign(AV_ITEMS,{ cravatta:['👔','Cravatta col sugo','Sauce-stained tie'], cravattap:['👔','Cravatta pulita','Clean tie'] });
const tieIcon=(stain)=>`<path d="M20 6 L28 6 L30 12 L26 14 L32 38 L24 44 L16 38 L22 14 L18 12Z" fill="#5a7bd8" stroke="#2b2b2b" stroke-width="2.3" stroke-linejoin="round"/>${[[23,22],[25,30],[21,36]].map(([x,y])=>`<path d="M${x-2} ${y} L${x+3} ${y-3}" stroke="#ffd166" stroke-width="2"/>`).join('')}${stain?`<ellipse cx="25" cy="27" rx="5" ry="4" fill="#c0392b" opacity=".85"/><circle cx="20" cy="33" r="2.2" fill="#c0392b" opacity=".85"/>`:''}`;
AV_ICONS.cravatta=tieIcon(true); AV_ICONS.cravattap=tieIcon(false);
AV_TROPHIES.push(['fantasma','Hai tolto il lenzuolo al fantasma della soffitta. Era il manichino del nonno. Con la cravatta.','Pulled the sheet off the attic ghost. It was grandpa\'s mannequin. Wearing a tie.']);
const c1w=()=>!(AV.st.ch>1);
(()=>{ const old=AV_ENTER.prive.before; AV_ENTER.prive.before=async()=>{ const f=F();
  if (c1w() && !f.inPrive && f.invite && f.slick && f.roseOn && !f.tieOn){ avKick('disco'); f.tieAsk=1; avSave();
    await np('jacques','Ciuffo, rosa, invito... e il collo nudo? Monsieur, senza cravatta lei non è un gentiluomo, è un idraulico in libera uscita. Torni con una cravatta. Pulita.','Quiff, rose, invitation... and a bare neck? Monsieur, without a tie you\'re not a gentleman, you\'re a plumber on day release. Come back with a tie. A clean one.'); return false; }
  return old(); }; })();
(()=>{ const old=AV_S['take:ghost']; const h=async(...a)=>{ const f=F();
  if (c1w() && f.tieAsk && !f.tieGot){ await me('Ok. Coraggio. Tiro via il lenzuolo...','OK. Courage. I pull off the sheet...'); await meAct('scared',1200);
    f.tieGot=1; avSave(); avAdd('cravatta'); avTrophy('fantasma','Hai tolto il lenzuolo al fantasma della soffitta. Era il manichino del nonno. Con la cravatta.','Pulled the sheet off the attic ghost. It was grandpa\'s mannequin. Wearing a tie.');
    return me('AAAH! ...È il manichino da sarto del nonno. Indossa il suo abito della domenica e una cravatta blu, con una macchia di sugo grossa come un\'isola. Sugo del 1987, direi. La prendo.','AAAH! ...It\'s grandpa\'s tailor\'s dummy. Wearing his Sunday suit and a blue tie, with a sauce stain the size of an island. 1987 sauce, I\'d say. I\'ll take it.'); }
  return old(...a); }; AV_S['take:ghost']=h; AV_S['open:ghost']=h; })();
avOn('look:cravatta',()=>me('La cravatta del nonno. Seta blu, macchia di sugo, odore di naftalina. Così Jacques mi fucila.','Grandpa\'s tie. Blue silk, sauce stain, smell of mothballs. Jacques would shoot me.'));
avOn('use:me:cravatta',()=>me('Con questa macchia? Jacques mi butta fuori a calci. Prima va lavata.','With this stain? Jacques would kick me out. Wash it first.'));
avOn('use:bsink:cravatta use:cravatta:bsink use:sink:cravatta use:cravatta:sink use:ksink:cravatta use:cravatta:ksink',async()=>{ await meAct('scrub',1800); avSwap('cravatta','cravattap'); return me('Strofino col sapone di Marsiglia. La macchia di sugo resiste come un sindacalista, poi cede. Pulita. Ancora un po\' di naftalina, ma è un profumo d\'epoca.','I scrub with soap. The sauce stain resists like a union rep, then gives in. Clean. Still a bit of mothball, but that\'s a vintage perfume.'); });
avOn('use:me:cravattap',async()=>{ const f=F(); avDel('cravattap'); f.tieOn=1; avSave(); try{ avApplyLook(); }catch(e){} await meAct('look',1000); return me('Faccio il nodo come mi ha insegnato il nonno: due giri, un passaggio, e una bestemmia. Perfetto. Sembro un notaio. Un notaio in impermeabile.','I tie the knot as grandpa taught me: two loops, a pass, and a curse. Perfect. I look like a notary. A notary in a trench coat.'); });
(()=>{ const i=AV_HINTS.findIndex(h=>h[1].startsWith('Al privé, parla con la Contessa')); AV_HINTS.splice(i<0?AV_HINTS.length:i,0,
  [()=>F().tieAsk && !F().tieGot,'Jacques vuole una cravatta: in soffitta, sotto il lenzuolo del "fantasma", c\'è qualcosa del nonno.','Jacques wants a tie: in the attic, under the "ghost" sheet, there\'s something of grandpa\'s.'],
  [()=>avHas('cravatta'),'La cravatta è macchiata: lavala in un lavandino di casa.','The tie is stained: wash it in a sink at home.'],
  [()=>avHas('cravattap'),'Indossa la cravatta pulita (usala su di te), poi torna al privé.','Wear the clean tie (use it on yourself), then go back to the privé.']); })();
/* la cravatta si vede sul personaggio */
(()=>{ const base=avApplyLook; avApplyLook=function(...a){ const r=base.apply(this,a); try { const f=F(); const NSs='http://www.w3.org/2000/svg'; const o=J.cTorso.querySelector('.avtie'); if (o) o.remove();
  if (f.tieOn && !(AV.st.ch>1)){ const g=document.createElementNS(NSs,'g'); g.setAttribute('class','avtie'); g.innerHTML=`<path d="M-2.5 -41 L2.5 -41 L3.5 -37 L1.5 -36 L4 -22 L0 -18 L-4 -22 L-1.5 -36 L-3.5 -37Z" fill="#5a7bd8" stroke="#2b2b2b" stroke-width=".9" stroke-linejoin="round"/><path d="M-2 -30 L2 -32 M-2.5 -25 L2.5 -27" stroke="#ffd166" stroke-width="1"/>`; J.cTorso.appendChild(g); } } catch(e){} return r; }; })();
