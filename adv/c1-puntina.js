/* ================= CAPITOLO 1 — LA PUNTINA DEL GIRADISCHI: grammofono di Gino, ritratto di Pina ================= */
Object.assign(AV_ITEMS,{ puntina:['📍','Puntina del grammofono','Gramophone needle'], ritratto:['🖼️','Ritratto di Pina','Portrait of Pina'] });
AV_ICONS.puntina=`<path d="M10 38 L30 14" stroke="#2b2b2b" stroke-width="5" stroke-linecap="round"/><path d="M10 38 L30 14" stroke="#cfd6de" stroke-width="3" stroke-linecap="round"/><rect x="28" y="6" width="12" height="12" rx="2" fill="#c9a77a" stroke="#2b2b2b" stroke-width="2" transform="rotate(40 34 12)"/><circle cx="10" cy="38" r="2.5" fill="#e9b949" stroke="#2b2b2b" stroke-width="1.4"/>`;
AV_ICONS.ritratto=`<rect x="7" y="7" width="34" height="34" fill="#c9a77a" stroke="#2b2b2b" stroke-width="2.4"/><rect x="12" y="12" width="24" height="24" fill="#fffaf0" stroke="#2b2b2b" stroke-width="1.8"/><circle cx="24" cy="21" r="5" fill="#f7a8c8" stroke="#2b2b2b" stroke-width="1.5"/><path d="M15 36 Q24 26 33 36" fill="#5a7bd8" stroke="#2b2b2b" stroke-width="1.5"/><path d="M18 17 Q24 10 30 17" stroke="#eeeeee" stroke-width="3" fill="none"/>`;
AV_TROPHIES.push(['ritratto','Hai fatto il ritratto di Nonna Pina. Gino l\'ha baciato. Il ritratto, non te.','Drew Granny Pina\'s portrait. Gino kissed it. The portrait, not you.']);
const c1o=()=>!(AV.st.ch>1);
(()=>{ const old=AV_S['give:djmax:vinile']; AV_S['give:djmax:vinile']=async(...a)=>{ const f=F();
  if (c1o() && f.vinylClean && !f.needleIn){ f.needleAsk=1; avSave(); await npcAct('djmax','look',1400);
    return np('djmax','Pulito, bellissimo... e ora che lo metto sul piatto... CRAC. La puntina! S\'è spezzata! Era del 1983, come me. Senza puntina niente musica, e senza musica niente invito. Trovamene una. Una vecchia: quelle nuove non capiscono il liscio.','Clean, gorgeous... and now I put it on the deck... CRACK. The stylus! It snapped! It was from 1983, like me. No stylus, no music, and no music, no invitation. Find me one. An old one: new ones don\'t get ballroom.'); }
  return old(...a); }; })();
avOn('give:djmax:puntina',async()=>{ const f=F(); avDel('puntina'); f.needleIn=1; avSave(); await npcAct('djmax','dance',1400,'happy');
  await np('djmax','Una puntina di grammofono del 1950! Suonerà come un nonno che tossisce. PERFETTO. Ora dammi il vinile.','A 1950 gramophone needle! It\'ll sound like a grandpa coughing. PERFECT. Now give me the record.');
  if (avHas('vinile')) return AV_S['give:djmax:vinile'](); });
(()=>{ const old=AV_S['talk:gino']; AV_S['talk:gino']=async(...a)=>{ const f=F();
  if (c1o() && f.needleAsk && !f.needleIn && !avHas('puntina')){ const o=await avChoose([['Gino, hai una puntina da giradischi?','Gino, got a record needle?'],['Altro...','Something else...']]);
    if (o===0){ if (!avHas('ritratto')){ f.ginoPortrait=1; avSave(); return np('gino','Ho un grammofono del 1950, con la puntina. Ci ascoltavo Pina che cantava. Te la do, ma in cambio voglio un ritratto di Pina. Non ho più neanche una sua foto: la mia ex moglie le ha bruciate tutte. Insieme alla casa.','I have a 1950 gramophone, with its needle. I used to listen to Pina singing on it. It\'s yours, but in exchange I want a portrait of Pina. I don\'t have a single photo of her: my ex-wife burnt them all. Along with the house.'); }
      avDel('ritratto'); avAdd('puntina'); avTrophy('ritratto','Hai fatto il ritratto di Nonna Pina. Gino l\'ha baciato. Il ritratto, non te.','Drew Granny Pina\'s portrait. Gino kissed it. The portrait, not you.'); await npcAct('gino','cry',1600);
      return np('gino','È lei... con la dentiera nuova e lo sguardo di chi ti frega a carte. Bellissima. Tieni la puntina, e se la vedi dille che Gino... no, niente. Dille niente.','It\'s her... with the new dentures and the look of someone who cheats you at cards. Beautiful. Take the needle, and if you see her tell her Gino... no, nothing. Tell her nothing.'); } }
  return old(...a); }; })();
(()=>{ const old=AV_S['talk:pina']; AV_S['talk:pina']=async(...a)=>{ const f=F();
  if (c1o() && f.ginoPortrait && !avHas('ritratto') && !f.needleIn && !avHas('puntina')){ const o=await avChoose([['Pina, posso farle un ritratto?','Pina, may I draw your portrait?'],['Altro...','Something else...']]);
    if (o===0){ await np('pina','Un ritratto? A me? Va bene, ma il profilo buono è il sinistro. E mettimi meno rughe. E più tette. È arte, si può.','A portrait? Of me? Fine, but my good side is the left. And fewer wrinkles. And more boobs. It\'s art, it\'s allowed.');
      const s=await avChoose([['Fallo sorridente e giovane, coi capelli al vento.','Draw her smiling and young, hair in the wind.'],['Fallo realistico: rughe, baffetti e dentiera.','Draw it realistic: wrinkles, little moustache and dentures.'],['Disegna solo le tette.','Draw only the boobs.']]);
      if (s===1) return np('pina','I BAFFETTI?! Fuori dal mio karaoke! Torna quando hai imparato a mentire come un artista vero.','THE MOUSTACHE?! Out of my karaoke! Come back when you\'ve learned to lie like a real artist.');
      if (s===2) return np('pina','Ahahah! Sei un porco. Mi piaci. Ma Gino lo vuole intero, il ritratto. Rifallo.','Hahaha! You\'re a pig. I like you. But Gino wants the whole portrait. Do it again.');
      await meAct('point',1600); avAdd('ritratto'); return np('pina','Che meraviglia... sembro me nel 1971, quando ho vinto Miss Sagra e ho perso la verginità. Nello stesso giorno, ma non nello stesso posto. Tienilo.','How wonderful... I look like me in 1971, when I won Miss Festival and lost my virginity. Same day, different place. Keep it.'); } }
  return old(...a); }; })();
(()=>{ const i=AV_HINTS.findIndex(h=>h[1].startsWith('Dai il vinile a DJ Max')); AV_HINTS.splice(i<0?AV_HINTS.length:i,0,
  [()=>F().needleAsk && !F().needleIn && !F().ginoPortrait && !avHas('puntina'),'La puntina del DJ si è rotta: Gino al parco ha un vecchio grammofono.','The DJ\'s stylus broke: Gino at the park has an old gramophone.'],
  [()=>F().ginoPortrait && !avHas('ritratto') && !avHas('puntina') && !F().needleIn,'Gino vuole un ritratto di Pina: chiedi a lei di posare, e disegnala come vuole lei.','Gino wants a portrait of Pina: ask her to pose, and draw her the way she likes.'],
  [()=>avHas('ritratto'),'Porta il ritratto a Gino.','Take the portrait to Gino.'],
  [()=>avHas('puntina'),'Dai la puntina a DJ Max.','Give the needle to DJ Max.']); })();
