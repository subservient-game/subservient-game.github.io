/* ================= INTERNI DELLE ZONE SECONDARIE (tutti i capitoli) =================
   Ogni "porta" (Apri sull'oggetto esterno) fa entrare in una stanza vera.
   Dentro, gli oggetti che contano rimandano agli stessi gestori della storia di fuori (fwd),
   così enigmi e indizi restano identici. */
(()=>{ if (!window.ADV) return;
const hs=(id,x,y,w,h,it,en,when)=>({id,x,y,w,h,n:[it,en],when});
const it=()=>LANG==='it';
const ALL=[1,2,3,4,5,6];
/* from: stanza esterna, hs: hotspot esterno, into: interno, ch: capitoli, when: si può entrare, door: x della porta fuori */
const DOORS=[
  {from:'porto', hs:'warehouse', into:'magazzino', ch:[1], when:()=>F().doorOpen},
  {from:'faro', hs:'lhdoor', into:'faroin', ch:[1], when:()=>F().nestDone||F().gaveCoffee},
  {from:'porto', hs:'warehouse', into:'magazzino', ch:[2,5,6]},
  {from:'faro', hs:'lhdoor', into:'faroin', ch:[2,5,6]},
  {from:'cimitero', hs:'crypt', into:'cripta', ch:[1,2,5,6]},
  {from:'faro', hs:'hut', into:'casetta', ch:[1,2,5,6]},
  {from:'porto', hs:'boat', into:'barca', ch:[1,2,5,6]},
  {from:'stazione', hs:'office', into:'biglietteria', ch:[2]},
  {from:'stazione', hs:'train', into:'littorina', ch:[2]},
  {from:'isola', hs:'relitto', into:'stiva', ch:[3], when:()=>F().baffoFree, no:['Dentro il relitto? Con Baffo incastrato sotto l\'albero maestro? Prima tiro fuori lui.','Inside the wreck? With Baffo pinned under the mast? Him first.']},
  {from:'isola', hs:'relitto', into:'stiva', ch:[4]},
  {from:'villaggio', hs:'capanna', into:'capanna3', ch:[3]},
  {from:'villaggio', hs:'capanna2', into:'cucinatribu', ch:[3]},
  {from:'vulcano', hs:'capanna', into:'capnonno', ch:[4]}
];
const PL={ cripta:['⚰️','Dentro la cappella','Inside the chapel'], casetta:['🐈','Casetta di Marisa','Marisa\'s hut'], barca:['⛵','A bordo del Baffo II','Aboard the Baffo II'],
  biglietteria:['🎫','Biglietteria','Ticket office'], littorina:['🚃','Dentro la Littorina','Inside the railcar'], stiva:['🪵','Dentro il relitto','Inside the wreck'],
  capanna3:['🛖','Dentro la capanna','Inside the hut'], cucinatribu:['🍲','Capanna della cucina','Kitchen hut'], capnonno:['🛖','Capanna del nonno','Grandpa\'s hut'] };
Object.assign(AV_PLACES,PL);
const EX=(x)=>hs('esci',x||30,176,50,120,'uscita','exit');
const HSI={
  cripta:[hs('altare',240,170,110,70,'altare','altar'), hs('sarcofago',380,210,110,50,'sarcofago','sarcophagus'), hs('vetrata',240,70,60,80,'vetrata','stained glass'), hs('lapide',110,120,60,50,'lapide','plaque'), EX()],
  casetta:[hs('gatti',330,210,160,50,'gatti','cats'), hs('poltrona',150,190,80,80,'poltrona','armchair'), hs('stufa',420,160,60,120,'stufa','stove'), hs('fotomur',260,100,90,50,'foto sul muro','photos on the wall'), EX()],
  barca:[hs('timone',300,170,70,90,'timone','wheel'), hs('reti',130,215,110,40,'reti','nets'), hs('cabina',420,170,70,110,'cabina','cabin'), hs('bandiera',230,50,50,40,'bandiera','flag'), EX(40)],
  biglietteria:[hs('sportello',250,150,150,90,'sportello','counter'), hs('orario',100,100,80,70,'orario dei treni','timetable'), hs('timbro',360,200,40,30,'obliteratrice','ticket stamper'), hs('cartelli',420,90,70,60,'oggetti smarriti','lost property'), EX()],
  littorina:[hs('leva',420,180,60,80,'posto del macchinista','driver\'s seat'), hs('giornale',220,200,70,30,'giornale','newspaper'), hs('sedili',260,180,180,60,'sedili','seats'), hs('finestrini',240,95,260,60,'finestrini','windows'), EX()],
  stiva:[hs('scafo',250,120,200,80,'scafo','hull'), hs('botti2',380,210,80,50,'botti','barrels'), hs('amacab',130,150,90,40,'amaca di Baffo','Baffo\'s hammock'), hs('acquas',240,250,200,30,'acqua','water'), EX()],
  capanna3:[hs('letto3',330,220,140,40,'letto di foglie','leaf bed'), hs('poster3',230,100,60,70,'poster','poster'), hs('maschere',400,100,80,60,'maschere','masks'), EX()],
  cucinatribu:[hs('pentola3',260,190,110,70,'pentolone','cauldron'), hs('spezie',400,110,80,60,'spezie','spices'), hs('teschi',110,110,70,50,'mestoli d\'osso','bone ladles'), EX()],
  capnonno:[hs('parete',260,110,150,80,'parete incisa','carved wall'), hs('mazzi',400,205,90,40,'mazzi di carte','card decks'), hs('fotonon',110,110,50,50,'foto della nonna','grandma\'s photo'), hs('lettonon',150,225,120,30,'letto di foglie','leaf bed'), EX()]
};
const FWD={ cripta:{altare:'crypt'}, barca:{timone:'boat'}, biglietteria:{sportello:'office'}, littorina:{leva:'train'}, stiva:{scafo:'relitto'}, capanna3:{poster3:'capanna'}, cucinatribu:{pentola3:'capanna2'}, capnonno:{parete:'capanna'} };
Object.assign(AV_HS,HSI);
for (const n of [3,4,5,6]){ const C=avChapter(n); Object.assign(C.HS,HSI); for (const r in PL) C.ENTER[r]=C.ENTER[r]||{x:70}; }
for (const r in PL){ AV_ENTER[r]=AV_ENTER[r]||{x:70}; AV_ENTER2[r]=AV_ENTER2[r]||{x:70}; }
for (const r of ['magazzino','faroin']){ AV_ENTER2[r]=AV_ENTER2[r]||{x:70}; for (const n of [5,6]){ const C=avChapter(n); C.ENTER[r]=C.ENTER[r]||{x:70}; } }
['use:exitw','open:exitw','walk:exitw','use:exitf','open:exitf','walk:exitf','use:stairs','open:stairs','take:stairs'].forEach(k=>AV_ALLCH.add(k));
window.AV_DOORS=DOORS;
/* ---------- battute degli oggetti interni ---------- */
const L=(k,i,e)=>avOn(k,()=>me(i,e));
const say=(keys,i,e)=>{ avOn(keys,()=>me(i,e)); for (const n of [2,3,4,5,6]) avOnN(n,keys,()=>me(i,e)); };
say('look:sarcofago','Il sarcofago del bisnonno Pappalardo. Sopra c\'è scritto "Onesto". È l\'unica bugia scolpita nel marmo che abbia mai visto.','Great-grandpa Pappalardo\'s sarcophagus. It says "Honest". The only lie carved in marble I\'ve ever seen.');
say('open:sarcofago use:sarcofago take:sarcofago','Aprire il sarcofago? Se dentro c\'è un Pappalardo, mi chiede un voto. Anche da morto.','Open the sarcophagus? If there\'s a Pappalardo inside he\'ll ask for my vote. Even dead.');
say('look:vetrata','Una vetrata colorata con San Pippi che moltiplica le monete. Nel Vangelo erano pani. Qui hanno aggiornato.','A stained glass window of Saint Pippi multiplying coins. In the Gospel it was bread. They updated it here.');
say('look:lapide','"Famiglia Pappalardo. Sindaci da cinque generazioni. Eletti da sei." Il conto non torna. Come sempre col sindaco.','"Pappalardo family. Mayors for five generations. Elected for six." The maths doesn\'t add up. As usual with the mayor.');
say('look:gatti','Una marea di gatti. Mi fissano tutti. Uno ha la faccia di mio zio. Anche lui fissava così prima di chiedere soldi.','A sea of cats. All staring. One has my uncle\'s face. He stared like that too before asking for money.');
say('take:gatti use:gatti','Ne accarezzo uno. Gli altri si offendono. Ora ho una decina di nemici e un amico con le pulci.','I pet one. The others take offence. Now I have a dozen enemies and one friend with fleas.');
say('look:poltrona','La poltrona di Marisa. Ha la forma esatta di Marisa. Se mi ci siedo, la poltrona mi rifiuta.','Marisa\'s armchair. Exactly Marisa-shaped. If I sit in it, it rejects me.');
say('use:poltrona','Mi siedo. Sento un gatto sotto il cuscino. Il gatto sente me. Ci separiamo in pace e con un graffio.','I sit. There\'s a cat under the cushion. The cat notices me. We part in peace and with a scratch.');
say('look:stufa','Una stufa a legna con sopra una moka grande come un secchio. Marisa non beve caffè: lo assume per via endovenosa.','A wood stove with a moka pot the size of a bucket. Marisa doesn\'t drink coffee: she takes it intravenously.');
say('look:fotomur','Foto di Marisa giovane col guardiano del faro. Lui sorride. Lei no. In tutte. Anche al matrimonio.','Photos of young Marisa with the lighthouse keeper. He smiles. She doesn\'t. In all of them. Even the wedding.');
say('look:reti','Reti da pesca piene di nodi. Baffo dice che sono nodi marinari. Io dico che sono nodi di disperazione.','Fishing nets full of knots. Baffo says sailor\'s knots. I say knots of despair.');
say('take:reti use:reti','Provo a districarle. Dopo un minuto sono io quello incastrato. Baffo, se mi vedi, non ridere.','I try to untangle them. A minute later I\'m the one tangled. Baffo, if you see me, don\'t laugh.');
say('look:cabina','La cabina di Baffo: una branda, una radio e trenta stecche di sigarette "per uso personale". È un uomo molto personale.','Baffo\'s cabin: a bunk, a radio and thirty cartons of cigarettes "for personal use". He\'s a very personal man.');
say('open:cabina use:cabina','Chiusa con un lucchetto e un cartello: "Finanza: qui dentro solo calzini". Credo ai calzini quanto credo al sindaco.','Padlocked, with a sign: "Tax police: only socks in here". I believe in the socks as much as in the mayor.');
say('look:bandiera','Una bandiera con un baffo disegnato sopra. Non è la bandiera di nessuno stato. Baffo dice che è la sua repubblica.','A flag with a moustache drawn on it. Not any country\'s flag. Baffo says it\'s his republic.');
say('look:orario','Orario ferroviario: "Prossimo treno: quando il capostazione si sveglia". È fermo dal 1987.','Train timetable: "Next train: when the stationmaster wakes up". Stopped since 1987.');
say('look:timbro use:timbro','L\'obliteratrice. La provo sulla mano: ora ho il biglietto timbrato sulla pelle. Valido per una corsa, mai fatta.','The ticket stamper. I try it on my hand: now my skin is a validated ticket. Good for one ride, never taken.');
say('look:cartelli','Oggetti smarriti dal 1987: un ombrello, una dentiera, un cuore spezzato in una scatola di scarpe. Remo dice che è suo.','Lost property since 1987: an umbrella, dentures, a broken heart in a shoebox. Remo says it\'s his.');
say('take:cartelli','Rubare negli oggetti smarriti è rubare due volte. Una a chi li ha persi, una a Remo. Remo ha già sofferto.','Stealing from lost property is stealing twice. Once from the loser, once from Remo. Remo has suffered enough.');
say('look:giornale','Il giornale del 1987: "Sagra del Pippi, il Mestolo d\'Oro mai così lucido". Nella foto, dietro al sindaco, c\'è un uomo con un mantello nero. Nessuno se n\'era accorto.','The 1987 paper: "Pippi Festival, the Golden Ladle never so shiny". In the photo, behind the mayor, a man in a black cloak. Nobody noticed.');
say('take:giornale','Il giornale si sbriciola appena lo tocco. Come la reputazione del sindaco.','The paper crumbles as I touch it. Like the mayor\'s reputation.');
say('look:sedili use:sedili','Sedili di finta pelle. Mi siedo: fanno un rumore imbarazzante. Giuro che è il sedile.','Fake leather seats. I sit: they make an embarrassing noise. I swear it\'s the seat.');
say('look:finestrini','Dal finestrino si vede la stazione, la notte e il mio riflesso. Il riflesso ha l\'aria di chi non sa cosa sta facendo. Ha ragione.','Through the window: the station, the night and my reflection. The reflection looks like it doesn\'t know what it\'s doing. It\'s right.');
say('look:botti2','Botti di rum di Baffo, sfondate. Il rum se l\'è bevuto il mare. O Baffo. Più probabilmente Baffo.','Baffo\'s rum barrels, staved in. The sea drank the rum. Or Baffo. Probably Baffo.');
say('look:amacab use:amacab','L\'amaca di Baffo, ancora appesa storta. Ci dormiva mentre la barca affondava. Uomo dal sonno profondo e dalla coscienza pure.','Baffo\'s hammock, still hanging crooked. He slept in it while the boat sank. Deep sleeper. Deep conscience too.');
say('look:acquas','Acqua di mare fino alle caviglie, con un granchio che mi guarda male. Siamo in casa sua.','Seawater up to my ankles, and a crab giving me a dirty look. It\'s his house now.');
say('look:letto3 use:letto3','Un letto di foglie di banano. Mi sdraio: è più comodo del mio materasso. Questo dice molto del mio materasso.','A bed of banana leaves. I lie down: comfier than my mattress. That says a lot about my mattress.');
say('look:maschere','Maschere di legno con facce arrabbiate. Una somiglia a mia suocera. Non la tocco: potrebbe essere lei.','Wooden masks with angry faces. One looks like my mother-in-law. Not touching it: could be her.');
say('look:spezie','Spezie appese in mazzetti. Una puzza di piedi. Il cuoco dice che è la più preziosa. Ha ragione: i piedi sono preziosi.','Spices hung in bunches. One smells of feet. The cook says it\'s the most precious. Fair: feet are precious.');
say('take:spezie','Ne prendo un pizzico e starnutisco per un minuto. Il villaggio applaude. Credono sia un rito.','I take a pinch and sneeze for a minute. The village applauds. They think it\'s a ritual.');
say('look:teschi','Mestoli fatti di osso. Di cosa, non chiedo. Il cuoco mi sorride troppo.','Ladles made of bone. Of what, I don\'t ask. The cook smiles at me too much.');
say('look:mazzi','Quaranta mazzi di carte consumati fino al bianco. Il nonno ci ha giocato da solo per anni. E ha barato. Da solo.','Forty decks worn white. Grandpa played alone for years. And cheated. Alone.');
say('take:mazzi','Il nonno mi ha detto che se tocco i suoi mazzi mi taglia le dita. Le dita mi servono per barare. Lascio stare.','Grandpa said if I touch his decks he\'ll cut my fingers off. I need my fingers to cheat. I\'ll leave them.');
say('look:fotonon','La foto della nonna con le corna disegnate a carboncino. Sotto: "Ti amo lo stesso". Amore vero, versione Pappalardo.','Grandma\'s photo with charcoal horns. Below: "I love you anyway". True love, Pappalardo edition.');
say('look:lettonon use:lettonon','Il letto del nonno. Sotto c\'è un mazzo di assi. Solo assi. Ora capisco come vinceva.','Grandpa\'s bed. Under it, a deck of aces. Only aces. Now I see how he won.');
/* ---------- entrare, inoltrare, uscire ---------- */
const prefKey=(v,id)=>{ const n=CHN(); return (n>1&&AV_S['c'+n+'|'+v+':'+id])||AV_S[v+':'+id]; };
const DOOR_BY={}; for (const r in PL) DOOR_BY[r]=DOORS.filter(d=>d.into===r);
window.avWalkTo=(t,sp)=>{ if (AV.busy || AV.dlg) return; const isDoor=x=>x && x.type==='hs' && (['esci','exitw','exitf'].includes(x.id) || DOORS.some(d=>d.from===H.room && d.hs===x.id && d.ch.includes(CHN())));
  if (!isDoor(t) && sp){ const h=avHsList().find(h=>Math.abs(sp.x-h.x)<=h.w/2+6 && Math.abs(sp.y-h.y)<=h.h/2+6 && isDoor({type:'hs',id:h.id})); if (h) t={type:'hs',id:h.id,n:h.n,x:h.x}; }
  if (isDoor(t)) avDo('walk',t,null); };
window.avDoorAt=(sp)=>{ const isD=id=>['esci','exitw','exitf'].includes(id) || DOORS.some(d=>d.from===H.room && d.hs===id && d.ch.includes(CHN())); const h=avHsList().find(h=>Math.abs(sp.x-h.x)<=h.w/2+6 && Math.abs(sp.y-h.y)<=h.h/2+6 && isD(h.id)); return h?{type:'hs',id:h.id,n:h.n,x:h.x}:null; };
async function leave(){ const d=DOOR_BY[H.room].find(x=>x.ch.includes(CHN()))||DOOR_BY[H.room][0]; const back=d.from;
  const t=setInterval(async()=>{ if (AV.busy||AV.dlg) return; clearInterval(t); await avGo(back); const h=avHsList().find(x=>x.id===d.hs); if (h){ H.X=clamp(h.x+(h.x>240?-40:40),40,440); camX=H.X; avRender(); } },80); }
const oDo=window.avDo;
window.avDo=async function(verb,t,item){
  if (t && t.type==='hs'){
    if (PL[H.room]){
      if (t.id==='esci' && verb==='look') return me('Da lì si esce.','That\'s the way out.');
      if (t.id==='esci') return leave();
      const fw=FWD[H.room]&&FWD[H.room][t.id]; if (fw) return oDo.call(this,verb,{...t,id:fw},item);
    }
    if (H.room==='magazzino' && CHN()>1 && t.id==='ladles' && verb!=='look') return oDo.call(this,verb,{...t,id:'warehouse'},item);
    if (PL[H.room]){
    }
    if ((verb==='open' || verb==='walk' || verb==='use') && !item){ const d=DOORS.find(d=>d.from===H.room && d.hs===t.id && d.ch.includes(CHN()));
      if (d){ if (!d.when||d.when()) return avGoLater(d.into);
        if (verb==='walk') return;
        if (prefKey(verb,t.id)) return oDo.call(this,verb,t,item);
        return me(...(d.no||['Non si entra. Per ora.','Can\'t go in. Not yet.'])); } }
  }
  return oDo.apply(this,arguments); };
function hook(){ try{ for (const r in PL) ROOMS[r]={ name:PL[r][1].toUpperCase(), cam:38, mx:82, my:48, mw:20, mh:20, out:1, locked:1, secret:1 }; }catch(e){ console.warn(e); } }
if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',hook); else hook();
/* ---------- arte ---------- */
if (!window.AV_KIT || !window.AV_ART) return;
const {S,OL,ln,wob,box,F_,defs,stars,moon,glow,stains,planks,shadowE,fog,cat}=AV_KIT;
const V=`<rect width="480" height="300" fill="url(#a_vign)"/>`;
const floorStone=(R,c='#3a3540')=>`<rect y="232" width="480" height="68" fill="${c}"/>`+Array.from({length:7},(_,i)=>`<path d="M${i*80} 232 L${240+(i*80-240)*1.8} 300" stroke="#000" stroke-opacity=".3"/>`).join('')+`<path d="M0 252 H480 M0 276 H480" stroke="#000" stroke-opacity=".2"/><path d="M0 232 H480" stroke="${OL}" stroke-width="2.5"/>`;
const doorL=(R,c='#3a2412')=>`<path d="${box(6,120,50,112,R,1)}" fill="${c}" ${ln(2)}/><path d="M10 124 h42 v104 h-42z" fill="url(#a_night)" opacity=".9"/>`;
const stoneWall=(R,a='#5a5560',b='#4c4752')=>Array.from({length:10},(_,r)=>Array.from({length:14},(_,c)=>{ const x=c*36+(r%2)*18-18, y=r*24; return `<path d="${wob([[x+2,y+2],[x+34,y+3],[x+33,y+22],[x+3,y+21]],R,2)}" fill="${R()<.5?a:b}" stroke="#2a2630" stroke-width="1"/>`; }).join('')).join('');
const candle=(x,y,h=18)=>`<path d="M${x-3} ${y} v-${h} h6 v${h}z" fill="#f4ecd8" ${ln(1)}/><path d="M${x} ${y-h-2} q-3 -6 0 -10 q3 4 0 10z" fill="#ffd166" class="aflk"/>${glow(x,y-h-6,40,.9)}`;
const strawWall=(R,base)=>`<rect width="480" height="232" fill="${base}"/>`+Array.from({length:90},()=>{ const x=R()*480, y=R()*232; return `<path d="M${x.toFixed(0)} ${y.toFixed(0)} l${(R()*8-4).toFixed(1)} 26" stroke="#000" stroke-opacity=".18" stroke-width="2"/>`; }).join('')+Array.from({length:6},(_,i)=>`<path d="M${i*96} 0 L${i*96+30} 232" stroke="#5a3a1a" stroke-width="9"/>`).join('');
const ART=AV_ART;
ART.cripta=()=>{ const R=S(501), f=F_(); let o=defs()+`<rect width="480" height="300" fill="#24202a"/>`+stoneWall(R,'#4a4552','#3f3a48');
  o+=`<path d="M200 20 h80 v100 q-40 -30 -80 0z" fill="#2a2230" ${ln(2)}/>`+[['#c0392b',210,40],['#2b6cb0',240,30],['#e0b23a',260,50],['#2f855a',220,70],['#8e44ad',250,80]].map(([c,x,y])=>`<path d="M${x} ${y} l14 0 l-4 16 l-14 0z" fill="${c}" opacity=".85" ${ln(1)}/>`).join('')+`<path d="M200 120 L150 232 L330 232 L280 120Z" fill="#ffe7a0" opacity=".07"/>`;
  o+=`<path d="${box(180,150,120,24,R,1)}" fill="#cfc6b4" ${ln(2)}/><path d="${box(190,174,100,58,R,1)}" fill="#b7ad9a" ${ln(2)}/><path d="M222 196 h36 M240 182 v30" stroke="#8a806e" stroke-width="4"/>`+candle(196,150)+candle(284,150)+`<path d="M232 150 l8 -14 l8 14z" fill="#c9a227" ${ln(1)}/>`;
  o+=`<path d="${box(80,100,60,40,R,1)}" fill="#8a8270" ${ln(1.6)}/><path d="M90 112 h40 M90 120 h34 M90 128 h38" stroke="#4a4436" stroke-width="2"/>`;
  o+=floorStone(R,'#36313c')+shadowE(380,236,60,5)+`<path d="${box(330,192,104,40,R,1.2)}" fill="#9a9284" ${ln(2)}/><path d="${wob([[326,192],[438,192],[430,176],[334,176]],R,1)}" fill="#b4ac9c" ${ln(2)}/><text x="382" y="216" text-anchor="middle" font-size="9" font-weight="700" fill="#4a4436" font-family="Fredoka, sans-serif">${it()?'ONESTO':'HONEST'}</text>`;
  o+=doorL(R,'#2a2230')+fog(220,R,'#9fb3d9',.07)+V; return o; };
ART.casetta=()=>{ const R=S(503); let o=defs()+`<rect width="480" height="232" fill="#6a4a3a"/>`+Array.from({length:16},(_,i)=>`<path d="M${i*30} 0 V232" stroke="#5a3c2e" stroke-width="2"/>`).join('')+stains(0,0,480,232,R,14,'#000',.15);
  o+=`<path d="${box(214,74,96,56,R,1)}" fill="#3a2a20" ${ln(1.6)}/>`+[[220,80,'#d9c9a8'],[250,80,'#cdbd98'],[280,80,'#e0d0ae'],[226,104,'#d0c09c'],[266,104,'#dcccaa']].map(([x,y,c])=>`<rect x="${x}" y="${y}" width="24" height="20" fill="${c}" ${ln(1)}/><circle cx="${x+12}" cy="${y+10}" r="4" fill="#7a6a5a"/>`).join('');
  o+=`<path d="M380 0 V50" stroke="${OL}" stroke-width="10"/><path d="${box(392,100,56,132,R,1)}" fill="#2e3036" ${ln(2)}/><path d="M402 140 h36 v40 h-36z" fill="#ff8a3d" opacity=".85" class="aflk" ${ln(1.4)}/>${glow(420,160,90,.8)}<path d="M398 90 l12 -18 h20 l12 18z" fill="#8a8e96" ${ln(1.4)}/><path d="M404 72 l6 -20 h12 l4 20" fill="#b8bcc4" ${ln(1.4)}/>`;
  o+=`<path d="${box(30,40,70,60,R,1)}" fill="url(#a_night)" ${ln(2)}/>${moon(70,60,5)}<path d="M65 40 v60 M30 70 h70" stroke="${OL}" stroke-width="3"/>`+cat(46,98)+cat(78,98);
  o+=`<rect y="232" width="480" height="68" fill="#4a3022"/>`+planks(232,R,'#5a3a26','#4a2e1c')+`<path d="M0 232 H480" stroke="${OL}" stroke-width="2.5"/><ellipse cx="250" cy="262" rx="120" ry="18" fill="#8a2e2e" opacity=".8"/>`;
  o+=shadowE(150,236,50,5)+`<path d="${wob([[112,236],[112,170],[124,150],[176,150],[188,170],[188,236]],R,1.2)}" fill="#6b3a5a" ${ln(2)}/><path d="M118 196 h64 v24 h-64z" fill="#7d4a6a" ${ln(1.4)}/>`+cat(140,196);
  for (let i=0;i<9;i++) o+=cat(262+i*16+(R()*8-4)|0, 236-(i%3)*6);
  o+=doorL(R)+V; return o; };
ART.barca=()=>{ const R=S(505); let o=defs()+`<rect width="480" height="300" fill="url(#a_night)"/>`+stars(R,50,120)+moon(380,40,11)+`<rect y="150" width="480" height="90" fill="#1d2a5a"/>`+Array.from({length:8},(_,i)=>`<path d="M${R()*480} ${160+i*9} q20 -4 40 0" stroke="#9fb3d9" stroke-opacity=".3" fill="none"/>`).join('');
  o+=`<path d="M230 20 V232" stroke="${OL}" stroke-width="9"/><path d="M230 20 V232" stroke="#7a4a26" stroke-width="6"/><path d="M234 30 l40 10 l-40 12z" fill="#e9e2cf" ${ln(1.4)}/><path d="M246 38 q6 -4 12 0" stroke="#111" stroke-width="2" fill="none"/>`;
  o+=`<path d="M0 160 H480" stroke="${OL}" stroke-width="3"/><path d="M0 166 H480" stroke="#8a5a33" stroke-width="6"/>`+Array.from({length:12},(_,i)=>`<path d="M${i*44+10} 166 V200" stroke="#6b4226" stroke-width="5"/>`).join('');
  o+=`<rect y="200" width="480" height="100" fill="#6b4226"/>`+planks(200,R,'#7a4e2c','#6a4226')+`<path d="M0 200 H480" stroke="${OL}" stroke-width="2.5"/>`;
  o+=`<path d="${box(384,110,84,122,R,1)}" fill="#5a3a20" ${ln(2)}/><path d="M396 130 h24 v30 h-24z" fill="#ffd166" opacity=".7" ${ln(1.2)}/><path d="${box(426,150,30,82,R,1)}" fill="#3a2412" ${ln(1.6)}/><circle cx="450" cy="190" r="3" fill="#c9a227"/>`;
  o+=`<path d="M300 232 V170" stroke="${OL}" stroke-width="6"/><circle cx="300" cy="160" r="26" fill="none" stroke="${OL}" stroke-width="7"/><circle cx="300" cy="160" r="26" fill="none" stroke="#8a5a33" stroke-width="4"/>`+Array.from({length:8},(_,i)=>{ const a=i*Math.PI/4; return `<path d="M300 160 L${300+Math.cos(a)*34} ${160+Math.sin(a)*34}" stroke="${OL}" stroke-width="4"/><path d="M300 160 L${300+Math.cos(a)*34} ${160+Math.sin(a)*34}" stroke="#a87a4a" stroke-width="2"/>`; }).join('');
  o+=`<path d="${wob([[70,236],[90,200],[190,206],[200,236]],R,3)}" fill="#7a8a6a" ${ln(1.6)}/>`+Array.from({length:10},(_,i)=>`<path d="M${80+i*12} 206 L${84+i*12} 236 M74 ${212+i*3} H196" stroke="#4a5a3a" stroke-width="1"/>`).join('');
  o+=`<path d="${box(10,150,40,82,R,1)}" fill="#3a2412" ${ln(1.6)}/><path d="M14 160 h32 v18 h-32z" fill="url(#a_night)"/>`+V; return o; };
ART.biglietteria=()=>{ const R=S(507); let o=defs()+`<rect width="480" height="232" fill="#c9b98e"/><rect y="150" width="480" height="82" fill="#7a5a3a"/>`+stains(0,0,480,232,R,18,'#5a4020',.15);
  o+=`<path d="${box(160,96,180,56,R,1)}" fill="#9fc2d0" opacity=".55" ${ln(2)}/><path d="M250 96 V152" stroke="${OL}" stroke-width="2"/><path d="M200 140 h100 v12 h-100z" fill="#2a2a2a" opacity=".4"/>`;
  o+=`<path d="${box(150,152,200,80,R,1)}" fill="#6b4a2c" ${ln(2)}/><path d="M156 160 h188" stroke="#4a3018" stroke-width="3"/><path d="${box(200,110,40,26,R,.8)}" fill="#c9a26a" ${ln(1.4)}/><path d="M200 120 h40 M220 110 v26" stroke="#8a5a2a" stroke-width="2"/>`;
  o+=`<path d="${box(64,66,72,70,R,1)}" fill="#f4ecd8" ${ln(1.6)}/>`+Array.from({length:7},(_,i)=>`<path d="M70 ${76+i*8} h${30+R()*30}" stroke="#4a4436" stroke-width="2"/>`).join('')+`<text x="100" y="62" text-anchor="middle" font-size="9" font-weight="700" fill="#3a2a10" font-family="Fredoka, sans-serif">${it()?'ORARIO':'TIMETABLE'}</text>`;
  o+=`<path d="M352 190 h20 v42 h-20z" fill="#c0392b" ${ln(1.4)}/><path d="M348 182 h28 v10 h-28z" fill="#8a8e96" ${ln(1.2)}/>`;
  o+=`<path d="${box(386,60,80,76,R,1)}" fill="#5a3a20" ${ln(1.6)}/><path d="M392 84 h68 M392 110 h68" stroke="#3a2412" stroke-width="3"/><path d="M398 72 l10 -8 l6 12z" fill="#2b6cb0" ${ln(1)}/><circle cx="440" cy="76" r="6" fill="#e9e2cf" ${ln(1)}/><path d="M400 102 h20 v8 h-20z" fill="#c9a26a" ${ln(1)}/><path d="M432 96 q8 -8 16 0 q-8 10 -16 0z" fill="#d64545" ${ln(1)}/>`;
  o+=`<path d="M250 0 V20" stroke="${OL}"/><path d="M236 20 h28 l-6 10 h-16z" fill="#2e3036" ${ln(1)}/>${glow(250,40,110,.7)}`;
  o+=floorStone(R,'#6a6058')+doorL(R)+V; return o; };
ART.littorina=()=>{ const R=S(509); let o=defs()+`<rect width="480" height="232" fill="#3a6a5a"/><rect y="0" width="480" height="40" fill="#e9e2cf"/><path d="M0 40 H480" stroke="${OL}" stroke-width="2"/>`;
  o+=Array.from({length:4},(_,i)=>`<path d="${box(110+i*92,64,76,64,R,1)}" fill="url(#a_night)" ${ln(2)}/><path d="M${116+i*92} 70 l20 0" stroke="#fff" stroke-opacity=".25" stroke-width="3"/>`).join('')+moon(300,86,4);
  for (let i=0;i<3;i++){ const x=120+i*110; o+=shadowE(x+40,236,44,4)+`<path d="${box(x,150,90,30,R,1)}" fill="#a83a2a" ${ln(1.6)}/><path d="${box(x,132,18,62,R,1)}" fill="#b84a3a" ${ln(1.6)}/><path d="M${x+20} 196 V232 M${x+80} 196 V232" stroke="${OL}" stroke-width="4"/>`; }
  o+=`<path d="${box(200,196,50,8,R,.6)}" fill="#e9e2cf" ${ln(1)}/><path d="M206 200 h38" stroke="#4a4436"/>`;
  o+=`<path d="${box(400,110,76,122,R,1)}" fill="#2e3036" ${ln(2)}/><circle cx="420" cy="138" r="10" fill="#e9e2cf" ${ln(1.2)}/><path d="M420 138 l6 -4" stroke="#c0392b" stroke-width="2"/><circle cx="448" cy="138" r="10" fill="#e9e2cf" ${ln(1.2)}/><path d="M440 190 l14 -30" stroke="${OL}" stroke-width="6"/><path d="M440 190 l14 -30" stroke="#8a8e96" stroke-width="3"/><circle cx="454" cy="160" r="5" fill="#c0392b" ${ln(1)}/>`;
  o+=`<rect y="232" width="480" height="68" fill="#4a4a4a"/>`+Array.from({length:24},(_,i)=>`<path d="M${i*20} 240 h10" stroke="#333" stroke-width="3"/>`).join('')+`<path d="M0 232 H480" stroke="${OL}" stroke-width="2.5"/>`+Array.from({length:6},(_,i)=>`<path d="M${60+i*80} 40 v12" stroke="#c9a227" stroke-width="2"/><circle cx="${60+i*80}" cy="56" r="4" fill="#ffe7a0"/>`).join('');
  o+=doorL(R,'#2a4a3a')+V; return o; };
ART.stiva=()=>{ const R=S(511); let o=defs()+`<rect width="480" height="300" fill="#1a1612"/>`;
  o+=Array.from({length:11},(_,i)=>`<path d="${wob([[-20,20+i*22],[500,i*22-10],[500,i*22+10],[-20,40+i*22]],R,2)}" fill="${i%2?'#5a3a20':'#4a2e18'}" ${ln(1.2)}/>`).join('');
  o+=[90,250,410].map(x=>`<path d="M${x} 0 Q${x+20} 120 ${x-10} 240" stroke="${OL}" stroke-width="14" fill="none"/><path d="M${x} 0 Q${x+20} 120 ${x-10} 240" stroke="#3a2412" stroke-width="10" fill="none"/>`).join('');
  o+=`<path d="M300 0 L330 0 L390 240 L250 240Z" fill="#ffe7a0" opacity=".12"/><path d="${wob([[296,0],[336,0],[330,22],[300,18]],R,3)}" fill="url(#a_night)"/>`;
  o+=`<path d="M90 140 Q130 170 170 140" stroke="#c9b98e" stroke-width="10" fill="none"/><path d="M90 140 Q130 170 170 140" stroke="${OL}" stroke-width="1.5" fill="none"/><path d="M90 140 L80 100 M170 140 L180 100" stroke="${OL}" stroke-width="2"/>`;
  o+=`<rect y="232" width="480" height="68" fill="#24303a"/>`+Array.from({length:10},(_,i)=>`<path d="M${R()*480} ${240+i*6} q20 -3 40 0" stroke="#9fb3d9" stroke-opacity=".35" fill="none"/>`).join('')+`<path d="M0 232 H480" stroke="${OL}" stroke-width="2"/>`;
  o+=[[360,196],[396,204]].map(([x,y])=>`<path d="${wob([[x,y],[x+30,y],[x+34,y+36],[x-4,y+36]],R,1.5)}" fill="#7a4e2c" ${ln(1.6)}/><path d="M${x-2} ${y+12} h34 M${x-3} ${y+26} h36" stroke="#2a2e36" stroke-width="3"/>`).join('');
  o+=`<g transform="translate(240 258)"><ellipse rx="8" ry="5" fill="#d64545" ${ln(1)}/><path d="M-8 -2 l-6 -6 M8 -2 l6 -6" stroke="#d64545" stroke-width="2.5"/><circle cx="-3" cy="-5" r="1.4" fill="#111"/><circle cx="3" cy="-5" r="1.4" fill="#111"/></g>`;
  o+=`<path d="${wob([[4,120],[56,126],[56,232],[4,232]],R,3)}" fill="#0b1030" ${ln(2)}/>`+fog(230,R,'#9fb3d9',.08)+V; return o; };
const hutInside=(R,base)=>{ let o=defs()+strawWall(R,base)+`<path d="M0 0 L240 -40 L480 0" fill="none"/>`;
  o+=`<rect y="232" width="480" height="68" fill="#7a5a3a"/>`+Array.from({length:40},()=>`<path d="M${(R()*480).toFixed(0)} ${(236+R()*60).toFixed(0)} l${(R()*16-8).toFixed(0)} 2" stroke="#5a3a1a" stroke-width="2"/>`).join('')+`<path d="M0 232 H480" stroke="${OL}" stroke-width="2.5"/>`;
  o+=`<path d="${wob([[4,232],[4,130],[30,112],[56,130],[56,232]],R,2)}" fill="#0b1030" ${ln(2)}/>`; return o; };
ART.capanna3=()=>{ const R=S(513); let o=hutInside(R,'#b08a4a');
  o+=`<path d="${box(204,62,56,76,R,1)}" fill="#f4ecd8" ${ln(1.6)}/><circle cx="232" cy="88" r="12" fill="#eab48a" ${ln(1)}/><path d="M218 82 q14 -22 28 0" fill="#3a2010"/><path d="M216 110 h32 v20 h-32z" fill="#d64545"/><text x="232" y="134" text-anchor="middle" font-size="6" fill="#3a2010" font-family="Fredoka, sans-serif">TOUR '85</text>`;
  o+=[[370,80,'#c0392b'],[410,90,'#2f855a'],[440,74,'#e0b23a']].map(([x,y,c])=>`<path d="${wob([[x-14,y-18],[x+14,y-18],[x+12,y+16],[x,y+24],[x-12,y+16]],R,1.5)}" fill="${c}" ${ln(1.6)}/><path d="M${x-7} ${y-4} h5 M${x+2} ${y-4} h5" stroke="#111" stroke-width="3"/><path d="M${x-6} ${y+8} q6 -6 12 0" stroke="#111" stroke-width="2" fill="none"/>`).join('');
  o+=shadowE(330,240,80,5)+`<path d="${wob([[260,240],[270,212],[396,212],[404,240]],R,3)}" fill="#3f7a3a" ${ln(1.8)}/>`+Array.from({length:8},(_,i)=>`<path d="M${272+i*16} 214 q8 10 0 24" stroke="#2a5a26" stroke-width="2" fill="none"/>`).join('');
  o+=`<circle cx="140" cy="60" r="6" fill="#ffd166"/>${glow(140,60,80,.7)}`+V; return o; };
ART.cucinatribu=()=>{ const R=S(515); let o=hutInside(R,'#a07a3e');
  o+=`<path d="${wob([[200,240],[214,206],[306,206],[320,240]],R,2)}" fill="#3a3a3a"/>`+[214,240,266,292].map(x=>`<path d="M${x} 236 q6 -24 12 0" fill="#ff8a3d" class="aflk"/>`).join('')+glow(260,226,110,.9);
  o+=`<path d="${wob([[214,206],[306,206],[296,150],[224,150]],R,2)}" fill="#2a2e36" ${ln(2)}/><ellipse cx="260" cy="152" rx="38" ry="8" fill="#8aa04a" ${ln(1.4)}/><circle cx="250" cy="150" r="4" fill="#c7d97a"/><circle cx="268" cy="153" r="3" fill="#c7d97a"/><path d="M240 140 q-6 -14 4 -24 M262 138 q8 -16 -2 -28" stroke="#fff" stroke-opacity=".35" stroke-width="4" fill="none" class="drift"/>`;
  o+=Array.from({length:6},(_,i)=>`<path d="M${370+i*16} 80 v${20+i%3*8}" stroke="#5a3a1a" stroke-width="2"/><ellipse cx="${370+i*16}" cy="${104+i%3*8}" rx="6" ry="12" fill="${['#c0392b','#2f855a','#e0b23a','#8e44ad','#d97a2a','#6b8e23'][i]}" ${ln(1)}/>`).join('');
  o+=[90,112,134].map(x=>`<path d="M${x} 90 l4 30" stroke="#e9e2cf" stroke-width="4"/><ellipse cx="${x}" cy="88" rx="7" ry="5" fill="#e9e2cf" ${ln(1)}/>`).join('')+V; return o; };
ART.capnonno=()=>{ const R=S(517), f=F_(); let o=hutInside(R,'#8a6a3a');
  o+=`<path d="${box(186,70,148,84,R,1.5)}" fill="#6a4a24" ${ln(1.6)}/>`+(f.rhymeSeen||f.mazeFail?`<path d="M200 90 l20 0 l-6 -6 M200 90 l6 6" stroke="#e9e2cf" stroke-width="2" fill="none"/><path d="M234 90 l20 0 m-6 -6 l6 6 l-6 6" stroke="#e9e2cf" stroke-width="2" fill="none"/><text x="260" y="130" text-anchor="middle" font-size="10" fill="#e9e2cf" font-family="Fredoka, sans-serif">A A 3 K Q</text>`:`<text x="260" y="118" text-anchor="middle" font-size="10" fill="#d9c9a0" font-family="Fredoka, sans-serif">✶ ✶ ✶</text>`);
  o+=`<path d="${box(90,90,40,44,R,1)}" fill="#e9e2cf" ${ln(1.6)}/><circle cx="110" cy="110" r="10" fill="#eab48a" ${ln(1)}/><path d="M102 100 l-4 -10 M118 100 l4 -10" stroke="#111" stroke-width="2"/>`;
  for (let i=0;i<14;i++){ const x=360+(i%5)*20+(R()*6), y=226-Math.floor(i/5)*8; o+=`<path d="${box(x,y,16,7,R,.6)}" fill="${i%2?'#e9e2cf':'#d9d0b8'}" ${ln(1)}/>`; }
  o+=shadowE(150,240,70,4)+`<path d="${wob([[90,240],[98,216],[206,216],[212,240]],R,3)}" fill="#3f7a3a" ${ln(1.8)}/>`+candle(330,232,14)+V; return o; };
})();
