/* ================= CAPITOLO 2 — L'ALLARME DELLA TECA: chewing-gum di Nico sul sensore ================= */
Object.assign(AV_ITEMS,{ gomma:['🫧','Gomme da masticare','Chewing gum'], gommamast:['🫧','Gomma masticata','Chewed gum'] });
AV_ICONS.gomma=`<rect x="8" y="16" width="32" height="16" rx="3" fill="#f7a8c8" stroke="#2b2b2b" stroke-width="2.2"/><path d="M14 16 L14 32 M22 16 L22 32 M30 16 L30 32" stroke="#e87aa8" stroke-width="1.6"/><text x="12" y="27" font-size="7" font-weight="900" fill="#fff">BIG</text>`;
AV_ICONS.gommamast=`<path d="M10 28 Q8 16 20 16 Q26 10 34 16 Q42 20 38 30 Q30 38 20 36 Q10 36 10 28Z" fill="#f7a8c8" stroke="#2b2b2b" stroke-width="2.2"/><path d="M16 26 Q22 22 28 26" stroke="#e87aa8" stroke-width="1.6" fill="none"/>`;
AV_TROPHIES.push(['allarme','Hai disattivato l\'allarme del Museo con una gomma da masticare. Tecnologia comunale.','Disabled the Museum alarm with chewing gum. Council technology.']);
(()=>{ const old=AV_S['c2|open:teca']; const h=async(...a)=>{ const f=F();
  if (f.gennaroAway && !f.swapped && !f.alarmOff && avHas('chiavetta')){ f.alarmSeen=1; avSave(); await meAct('look',1000);
    return me('Sto per girare la chiavetta... e noto una lucina rossa sotto il vetro: un sensore d\'allarme, collegato a una sirena grossa come un\'anguria. Se apro, suona e mi arrestano. Devo tappare il sensore con qualcosa di appiccicoso.','I\'m about to turn the key... and notice a little red light under the glass: an alarm sensor, wired to a siren the size of a watermelon. If I open it, it goes off and I\'m arrested. I need to plug the sensor with something sticky.'); }
  return old(...a); }; AV_S['c2|open:teca']=h; AV_S['c2|take:teca']=h; AV_S['c2|use:teca']=h; AV_S['c2|use:teca:cioccolato']=h; AV_S['c2|use:teca:chiavetta']=h; })();
(()=>{ const old=AV_S['c2|talk:nico']||AV_S['talk:nico']; AV_S['c2|talk:nico']=async(...a)=>{ const f=F();
  if (f.alarmSeen && !f.alarmOff && !avHas('gomma') && !avHas('gommamast')){ const o=await avChoose([['Nico, hai qualcosa di appiccicoso?','Nico, got anything sticky?'],['Altro...','Something else...']]);
    if (o===0){ avAdd('gomma'); return np('nico','Appiccicoso? Il bancone. I clienti. Mia moglie. Tieni, chewing-gum alla fragola, scadute nel 1994: si sono indurite, ma masticale e tornano come nuove. Più o meno.','Sticky? The bar counter. The customers. My wife. Here, strawberry chewing gum, expired 1994: they\'ve gone hard, but chew them and they\'re good as new. More or less.'); } }
  return old?old(...a):undefined; }; })();
avOn2('use:me:gomma',async()=>{ await meAct('eat',2400); avSwap('gomma','gommamast'); return me('Mastico. Sanno di fragola, polvere e anni Novanta. Dopo due minuti di mandibola ho una pallina rosa perfetta. E un crampo.','I chew. They taste of strawberry, dust and the nineties. After two minutes of jaw work I have a perfect pink ball. And a cramp.'); });
avOn2('use:teca:gomma',()=>me('Così dura non attacca. Prima va masticata.','Too hard to stick. Chew it first.'));
avOn2('use:teca:gommamast use:gommamast:teca',async()=>{ const f=F(); avDel('gommamast'); f.alarmOff=1; avSave(); await meAct('point',1200); avTrophy('allarme','Hai disattivato l\'allarme del Museo con una gomma da masticare. Tecnologia comunale.','Disabled the Museum alarm with chewing gum. Council technology.');
  return me('Schiaccio la gomma sul sensore. La lucina rossa diventa rosa, poi si spegne. Il sistema d\'allarme del Comune, costato quarantamila euro, è stato battuto da una gomma del 1994.','I press the gum onto the sensor. The red light turns pink, then goes out. The council alarm system, which cost forty thousand euros, has been beaten by a 1994 chewing gum.'); });
(()=>{ AV_HINTS2.unshift(
  [()=>F().alarmSeen && !F().alarmOff && !avHas('gomma') && !avHas('gommamast'),'Il sensore della teca va tappato con qualcosa di appiccicoso: chiedi a Nico al bar in piazza.','The case sensor must be plugged with something sticky: ask Nico at the bar in the piazza.'],
  [()=>avHas('gomma'),'Masticala: usa le gomme su di te.','Chew it: use the gum on yourself.'],
  [()=>avHas('gommamast'),'Usa la gomma masticata sulla teca.','Use the chewed gum on the display case.']); })();
