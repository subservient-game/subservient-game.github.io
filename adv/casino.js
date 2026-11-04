/* ================= TAVOLO VERDE: gioco d'azzardo permanente in bisca, a Pippi ================= */
(()=>{ if (!window.ADV) return;
AV_TROPHIES.push(
  ['banco','Hai vinto 100 Pippi al tavolo verde. Il fisco ti sta già cercando.','Won 100 Pippi at the card table. The taxman is already looking for you.'],
  ['settemezzo','Sette e mezzo esatto! Il banco piange.','Exactly seven and a half! The bank weeps.'],
  ['rovinato','Hai perso 50 Pippi al tavolo. Tua madre lo saprà.','Lost 50 Pippi at the table. Your mother will find out.'],
  ['tuttigiochi','Hai vinto a tutti i giochi del tavolo verde. Vizioso.','Won every game at the card table. Degenerate.']);
const it=()=>LANG==='it';
const pip=()=>{ try{ return Math.round(LIFE.pippi||0); }catch(e){ return 0; } };
const addPip=n=>{ try{ LIFE.pippi=Math.max(0,(LIFE.pippi||0)+n); saveLife(); }catch(e){} };
const CS=()=>{ const s=AV.st.casino=AV.st.casino||{net:0,won:{},games:0}; return s; };
const rnd=a=>a[Math.floor(Math.random()*a.length)];
/* ---------- avversari, con chiacchiere ---------- */
const OPP={
  gina:{ n:['Gina la Squalo','Gina the Shark'], lvl:3,
    pre:[['Siediti. Le sedie sono gratis. Il resto no.','Sit. Chairs are free. Nothing else is.'],['Ti mangio i Pippi e poi mi pulisco i denti con le tue carte.','I\'ll eat your Pippi and pick my teeth with your cards.'],['Ho perso una volta sola, nel 1987. Quello lì adesso fa il parcheggiatore.','I lost once, in 1987. That guy parks cars now.']],
    win:[['Grazie. Ci compro lo smalto.','Thanks. I\'ll buy nail polish with it.'],['Torna quando ti crescono i peli sullo stomaco.','Come back when you grow some hair on your chest.'],['Facile come rubare le caramelle a un assessore.','Easy as stealing candy from a councillor.']],
    lose:[['...Fortuna. Solo fortuna. E una mano che trema, la mia.','...Luck. Pure luck. And a shaky hand, mine.'],['Prendi i Pippi e sparisci prima che cambi idea.','Take the Pippi and vanish before I change my mind.'],['Non dirlo a nessuno. Ho una reputazione. Squalo, non sardina.','Tell no one. I have a reputation. Shark, not sardine.']] },
  tonino:{ n:['Tonino il Liscio','Slick Tonino'], lvl:1,
    pre:[['Giochiamo? Ti avverto: ho la brillantina portafortuna.','Shall we play? Warning: lucky hair gel.'],['Oggi me la sento. Ieri pure. Ho perso lo stesso.','I feel lucky today. Felt it yesterday too. Lost anyway.'],['Se vinco mi compro una dignità. Ne ho bisogno.','If I win I\'ll buy myself some dignity. I need it.']],
    win:[['HO VINTO! Mamma, ho vinto! ...Mamma è morta nel \'98, ma lo sente.','I WON! Mum, I won! ...Mum died in \'98, but she feels it.'],['Visto? La brillantina funziona!','See? The gel works!']],
    lose:[['Di nuovo. Sono una fontana di Pippi. Per gli altri.','Again. I\'m a Pippi fountain. For others.'],['Non è colpa mia, il mazzo mi odia. Anche mia moglie.','Not my fault, the deck hates me. So does my wife.'],['Ok, ok... prestami 5 Pippi per rifarmi? No? Lo sapevo.','Ok, ok... lend me 5 Pippi to win it back? No? Knew it.']] },
  ercole:{ n:['Ercole il Buttafuori','Ercole the Bouncer'], lvl:2,
    pre:[['Giochiamo. Se bari, ti piego. Se vinci, ti piego lo stesso. Scherzo. Forse.','We play. Cheat and I fold you. Win and I fold you anyway. Joking. Maybe.'],['Le mie mani sono grosse, le carte piccole. Ma conto bene.','My hands are big, cards small. But I count fine.']],
    win:[['Ahah! Ercole uno, Pippi zero. Cioè, Pippi a Ercole.','Haha! Ercole one, Pippi zero. I mean, Pippi to Ercole.'],['Ci compro le proteine. Grazie del contributo ai miei bicipiti.','I\'ll buy protein. Thanks for contributing to my biceps.']],
    lose:[['Hai vinto. Ti accompagno alla porta. Gentilmente. Stavolta.','You won. I\'ll walk you to the door. Gently. This time.'],['Grrr. Va bene. Ma la prossima la gioco col braccio di ferro.','Grrr. Fine. Next one we settle with arm wrestling.']] }
};
/* ---------- SETTE E MEZZO ---------- */
const SM_V=r=>r>7?0.5:r;
const smName=r=>({8:it()?'Fante':'Jack',9:it()?'Cavallo':'Knight',10:it()?'Re':'King'}[r]||String(r));
function smCard(c,hid){ if (hid) return `<div class="brc" style="--sc:#555"><b>?</b><i>${typeof UI_IC==='function'?UI_IC('cardback',22):'🂠'}</i></div>`; const S=BR_SUITS[c.s]; return `<div class="brc" style="--sc:${S[3]}"><b>${smName(c.r)}</b><i>${AV_SUITS[c.s]}</i><small>${SM_V(c.r)}</small></div>`; }
/* matta: il Re di Denari vale quanto vuoi. Qui la giochiamo semplice: la matta vale il necessario per arrivare al meglio. */
const smTot=h=>{ let t=0, m=false; for (const c of h){ if (c.s===0 && c.r===10) m=true; else t+=SM_V(c.r); } if (m){ let best=t+0.5; for (let v=1;v<=7;v++){ if (t+v<=7.5) best=Math.max(best,t+v); } t=best; } return t; };
window.avSetteMezzo=function(opp, level){ return new Promise(res=>{
  const deck=[]; for (let s=0;s<4;s++) for (let r=1;r<=10;r++) deck.push({s,r});
  for (let i=deck.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [deck[i],deck[j]]=[deck[j],deck[i]]; }
  const me=[deck.shift()], bk=[deck.shift()]; let phase='me', msg=it()?'Carta o stai?':'Hit or stand?';
  const draw=()=>{ const mt=smTot(me), bt=smTot(bk);
    sheet(`<div class="brw"><h3 style="margin:2px 0 6px">${it()?'Sette e mezzo':'Seven and a half'}</h3>
      <div class="brtop"><span>${esc(opp)} (${it()?'banco':'bank'})</span><span>${phase==='me'?'?':bt}</span></div>
      <div class="brtab" style="justify-content:center;min-height:70px">${bk.map((c,i)=>smCard(c, phase==='me' && i===0)).join('')}</div>
      <p class="brmsg">${msg}</p>
      <div class="brtab" style="justify-content:center;min-height:70px">${me.map(c=>smCard(c)).join('')}</div>
      <div class="brtop"><span>${it()?'Tu':'You'}</span><span style="font-size:18px">${mt}</span></div>
      <p style="font-size:11px;opacity:.7;margin:2px 0 8px">${it()?'Figure = ½. Re di Denari = matta (vale quanto ti serve). Oltre 7½ hai sballato.':'Face cards = ½. King of Coins = wild (worth what you need). Over 7½ you bust.'}</p>
      ${phase==='me'?`<div style="display:flex;gap:8px"><button type="button" id="smHit" style="flex:1">🃏 ${it()?'Carta':'Hit'}</button><button type="button" id="smStay" style="flex:1">✋ ${it()?'Sto':'Stand'}</button></div>`:''}
      <button type="button" class="ghost" id="smQuit" style="width:100%;margin-top:8px">${it()?'Abbandona':'Quit'}</button></div>`);
    $('smQuit').onclick=()=>{ closeSheet(); res(false); };
    if (phase==='me'){ $('smHit').onclick=hit; $('smStay').onclick=stay; } };
  const end=(r,m)=>{ phase='end'; msg=m; draw(); setTimeout(()=>{ closeSheet(); res(r); }, 1800); };
  const hit=()=>{ me.push(deck.shift()); const t=smTot(me); if (t>7.5) return end(false, it()?`Sballato! ${t}. Il banco ride.`:`Bust! ${t}. The bank laughs.`); if (t===7.5){ msg=it()?'SETTE E MEZZO!':'SEVEN AND A HALF!'; window.__smPerfect=1; return stay(); } msg=it()?`Hai ${t}. Ancora?`:`You have ${t}. Again?`; draw(); };
  const stay=()=>{ phase='bank'; const mt=smTot(me); msg=it()?'Gioca il banco...':'The bank plays...'; draw();
    const step=()=>{ const bt=smTot(bk);
      /* il banco: livello 1 si ferma a 5, livello 2 a 6, livello 3 pesca finché non ti batte (se può) */
      const stop = level>=3 ? (bt>=mt) : (bt>=(level>=2?6:5) || bt>=mt);
      if (bt>7.5) return end(true, it()?`Il banco sballa con ${bt}! Vinci tu.`:`The bank busts with ${bt}! You win.`);
      if (stop){ if (bt>=mt) return end(false, it()?`Banco ${bt}, tu ${mt}. Pari o meglio: vince il banco.`:`Bank ${bt}, you ${mt}. Tie or better: bank wins.`); return end(true, it()?`Banco ${bt}, tu ${mt}. Vinci!`:`Bank ${bt}, you ${mt}. You win!`); }
      bk.push(deck.shift()); draw(); setTimeout(step, 800); };
    setTimeout(step, 700); };
  window.__smPerfect=0; draw(); }); };
/* ---------- il tavolo ---------- */
const GAMES=[
  {id:'briscola', n:['🃏 Briscola','🃏 Briscola'], run:(o)=>avBriscola(T(...o.n), o.lvl)},
  {id:'sette', n:['7½ Sette e mezzo','7½ Seven and a half'], run:(o)=>window.avSetteMezzo(T(...o.n), o.lvl)},
  {id:'dadi', n:['🎲 Dadi: alto o basso','🎲 Dice: high or low'], run:(o)=>avDiceGame(2+o.lvl)},
  {id:'morra', n:['✊ Morra','✊ Morra'], run:(o)=>avMorraGame(1+o.lvl)},
  {id:'sfotto', n:['🗯️ Sfida di sfottò','🗯️ Insult duel'], run:(o)=>window.avSfida?window.avSfida(T(...o.n), o.lvl):Promise.resolve(false)}
];
const here=()=>{ const ids=(AV.npcs||[]).map(n=>n.avId); return Object.keys(OPP).filter(k=>ids.includes(k)); };
async function table(){
  const opps=here(); if (!opps.length) return me('Il tavolo verde è vuoto. Giocare da solo a briscola è triste. L\'ho fatto. Ho perso.','The card table is empty. Playing briscola alone is sad. I\'ve done it. I lost.');
  if (pip()<5) return np(opps[0],'Senza almeno 5 Pippi qui non ti siedi. Neanche per guardare. Guardare costa 2.','Without at least 5 Pippi you don\'t sit here. Not even to watch. Watching costs 2.');
  let k=opps[0]; if (opps.length>1){ const o=await avChoose(opps.map(x=>[`${it()?'Sfida':'Challenge'} ${OPP[x].n[0]}`, `${it()?'Sfida':'Challenge'} ${OPP[x].n[1]}`]).concat([['Lascia stare','Never mind']])); if (o>=opps.length) return; k=opps[o]; }
  const O=OPP[k];
  const g=await avChoose(GAMES.map(x=>x.n).concat([['Lascia stare','Never mind']])); if (g>=GAMES.length) return; const G=GAMES[g];
  const stakes=[5,10,25,50].filter(v=>v<=pip()); const sI=await avChoose(stakes.map(v=>[`${v} Pippi`,`${v} Pippi`]).concat([['Ci ho ripensato','Changed my mind']])); if (sI>=stakes.length) return; const bet=stakes[sI];
  await np(k, ...rnd(O.pre));
  const r=await G.run(O);
  const cs=CS(); cs.games++;
  if (r===true){ addPip(bet); cs.net+=bet; cs.won[G.id]=1; avSave(); try{ window.avSfx&&avSfx('pick'); }catch(e){}
    await np(k, ...rnd(O.lose)); await me(...rnd([[`+${bet} Pippi. Il vizio paga. Finché paga.`,`+${bet} Pippi. Vice pays. Until it doesn't.`],[`${bet} Pippi in tasca. Li investo subito: in altro azzardo.`,`${bet} Pippi pocketed. Investing them right away: in more gambling.`],['Vinto! Faccio la faccia da poker. Ah no, è finita. Faccio la faccia da vincitore.','Won! Poker face. Oh, it\'s over. Winner\'s face then.']]));
    if (G.id==='sette' && window.__smPerfect) avTrophy('settemezzo','Sette e mezzo esatto! Il banco piange.','Exactly seven and a half! The bank weeps.');
    if (cs.net>=100) avTrophy('banco','Hai vinto 100 Pippi al tavolo verde. Il fisco ti sta già cercando.','Won 100 Pippi at the card table. The taxman is already looking for you.');
    if (GAMES.every(x=>cs.won[x.id])) avTrophy('tuttigiochi','Hai vinto a tutti i giochi del tavolo verde. Vizioso.','Won every game at the card table. Degenerate.');
    return; }
  if (r===null){ avSave(); await np(k,'Pari. Nessuno paga. Che noia, sembra il bilancio del comune.','A draw. Nobody pays. Boring, like the council budget.'); return; }
  addPip(-bet); cs.net-=bet; avSave(); await np(k, ...rnd(O.win)); await me(...rnd([[`-${bet} Pippi. Era un investimento. In umiltà.`,`-${bet} Pippi. It was an investment. In humility.`],['Perso. Ho la stessa fortuna di un tacchino a Natale.','Lost. I have the luck of a turkey at Christmas.'],['Non piango. Mi è entrata una fiche nell\'occhio.','I\'m not crying. A chip got in my eye.']]));
  if (cs.net<=-50) avTrophy('rovinato','Hai perso 50 Pippi al tavolo. Tua madre lo saprà.','Lost 50 Pippi at the table. Your mother will find out.');
}
window.avCasinoTable=table;
/* ---------- aggancio al tavolo della bisca, in ogni capitolo ---------- */
function hook(){
  const wrap=(key)=>{ const old=AV_S[key]; AV_S[key]=async(...a)=>{ if (H.room!=='bisca') return old?old(...a):avNope();
    const opts=[]; if (old) opts.push([['Parla di cose serie','Talk business'],()=>old(...a)]); opts.push([['💰 Gioca a Pippi al tavolo verde','💰 Gamble Pippi at the card table'],table]); opts.push([['Niente','Nothing'],null]);
    if (opts.length===2) return table();
    const o=await avChoose(opts.map(x=>x[0])); const f=opts[o][1]; return f?f():undefined; }; };
  const keys=new Set(['use:table']); for (const k of Object.keys(AV_S)) if (/(^|\|)use:table$/.test(k)) keys.add(k);
  keys.forEach(wrap);
  const oLook=AV_S['look:table']; AV_S['look:table']=(...a)=>H.room!=='bisca'&&oLook?oLook(...a):me('Il tavolo verde. Panno bruciato di sigaro, macchie di vino e un dente. Si gioca a Pippi: briscola, sette e mezzo, dadi, morra. E a insulti.','The card table. Cigar-burnt felt, wine stains and a tooth. You play for Pippi: briscola, seven and a half, dice, morra. And insults.');
}
if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',hook); else hook();
})();
