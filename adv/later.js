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
/* magazzino e faro nei capitoli successivi */
(()=>{ if (!window.ADV) return; const L={
  crate:['Quel che resta della cassa che ho sfasciato con l\'ascia. Il ragno che ci viveva ha cambiato casa. E avvocato.','What\'s left of the crate I smashed with the axe. The spider that lived in it moved out. And hired a lawyer.'],
  ladles:['Mestoli di cioccolato in fila. Dopo tutto questo tempo nessuno li ha mangiati. Sospetto. Molto sospetto.','Chocolate ladles in a row. After all this time nobody has eaten them. Suspicious. Very suspicious.'],
  logbook:['Il diario di Marisa. Ultima pagina: "Oggi niente di strano. Cioè, le solite cose strane."','Marisa\'s logbook. Last page: "Nothing odd today. I mean, the usual odd things."'],
  stairs:['La scala a chiocciola. Centoquaranta gradini. Li ho già fatti. Il mio menisco se li ricorda uno per uno.','The spiral stairs. A hundred and forty steps. Done them. My meniscus remembers every single one.']};
  for (const n of [2,5,6]) for (const [k,l] of Object.entries(L)) avOnN(n,'look:'+k,()=>me(l[0],l[1])); })();
/* capitolo 2: il Dottor Bisturi dorme davvero sul lettino finché non lo svegli, e la sveglia del nonno si vede sul comodino */
(()=>{ if (!window.ADV || !AV_CAST2.bisturi) return; const b=AV_CAST2.bisturi, ox=b.x, op=b.pose;
  const asleep=()=>CHN()===2 && !F().leaveSigned;
  Object.defineProperty(b,'pose',{get:()=>asleep()?'sleep':op, configurable:true});
  Object.defineProperty(b,'x',{get:()=>asleep()?322:ox, configurable:true});
  const clockHere=()=>CHN()===2 && !avHas('sveglia') && !F().leaveSigned;
  (AV_HS2.bedroom=AV_HS2.bedroom||[]).push({id:'sveglia', x:241, y:186, w:24, h:24, n:['sveglia del nonno','grandpa\'s alarm clock'], when:clockHere});
  avOn2('look:sveglia',()=>me('La sveglia del nonno: due campane d\'ottone e un martelletto. Nel 1962 ha svegliato mezzo condominio. Nel 1987 il nonno l\'ha lanciata contro la nonna. Funziona ancora.','Grandpa\'s alarm clock: two brass bells and a little hammer. In 1962 it woke half the building. In 1987 grandpa threw it at grandma. Still works.'));
  avOn2('take:sveglia open:sveglia use:sveglia',async()=>{ if (avHas('sveglia')) return me('Ce l\'ho già.','Already got it.'); avAdd('sveglia'); try{ drawRoom(H.room); }catch(e){} return me('Prendo la sveglia del nonno. Pesa come un mattone e ticchetta come una bomba. Perfetta.','I take grandpa\'s alarm clock. Heavy as a brick, ticks like a bomb. Perfect.'); });
  const oL=AV_S['c2|look:nightlamp']; avOn2('look:nightlamp',(...a)=>clockHere()?me('Il comodino. Sopra, la lampada e la vecchia sveglia del nonno con le campane d\'ottone.','The bedside table. On it, the lamp and grandpa\'s old alarm clock with brass bells.'):(oL?oL(...a):me('Il comodino. Una lampada e un calzino orfano.','The bedside table. A lamp and an orphaned sock.')));
  for (const k of ['use:bisturi:sveglia','use:sveglia:bisturi','give:bisturi:sveglia','use:hbed:sveglia']){ const o=AV_S['c2|'+k]; if (o) AV_S['c2|'+k]=async(...a)=>{ const pr=o(...a); for (let i=0;i<40 && !F().leaveSigned;i++) await new Promise(z=>setTimeout(z,25)); try{ avSpawn(H.room); avRender(); }catch(e){} return pr; }; }
  const oArt=AV_ART && AV_ART.bedroom; if (oArt) AV_ART.bedroom=()=>{ let s=oArt(); if (typeof CHN==='function' && clockHere()) s+=`<g transform="translate(241 188) scale(.9)"><circle r="9" fill="#c0392b" stroke="#1d1d1d" stroke-width="1.6"/><circle r="6.4" fill="#fffaf0" stroke="#1d1d1d" stroke-width="1"/><path d="M0 0 V-4.5 M0 0 L3 1.5" stroke="#1d1d1d" stroke-width="1.2" stroke-linecap="round"/><circle cx="-7" cy="-9" r="3.4" fill="#e9b949" stroke="#1d1d1d" stroke-width="1.2"/><circle cx="7" cy="-9" r="3.4" fill="#e9b949" stroke="#1d1d1d" stroke-width="1.2"/><path d="M-6 8 l-3 4 M6 8 l3 4" stroke="#1d1d1d" stroke-width="1.6"/></g>`; return s; };
})();
/* indizi visibili: quando un oggetto serve, guardando il posto dove si trova lo si vede */
(()=>{ if (!window.ADV) return;
  const clue=(n, id, cond, it, en)=>{ const key=(n>1?'c'+n+'|':'')+'look:'+id; const old=AV_S[key]||(n>1?AV_S['look:'+id]:null);
    const h=(...a)=>{ if (CHN()===n && cond(F())) return me(it,en); return old?old(...a):(window.avDefault?avDefault('look',a[0]||{type:'hs',id},null):avNope()); };
    if (n>1) avOnN(n,'look:'+id,h); else { h.__src=old?(old.__src||String(old)):String(h); AV_S[key]=h; } };
  clue(1,'ghost',f=>f.tieAsk&&!f.tieGot,'Un lenzuolo sopra una sedia. Da sotto spunta... un nodo di cravatta? I fantasmi non portano la cravatta. Credo.','A sheet over a chair. Poking out from under it... a tie knot? Ghosts don\'t wear ties. I think.');
  clue(1,'stove',f=>f.wardrobeStuck&&!f.wardrobeOpen&&!avHas('olio'),'I fornelli. Accanto, la bottiglia d\'olio della nonna. Unge tutto: padelle, cardini, coscienze.','The stove. Next to it, grandma\'s bottle of oil. Greases everything: pans, hinges, consciences.');
  clue(1,'ktable',f=>f.valveIn&&!f.antenna&&!avHas('forchetta'),'Il tavolo della cucina. C\'è ancora la forchetta della cena di ieri. Di metallo. Lunga. Quasi un\'antenna.','The kitchen table. Last night\'s fork is still there. Metal. Long. Almost an antenna.');
  clue(1,'bed',f=>!f.notebook&&!avHas('taccuino'),'Il letto, disfatto dal 2019. Sotto il cuscino spunta l\'angolo di un vecchio taccuino.','The bed, unmade since 2019. The corner of an old notebook pokes out from under the pillow.');
  clue(2,'fridge',f=>f.peaAsk&&!f.peaIn&&!avHas('piselli'),'Il frigo. Nel freezer, dietro un ghiacciolo del 1998, c\'è un sacchetto di piselli surgelati.','The fridge. In the freezer, behind a 1998 ice lolly, there\'s a bag of frozen peas.');
  clue(2,'stove',f=>f.rustAsk&&!f.rustOk&&!avHas('olio2'),'I fornelli. Accanto c\'è l\'olio della nonna. Scioglie la ruggine e il colesterolo no.','The stove. Grandma\'s oil is next to it. Dissolves rust, not cholesterol.');
  clue(3,'palma2',f=>!f.eggGot,'Una palma alta. In cima, tra le noci di cocco, c\'è un nido di gabbiano. Il gabbiano mi guarda come un buttafuori.','A tall palm. At the top, among the coconuts, there\'s a seagull nest. The seagull eyes me like a bouncer.');
  clue(5,'ktable',f=>f.ugoSaffron&&!f.ugoFed&&!avHas('pane'),'Il tavolo di cucina. C\'è un filone di pane di tre giorni fa, duro come una mazza da baseball.','The kitchen table. There\'s a three-day-old loaf, hard as a baseball bat.');
  clue(5,'crates',f=>f.ovenAsk&&!f.ovenLit&&!avHas('legna5'),'Cassette del pesce vuote, di legno secco. Puzzano di sgombro, ma brucerebbero benissimo.','Empty fish crates, dry wood. They stink of mackerel, but they\'d burn beautifully.');
  clue(6,'nightlamp',f=>!avHas('taccuino')&&!f.ladleGot,'Il comodino. Dal cassetto spunta il mio vecchio taccuino da investigatore.','The bedside table. My old investigator\'s notebook pokes out of the drawer.');
})();
/* capitolo 2: dal barbiere si vede il rasoio elettrico a pile */
(()=>{ if (!window.ADV) return; avOnN(2,'look:mirror',()=>me(F().darkSeen&&!F().torchOk&&!avHas('pile')?'Lo specchio. Sulla mensola sotto, il rasoio elettrico di Salvatore: quello a pile, che ronza come un calabrone arrabbiato.':'Mi guardo. Lo specchio si gira dall\'altra parte.', F().darkSeen&&!F().torchOk&&!avHas('pile')?'The mirror. On the shelf below, Salvatore\'s electric razor: the battery one, buzzing like an angry hornet.':'I look at myself. The mirror looks away.')); })();
