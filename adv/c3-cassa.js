/* ================= CAPITOLO 3 — LA CASSA DEL RELITTO (codice tatuato su Baffo) E LA LEZIONE AL PAPPAGALLO ================= */
AV_TROPHIES.push(['tatuaggio','Hai aperto la cassa del Baffo II col codice tatuato sul suo sedere. Non chiedere come l\'hai letto.','Opened the Baffo II chest with the code tattooed on his backside. Don\'t ask how you read it.'],['logopedista','Hai insegnato al pappagallo a dire "Rosalba arriva!" sillaba per sillaba. Hai un futuro come logopedista.','Taught the parrot to say "Rosalba is coming!" syllable by syllable. You have a future as a speech therapist.']);
(()=>{ const old=AV_S['c3|take:relitto']; const h=async(...a)=>{ const f=F();
  if (f.baffoFree && !f.wreckLooted && !f.chestOpen){ f.chestAsk=1; avSave();
    const c=f.codeKnown?await avCode(3, T('Cassa del Baffo II','Baffo II chest')):null;
    if (!f.codeKnown) return me('Nella stiva c\'è una cassa di ferro con un lucchetto a tre cifre. Sopra, inciso: "Il numero lo sa solo il mio culo. — B." Devo chiedere a Baffo. Con delicatezza.','In the hold there\'s an iron chest with a three-digit padlock. Engraved on top: "Only my arse knows the number. — B." I must ask Baffo. Delicately.');
    if (c===null) return; if (c!=='317') return me('Clic. Niente. Ripenso al tatuaggio: tre, uno, sette. Spero di non doverlo rivedere.','Click. Nothing. I think back to the tattoo: three, one, seven. Hope I don\'t have to see it again.');
    f.chestOpen=1; avSave(); avTrophy('tatuaggio','Hai aperto la cassa del Baffo II col codice tatuato sul suo sedere. Non chiedere come l\'hai letto.','Opened the Baffo II chest with the code tattooed on his backside. Don\'t ask how you read it.'); }
  return old(...a); }; AV_S['c3|take:relitto']=h; AV_S['c3|open:relitto']=h; })();
(()=>{ const old=AV_S['c3|talk:baffo2']||AV_S['c3|talk:baffo']; avOnN(3,'talk:baffo2',async(...a)=>{ const f=F();
  if (f.chestAsk && !f.codeKnown){ await np('baffo2','Il codice della cassa? Me lo sono tatuato sulla chiappa sinistra nel 1999, ubriaco a Rimini, perché lo dimenticavo sempre. Ora ti giri e conti fino a dieci. ...Ok, guarda pure. Veloce.','The chest code? I had it tattooed on my left buttock in 1999, drunk in Rimini, because I kept forgetting it. Now turn around and count to ten. ...OK, look. Quick.');
    f.codeKnown=1; avSave(); return me('Tre. Uno. Sette. Scritti in gotico, con un cuoricino. Non dimenticherò mai questa immagine. Ci ho provato. Non funziona.','Three. One. Seven. In gothic script, with a little heart. I\'ll never forget this image. I tried. It doesn\'t work.'); }
  return old?old(...a):np('baffo2','Parla con Fefè, io mi riposo la gamba.','Talk to Fefè, I\'m resting my leg.'); }); })();
const SYL=[['Ro','Ba','Sal','Ar'],['sal','ri','ba','va'],['ba','va','sal','Ro'],['ar-','ri-','va!','Ro-']];
const SYL_OK=[0,0,0,0];
(()=>{ const old=AV_S['c3|give:pappagallo:gallette']; AV_S['c3|give:pappagallo:gallette']=async(...a)=>{ const f=F();
  if (!f.parrotTaught && !f.sylOk){ await me('Il pappagallo mangia una galletta e mi guarda. Per insegnargli "Rosalba arriva!" devo dirlo una sillaba alla volta, in ordine, senza sbagliare.','The parrot eats a cracker and stares at me. To teach it "Rosalba is coming!" I must say it one syllable at a time, in order, without mistakes.');
    const want=[['Ro','Ro'],['sal','sal'],['ba','ba'],['ar-ri-va!','is-com-ing!']];
    for (let i=0;i<want.length;i++){ const opts=[want[i],...want.filter((_,k)=>k!==i)].map(x=>x).sort(()=>Math.random()-.5); const r=await avChoose(opts); if (opts[r]!==want[i]) return me('Il pappagallo ripete: "ROSALBA ARROSTO!". Non è proprio la stessa cosa. Riprovo con un\'altra galletta.','The parrot repeats: "ROSALBA ROASTED!". Not quite the same. I\'ll try again with another cracker.'); }
    f.sylOk=1; avSave(); avTrophy('logopedista','Hai insegnato al pappagallo a dire "Rosalba arriva!" sillaba per sillaba. Hai un futuro come logopedista.','Taught the parrot to say "Rosalba is coming!" syllable by syllable. You have a future as a speech therapist.'); }
  return old(...a); }; })();
(()=>{ const H=AV_CHS[3].HINTS; H.unshift(
  [()=>F().chestAsk && !F().codeKnown,'Il codice della cassa ce l\'ha Baffo. Tatuato. Chiediglielo al villaggio.','Baffo has the chest code. Tattooed. Ask him at the village.'],
  [()=>F().codeKnown && !F().chestOpen,'Codice della cassa: 317.','Chest code: 317.']); })();
