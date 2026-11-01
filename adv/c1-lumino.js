/* ================= CAPITOLO 1 — IL LUMINO DELLA MOGLIE DI UGO: candela di Pina, accesa al forno di Totò ================= */
Object.assign(AV_ITEMS,{ candela:['🕯️','Candela rossa','Red candle'], lumacceso:['🕯️','Lumino acceso','Lit grave candle'] });
AV_ICONS.candela=`<rect x="17" y="16" width="14" height="26" rx="2" fill="#c0392b" stroke="#2b2b2b" stroke-width="2.3"/><path d="M24 16 L24 10" stroke="#2b2b2b" stroke-width="2"/><path d="M17 22 Q20 26 22 22" stroke="#8e2a20" stroke-width="1.6" fill="none"/>`;
AV_ICONS.lumacceso=`<path d="M14 22 L34 22 L32 42 L16 42Z" fill="#c0392b" stroke="#2b2b2b" stroke-width="2.3" stroke-linejoin="round" opacity=".9"/><path d="M24 20 Q18 12 24 4 Q30 12 24 20Z" fill="#ffd166" stroke="#ff7b29" stroke-width="1.8"/><path d="M24 18 Q21 13 24 9 Q27 13 24 18Z" fill="#fff6c2"/>`;
AV_TROPHIES.push(['lumino','Hai riacceso il lumino della moglie di Ugo coi fornelli di casa. Ti sei bruciato un sopracciglio.','Relit Ugo\'s wife\'s grave candle on your stove. You singed an eyebrow.']);
const c1v=()=>!(AV.st.ch>1);
const ugoFioriOrig=AV_S['give:ugo:fiori'];
AV_S['give:ugo:fiori']=async(...a)=>{ const f=F();
  if (c1v() && f.ugoAsked && !f.stampUgo && !f.luminoGiven){ if (!f.luminoAsk){ f.luminoAsk=1; avSave(); }
    return np('ugo','Fiori belli, eh. Ma a mia moglie non bastano i fiori: si è spento il suo lumino, un anno fa, e non l\'ho più riacceso. Ho paura del buio, dell\'accendino e di lei. Portami un lumino acceso e poi i fiori, e ti timbro anche la fronte.','Nice flowers. But flowers aren\'t enough for my wife: her grave candle went out a year ago and I never relit it. I\'m scared of the dark, of lighters and of her. Bring me a lit candle and then the flowers, and I\'ll stamp your forehead too.'); }
  return ugoFioriOrig(...a); };
AV_S['use:tomb1:fiori']=()=>AV_S['give:ugo:fiori']();
avOn('give:ugo:lumacceso use:tomb1:lumacceso',async()=>{ const f=F(); avDel('lumacceso'); f.luminoGiven=1; avSave(); avTrophy('lumino','Hai riacceso il lumino della moglie di Ugo coi fornelli di casa. Ti sei bruciato un sopracciglio.','Relit Ugo\'s wife\'s grave candle on your stove. You singed an eyebrow.');
  await avSay('voice', T('Ugo posa il lumino sulla tomba. La fiammella trema. Ugo si soffia il naso nella cravatta di un morto vicino.','Ugo places the candle on the grave. The flame flickers. Ugo blows his nose on a neighbouring dead man\'s tie.'));
  await np('ugo','Eccola, la mia Assunta. Illuminata come quando mi tirava i piatti. Ora i fiori, e ti faccio il timbro.','There she is, my Assunta. Lit up like when she threw plates at me. Now the flowers, and I\'ll stamp you.');
  if (avHas('fiori')) return ugoFioriOrig(); });
(()=>{ const old=AV_S['talk:pina']; AV_S['talk:pina']=async(...a)=>{ const f=F();
  if (c1v() && f.luminoAsk && !f.luminoGiven && !avHas('candela') && !avHas('lumacceso')){ const o=await avChoose([['Pina, mi presti una candela?','Pina, can I borrow a candle?'],['Altro...','Something else...']]);
    if (o===0){ await np('pina','Le mie candele rosse? Sono per l\'atmosfera, quando canto le canzoni tristi. Te ne do una se mi fai un complimento. Uno vero. Sono vecchia, mica scema.','My red candles? They\'re for the mood, when I sing sad songs. You get one if you pay me a compliment. A real one. I\'m old, not stupid.');
      const c=await avChoose([['Lei canta come una sirena.','You sing like a mermaid.'],['Lei bara a carte meglio di un politico.','You cheat at cards better than a politician.'],['Lei è conservata benissimo.','You\'re very well preserved.']]);
      if (c===0) return np('pina','Una sirena? Quelle annegano i marinai. ...Va bene, è vero, ne ho annegati due. Ma non è un complimento. Riprova.','A mermaid? They drown sailors. ...Fine, it\'s true, I drowned two. But it\'s not a compliment. Again.');
      if (c===2) return np('pina','"Conservata"? Come un sottaceto? Fuori dai coglioni! ...Torna quando hai imparato a parlare alle donne.','"Preserved"? Like a pickle? Get lost! ...Come back when you\'ve learned to talk to women.');
      avAdd('candela'); return np('pina','AHAHAH! Vero! L\'ho detto anche al prete. Tieni la candela, tesoro. E se la accendi per una donna, che sia una donna morta: quelle almeno non si lamentano.','HAHAHA! True! I told the priest too. Take the candle, darling. And if you light it for a woman, make it a dead one: at least they don\'t complain.'); } }
  return old(...a); }; })();
avOn('use:stove:candela use:candela:stove',async()=>{ await meAct('squat',1400); avSwap('candela','lumacceso'); return me('Accendo il fornello e ci avvicino la candela. Mi brucio un sopracciglio, ma la fiammella prende. La metto in un vasetto di vetro: ecco un lumino da cimitero, versione casalinga.','I light the stove and hold the candle to it. I singe an eyebrow, but the wick catches. I put it in a glass jar: a homemade grave candle.'); });
avOn('use:candela:me use:me:candela',()=>me('Accenderla con cosa? Non fumo da quando ho smesso. Cioè da ieri. I fornelli di casa, magari.','Light it with what? I haven\'t smoked since I quit. Meaning yesterday. The stove at home, maybe.'));
(()=>{ const i=AV_HINTS.findIndex(h=>h[1].startsWith('Dai i fiori a Ugo')); AV_HINTS.splice(i<0?AV_HINTS.length:i,0,
  [()=>F().luminoAsk && !F().luminoGiven && !avHas('candela') && !avHas('lumacceso'),'Ugo vuole il lumino acceso: Pina al karaoke ha delle candele. Falle un complimento sincero.','Ugo wants a lit grave candle: Pina at the karaoke has candles. Pay her a sincere compliment.'],
  [()=>avHas('candela'),'Accendi la candela coi fornelli della cucina di casa.','Light the candle on the kitchen stove at home.'],
  [()=>avHas('lumacceso'),'Porta il lumino acceso a Ugo.','Bring the lit candle to Ugo.']); })();
