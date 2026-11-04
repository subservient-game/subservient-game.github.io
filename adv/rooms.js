/* ================= ZONE SECONDARIE: dentro il Magazzino 7 e dentro il faro ================= */
(()=>{ if (!window.ADV) return; const hs=(id,x,y,w,h,it,en,when)=>({id,x,y,w,h,n:[it,en],when});
Object.assign(AV_PLACES,{ magazzino:['📦','Dentro il Magazzino 7','Inside Warehouse 7'], faroin:['🗼','Dentro il faro','Inside the lighthouse'] });
Object.assign(AV_HS,{
  magazzino:[hs('crate',330,196,90,60,'cassa inchiodata','nailed crate'), hs('ladles',150,120,150,90,'mestoli di cioccolato','chocolate ladles'), hs('brutus',250,214,70,40,'Brutus','Brutus',()=>F().dogSeen), hs('exitw',30,170,50,130,'uscita','exit')],
  faroin:[hs('stairs',250,140,120,200,'scala a chiocciola','spiral staircase'), hs('oillamp',90,120,30,40,'lampada a olio','oil lamp'), hs('porthole',380,90,50,50,'oblò','porthole'), hs('logbook',400,200,50,30,'diario di bordo','logbook'), hs('exitf',30,180,50,120,'uscita','exit')]
});
const back=(r)=>()=>avGoLater(r);
avOn('use:exitw open:exitw look:exitw', back('porto'));
avOn('use:exitf open:exitf look:exitf', back('faro'));
avOn('look:crate',()=>me(F().receipt?'La cassa sfasciata. Dentro c\'era la ricevuta. Ora ci sono solo trucioli e un ragno offeso.':'Una cassa inchiodata con scritto "G. — RISERVATO". Inchiodata da uno che odia il mondo intero.', F().receipt?'The smashed crate. The receipt was inside. Now just splinters and an offended spider.':'A crate nailed shut, marked "G. — PRIVATE". Nailed by someone who hates the whole world.'));
avOn('open:crate use:crate take:crate',()=>me(F().receipt?'Già aperta. Più aperta di così si chiama legna.':'A mani nude? Mi rompo le unghie e poi il morale. Serve qualcosa per sfasciarla.', F().receipt?'Already open. Any more open and it\'s firewood.':'Barehanded? I\'d break my nails and then my spirit. I need something to smash it.'));
avOn('talk:brutus',()=>me(F().dogFed?'Brutus russa. Gli dico "bravo". Fa una scoreggia nel sonno. La prendo come un sì.':'«Buono, Brutus... cuccia...». Brutus mi mostra tutti i denti. Ne ha più di me.', F().dogFed?'Brutus snores. I say "good boy". He farts in his sleep. I\'ll take it as a yes.':'"Easy, Brutus... sit...". Brutus shows me all his teeth. He has more than me.'));
avOn('look:ladles',()=>me('Cinquanta mestoli di cioccolato in fila, come soldatini. Qualcuno qui voleva sostituire il Mestolo d\'Oro con un falso. Qualcuno con la G.','Fifty chocolate ladles in a row, like toy soldiers. Someone here wanted to swap the Golden Ladle for a fake. Someone with a G.'));
avOn('take:ladles use:ladles',()=>me('Ne ho già assaggiato uno. Sa di cioccolato e di truffa.','I\'ve already tasted one. Tastes of chocolate and fraud.'));
avOn('look:stairs',()=>me('Centoquaranta gradini a chiocciola. Ogni gradino ha un nome inciso: sono i guardiani del faro morti di infarto salendoli.','A hundred and forty spiral steps. Each step has a name carved in it: lighthouse keepers who died of heart attacks climbing them.'));
avOn('use:stairs open:stairs take:stairs',async()=>{ const f=F(); if (f.nestDone) return me('In cima c\'è solo vento e cacca di corvo. Ci sono già stato. Le mie ginocchia se lo ricordano.','At the top there\'s only wind and crow poop. Been there. My knees remember.'); return window.__faroClimb?window.__faroClimb():me('Su per la scala.','Up the stairs.'); });
avOn('look:oillamp',()=>me('Una lampada a olio accesa. Marisa dice che l\'elettricità è una moda. Come le mutande.','A lit oil lamp. Marisa says electricity is a fad. Like underpants.'));
avOn('take:oillamp use:oillamp',()=>me('Se la prendo, Marisa mi prende. Con la lampada. In testa.','If I take it, Marisa takes me. With the lamp. On the head.'));
avOn('look:porthole',()=>me('Dall\'oblò si vede il mare nero e la luna. Di giorno si vede il mare blu e Marisa che stende le mutande. Preferisco la notte.','Through the porthole: black sea and the moon. By day: blue sea and Marisa hanging her knickers. I prefer night.'));
avOn('look:logbook',()=>me('Il diario del guardiano. Ultima pagina: "Corvi sulla lanterna. Neri. Tanti. Uno con una piuma più lunga degli altri: si dà delle arie. — Marisa".','The keeper\'s log. Last page: "Crows on the lantern. Black. Many. One with a longer feather than the rest: thinks he\'s the boss. — Marisa".'));
avOn('take:logbook',()=>me('Il diario resta qui. Marisa ci scrive anche quanti caffè beve. Sono tanti.','The log stays here. Marisa writes down how many coffees she drinks. It\'s a lot.'));

/* entrare */
const c1=()=>!(AV.st.ch>1);
AV_ENTER.magazzino={ x:70, after:async()=>{ const f=F(); if (f.doorOpen && !f.receipt && !f.dogFed && !f.dogSeen){ f.dogSeen=1; avSave(); drawRoom('magazzino'); avSpawn('magazzino'); await meAct('scared',1200);
    await avSay('voice', T('Dal buio, in fondo al magazzino, esce un ringhio. Un cane enorme, collare borchiato, targhetta "BRUTUS — proprietà di G.". Ha la bava e uno sguardo da assessore.','From the dark at the back of the warehouse comes a growl. A huge dog, studded collar, tag "BRUTUS — property of G.". Drooling, with a council-member stare.'));
    await me('Con quel cane lì davanti non mi avvicino alla cassa. Serve qualcosa che lo distragga. Qualcosa di carne. Molta carne.','With that dog there I\'m not going near the crate. I need something to distract him. Something meaty. Lots of meat.'); } } };
AV_ENTER.faroin={ x:70 };
function hook(){
  const redraw=()=>{ if (H.room==='magazzino'){ drawRoom('magazzino'); avSpawn('magazzino'); avRender(); } };
  const oW=AV_S['open:warehouse'];
  const enterW=async(...a)=>{ if (c1() && F().doorOpen){ await me('Entro nel magazzino.','I go into the warehouse.'); return avGoLater('magazzino'); } return oW(...a); };
  AV_S['open:warehouse']=enterW; AV_S['use:warehouse']=enterW;
  for (const k of ['use:warehouse:ascia','give:warehouse:polpette','use:warehouse:polpette']){ const o=AV_S[k]; if (o) AV_S[k]=async(...a)=>{ const r=await o(...a); redraw(); return r; }; }
  avOn('use:crate:ascia use:ascia:crate',()=>{ const f=F(); if (f.dogSeen && !f.dogFed && !f.receipt) return me('Alzo l\'ascia e Brutus si alza con me. Ha più denti lui che lama l\'ascia. Prima lo distraggo.','I raise the axe and Brutus rises with me. He has more teeth than the axe has blade. Distract him first.'); return AV_S['use:warehouse:ascia'](); });
  avOn('give:brutus:polpette use:brutus:polpette use:polpette:brutus give:polpette:brutus',()=>AV_S['give:warehouse:polpette']());
  const oL=AV_S['open:lhdoor'];
  window.__faroClimb=async()=>{ const f=F(); if (!avHas('enigma3')) return me('Centoquaranta gradini per niente? Prima trovo un motivo per salire. Un motivo bello grosso.','A hundred and forty steps for nothing? First I find a reason to climb. A big one.'); const r=await oL(); if (F().nestDone){ drawRoom('faroin'); avRender(); } return r; };
  const enterF=async(...a)=>{ const f=F(); if (c1() && (f.nestDone || f.gaveCoffee)){ return avGoLater('faroin'); } return oL(...a); };
  AV_S['open:lhdoor']=enterF; AV_S['use:lhdoor']=enterF;
  try{ ROOMS.magazzino={ name:'MAGAZZINO 7', cam:36, mx:82, my:48, mw:20, mh:20, out:1, locked:1, secret:1 }; ROOMS.faroin={ name:'FARO', cam:37, mx:82, my:48, mw:20, mh:20, out:1, locked:1, secret:1 }; }catch(e){ console.warn(e); }
}
if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',hook); else hook();

/* ---------- arte ---------- */
if (!window.AV_KIT || !window.AV_ART) return;
const {S,OL,ln,wob,box,F_,it,defs,stars,moon,glow,stains,planks,shadowE,fog}=AV_KIT;
const vign=`<rect width="480" height="300" fill="url(#a_vign)"/>`;
AV_ART.magazzino=()=>{ const R=S(401), f=F_(); let o=defs()+`<rect width="480" height="300" fill="#1a120c"/>`;
  o+=`<path d="M0 0 H480 V232 H0Z" fill="#3a2418"/>`+Array.from({length:12},(_,i)=>`<path d="M${i*44} 0 V232" stroke="#24160e" stroke-width="10"/>`).join('')+stains(0,0,480,232,R,16,'#000',.25);
  o+=`<path d="M0 40 H480 M0 44 H480" stroke="#4a3020" stroke-width="7"/>`+[80,240,400].map(x=>`<path d="M${x} 0 L${x-40} 40 M${x} 0 L${x+40} 40" stroke="#4a3020" stroke-width="5"/>`).join('');
  // luce dalla porta
  o+=`<path d="M10 120 L60 120 L280 300 L0 300Z" fill="#cfd6ff" opacity=".08"/><path d="${box(4,110,52,122,R,1)}" fill="#2a3a6a" ${ln(2)}/><path d="M8 114 h44 v114 h-44z" fill="url(#a_night)"/>${moon(30,140,5)}`;
  // scaffali coi mestoli (hotspot 150,120)
  o+=`<path d="${box(76,74,150,96,R,1)}" fill="#4a2e1a" ${ln(1.8)}/>`+[104,134,164].map(y=>`<path d="M78 ${y} H224" stroke="${OL}" stroke-width="3"/>`).join('')+Array.from({length:21},(_,i)=>{ const x=86+(i%7)*20, y=[100,130,160][Math.floor(i/7)]; return `<path d="M${x} ${y} l6 -18" stroke="${OL}" stroke-width="3"/><path d="M${x} ${y} l6 -18" stroke="#7a4a26" stroke-width="1.8"/><ellipse cx="${x-1}" cy="${y+1}" rx="4" ry="3" fill="#6b3a1e" ${ln(.8)}/>`; }).join('');
  // pile di casse sul fondo
  o+=[[250,150],[284,150],[267,118],[420,160],[454,160],[437,128],[437,96]].map(([x,y])=>`<path d="${box(x,y,32,32,R,1)}" fill="#8a5a33" ${ln(1.5)}/><path d="M${x+2} ${y+2} L${x+30} ${y+30} M${x+30} ${y+2} L${x+2} ${y+30}" stroke="#5a3720" stroke-width="2"/>`).join('');
  o+=`<rect y="232" width="480" height="68" fill="#2a1a10"/>`+planks(232,R,'#3e2618','#33200f')+`<path d="M0 232 H480" stroke="${OL}" stroke-width="2.5"/>`;
  // cassa inchiodata (hotspot 330,196)
  if (f.receipt) o+=`<g>${[[290,226],[312,214],[340,228],[364,218]].map(([x,y],i)=>`<path d="M${x} ${y} l26 ${i%2?-4:4}" stroke="${OL}" stroke-width="6"/><path d="M${x} ${y} l26 ${i%2?-4:4}" stroke="#a87a4a" stroke-width="4"/>`).join('')}</g>`;
  else o+=shadowE(330,232,50,5)+`<path d="${box(286,168,88,62,R,1.2)}" fill="#9a6a3a" ${ln(2)}/><path d="M286 186 H374 M286 210 H374" stroke="#5a3720" stroke-width="3"/>`+Array.from({length:8},(_,i)=>`<circle cx="${292+i*11}" cy="${172+(i%2)*54}" r="1.6" fill="#2a2e36"/>`).join('')+`<text x="330" y="202" text-anchor="middle" font-size="8" font-weight="700" fill="#3a1e0a" font-family="Fredoka, sans-serif">G. — ${it()?'RISERVATO':'PRIVATE'}</text>`;
  // Brutus
  if (f.dogSeen){ const sl=f.dogFed; o+=shadowE(250,236,40,4)+`<g transform="translate(250 222)">${sl?`<ellipse cx="0" cy="0" rx="34" ry="12" fill="#3a2a1e" ${ln(1.8)}/><circle cx="28" cy="-4" r="11" fill="#3a2a1e" ${ln(1.6)}/><path d="M24 -6 q4 2 8 0" stroke="#111" fill="none"/><text x="40" y="-16" font-size="9" fill="#fff" font-family="Fredoka, sans-serif">Z z z</text><path d="M-20 4 q-10 0 -16 -6" stroke="#3a2a1e" stroke-width="5" fill="none"/>`:`<path d="M-30 4 Q-34 -26 -6 -26 Q20 -28 26 -10 L30 6Z" fill="#3a2a1e" ${ln(1.8)}/><path d="M-26 6 v12 M-14 6 v12 M14 6 v12 M24 6 v12" stroke="${OL}" stroke-width="6"/><path d="M-26 6 v12 M-14 6 v12 M14 6 v12 M24 6 v12" stroke="#3a2a1e" stroke-width="4"/><circle cx="28" cy="-24" r="13" fill="#3a2a1e" ${ln(1.8)}/><path d="M34 -18 l12 2 l-10 6z" fill="#3a2a1e" ${ln(1.2)}/><circle cx="30" cy="-28" r="2" fill="#ff3b1c"/><path d="M36 -14 l2 4 l2 -4 l2 4" stroke="#fff" stroke-width="1.2" fill="none"/><path d="M18 -36 l-4 -8 l8 4z" fill="#3a2a1e" ${ln(1)}/><path d="M20 -14 h10" stroke="#c9a227" stroke-width="3"/>`}</g>`; }
  o+=`<path d="M240 0 V16" stroke="${OL}"/><circle cx="240" cy="22" r="6" fill="#ffe7a0" ${ln(1)}/>${glow(240,26,120,.7)}`+fog(220,R,'#d9c2a0',.06)+vign; return o; };
AV_ART.faroin=()=>{ const R=S(403), f=F_(); let o=defs()+`<rect width="480" height="300" fill="#2a2420"/>`;
  o+=Array.from({length:10},(_,r)=>Array.from({length:14},(_,c)=>{ const x=c*36+(r%2)*18-18, y=r*24; return `<path d="${wob([[x+2,y+2],[x+34,y+3],[x+33,y+22],[x+3,y+21]],R,2)}" fill="${R()<.5?'#e9e2cf':'#d9d0b8'}" stroke="#8a8270" stroke-width="1"/>`; }).join('')).join('')+`<rect width="480" height="232" fill="url(#a_shadeDown)" opacity=".5"/>`;
  // scala a chiocciola (hotspot 250,140)
  o+=`<path d="M250 0 V300" stroke="${OL}" stroke-width="12"/><path d="M250 0 V300" stroke="#6d7175" stroke-width="9"/>`;
  for (let i=0;i<14;i++){ const y=232-i*17, a=(i*0.9)%(Math.PI*2), dx=Math.cos(a)*70, front=Math.sin(a)>0; o+=`<path d="M250 ${y} L${250+dx} ${y-6} L${250+dx} ${y+2} L250 ${y+8}Z" fill="${front?'#8a5a33':'#5a3720'}" ${ln(1.2)}/><path d="M${250+dx} ${y-6} V${y-26}" stroke="${OL}" stroke-width="2"/>`; }
  o+=`<path d="M190 0 Q250 300 310 0" stroke="#3a3f4a" stroke-width="3" fill="none" opacity=".6"/>`;
  // oblò (hotspot 380,90)
  o+=`<circle cx="380" cy="90" r="24" fill="#6d7175" ${ln(2)}/><circle cx="380" cy="90" r="18" fill="url(#a_night)" ${ln(1.2)}/>${moon(386,84,4)}<path d="M366 76 l10 0" stroke="#fff" stroke-opacity=".3" stroke-width="3"/>`;
  // lampada a olio (hotspot 90,120)
  o+=`<path d="M78 140 h24 l-4 8 h-16z" fill="#c9a227" ${ln(1.2)}/><path d="M80 140 Q90 104 100 140Z" fill="#e9f1ff" opacity=".6" ${ln(1)}/><path d="M90 136 q-3 -6 0 -10 q3 4 0 10z" fill="#ffd166" class="aflk"/>${glow(90,128,90,1)}<path d="M90 100 V70" stroke="${OL}" stroke-width="1.6"/>`;
  o+=`<rect y="232" width="480" height="68" fill="#4a4036"/>`+Array.from({length:8},(_,i)=>`<path d="M${i*60} 232 L${240+(i*60-240)*1.7} 300" stroke="#000" stroke-opacity=".25"/>`).join('')+`<path d="M0 232 H480" stroke="${OL}" stroke-width="2.5"/>`;
  // diario di bordo (hotspot 400,200)
  o+=`<path d="${box(370,206,64,8,R,.8)}" fill="#5a3720" ${ln(1.4)}/><path d="M376 214 V232 M428 214 V232" stroke="${OL}" stroke-width="3"/><path d="M380 206 l2 -8 h30 l2 8z" fill="#7a1e1e" ${ln(1.2)}/><path d="M396 198 v8" stroke="#c9a227"/><path d="M420 206 v-12 h6 v12" fill="#e9e2cf" ${ln(.8)}/>`;
  // porta (hotspot 30,180)
  o+=`<path d="${box(6,120,50,112,R,1)}" fill="#3a2412" ${ln(2)}/><path d="M10 124 h42 v104 h-42z" fill="url(#a_night)" opacity=".9"/>`;
  if (f.nestDone) o+=`<path d="M300 0 q-4 20 8 30 q10 8 0 24" stroke="#111" stroke-width="2" fill="none"/><path d="M296 60 l6 -4 l6 4 l-6 2z" fill="#111"/>`;
  o+=vign; return o; };
})();
