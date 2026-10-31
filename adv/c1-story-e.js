/* ================= CAPITOLO 1 — ATTO FINALE: IL CORVO RUBA IL MESTOLO ================= */
Object.assign(AV_ITEMS,{ enigma1:['📜','Enigma del Corvo n.1','Crow riddle no.1'], enigma2:['📜','Enigma del Corvo n.2','Crow riddle no.2'], enigma3:['📜','Enigma del Corvo n.3','Crow riddle no.3'] });
AV_TROPHIES.push(['crows','Hai preso a schiaffi venti corvi. Il WWF ti cerca.','Slapped twenty crows. Animal rights groups want a word.']);
function avCrows(goal, secs){ return new Promise(res=>{ let n=0, left=secs, done=false;
  sheet(`<div style="text-align:center"><h3 style="margin:0 0 4px">🐦‍⬛ ${T('Il nido del Corvo!','The Crow\'s nest!')}</h3><p style="margin:0 0 6px;font-size:13px">${T(`Scaccia ${goal} corvi in ${secs} secondi prima che ti cavino gli occhi.`,`Shoo ${goal} crows in ${secs} seconds before they peck your eyes out.`)}</p>
   <div id="crG" style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:8px">${Array.from({length:12},(_,i)=>`<button type="button" data-k="${i}" style="height:58px;font-size:28px;background:#1b2433">&nbsp;</button>`).join('')}</div>
   <div style="display:flex;justify-content:space-between;font-weight:700"><span id="crN">🐦‍⬛ 0/${goal}</span><span id="crT">${secs}s</span></div></div>`);
  const cells=[...$('crG').querySelectorAll('button')];
  const pop=()=>{ if (done) return; const free=cells.filter(c=>!c.dataset.on); if (!free.length) return; const c=free[Math.floor(Math.random()*free.length)]; c.dataset.on=1; c.textContent='🐦‍⬛'; setTimeout(()=>{ if (c.dataset.on){ delete c.dataset.on; c.innerHTML='&nbsp;'; } }, 900+Math.random()*500); };
  cells.forEach(c=>c.onpointerdown=e=>{ e.preventDefault(); if (done||!c.dataset.on) return; delete c.dataset.on; c.textContent='💥'; setTimeout(()=>{ if(!c.dataset.on) c.innerHTML='&nbsp;'; },200); n++; $('crN').textContent=`🐦‍⬛ ${n}/${goal}`; if (n>=goal) end(true); });
  const sp=setInterval(pop, 420), tm=setInterval(()=>{ left--; if ($('crT')) $('crT').textContent=left+'s'; if (left<=0) end(false); },1000);
  function end(ok){ if (done) return; done=true; clearInterval(sp); clearInterval(tm); closeSheet(); res(ok); } }); }
/* il furto: appena esci dal municipio col mestolo vero */
const piazzaEnterOld=AV_ENTER.piazza.after;
AV_ENTER.piazza.after=async()=>{ await piazzaEnterOld(); const f=F();
  if (avHas('vero') && !f.crowStole){ f.crowStole=1; avSave();
    await me('Eccomi in piazza col Mestolo vero. Mille Pippi, arrivo! Sindaco, guardi c...','Here I am in the piazza with the real Ladle. A thousand Pippi, here I come! Mayor, look wh...');
    setPose('scared'); await avSay('voice', T('CRAAA! Un corvo nero enorme piomba dal campanile, ti strappa il Mestolo dalle mani e vola via. Al suo posto, cade un foglietto arrotolato.','CRAAAW! A huge black crow dives from the bell tower, rips the Ladle from your hands and flies off. A rolled-up note falls in its place.'));
    setPose('idle'); avDel('vero'); avAdd('enigma1');
    await np('sindaco','Il... il Mestolo... in bocca a un uccello! Fate qualcosa! Sparate! No, non sparate, potreste colpire il Mestolo! Sparate al resto!','The... the Ladle... in a bird\'s beak! Do something! Shoot! No, don\'t shoot, you could hit the Ladle! Shoot the rest!');
    await np('peppe','In novant\'anni ne ho viste tante, ma un corvo che ruba un mestolo d\'oro... Questo ha più talento del sindaco.','In ninety years I\'ve seen a lot, but a crow stealing a golden ladle... It has more talent than the mayor.');
    return me('Un corvo ammaestrato. Il Corvo ha un corvo. Che originalità. Leggiamo il biglietto.','A trained crow. The Crow has a crow. How original. Let\'s read the note.'); } };
avOn('look:enigma1',()=>me('"Hai trovato il mio mestolo, bravo segugio. Ora trova me. Primo indizio: dove nessuno si lamenta del parcheggio, un vecchio dorme senza ossa. — Il Corvo"','"You found my ladle, good bloodhound. Now find me. First clue: where nobody complains about parking, an old man sleeps without bones. — The Crow"'));
avOn('look:enigma2',()=>me('"Secondo indizio: dove il nonno teneva il fondo pensione, una botte suona vuota. Bussa, ma educato."','"Second clue: where grandpa kept the pension fund, a barrel sounds hollow. Knock, but politely."'));
avOn('look:enigma3',()=>me('"Ultimo indizio: dove la luce gira e i gatti si contano, il mio nido ti aspetta. Porta coraggio. E un cappello."','"Last clue: where the light turns and the cats are counted, my nest awaits. Bring courage. And a hat."'));
/* indizio 1: la tomba vuota del nonno al cimitero */
avOn('open:tomb2 use:tomb2',async()=>{ const f=F(); if (!avHas('enigma1') && !f.tombOpen) return me('Aprire la tomba di mio nonno? Senza un motivo serio? Neanche io sono così.','Open my grandpa\'s grave? Without a serious reason? Not even me.');
  if (f.tombOpen) return me('La bara di salami è ancora lì. Il profumo si sente fino al cancello.','The salami coffin is still there. You can smell it from the gate.');
  await np('ugo','Ferma! La tomba di Ernesto? ...Vabbè, tanto è vuota. Anzi no, è piena. Di salami. Apri pure, ma il salame più grosso è mio.','Stop! Ernesto\'s grave? ...Fine, it\'s empty anyway. Actually no, it\'s full. Of salami. Go ahead, but the biggest salami\'s mine.');
  await meAct('strain',2200); f.tombOpen=1; avSave(); avDel('enigma1'); avAdd('enigma2');
  return me('Dentro la bara: quaranta salami stagionati dal 1987 e, infilato in uno di questi, un altro foglietto del Corvo. Il bastardo è passato di qui. Ha pure assaggiato un salame.','Inside the coffin: forty salami cured since 1987 and, stuck in one, another Crow note. The bastard was here. He even tasted a salami.'); });
avOn('use:tomb2:ascia',()=>AV_S['open:tomb2']());
/* indizio 2: la botte vuota in cantina */
avOn('use:barrels',async()=>{ const f=F(); if (avHas('enigma2') && !f.barrelKnock){ await meAct('karate',1200); f.barrelKnock=1; avSave(); avDel('enigma2'); avAdd('enigma3');
    await me('Busso alle botti, educato. Toc toc: piena. Toc toc: piena. Toc toc... vuota! Dentro c\'è un foglietto e un odore di risotto allo zafferano.','I knock on the barrels, politely. Knock knock: full. Knock knock: full. Knock knock... hollow! Inside there\'s a note and a smell of saffron risotto.');
    return me('Il Corvo è entrato in casa mia. In cantina. Mentre dormivo sul divano. Domani cambio le serrature. E il divano.','The Crow got into my house. Into my cellar. While I slept on the sofa. Tomorrow I change the locks. And the sofa.'); }
  if (avHas('grappa')) return me('Una bottiglia basta. Due e finisco al pronto soccorso. Tre e al cimitero.','One bottle\'s enough. Two and I end up in A&E. Three, in the cemetery.');
  await meAct('squat',1500); avAdd('grappa'); return me('Riempio una bottiglia di grappa. Solo i vapori mi hanno sturato il naso e un orecchio.','I fill a bottle with grappa. The fumes alone unblocked my nose and one ear.'); });
/* indizio 3: il nido sulla lanterna del faro */
avOn('open:lhdoor use:lhdoor',async()=>{ const f=F();
  if (!avHas('enigma3') && !f.nestDone) return np('marisa','Lì dentro non entra nessuno. Neanche io, quando ho la luna storta.','Nobody goes in there. Not even me, when I\'m in a mood.');
  if (f.nestDone) return me('Basta faro. Ho ancora le piume nei capelli. E qualcos\'altro, che non voglio sapere cos\'è.','Enough lighthouse. Still got feathers in my hair. And something else I don\'t want to identify.');
  if (!f.gaveCoffee) return np('marisa','Il faro? Prima il caffè. Senza caffè non apro neanche gli occhi, figurati la porta.','The lighthouse? Coffee first. Without coffee I don\'t open my eyes, let alone the door.');
  await np('marisa','Il nido del Corvo sulla lanterna? Lo sapevo che quei bastardi neri non erano gabbiani! Sali pure. Centoquaranta gradini. Se muori a metà, ti lascio lì: i gatti hanno fame.','The Crow\'s nest on the lantern? I knew those black bastards weren\'t seagulls! Go up. A hundred and forty steps. Die halfway and I\'ll leave you there: the cats are hungry.');
  await meAct('tiptoe',2200); await avSay('voice', T('Centoquaranta gradini dopo, in cima al faro. Il vento ulula. Sulla lanterna c\'è un nido enorme, fatto di rametti, scontrini del comune e... il Mestolo d\'Oro! Ma i corvi non sono d\'accordo.','A hundred and forty steps later, at the top of the lighthouse. The wind howls. On the lantern sits a huge nest made of twigs, council receipts and... the Golden Ladle! But the crows disagree.'));
  const ok=await avCrows(20,25);
  if (!ok){ await me('AHIA! Mi hanno beccato il naso, un orecchio e la dignità. Scendo, mi riprendo, e ci riprovo.','OUCH! They pecked my nose, an ear and my dignity. I\'ll go down, recover, and try again.'); return; }
  f.nestDone=1; avSave(); avDel('enigma3'); avAdd('vero'); avTrophy('crows','Hai preso a schiaffi venti corvi. Il WWF ti cerca.','Slapped twenty crows. Animal rights groups want a word.');
  await me('Ripreso! Il Mestolo d\'Oro, tutto sporco di cacca di corvo. Nel nido c\'è anche un tovagliolo con una macchia gialla. Zafferano. Di nuovo.','Got it back! The Golden Ladle, covered in crow poop. There\'s also a napkin in the nest with a yellow stain. Saffron. Again.');
  return me('Stavolta lo porto al sindaco senza fermarmi. E tenendolo stretto. Coi denti, se serve.','This time I take it to the mayor without stopping. Holding it tight. With my teeth if needed.'); });
/* il finale ora parte solo col mestolo recuperato dal nido */
avOn('use:me:vero use:vero:me',()=>me('È sporco di cacca di corvo. Non lo lecco. Neanche per mille Pippi. Forse per duemila.','It\'s covered in crow poop. Not licking it. Not even for a thousand Pippi. Maybe two thousand.'));
(()=>{ const i=AV_HINTS.findIndex(h=>h[1].startsWith('Dai il Mestolo vero al sindaco')); const add=[
  [()=>avHas('vero') && !F().crowStole,'Porta il Mestolo in piazza al sindaco.','Bring the Ladle to the mayor in the piazza.'],
  [()=>avHas('enigma1'),'"Dove nessuno si lamenta del parcheggio": il cimitero. Il vecchio senza ossa: la tomba vuota del nonno. Aprila.','"Where nobody complains about parking": the cemetery. The old man without bones: grandpa\'s empty grave. Open it.'],
  [()=>avHas('enigma2'),'"Il fondo pensione" del nonno erano i salami... in cantina. Bussa alle botti: usa le botti.','Grandpa\'s "pension fund" was the salami... in the cellar. Knock on the barrels: use them.'],
  [()=>avHas('enigma3') && !F().nestDone,'"Dove la luce gira e i gatti si contano": il faro di Marisa. Apri la porta del faro e scaccia i corvi toccandoli veloce.','"Where the light turns and the cats are counted": Marisa\'s lighthouse. Open the lighthouse door and shoo the crows by tapping them fast.']];
  AV_HINTS.splice(i<0?AV_HINTS.length:i,0,...add); })();
