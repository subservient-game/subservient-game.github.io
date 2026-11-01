/* ================= CAPITOLO 2 — LE TESSERE DELLA SOCIETÀ (obbligatorio prima del codice della mappa) ================= */
Object.assign(AV_ITEMS,{ tessE:['🪪','Tessera di Ernesto','Ernesto\'s card'], tessP:['🪪','Tessera di Peppe','Peppe\'s card'], tessPi:['🪪','Tessera di Pina','Pina\'s card'] });
const tessIcon=(col,ini)=>`<rect x="5" y="11" width="38" height="26" rx="4" fill="${col}" stroke="#2b2b2b" stroke-width="2.4"/><circle cx="15" cy="23" r="5" fill="#f4efe6" stroke="#2b2b2b" stroke-width="1.6"/><path d="M23 19 L38 19 M23 24 L36 24 M23 29 L33 29" stroke="#2b2b2b" stroke-width="1.8"/><text x="11.5" y="26" font-size="7" font-weight="900" fill="#2b2b2b">${ini}</text>`;
AV_ICONS.tessE=tessIcon('#ffd166','E'); AV_ICONS.tessP=tessIcon('#8fd3ff','P'); AV_ICONS.tessPi=tessIcon('#f7a8c8','Pi');
AV_TROPHIES.push(['tessere','Hai riunito le tessere della Società del Pippi. Manca solo quella del traditore.','Reunited the Pippi Society cards. Only the traitor\'s is missing.'],['tobia','Hai fatto alzare il gatto Tobia con un raggio di sole. Marisa ti ha maledetto in tre lingue.','Got Tobia the cat to move with a sunbeam. Marisa cursed you in three languages.']);
const c2old=k=>AV_S['c2|'+k]||AV_S[k];
const tessCount=()=>['tessE','tessP','tessPi'].filter(x=>F()['in_'+x]).length;
/* il tavolo della mappa vuole le tre tessere */
(()=>{ const old=c2old('use:maptable'); const h=async(...a)=>{ const f=F();
  if (f.mapCode && !f.mapDone && !f.tessereIn){ f.tessAsk=1; avSave();
    return me(`Sotto il riquadro delle coordinate ci sono quattro fessure a forma di tessera, coi nomi incisi: ERNESTO, PEPPE, PINA, e una quarta graffiata via. Il meccanismo non gira senza tessere. Inserite: ${tessCount()}/3.`,`Under the coordinates panel there are four card-shaped slots, with names engraved: ERNESTO, PEPPE, PINA, and a fourth scratched off. The mechanism won't turn without cards. Inserted: ${tessCount()}/3.`); }
  return old(...a); }; AV_S['c2|use:maptable']=h; AV_S['c2|open:maptable']=h; })();
['tessE','tessP','tessPi'].forEach(it=>avOn2('use:maptable:'+it+' use:'+it+':maptable',async()=>{ const f=F(); avDel(it); f['in_'+it]=1; avSave();
  if (tessCount()<3) return me(`Clic. La tessera entra nella fessura. ${tessCount()}/3.`,`Click. The card slides into its slot. ${tessCount()}/3.`);
  f.tessereIn=1; avSave(); avTrophy('tessere','Hai riunito le tessere della Società del Pippi. Manca solo quella del traditore.','Reunited the Pippi Society cards. Only the traitor\'s is missing.');
  return me('Clic, clic, clac! Le rotelle girano e compare un quadrante numerico. La quarta fessura resta vuota, e puzza di risotto. Ora serve il codice.','Click, click, clack! The wheels turn and a number dial appears. The fourth slot stays empty, and smells of risotto. Now I need the code.'); }));
/* ERNESTO: sotto il gatto Tobia, al faro */
(()=>{ const old=c2old('talk:marisa'); AV_S['c2|talk:marisa']=async(...a)=>{ const f=F();
  if (f.tessAsk && !f.tobia){ f.tobiaAsk=1; avSave(); await np('marisa','La tessera di Ernesto? Ce l\'ho io. Me l\'aveva data in pegno nel 1986, per una notte di passione e una bottiglia di vermouth. Ora ci dorme sopra Tobia, il mio gatto. E Tobia non si sposta. Mai. Neanche per morire.','Ernesto\'s card? I have it. He gave it to me as a pledge in 1986, for a night of passion and a bottle of vermouth. Now Tobia, my cat, sleeps on it. And Tobia doesn\'t move. Ever. Not even to die.');
    return me('Un gatto che non si sposta. Ci vuole qualcosa che lo faccia impazzire. Un puntino di luce, magari.','A cat that won\'t move. I need something to drive it crazy. A dot of light, maybe.'); }
  return old(...a); }; })();
avOn2('use:marisa:lente use:faro:lente',async()=>{ const f=F(); if (!f.tobiaAsk || f.tobia) return me('Guardo Marisa con la lente. Ha più gatti nei capelli che capelli.','I look at Marisa through the lens. She has more cats in her hair than hair.');
  await meAct('point',1400); await avSay('voice', T('Con la lente concentri un raggio di sole sul pavimento. Il puntino luminoso balla. Tobia apre un occhio. Poi l\'altro. Poi parte come un missile e si schianta contro la credenza.','With the lens you focus a sunbeam on the floor. The bright dot dances. Tobia opens one eye. Then the other. Then he launches like a missile and crashes into the cupboard.'));
  f.tobia=1; avSave(); avAdd('tessE'); avTrophy('tobia','Hai fatto alzare il gatto Tobia con un raggio di sole. Marisa ti ha maledetto in tre lingue.','Got Tobia the cat to move with a sunbeam. Marisa cursed you in three languages.');
  return np('marisa','TOBIA! Assassino! ...Va bene, prenditi la tessera. È piena di peli e di vermouth. Come Ernesto.','TOBIA! Murderer! ...Fine, take the card. It\'s full of hair and vermouth. Like Ernesto.'); });
/* PEPPE: persa a briscola con Ercole nel 1979 */
(()=>{ const old=c2old('talk:peppe'); AV_S['c2|talk:peppe']=async(...a)=>{ const f=F();
  if (f.tessAsk && !f.peppeTold && !avHas('tessP') && !f.in_tessP){ f.peppeTold=1; avSave(); await np('peppe','La mia tessera? L\'ho persa a briscola nel 1979. Contro Ercole, quello della bisca. Avevo tre assi e lui ne aveva quattro. In un mazzo da quaranta. Ancora ci penso.','My card? Lost it at briscola in 1979. To Ercole, the den guy. I had three aces and he had four. In a forty-card deck. Still think about it.'); return; }
  return old(...a); }; })();
(()=>{ const old=c2old('talk:ercole'); AV_S['c2|talk:ercole']=async(...a)=>{ const f=F();
  if (f.peppeTold && !f.ercoleBeat){ await np('ercole','La tessera di Peppe? La tengo incorniciata, è il mio trofeo. Te la gioco a briscola. Se perdi, mi lavi la macchina. Con la lingua.','Peppe\'s card? I keep it framed, it\'s my trophy. I\'ll play you for it at briscola. If you lose, you wash my car. With your tongue.');
    const o=await avChoose([['Gioca','Play'],['Lascia stare','Forget it']]); if (o!==0) return;
    const r=await avBriscola('Ercole',2); if (r!==true) return np('ercole','Ahahah! La macchina è parcheggiata fuori. Scherzo. Forse. Riprova quando vuoi, pollo.','Hahaha! The car\'s parked outside. Kidding. Maybe. Try again whenever, chicken.');
    f.ercoleBeat=1; avSave(); avAdd('tessP'); return np('ercole','...Mi hai battuto onestamente. Che schifo. Tieni la tessera, e non dire in giro che non ho barato. Mi rovini la reputazione.','...You beat me honestly. Disgusting. Take the card, and don\'t tell anyone I didn\'t cheat. You\'ll ruin my reputation.'); }
  return old(...a); }; })();
/* PINA: la usa come sottobicchiere; la dà solo a chi sa chi ha tradito */
(()=>{ const old=c2old('talk:pina'); AV_S['c2|talk:pina']=async(...a)=>{ const f=F();
  if (f.tessAsk && !avHas('tessPi') && !f.in_tessPi){ await np('pina','La mia tessera? Ci appoggio la grappa da cinquant\'anni. Te la do solo se mi dici una cosa: chi di noi quattro ci ha traditi?','My card? I\'ve rested my grappa on it for fifty years. I\'ll give it only if you tell me one thing: which of us four betrayed us?');
    const o=await avChoose([['Ernesto, scappando in Svizzera.','Ernesto, running off to Switzerland.'],['Peppe, perdendo la tessera.','Peppe, losing his card.'],['Quello col tovagliolo al collo e senza faccia nella foto.','The one with the napkin and no face in the photo.'],['Tu, Pina. Per la grappa.','You, Pina. For grappa.']]);
    if (o===3) return np('pina','Per la grappa? Io? Ma vaffanculo. Torna quando hai guardato bene la foto della Società.','For grappa? Me? Piss off. Come back when you\'ve looked properly at the Society photo.');
    if (o!==2) return np('pina','Sbagliato. Ernesto e Peppe sono due coglioni, ma leali. Guarda la foto della Società, bello mio.','Wrong. Ernesto and Peppe are idiots, but loyal. Look at the Society photo, sweetheart.');
    avAdd('tessPi'); return np('pina','Il tovagliolo. Sempre il tovagliolo. Mangiava anche durante le riunioni segrete. Tieni, è un po\' appiccicosa. Non chiedermi di cosa.','The napkin. Always the napkin. He ate even during secret meetings. Here, it\'s a bit sticky. Don\'t ask me what with.'); }
  return old(...a); }; })();
(()=>{ const H=AV_HINTS2; const i=H.findIndex(h=>/1683/.test(h[1])); H.splice(i<0?H.length:i,0,
  [()=>F().mapCode && !F().tessAsk,'Usa la mappa nell\'archivio: il meccanismo vuole qualcosa.','Use the map in the archive: the mechanism wants something.'],
  [()=>F().tessAsk && !F().tobia && !avHas('tessE') && !F().in_tessE,'La tessera di Ernesto ce l\'ha Marisa al faro: parlale, poi usa la lente su di lei per distrarre il gatto.','Marisa at the lighthouse has Ernesto\'s card: talk to her, then use the lens on her to distract the cat.'],
  [()=>F().tessAsk && !F().ercoleBeat && !F().in_tessP,'Chiedi a Peppe in piazza della sua tessera, poi sfida Ercole alla bisca.','Ask Peppe in the piazza about his card, then challenge Ercole at the den.'],
  [()=>F().tessAsk && !avHas('tessPi') && !F().in_tessPi,'Pina al karaoke: il traditore è quello col tovagliolo nella foto.','Pina at the karaoke: the traitor is the one with the napkin in the photo.'],
  [()=>F().tessAsk && !F().tessereIn && (avHas('tessE')||avHas('tessP')||avHas('tessPi')),'Usa le tessere sul tavolo della mappa nell\'archivio.','Use the cards on the map table in the archive.']); })();
