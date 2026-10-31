/* ================= CAPITOLO 1 — ESPANSIONE 3: marca da bollo, mestolo da lavare ================= */
Object.assign(AV_ITEMS,{ marca:['🧾','Marca da bollo','Revenue stamp'] });
AV_ICONS.marca=`<rect x="8" y="8" width="32" height="32" fill="#f4efe6" stroke="#2b2b2b" stroke-width="2.2" stroke-dasharray="3 2"/><rect x="12" y="12" width="24" height="24" fill="#d64545" stroke="#2b2b2b" stroke-width="1.6"/><text x="24" y="29" font-size="11" text-anchor="middle" fill="#fff" font-family="Fredoka" font-weight="700">16</text>`;
const nicoTalkOld=AV_S['talk:nico'];
avOn('talk:nico',async()=>{ const f=F();
  if (f.needBollo && !avHas('marca') && !f.distintivo){ const o=await avChoose([['Mi serve una marca da bollo.','I need a revenue stamp.'],['Altro...','Something else...']]);
    if (o===0){ await np('nico','Marca da bollo da 16 Pippi? Ce l\'ho. Ma i soldi non li hai, si vede da come sei vestito. Facciamo uno scambio: ritrovami la mia tazzina portafortuna e la marca è tua.','A 16-Pippi revenue stamp? Got one. But you have no money, I can tell by your clothes. Let\'s trade: find my lucky cup and the stamp is yours.');
      if (!f.nicoCupAsk){ f.nicoCupAsk=1; avSave(); await np('nico','Sbeccata, con scritto "BARISTA DELL\'ANNO 1998". Ieri sera l\'ha presa Rocky per farci le proteine. Rocky non restituisce mai niente, neanche i saluti.','Chipped, says "BARISTA OF THE YEAR 1998". Last night Rocky took it for his protein shake. Rocky never returns anything, not even greetings.'); avOpen('gym'); }
      return; } }
  return nicoTalkOld(); });
const nicoCupOld=AV_S['give:nico:tazzina'];
avOn('give:nico:tazzina',async()=>{ const f=F(); await nicoCupOld(); if (f.needBollo && !f.distintivo && !avHas('marca')){ avAdd('marca'); await np('nico','E come promesso, la marca da bollo. Leccala bene, che la colla è del 1998 pure lei.','And as promised, the revenue stamp. Lick it well, the glue is from 1998 too.'); } });
avOn('look:marca',()=>me('Una marca da bollo da 16 Pippi. Un pezzetto di carta che vale più della mia firma.','A 16-Pippi revenue stamp. A scrap of paper worth more than my signature.'));
avOn('use:modulo:marca use:marca:modulo',()=>me('La tengo da parte, la incollo davanti al sindaco. Così vede che ho pagato. Cioè, che ha pagato Nico.','I\'ll keep it, and stick it on in front of the mayor. So he sees I paid. Well, Nico paid.'));
/* lavare il mestolo */
avOn('use:fountain:vero use:sink:vero use:bsink:vero use:water:vero',async()=>{ const f=F(); if (f.ladleClean) return me('È già pulito. Se lo lavo ancora si consuma l\'oro.','Already clean. Wash it more and the gold wears off.');
  await meAct('scrub',2400); f.ladleClean=1; avSave();
  if (H.room==='park') await np('gino','Ehi! Quella è la fontana pubblica! ...Vabbè, tanto ci fanno di peggio. Ieri ci ho visto lavare un\'anguria. E un nonno.','Hey! That\'s the public fountain! ...Fine, people do worse. Yesterday I saw someone wash a watermelon in it. And a grandpa.');
  return me('Strofino via la cacca di corvo. Ora il Mestolo brilla. Le mie mani un po\' meno. Sotto il manico, adesso, si vede bene l\'incisione: una mappa con scritto "1 di 4".','I scrub off the crow poop. Now the Ladle shines. My hands, less so. Under the handle the engraving is clear now: a map marked "1 of 4".'); });
AV_TROPHIES.push(['bollo','Burocrazia sconfitta: marca da bollo ottenuta senza pagare.','Bureaucracy beaten: revenue stamp obtained without paying.']);
(()=>{ const ins=(start, arr)=>{ const i=AV_HINTS.findIndex(h=>h[1].startsWith(start)); AV_HINTS.splice(i<0?AV_HINTS.length:i,0,...arr); };
  ins('Hai i tre timbri: parlane al sindaco.',[
    [()=>F().needBollo && !avHas('marca') && !F().distintivo && !F().nicoCupAsk,'Serve una marca da bollo: chiedila a Nico al bar.','You need a revenue stamp: ask Nico at the bar.'],
    [()=>F().needBollo && !avHas('marca') && !F().distintivo && !avHas('tazzina') && !F().pushups,'Nico vuole la sua tazzina, che ha Rocky in palestra. Rocky la dà solo a chi fa la sfida delle flessioni.','Nico wants his cup, which Rocky has at the gym. Rocky only hands it over if you do the push-up challenge.'],
    [()=>F().needBollo && !avHas('marca') && !F().distintivo && !avHas('tazzina'),'Chiedi a Rocky la tazzina di Nico.','Ask Rocky for Nico\'s cup.'],
    [()=>F().needBollo && !avHas('marca') && !F().distintivo,'Dai la tazzina a Nico.','Give the cup to Nico.']]);
  ins('Dai il Mestolo vero al sindaco.',[[()=>F().nestDone && !F().ladleClean,'Il mestolo è sporco: lavalo nella fontana del parco o in un lavandino.','The ladle is dirty: wash it in the park fountain or a sink.']]); })();
