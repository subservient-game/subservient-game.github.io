/* ================= CAPITOLO 1 — IL SIGARO DI BAFFO: Rocky ha sequestrato i sigari, gara sul tapis roulant ================= */
Object.assign(AV_ITEMS,{ sigaro:['🚬','Sigaro toscano','Tuscan cigar'] });
AV_ICONS.sigaro=`<path d="M6 30 L36 20 Q40 19 41 22 Q42 25 38 27 L8 36 Q5 37 4 34 Q3 31 6 30Z" fill="#7a4a2c" stroke="#2b2b2b" stroke-width="2.2" stroke-linejoin="round"/><path d="M12 31 L14 35 M20 28 L22 33 M28 26 L30 30" stroke="#5a3a1c" stroke-width="1.6"/><path d="M41 21 q4 -4 2 -9 q-2 -4 2 -8" stroke="#aaa" stroke-width="2" fill="none" stroke-linecap="round"/>`;
AV_TROPHIES.push(['tapis','Hai battuto Rocky sul tapis roulant per un sigaro. La salute ringrazia, poi ti odia.','Beat Rocky on the treadmill for a cigar. Your health thanks you, then hates you.']);
const c1x=()=>!(AV.st.ch>1);
const baffoOrig=AV_S['give:baffo:grappa'];
AV_S['give:baffo:grappa']=async(...a)=>{ const f=F();
  if (c1x() && !f.baffoTold && !f.cigarGiven){ avDel('grappa'); f.grappaGiven=1; avSave(); await npcAct('baffo','drink',1800);
    await np('baffo','UUUH! Grappa del nonno! Mi si è sciolto un dente. Quello d\'oro.','WHOOO! Grandpa\'s grappa! It melted a tooth. The gold one.');
    return np('baffo','Però un marinaio non parla con la grappa sola. Ci vuole il sigaro. Un toscano. Me li ha sequestrati tutti quel fanatico di Rocky in palestra: dice che mi fanno male. A me! Che respiro gasolio dal 1971!','But a sailor doesn\'t talk on grappa alone. He needs a cigar. A Tuscan. That fanatic Rocky at the gym confiscated them all: says they\'re bad for me. Me! Who\'s breathed diesel since 1971!'); }
  return baffoOrig(...a); };
avOn('give:baffo:sigaro',async()=>{ const f=F(); avDel('sigaro'); f.cigarGiven=1; avSave();
  await np('baffo','Un toscano! Lo accendo col mozzicone di quello di ieri. PUFF. Grappa e sigaro: la colazione dei campioni. Ascolta bene, segugio.','A Tuscan! I light it with yesterday\'s stub. PUFF. Grappa and cigar: breakfast of champions. Listen up, bloodhound.');
  if (f.grappaGiven){ AV.st.inv.push('grappa'); return baffoOrig(); }
  return np('baffo','Ora mi manca il bicchierino. Qualcosa di forte, tipo la grappa di tuo nonno.','Now I need a little glass. Something strong, like your grandpa\'s grappa.'); });
(()=>{ const old=AV_S['talk:rocky']; AV_S['talk:rocky']=async(...a)=>{ const f=F();
  if (c1x() && f.grappaGiven && !f.cigarGiven && !avHas('sigaro')){ const o=await avChoose([['Rocky, ridammi i sigari di Baffo.','Rocky, give me Baffo\'s cigars back.'],['Altro...','Something else...']]);
    if (o===0){ await np('rocky','I sigari? Sono il male! Il corpo è un tempio! ...Va bene, facciamo così: se mi batti sul tapis roulant te ne do uno. Se perdi, fai cento addominali. Davanti a tutti. Senza maglietta.','The cigars? They\'re evil! The body is a temple! ...Fine, here\'s the deal: beat me on the treadmill and you get one. Lose, and you do a hundred sit-ups. In front of everyone. Shirtless.');
      setPose('run'); const ok=await (window.avPushups||avPushups)(30,10); setPose('idle');
      if (!ok) return np('rocky','Ahahah! Hai il fiato di un fumatore. Ironico. Cento addominali, forza! ...Scherzo. Riprova quando vuoi.','Hahaha! You\'ve got a smoker\'s lungs. Ironic. A hundred sit-ups, go! ...Kidding. Try again whenever.');
      avAdd('sigaro'); avTrophy('tapis','Hai battuto Rocky sul tapis roulant per un sigaro. La salute ringrazia, poi ti odia.','Beat Rocky on the treadmill for a cigar. Your health thanks you, then hates you.');
      return np('rocky','...Mi hai battuto. Tieni il sigaro. E digli a Baffo che se lo fuma vicino ai miei pesi, gli faccio fare le flessioni col sigaro in bocca.','...You beat me. Take the cigar. And tell Baffo if he smokes it near my weights, he\'s doing push-ups with it in his mouth.'); } }
  return old(...a); }; })();
(()=>{ const i=AV_HINTS.findIndex(h=>h[1].startsWith('Parla con Salvatore il barbiere')); AV_HINTS.splice(i<0?AV_HINTS.length:i,0,
  [()=>F().grappaGiven && !F().cigarGiven && !avHas('sigaro'),'Baffo vuole anche un sigaro: Rocky in palestra li ha sequestrati. Sfidalo sul tapis roulant.','Baffo also wants a cigar: Rocky at the gym confiscated them. Race him on the treadmill.'],
  [()=>avHas('sigaro'),'Dai il sigaro a Baffo in spiaggia.','Give the cigar to Baffo on the beach.']); })();
