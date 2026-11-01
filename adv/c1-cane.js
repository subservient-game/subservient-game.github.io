/* ================= CAPITOLO 1 — IL CANE DI GASPARE NEL MAGAZZINO: polpette di Totò, impasto a mano ================= */
Object.assign(AV_ITEMS,{ polpette:['🍖','Polpette al sugo','Meatballs in sauce'] });
AV_ICONS.polpette=`<ellipse cx="24" cy="34" rx="19" ry="7" fill="#fffaf0" stroke="#2b2b2b" stroke-width="2.2"/>${[[16,28],[26,26],[32,31],[21,33]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5.5" fill="#8a4a2b" stroke="#2b2b2b" stroke-width="1.6"/>`).join('')}<path d="M10 33 Q24 38 38 33" stroke="#c0392b" stroke-width="3" fill="none"/>`;
AV_TROPHIES.push(['brutus','Hai corrotto Brutus, il cane di Gaspare, con le polpette. Ora è più fedele a te che al padrone.','Bribed Brutus, Gaspare\'s dog, with meatballs. Now he\'s more loyal to you than his master.'],['impasto','Hai impastato le polpette di Totò. Le tue mani profumeranno d\'aglio fino a Pasqua.','Kneaded Totò\'s meatballs. Your hands will smell of garlic until Easter.']);
const c1s=()=>!(AV.st.ch>1);
const axeOrig=AV_S['use:warehouse:ascia'];
AV_S['use:warehouse:ascia']=async(...a)=>{ const f=F();
  if (c1s() && f.doorOpen && !f.receipt && !f.dogFed){ f.dogSeen=1; avSave(); await meAct('scared',1200);
    await avSay('voice', T('Appena entri nel magazzino, dal buio esce un ringhio. Un cane enorme, con un collare borchiato e la targhetta "BRUTUS — proprietà di G.". Ha la bava e uno sguardo da assessore.','As you enter the warehouse, a growl comes out of the dark. A huge dog, with a studded collar and a tag "BRUTUS — property of G.". Drooling, with a council-member stare.'));
    return me('Con quel cane lì davanti non mi avvicino alla cassa. Serve qualcosa che lo distragga. Qualcosa di carne. Molta carne.','With that dog there I\'m not going near the crate. I need something to distract him. Something meaty. Lots of meat.'); }
  return axeOrig(...a); };
avOn('look:brutus',()=>me('Brutus. Mezzo rottweiler, mezzo armadio. Mi guarda come io guardo una carbonara.','Brutus. Half rottweiler, half wardrobe. He looks at me the way I look at carbonara.'));
avOn('give:warehouse:polpette use:warehouse:polpette',async()=>{ const f=F(); if (!f.dogSeen) return me('Polpette al magazzino? Prima vediamo cosa c\'è dentro.','Meatballs in the warehouse? Let\'s see what\'s inside first.'); avDel('polpette'); f.dogFed=1; avSave();
  avTrophy('brutus','Hai corrotto Brutus, il cane di Gaspare, con le polpette. Ora è più fedele a te che al padrone.','Bribed Brutus, Gaspare\'s dog, with meatballs. Now he\'s more loyal to you than his master.');
  await avSay('voice', T('Lanci le polpette in un angolo. Brutus ci si tuffa con la grazia di un camion. Dopo trenta secondi dorme, sazio, a pancia all\'aria. Russa come Gaspare.','You throw the meatballs into a corner. Brutus dives in with the grace of a truck. Thirty seconds later he\'s asleep, full, belly up. He snores like Gaspare.'));
  return me('Via libera. Ora la cassa.','All clear. Now the crate.'); });
(()=>{ const old=AV_S['talk:toto']; AV_S['talk:toto']=async(...a)=>{ const f=F();
  if (c1s() && f.dogSeen && !f.dogFed && !avHas('polpette')){ const o=await avChoose([['Totò, mi servono polpette. Tante.','Totò, I need meatballs. Lots.'],['Altro...','Something else...']]);
    if (o===0){ await np('toto','Polpette? Per un cane? Le mie polpette le mangiava il Papa quando veniva in vacanza! ...Va bene, ma l\'impasto lo fai tu, io ho la tendinite. Impasta forte, come se fosse la faccia del sindaco.','Meatballs? For a dog? The Pope ate my meatballs when he came on holiday! ...Fine, but you knead, I have tendinitis. Knead hard, like it\'s the mayor\'s face.');
      setPose('cook'); const ok=await (window.avPushups||avPushups)(20,10); setPose('idle'); if (!ok) return np('toto','Hai impastato come un impiegato del catasto: piano e senza amore. Rifai.','You kneaded like a land-registry clerk: slowly and without love. Again.');
      avAdd('polpette'); avTrophy('impasto','Hai impastato le polpette di Totò. Le tue mani profumeranno d\'aglio fino a Pasqua.','Kneaded Totò\'s meatballs. Your hands will smell of garlic until Easter.');
      return np('toto','Ecco: polpette al sugo, fritte e poi cotte. Se il cane non le apprezza, lo denuncio io.','There: meatballs in sauce, fried then simmered. If the dog doesn\'t appreciate them, I\'ll sue him.'); } }
  return old(...a); }; })();
(()=>{ const i=AV_HINTS.findIndex(h=>h[1].startsWith('La cassa nel magazzino')); AV_HINTS.splice(i<0?AV_HINTS.length:i,0,
  [()=>F().dogSeen && !F().dogFed && !avHas('polpette'),'Nel magazzino c\'è il cane di Gaspare: chiedi delle polpette a Totò in pizzeria.','Gaspare\'s dog is in the warehouse: ask Totò at the pizzeria for meatballs.'],
  [()=>avHas('polpette'),'Usa le polpette sul magazzino per distrarre il cane.','Use the meatballs on the warehouse to distract the dog.']); })();
