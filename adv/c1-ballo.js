/* ================= CAPITOLO 1 — GARA DI LISCIO IN DISCOTECA E CRUCIVERBA DI PEPPE (facoltativi) ================= */
AV_TROPHIES.push(['ballo','Hai vinto la gara di liscio di Tony. La giuria era composta da Tony.','Won Tony\'s ballroom contest. The jury was Tony.'],['cruciverba','Hai finito il cruciverba di Peppe. Cinquant\'anni di tentativi, risolto in cinque minuti.','Finished Peppe\'s crossword. Fifty years of attempts, solved in five minutes.']);
const DANCE_MOVES=[['dance','Casqué','Dip'],['disco','Dito al cielo','Finger to the sky'],['robot','Robot','Robot'],['twist','Twist','Twist'],['spin','Giravolta','Spin'],['clap','Battimani','Clap']];
function avDanceGame(rounds){ return new Promise(res=>{ let seq=[], step=0, showing=true, lvl=0;
  sheet(`<div style="text-align:center"><h3 style="margin:0 0 4px">${T('Gara di liscio!','Ballroom contest!')}</h3><p id="dnM" style="margin:0 0 8px;font-size:13px">${T('Guarda le mosse di Tony e ripetile.','Watch Tony\'s moves and repeat them.')}</p>
   <div id="dnS" style="font:700 22px Fredoka,sans-serif;min-height:30px;margin-bottom:8px"></div>
   <div id="dnG" style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px">${DANCE_MOVES.map((m,i)=>`<button type="button" data-i="${i}" style="padding:14px 4px">${T(m[1],m[2])}</button>`).join('')}</div>
   <button type="button" id="dnQ" class="ghost" style="width:100%;margin-top:8px">${T('Mi arrendo','I give up')}</button></div>`);
  const btn=[...$('dnG').querySelectorAll('button')]; $('dnQ').onclick=()=>{ setPose('idle'); closeSheet(); res(false); };
  const show=()=>{ showing=true; step=0; seq.push(Math.floor(Math.random()*DANCE_MOVES.length)); $('dnM').textContent=T(`Turno ${seq.length} di ${rounds}: guarda...`,`Round ${seq.length} of ${rounds}: watch...`);
    seq.forEach((s,k)=>setTimeout(()=>{ if (!$('dnS')) return; $('dnS').textContent=T(DANCE_MOVES[s][1],DANCE_MOVES[s][2]); setPose(DANCE_MOVES[s][0]); btn[s].style.outline='3px solid #ffd166'; setTimeout(()=>{ if (btn[s]) btn[s].style.outline=''; },550);
      if (k===seq.length-1) setTimeout(()=>{ if (!$('dnS')) return; $('dnS').textContent=''; setPose('idle'); showing=false; $('dnM').textContent=T('Tocca a te!','Your turn!'); },700); }, 500+k*800)); };
  btn.forEach((b,i)=>b.onpointerdown=e=>{ e.preventDefault(); if (showing) return; setPose(DANCE_MOVES[i][0]);
    if (i!==seq[step]){ $('dnM').textContent=T('Hai pestato il piede a Tony. Si ricomincia.','You stepped on Tony\'s foot. Start over.'); seq=[]; setTimeout(show,900); return; }
    step++; if (step===seq.length){ if (seq.length>=rounds){ setTimeout(()=>{ setPose('idle'); closeSheet(); res(true); },500); } else setTimeout(show,700); } });
  show(); }); }
(()=>{ const old=AV_S['talk:tony']; avOn('talk:tony',async(...a)=>{ const f=F();
  if (!f.danceWon && !(AV.st.ch>1)){ const o=await avChoose([['Tony, fai ancora la gara di liscio?','Tony, still running the ballroom contest?'],['Altro...','Something else...']]);
    if (o===0){ await np('tony','La gara di liscio! Ogni sabato dal 1979, e ho sempre vinto io, perché sono anche il giudice. Se mi batti ti do il premio: venti Pippi e un bacio. Il bacio è facoltativo. Per me no.','The ballroom contest! Every Saturday since 1979, and I always win, because I\'m also the judge. Beat me and you get the prize: twenty Pippi and a kiss. The kiss is optional. Not for me.');
      const ok=await (window.avDance||avDanceGame)(5); if (!ok) return np('tony','Hai il ritmo di un trattore in salita. Riprova quando hai imparato a contare fino a quattro.','You\'ve got the rhythm of a tractor going uphill. Try again when you can count to four.');
      f.danceWon=1; avSave(); avTrophy('ballo','Hai vinto la gara di liscio di Tony. La giuria era composta da Tony.','Won Tony\'s ballroom contest. The jury was Tony.'); try{ LIFE.pippi+=20; saveLife(); }catch(e){}
      return np('tony','...Hai vinto. Per la prima volta in quarantasette anni. Ecco i venti Pippi. Il bacio te lo do lo stesso, mi spetta. MUAH. Ora vattene, devo piangere in bagno.','...You won. First time in forty-seven years. Here\'s twenty Pippi. You get the kiss anyway, I\'m owed it. MWAH. Now go, I need to cry in the toilet.'); } }
  return old?old(...a):undefined; }); })();
/* il cruciverba di Peppe */
const CROSS=[{q:['"Sette lettere: lo mescolò San Pancrazio nel 1683."','"Seven letters: Saint Pancras stirred it in 1683."'],o:[['Mestolo','Ladle'],['Risotto','Risotto'],['Pentola','Pot']],ok:1},
 {q:['"Cinque lettere: ce l\'ha il sindaco sotto il naso."','"Nine letters: the mayor has it under his nose."'],o:[['Baffo','Moustache'],['Bocca','Mouth'],['Pippi','Pippi']],ok:0},
 {q:['"Sei lettere: si gioca alla bisca con quaranta carte."','"Eight letters: played at the den with forty cards."'],o:[['Poker','Poker'],['Scopa','Scopa'],['Burraco','Burraco']],ok:1},
 {q:['"Quattro lettere: lo vende Gina e lo tifa Peppe."','"Four letters: Gina sells it, Peppe drinks it."'],o:[['Riso','Rice'],['Vino','Wine'],['Sale','Salt']],ok:1},
 {q:['"Cinque lettere: il segugio che risolve tutto."','"Five letters: the bloodhound who solves everything."'],o:[['Tu, ovviamente','You, obviously'],['Il sindaco','The mayor'],['Il Corvo','The Crow']],ok:0}];
(()=>{ const old=AV_S['talk:peppe']; avOn('talk:peppe',async(...a)=>{ const f=F();
  if (!f.crossDone && !(AV.st.ch>1)){ const o=await avChoose([['Peppe, ti aiuto col cruciverba?','Peppe, shall I help with your crossword?'],['Altro...','Something else...']]);
    if (o===0){ await np('peppe','Il cruciverba! Lo faccio dal 1974. Mi mancano cinque parole. Le stesse cinque dal 1974. Se me le trovi ti offro un caffè. Pagato da te.','The crossword! Been doing it since 1974. I\'m missing five words. The same five since 1974. Find them and I\'ll buy you a coffee. You pay.');
      for (const c of CROSS){ await np('peppe', T(c.q[0],c.q[1])); const r=await avChoose(c.o); if (r!==c.ok) return np('peppe','Non ci sta nelle caselle. Ecco, lo sapevo: anche tu come gli altri. Riprova, va.','Doesn\'t fit the boxes. I knew it: you\'re like the rest. Try again, go on.'); }
      f.crossDone=1; avSave(); avTrophy('cruciverba','Hai finito il cruciverba di Peppe. Cinquant\'anni di tentativi, risolto in cinque minuti.','Finished Peppe\'s crossword. Fifty years of attempts, solved in five minutes.'); try{ LIFE.pippi+=15; saveLife(); }catch(e){}
      return np('peppe','FINITO! Dopo cinquantadue anni! Ora non so più cosa fare la mattina. Mi hai rovinato la vita. Tieni quindici Pippi, e vattene prima che pianga.','DONE! After fifty-two years! Now I don\'t know what to do in the mornings. You\'ve ruined my life. Take fifteen Pippi, and go before I cry.'); } }
  return old(...a); }); })();
