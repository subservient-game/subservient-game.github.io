/* ================= CAPITOLO 1 — IL VINO PER LA CONTESSA: morra con Gina alla bisca ================= */
Object.assign(AV_ITEMS,{ vino:['🍷','Bottiglia di rosso','Bottle of red'] });
AV_ICONS.vino=`<path d="M20 4 L28 4 L28 14 Q36 18 36 28 L36 42 Q36 44 34 44 L14 44 Q12 44 12 42 L12 28 Q12 18 20 14Z" fill="#6b1a2a" stroke="#2b2b2b" stroke-width="2.3" stroke-linejoin="round"/><rect x="15" y="24" width="18" height="12" fill="#f1e2b8" stroke="#2b2b2b" stroke-width="1.5"/><path d="M18 30 L30 30" stroke="#6b1a2a" stroke-width="2"/><rect x="19" y="2" width="10" height="4" fill="#c0392b" stroke="#2b2b2b" stroke-width="1.4"/>`;
AV_TROPHIES.push(['morra','Hai battuto Gina a morra. Ha urlato "TRE!" così forte che il barbiere s\'è tagliato.','Beat Gina at morra. She screamed "THREE!" so loud the barber cut himself.']);
const c1z=()=>!(AV.st.ch>1);
function avMorraGame(wins){ return new Promise(res=>{ let me1=0, her=0, fing=null, done=false;
  sheet(`<div style="text-align:center"><h3 style="margin:0 0 4px">${T('Morra!','Morra!')}</h3><p style="margin:0 0 6px;font-size:13px">${T(`Scegli quante dita butti, poi grida il totale. Primo a ${wins} vince.`,`Pick how many fingers you throw, then shout the total. First to ${wins} wins.`)}</p>
   <div id="moS" style="font:700 20px Fredoka,sans-serif;margin-bottom:6px"></div><p id="moM" style="min-height:20px;margin:0 0 8px"></p>
   <div id="moF" style="display:grid;grid-template-columns:repeat(5,1fr);gap:5px;margin-bottom:8px">${[1,2,3,4,5].map(n=>`<button type="button" data-n="${n}" style="padding:12px 0">${n}</button>`).join('')}</div>
   <div id="moT" style="display:grid;grid-template-columns:repeat(5,1fr);gap:5px">${[2,3,4,5,6,7,8,9,10].map(n=>`<button type="button" class="ghost" data-t="${n}" style="padding:10px 0">${n}!</button>`).join('')}</div>
   <button type="button" id="moQ" class="ghost" style="width:100%;margin-top:8px">${T('Mi arrendo','I give up')}</button></div>`);
  const score=()=>{ $('moS').textContent=`${T('Tu','You')} ${me1} – ${her} Gina`; }; score();
  const fb=[...$('moF').querySelectorAll('button')];
  $('moQ').onclick=()=>{ done=true; closeSheet(); res(false); };
  fb.forEach(b=>b.onpointerdown=e=>{ e.preventDefault(); if (done) return; fing=+b.dataset.n; fb.forEach(x=>x.style.outline=''); b.style.outline='3px solid #ffd166'; $('moM').textContent=T('Ora grida il totale!','Now shout the total!'); });
  $('moT').querySelectorAll('button').forEach(b=>b.onpointerdown=e=>{ e.preventDefault(); if (done) return; if (!fing){ $('moM').textContent=T('Prima butta le dita!','Throw your fingers first!'); return; }
    const g=1+Math.floor(Math.random()*5), tot=fing+g, mine=+b.dataset.t; let gGuess=g+1+Math.floor(Math.random()*5); if (Math.random()<0.25) gGuess=tot;
    let msg=T(`Gina butta ${g}, grida ${gGuess}. Totale: ${tot}. `,`Gina throws ${g}, shouts ${gGuess}. Total: ${tot}. `);
    if (mine===tot && gGuess!==tot){ me1++; msg+=T('Punto tuo!','Your point!'); } else if (gGuess===tot && mine!==tot){ her++; msg+=T('Punto di Gina. Ride come una iena.','Gina\'s point. She laughs like a hyena.'); } else msg+=T('Niente.','Nothing.');
    fing=null; fb.forEach(x=>x.style.outline=''); $('moM').textContent=msg; score();
    if (me1>=wins||her>=wins){ done=true; const win=me1>=wins; setTimeout(()=>{ closeSheet(); res(win); },1200); } }); }); }
const contessaPizzaOrig=AV_S['give:contessa:pizza'];
AV_S['give:contessa:pizza']=async(...a)=>{ const f=F();
  if (c1z() && !f.vinoGiven){ f.vinoAsk=1; avSave(); await npcAct('contessa','look',1200);
    return np('contessa','Una pizza? Senza vino? Tesoro, io non sono una studentessa fuorisede. La pizza la mangio solo con un rosso decente. L\'unico vino decente in paese ce l\'ha Gina alla bisca, ma lo vende solo a chi la batte a morra.','A pizza? Without wine? Darling, I\'m not a broke student. I only eat pizza with a decent red. The only decent wine in town is Gina\'s at the den, and she only sells it to whoever beats her at morra.'); }
  return contessaPizzaOrig(...a); };
avOn('give:contessa:vino',async()=>{ const f=F(); avDel('vino'); f.vinoGiven=1; avSave(); await npcAct('contessa','drink',1600);
  await np('contessa','Un Nero d\'Avola del 1999! Gina ha ancora gusto. Lei. Non le sue amiche.','A 1999 Nero d\'Avola! Gina still has taste. Her. Not her friends.');
  if (avHas('pizza')) return contessaPizzaOrig(); return np('contessa','Ora la pizza, tesoro. Il vino da solo mi rende sentimentale, e quando sono sentimentale gioco male.','Now the pizza, darling. Wine alone makes me sentimental, and when I\'m sentimental I play badly.'); });
(()=>{ const old=AV_S['talk:gina']; AV_S['talk:gina']=async(...a)=>{ const f=F();
  if (c1z() && f.vinoAsk && !f.vinoGiven && !avHas('vino')){ const o=await avChoose([['Gina, il tuo vino per una partita a morra.','Gina, your wine for a game of morra.'],['Altro...','Something else...']]);
    if (o===0){ await np('gina','Morra? Con me? Ho rotto la mano a un camionista nel 1988 giocando a morra. Gliel\'ho rotta io, con la voce. Al meglio dei tre. Se perdi, mi paghi da bere per un mese.','Morra? With me? I broke a trucker\'s hand in 1988 playing morra. I broke it with my voice. Best of three. Lose, and you buy my drinks for a month.');
      const ok=await (window.avMorra||avMorraGame)(3); if (!ok) return np('gina','TRE! CINQUE! OTTO! Ho vinto. Un mese di gin, tesoro. Comincio adesso.','THREE! FIVE! EIGHT! I win. A month of gin, darling. Starting now.');
      avAdd('vino'); avTrophy('morra','Hai battuto Gina a morra. Ha urlato "TRE!" così forte che il barbiere s\'è tagliato.','Beat Gina at morra. She screamed "THREE!" so loud the barber cut himself.');
      return np('gina','...Mi hai battuto. A morra. Mi ritiro. Prendi il vino, è un Nero d\'Avola del \'99. Lo tenevo per il mio funerale, ma a questo punto è già arrivato.','...You beat me. At morra. I\'m retiring. Take the wine, a \'99 Nero d\'Avola. I was saving it for my funeral, but at this point it\'s already happened.'); } }
  return old(...a); }; })();
(()=>{ const i=AV_HINTS.findIndex(h=>h[1].startsWith('Dai la pizza alla Contessa')); AV_HINTS.splice(i<0?AV_HINTS.length:i,0,
  [()=>F().vinoAsk && !F().vinoGiven && !avHas('vino'),'La Contessa vuole anche il vino: Gina alla bisca lo dà solo a chi la batte a morra. Butta le dita, poi grida il totale giusto.','The Countess also wants wine: Gina at the den gives it only to whoever beats her at morra. Throw your fingers, then shout the right total.'],
  [()=>avHas('vino'),'Dai il vino alla Contessa.','Give the wine to the Countess.']); })();
