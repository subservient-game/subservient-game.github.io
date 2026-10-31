/* ================= GIOCHI DENTRO IL GIOCO ================= */
/* ---------- BRISCOLA (2 giocatori, 40 carte) ---------- */
const BR_SUITS=[['🪙','Denari','Coins','#c9a227'],['🏆','Coppe','Cups','#d64545'],['🗡️','Spade','Swords','#3f6fd1'],['🪵','Bastoni','Clubs','#4f9a4a']];
const BR_PTS={1:11,3:10,10:4,9:3,8:2}; const BR_STR=[1,3,10,9,8,7,6,5,4,2];
const brName=r=>({1:'A',8:T('Fante','J'),9:T('Cav.','Kn'),10:T('Re','K')}[r]||String(r));
const brPts=c=>BR_PTS[c.r]||0, brStr=c=>10-BR_STR.indexOf(c.r);
function brBeats(a,b,tr){ /* does b (second) beat a (first)? */ if (b.s===a.s) return brStr(b)>brStr(a); return b.s===tr; }
function brCard(c,btn,i){ const S=BR_SUITS[c.s]; return `<${btn?'button type="button" data-c="'+i+'"':'div'} class="brc" style="--sc:${S[3]}"><b>${brName(c.r)}</b><i>${AV_SUITS[c.s]}</i><small>${brPts(c)||''}</small></${btn?'button':'div'}>`; }
function avBriscola(opp, level){ return new Promise(res=>{
  const deck=[]; for (let s=0;s<4;s++) for (let r=1;r<=10;r++) deck.push({s,r});
  for (let i=deck.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [deck[i],deck[j]]=[deck[j],deck[i]]; }
  const brisc=deck[deck.length-1], tr=brisc.s; const me=[], ai=[]; let myP=0, aiP=0, lead='me', table=[], msg='';
  for (let i=0;i<3;i++){ me.push(deck.shift()); ai.push(deck.shift()); }
  const it=LANG==='it';
  const aiPick=()=>{ const lowest=a=>a.slice().sort((x,y)=>(brPts(x)+(x.s===tr?15:0))-(brPts(y)+(y.s===tr?15:0))||brStr(x)-brStr(y))[0];
    if (!table.length){ const nt=ai.filter(c=>c.s!==tr); return lowest(nt.length?nt:ai); }
    const a=table[0], val=brPts(a);
    const winSame=ai.filter(c=>c.s===a.s && brStr(c)>brStr(a)).sort((x,y)=>brStr(x)-brStr(y));
    if (winSame.length && (val>0 || brPts(winSame[winSame.length-1])>=10)) return val>=10?winSame[winSame.length-1]:winSame[0];
    if (val>=10 || (level>1 && val>=3)){ const trs=ai.filter(c=>c.s===tr).sort((x,y)=>brStr(x)-brStr(y)); if (a.s!==tr && trs.length) return trs[0]; }
    return lowest(ai); };
  const draw=()=>{
    sheet(`<div class="brw"><div class="brtop"><span>${esc(opp)}: ${'🂠'.repeat(ai.length)}</span><span>${it?'Mazzo':'Deck'}: ${deck.length}</span></div>
      <div class="brmid"><div class="brbr">${it?'Briscola':'Trump'}<br>${deck.length?brCard(brisc):`<div class="brc" style="--sc:${BR_SUITS[tr][3]}"><i>${AV_SUITS[tr]}</i></div>`}</div><div class="brtab">${table.map(c=>brCard(c)).join('')}</div></div>
      <p class="brmsg">${msg||'&nbsp;'}</p><div class="brhand">${me.map((c,i)=>brCard(c,true,i)).join('')}</div>
      <div class="brtop"><span>${it?'Tu':'You'}: ${myP}</span><span>${esc(opp)}: ${aiP}</span></div><button type="button" class="ghost" id="brQuit" style="width:100%;margin-top:8px">${it?'Abbandona':'Quit'}</button></div>`);
    $('brQuit').onclick=()=>{ closeSheet(); res(false); };
    $('sheetBody').querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>play(+b.dataset.c)); };
  const resolve=()=>{ const [a,b]=table; const firstMe=lead==='me'; const secondWins=brBeats(a,b,tr); const meWins=firstMe?!secondWins:secondWins; const p=brPts(a)+brPts(b);
    if (meWins){ myP+=p; lead='me'; msg=(it?'Presa tua':'Your trick')+(p?` +${p}`:''); } else { aiP+=p; lead='ai'; msg=(it?'Presa di ':'Trick to ')+opp+(p?` +${p}`:''); }
    setTimeout(()=>{ table=[]; if (deck.length){ const w=lead==='me'?me:ai, l=lead==='me'?ai:me; w.push(deck.shift()); if (deck.length) l.push(deck.shift()); else l.push(brisc); }
      if (!me.length && !ai.length){ closeSheet(); res(myP>aiP?true:(myP===aiP?null:false)); return; }
      draw(); if (lead==='ai') setTimeout(aiLead, 600); }, 900); draw(); };
  const aiLead=()=>{ const c=aiPick(); ai.splice(ai.indexOf(c),1); table=[c]; msg=(it?'Tocca a te':'Your turn'); draw(); };
  const play=i=>{ if ((lead==='me' && table.length) || (lead==='ai' && table.length!==1)) return; const c=me.splice(i,1)[0]; table.push(c);
    if (lead==='me'){ draw(); setTimeout(()=>{ const r=aiPick(); ai.splice(ai.indexOf(r),1); table.push(r); resolve(); }, 650); } else resolve(); };
  draw(); }); }
/* ---------- KARAOKE A RIME ---------- */
async function avKaraoke(songs){
  for (const s of songs){
    await avSay('voice', '🎵 '+T(s.title[0],s.title[1]));
    let errors=0;
    for (const v of s.verses){
      await avSay('pina', '🎤 '+T(v.line[0],v.line[1]));
      const o=await avChoose(v.opts.map(x=>['🎤 '+x[0],'🎤 '+x[1]]));
      setPose('sing'); await avSay('me', T(v.opts[o][0],v.opts[o][1])); setPose('idle');
      if (o!==v.ok){ errors++; await avSay('pina', T(['Stonato e senza rima. Come mio marito buonanima.','Ma che cazzo canti? Non fa rima nemmeno col culo!','Bocciato. Riprova, cane.'][errors%3],['Off-key and no rhyme. Like my late husband.','What the hell is that? It doesn\'t rhyme with anything!','Fail. Try again, you dog.'][errors%3])); if (errors>1) return false; }
    }
    await avSay('pina', T('Applausi! Più o meno.','Applause! Sort of.'));
  }
  return true;
}
/* ---------- FLESSIONI (tocca veloce) ---------- */
function avPushups(goal, secs){ return new Promise(res=>{ let n=0, left=secs, done=false;
  sheet(`<div style="text-align:center"><h3 style="margin:0 0 6px">💪 ${T('Flessioni!','Push-ups!')}</h3><p style="margin:0 0 8px">${T(`Fanne ${goal} in ${secs} secondi`,`Do ${goal} in ${secs} seconds`)}</p><div id="puN" style="font:700 46px Fredoka">0</div><div id="puT" style="margin-bottom:10px">${secs}s</div><button type="button" id="puB" style="width:100%;padding:28px 0;font-size:22px">${T('GIÙ! SU!','DOWN! UP!')}</button></div>`);
  setPose('pushup');
  $('puB').onpointerdown=e=>{ e.preventDefault(); if (done) return; n++; $('puN').textContent=n; if (n>=goal){ done=true; clearInterval(t); setPose('idle'); closeSheet(); res(true); } };
  const t=setInterval(()=>{ left--; if ($('puT')) $('puT').textContent=left+'s'; if (left<=0 && !done){ done=true; clearInterval(t); setPose('idle'); closeSheet(); res(false); } },1000); }); }
/* ---------- INTERROGATORIO (presenta le prove) ---------- */
async function avInterrogate(who, stmts){
  let i=0, wrong=0;
  while (i<stmts.length){
    const s=stmts[i];
    await avSay(who, '«'+T(s.say[0],s.say[1])+'»');
    const o=await avChoose([['Insisti','Press him'],['Presenta una prova','Present evidence'],['Lascia stare','Give up']]);
    if (o===2) return false;
    if (o===0){ await avSay(who, T(s.press[0],s.press[1])); continue; }
    const inv=AV.st.inv.slice();
    const k=await avChoose(inv.map(x=>[AV_ITEMS[x][0]+' '+AV_ITEMS[x][1], AV_ITEMS[x][0]+' '+AV_ITEMS[x][2]]).concat([['← Indietro','← Back']]));
    if (k===inv.length) continue;
    const ok = typeof s.ok==='function' ? s.ok(inv[k]) : inv[k]===s.ok;
    if (ok){ await avSay('me', T(s.win[0],s.win[1])); if (s.after) await avSay(who, T(s.after[0],s.after[1])); i++; }
    else { wrong++; await avSay(who, T(['E questa cosa dovrebbe dimostrare? Che sei scemo?','Bella prova. Di idiozia.','Hahaha. Ancora una così e chiamo l\'usciere.'][Math.min(wrong-1,2)],['And this proves what? That you\'re stupid?','Great evidence. Of idiocy.','Hahaha. One more like that and I call the porter.'][Math.min(wrong-1,2)])); if (wrong>=3) return false; }
  }
  return true;
}
