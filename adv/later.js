/* ================= Oggetti di casa e paese nei capitoli successivi: risposte proprie ================= */
(()=>{ if (!window.ADV) return;
const R={
 2:[['Radio Pippi, notiziario: «Il Mestolo d\'Oro è esposto in municipio, ingresso 5 Pippi. Il sindaco ringrazia sé stesso per il ritrovamento.» Io l\'ho ritrovato. Io.','Radio Pippi news: "The Golden Ladle is on display at the town hall, 5 Pippi entry. The mayor thanks himself for finding it." I found it. Me.'],
    ['Radio Pippi: «Avvistamenti di corvi in paese. Il veterinario consiglia di non guardarli negli occhi. Il sindaco consiglia di votarlo.»','Radio Pippi: "Crow sightings in town. The vet advises not to look them in the eye. The mayor advises voting for him."']],
 5:[['Radio Pippi, emergenza: «In paese tutti hanno una fame che non passa. Il fornaio ha finito il pane, la farina e un cliente. Il sindaco invita alla calma. Con la bocca piena.»','Radio Pippi emergency: "Everyone in town has a hunger that won\'t stop. The baker ran out of bread, flour and one customer. The mayor calls for calm. With his mouth full."'],
    ['Radio Pippi, oroscopo: «Leone: oggi qualcuno ti accuserà di qualcosa. Probabilmente hai ragione tu. Probabilmente non basta.»','Radio Pippi horoscope: "Leo: today someone will accuse you of something. You\'re probably right. Probably not enough."']],
 6:[['Radio Pippi: «Il sindaco Gennaro festeggia il primo anno di mandato con un discorso di quattro ore. Tre le ha dormite. Applausi.»','Radio Pippi: "Mayor Gennaro celebrates his first year in office with a four-hour speech. He slept through three. Applause."'],
    ['Radio Pippi: «Dedica musicale da Nonna Pina "a quello là che sa chi è". Ventitré ascoltatori hanno chiamato per dire che sono loro.»','Radio Pippi: "Song dedication from Granny Pina "to that one who knows who he is". Twenty-three listeners called to say it\'s them."']]
};
for (const n of [2,5,6]){ let i=0;
  avOnN(n,'use:radio open:radio',async()=>{ await meAct('type',1000); const l=R[n][i++%R[n].length]; return avSay('voice', T(l[0],l[1])); });
  avOnN(n,'look:radio',()=>me('La radio del nonno. Funziona, grazie a una forchetta. È il mio capolavoro di ingegneria.','Grandpa\'s radio. Works, thanks to a fork. My engineering masterpiece.'));
  avOnN(n,'take:radio',()=>me('Pesa più di mia suocera. E brontola uguale.','It weighs more than my mother-in-law. Grumbles the same, too.'));
  avOnN(n,'look:sink',()=>me('Il lavandino. I piatti si sono organizzati in un sindacato. Chiedono di essere lavati. Non tratto.','The sink. The dishes have unionised. They demand washing. I don\'t negotiate.'));
  avOnN(n,'take:sink',()=>me('Dal lavandino non mi serve niente. Neanche la dignità, che è lì dentro da mesi.','I need nothing from the sink. Not even my dignity, which has been in there for months.'));
  avOnN(n,'look:tools',()=>me('Gli attrezzi di mia moglie, in ordine perfetto. Manca un posto vuoto a forma di ascia. Lo nota anche il chiodo.','My wife\'s tools, in perfect order. There\'s an empty axe-shaped space. Even the nail notices.'));
  avOnN(n,'look:bench',()=>me('Il banco attrezzi. Viti spaiate e la foto del santo. Mi guarda come se sapesse cosa ho fatto.','The workbench. Odd screws and the saint\'s picture. He looks at me like he knows what I did.'));
}
})();
/* personaggi spostati di poco per non coprire gli oggetti dietro di loro */
(()=>{ if (!window.ADV) return; const mv=(cast,id,x)=>{ if (cast && cast[id] && cast[id].room) cast[id].x=x; };
  for (const c of [AV_CAST, AV_CAST2, (AV_CHS[5]||{}).CAST, (AV_CHS[6]||{}).CAST]){ if (!c) continue; if (c.ugo && c.ugo.room==='cimitero') mv(c,'ugo',250); if (c.ercole && c.ercole.room==='bisca') mv(c,'ercole',456); }
  if (AV_CAST2.remo && AV_CAST2.remo.room==='stazione') mv(AV_CAST2,'remo',236); })();
/* scogli del faro: erano un rettangolo che copriva la casetta; ora sono solo le pietre in primo piano */
(()=>{ if (!window.ADV) return; const r=(AV_HS.faro||[]).find(h=>h.id==='rocks'); if (r) Object.assign(r,{x:300,y:252,w:110,h:30}); })();
/* capitolo 5: archivio e campanile hanno gli stessi oggetti visibili del capitolo 2, ora toccabili anche qui */
(()=>{ if (!window.ADV || !AV_CHS[5]) return; const C=AV_CHS[5];
  const add=(room,ids)=>{ const l=C.HS[room]=C.HS[room]||[]; for (const h of (AV_HS2[room]||[])) if (ids.includes(h.id) && !l.some(x=>x.id===h.id)) l.push({...h}); };
  add('archivio',['cabinets','maptable','portrait2','door2']); add('campanile',['bell1','bell2','bell3','clock','window2']);
  const L={ cabinets:['Gli schedari del nonno. Li ho già rivoltati tutti. Ora sono in ordine alfabetico per disperazione.','Grandpa\'s filing cabinets. I\'ve turned them all over. Now they\'re sorted alphabetically by despair.'],
    maptable:['La mappa del nonno, quella che mi ha portato fino all\'isola. Guardarla mi fa venire il mal di mare.','Grandpa\'s map, the one that took me to the island. Looking at it makes me seasick.'],
    portrait2:['Il ritratto del nonno. Mi guarda come per dire "te l\'avevo detto". Non mi ha detto niente, ma lo dice lo stesso.','Grandpa\'s portrait. He looks at me like "I told you so". He told me nothing, but he says it anyway.'],
    door2:['La porta blindata da cui sono entrato. Ora resta aperta. Il nonno avrebbe disapprovato. Molto.','The blast door I came through. It stays open now. Grandpa would disapprove. A lot.'],
    bell1:['La campana media. Ha una crepa a forma di Italia. Suona stonata, ma con orgoglio.','The middle bell. It has an Italy-shaped crack. Rings out of tune, but proudly.'],
    bell2:['Una campana. Sopra c\'è scritto "1887. Offerta dalla famiglia Pappalardo". Anche le campane, si sono comprati.','A bell. It says "1887. Donated by the Pappalardo family". They bought the bells too.'],
    bell3:['La campanella. Piccola, acuta, fastidiosa. Come una zanzara di bronzo.','The little bell. Small, shrill, annoying. A bronze mosquito.'],
    clock:['L\'orologio del campanile. Va, finalmente. Avanti di quattro minuti, come tutti in paese.','The bell-tower clock. It runs, finally. Four minutes fast, like everyone in town.'],
    window2:['Dal finestrone si vede tutto il paese. Da quassù sembra quasi un posto normale.','From the big window you can see the whole town. From up here it almost looks normal.'] };
  for (const [k,l] of Object.entries(L)) avOnN(5,'look:'+k,()=>me(l[0],l[1])); })();
/* capitolo 6: la scrivania del municipio finiva dentro la cella */
(()=>{ if (!window.ADV || !AV_CHS[6]) return; const l=AV_CHS[6].HS.municipio=AV_CHS[6].HS.municipio||[]; const d=(AV_HS.municipio||[]).find(h=>h.id==='desk'); if (d && !l.some(h=>h.id==='desk')) l.push({...d, x:333, w:86}); })();
(()=>{ if (!window.ADV || !AV_CHS[6]) return; const t=AV_CHS[6].CAST.tonino; if (t && t.room==='bisca') t.x=262; })();
