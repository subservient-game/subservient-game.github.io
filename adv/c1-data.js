/* ================= CAPITOLO 1 · LA NOTTE DEL MESTOLO D'ORO — dati ================= */
const AV_TITLE=['Capitolo 1: La Notte del Mestolo d\'Oro','Chapter 1: The Night of the Golden Ladle'];
Object.assign(AV_ITEMS,{
  taccuino:['📒','Taccuino','Notebook'], guanti:['🧤','Guanti di gomma','Rubber gloves'], chiavi:['🔑','Chiavi di casa','House keys'],
  impermeabile:['🧥','Impermeabile','Trench coat'], lente:['🔍','Lente','Magnifying glass'], barattolo:['🥒','Sottaceti','Pickle jar'], vasetto:['🫙','Barattolo vuoto','Empty jar'], campione:['🧪','Campione','Sample'],
  modulo:['📄','Modulo B-52','Form B-52'], torcia:['🔦','Torcia','Torch'], grappa:['🍶','Grappa del nonno','Grandpa\'s grappa'], fiori:['💐','Fiori','Flowers'], distintivo:['🎖️','Distintivo','Badge'],
  retino:['🥅','Retino','Fishing net'], baffi:['🥸','Baffi finti','Fake moustache'], pettine:['🪮','Pettine d\'argento','Silver comb'], dentiera:['🦷','Dentiera','Dentures'], biglietto:['🎫','Mezza parola d\'ordine','Half a password'],
  brillantina:['🧴','Brillantina','Hair gel'], piuma:['🪶','Piuma nera','Black feather'], vinile:['💿','Vinile Italo Disco','Italo Disco record'], invito:['💌','Invito al privé','Privé invitation'],
  ascia:['🪓','Ascia','Axe'], legna:['🪵','Legna','Firewood'], basilico:['🌿','Basilico','Basil'], pizza:['🍕','Pizza delle 3','3 a.m. pizza'], mestolo:['🥄','Mestolo d\'Oro','Golden Ladle'], cioccolato:['🍫','Mestolo di cioccolato','Chocolate ladle'], etichetta:['🏷️','Etichetta','Label'],
  moka:['🫖','Moka vuota','Empty coffee pot'], polvere:['🫘','Pacco di caffè','Bag of coffee'], mokapiena:['🫖','Moka carica','Loaded coffee pot'], caffe:['☕','Caffè bollente','Hot coffee'], chiave:['🗝️','Chiave del magazzino','Warehouse key'], ricevuta:['🧾','Ricevuta','Receipt'],
  vero:['🏆','Mestolo d\'Oro (vero)','Golden Ladle (real)'], lettera:['✉️','Lettera del Corvo','The Crow\'s letter'], tessera:['🪪','Tessera misteriosa','Mysterious card'], funghi:['🍄','Funghi strani','Weird mushrooms']
});
Object.assign(AV_PLACES,{ living:['🛋️','Soggiorno','Living'], kitchen:['🍳','Cucina','Kitchen'], bathroom:['🚽','Bagno','Bathroom'], bedroom:['🛏️','Camera','Bedroom'], garden:['🌳','Giardino','Garden'], garage:['🚗','Garage','Garage'], attic:['🏓','Mansarda','Attic'], cellar:['🍷','Cantina','Cellar'], bunker:['☢️','Bunker','Bunker'],
  piazza:['☕','Piazza','Piazza'], hospital:['🏥','Ospedale','Hospital'], cimitero:['⚰️','Cimitero','Cemetery'], karaoke:['🎤','Karaoke','Karaoke'], gym:['🏋️','Palestra','Gym'], beach:['🏖️','Spiaggia','Beach'], park:['⛲','Parco','Park'], barber:['💈','Barbiere','Barber'], bisca:['🃏','Bisca','Gambling den'],
  disco:['🪩','Discoteca','Disco'], prive:['🥂','Privé','Privé'], pizzeria:['🍕','Pizzeria','Pizzeria'], woods:['🌲','Bosco','Woods'], porto:['⚓','Porto','Harbour'], faro:['🗼','Faro','Lighthouse'], municipio:['🏛️','Municipio','Town Hall'] });
AV_START={room:'living', open:['living','kitchen','bathroom','bedroom','garden','garage','attic','cellar']};
const hs=(id,x,y,w,h,it,en,when)=>({id,x,y,w,h,n:[it,en],when});
Object.assign(AV_HS,{
  living:[hs('radio',418,196,40,30,'radio','radio'), hs('sofa',110,205,120,50,'divano','sofa'), hs('cushion',64,181,30,22,'cuscino','cushion'), hs('books',100,80,70,80,'libreria','bookshelf'), hs('tv',330,172,60,50,'televisore','TV'), hs('plant',198,195,30,50,'pianta','plant'), hs('window',230,75,80,70,'finestra','window')],
  kitchen:[hs('fridge',51,150,60,120,'frigo','fridge'), hs('coffee',280,150,30,30,'moka','coffee pot'), hs('stove',160,165,60,50,'fornelli','stove'), hs('sink',236,172,50,40,'lavandino','sink'), hs('ktable',410,190,90,50,'tavolo','table')],
  bathroom:[hs('toilet',78,212,60,60,'water','toilet'), hs('bsink',190,176,50,40,'lavandino','sink'), hs('shower',335,120,90,150,'doccia','shower'), hs('btowel',432,140,40,60,'asciugamano','towel'), hs('tp',136,196,20,24,'carta igienica','toilet paper')],
  bedroom:[hs('bed',170,196,120,60,'letto','bed'), hs('nightlamp',251,190,30,40,'comodino','bedside table'), hs('wardrobe',308,160,70,130,'armadio','wardrobe'), hs('computer',398,168,60,50,'computer','computer'), hs('guitar',464,200,30,70,'chitarra','guitar')],
  garden:[hs('flowers',178,238,60,30,'aiuola','flower bed'), hs('grill',230,200,50,50,'barbecue','grill'), hs('hammock',380,212,90,40,'amaca','hammock'), hs('tree',110,80,120,120,'albero','tree')],
  garage:[hs('bench',420,190,110,110,'banco attrezzi','workbench'), hs('tools',110,100,160,120,'attrezzi appesi','hanging tools'), hs('jerry',450,224,24,30,'tanica','jerry can'), hs('tyres',206,135,40,80,'gomme','tyres')],
  attic:[hs('trunk',80,220,70,45,'baule','trunk'), hs('telescope',420,150,50,80,'telescopio','telescope'), hs('boxes',350,185,50,35,'scatolone','box'), hs('ghost',34,220,30,50,'lenzuolo','sheet'), hs('pingpong',240,200,140,20,'ping pong','ping-pong table')],
  cellar:[hs('barrels',100,200,170,90,'botti','barrels'), hs('salami',340,128,170,60,'salumi','salami'), hs('wine',445,198,50,96,'bottiglie','bottles'), hs('trapdoor',220,262,60,20,'botola','trapdoor',()=>F().trapdoor)],
  bunker:[hs('shelves',95,130,90,110,'scaffali','shelves'), hs('bradio',240,175,80,30,'radio da campo','field radio'), hs('cot',345,210,110,20,'branda','camp bed'), hs('bdoor',440,146,40,172,'porta blindata','blast door'), hs('radar',372,152,64,44,'radar','radar'), hs('poster',177,93,34,46,'foglio','sheet of paper')],
  piazza:[hs('board',319,167,56,40,'bacheca','notice board'), hs('cafe',160,205,80,60,'tavolino','café table'), hs('gelato',360,200,60,60,'carretto gelati','ice-cream cart')],
  hospital:[hs('hbed',340,215,140,40,'lettino','hospital bed'), hs('cabinet',54,188,56,76,'armadietto','cabinet'), hs('chairs',158,190,76,40,'sedie d\'attesa','waiting chairs'), hs('monitor',190,95,80,50,'monitor','monitor'), hs('cross',75,75,70,70,'croce rossa','red cross'), hs('water',456,200,24,50,'erogatore','water cooler')],
  cimitero:[hs('gate',40,170,60,120,'cancello','gate'), hs('tomb1',200,205,56,60,'tomba con vaso','tomb with vase'), hs('tomb2',300,210,60,50,'tomba','tomb'), hs('tomb3',120,215,40,40,'lapide storta','crooked headstone'), hs('crypt',410,175,110,120,'cappella','chapel'), hs('cypress',90,110,40,150,'cipresso','cypress')],
  karaoke:[hs('screen',240,80,140,80,'schermo','screen'), hs('mic',240,175,24,60,'microfono','microphone'), hs('spkL',65,190,50,82,'cassa','speaker'), hs('spkR',415,190,50,82,'cassa','speaker'), hs('ball',240,120,30,30,'palla stroboscopica','disco ball')],
  gym:[hs('treadmill',110,200,110,60,'tapis roulant','treadmill'), hs('weights',340,220,110,40,'bilanciere','barbell'), hs('bag',30,170,24,90,'sacco da boxe','punching bag'), hs('dumbbells',200,160,80,40,'manubri','dumbbells'), hs('gbottle',440,225,24,30,'borraccia','water bottle')],
  beach:[hs('sea',300,175,300,40,'mare','sea'), hs('castle',260,240,40,30,'castello di sabbia','sandcastle'), hs('towel',120,262,80,20,'telo','towel')],
  park:[hs('fountain',330,200,100,80,'fontana','fountain'), hs('pbench',140,207,120,60,'panchina','bench')],
  barber:[hs('chair',150,204,70,80,'poltrona','barber chair'), hs('mirror',265,130,70,100,'specchio','mirror'), hs('poster',58,95,56,70,'poster','poster'), hs('pole',448,135,24,130,'insegna','barber pole')],
  bisca:[hs('table',230,200,170,50,'tavolo verde','card table'), hs('slot',410,180,56,100,'slot machine','slot machine'), hs('rules',330,120,60,40,'cartello','sign'), hs('shelf',68,190,56,80,'bottiglie','bottles')],
  disco:[hs('booth',405,185,90,80,'consolle','DJ booth'), hs('floor',200,250,200,40,'pista','dance floor')],
  prive:[hs('vsofa',120,205,130,50,'divanetto','velvet sofa'), hs('champagne',360,200,40,70,'champagne','champagne'), hs('chandelier',240,40,80,70,'lampadario','chandelier')],
  pizzeria:[hs('oven',390,200,120,120,'forno','oven'), hs('ptable',155,200,90,50,'tavolo','table'), hs('menu',242,120,64,80,'menù','menu')],
  woods:[hs('log',145,210,90,40,'tronco','log'), hs('campfire',262,222,50,40,'falò','campfire'), hs('mushrooms',440,248,50,25,'funghi','mushrooms'), hs('trees',36,160,70,180,'alberi','trees')],
  porto:[hs('warehouse',107,172,96,110,'magazzino','warehouse'), hs('crates',250,205,70,50,'casse','crates'), hs('boat',385,200,170,60,'barca','boat'), hs('lamp',230,120,24,110,'lampione','lamp post')],
  faro:[hs('lhdoor',338,210,30,40,'porta del faro','lighthouse door'), hs('lantern',338,16,60,40,'lanterna','lantern'), hs('hut',105,190,96,80,'casetta','hut'), hs('buoy',420,205,40,50,'salvagente','life buoy'), hs('rocks',130,205,180,30,'scogli','rocks')],
  municipio:[hs('safe',73,193,70,74,'cassaforte','safe'), hs('desk',360,200,140,50,'scrivania','desk'), hs('portrait',240,63,80,90,'ritratto','portrait'), hs('window',415,70,90,96,'finestra','window'), hs('flag',125,50,36,44,'bandiera','flag')]
});
const lk=(o)=>o;
Object.assign(AV_CAST,{
  sindaco:{room:'piazza', x:300, name:['Il Sindaco Benito Pappalardo','Mayor Benito Pappalardo'], kind:'m', col:'#ffd166', look:{hair:'receding',hairColor:'#eeeeee',skin:'#eab48a',glasses:true,outfit:'#2b2d31',pants:'#2b2d31',top:'jacket',bottom:'pants',beard:'mustache',phys:'belly'}, gone:()=>F().endDone},
  peppe:{room:'piazza', x:80, name:['Nonno Peppe','Grandpa Peppe'], kind:'m', col:'#9be7ff', look:{hair:'bald',hairColor:'#eeeeee',skin:'#f6cfa7',glasses:true,outfit:'#8a5a3a',pants:'#5a5048',top:'cardigan',bottom:'pants'}},
  nico:{room:'piazza', x:175, name:['Nico il Barista','Nico the Barista'], kind:'m', col:'#ffadad', look:{hair:'quiff',hairColor:'#222222',skin:'#c98b5e',glasses:false,outfit:'#eceff2',pants:'#2b2d31',top:'shirt',bottom:'pants',beard:'stubble'}},
  bisturi:{room:'hospital', x:260, name:['Dott. Bisturi','Dr. Scalpel'], kind:'m', col:'#bde0fe', look:{hair:'receding',hairColor:'#eeeeee',skin:'#f6cfa7',glasses:true,outfit:'#eceff2',pants:'#9fc3c7',top:'jacket',bottom:'pants'}},
  rosy:{room:'hospital', x:110, name:['Rosy l\'Infermiera','Rosy the Nurse'], kind:'f', col:'#ffc8dd', look:{hair:'bun',hairColor:'#6b3e26',skin:'#a46a43',glasses:false,outfit:'#9fd3e0',pants:'#9fd3e0',top:'tshirt',bottom:'pants'}},
  ugo:{room:'cimitero', x:300, name:['Ugo il Becchino','Ugo the Gravedigger'], kind:'m', col:'#cdb4db', look:{hair:'mullet',hairColor:'#6a6a6a',skin:'#eab48a',glasses:false,outfit:'#3a3a3a',pants:'#3a3a3a',top:'hoodie',bottom:'pants',beard:'full'}, pose:'sitfloor'},
  pina:{room:'karaoke', x:120, name:['Nonna Pina','Granny Pina'], kind:'f', col:'#e0aaff', look:{hair:'curly',hairColor:'#e87aa8',skin:'#f6cfa7',glasses:true,outfit:'#8a5ac8',pants:'#2b2d31',top:'dress',bottom:'skirt'}},
  rocky:{room:'gym', x:250, name:['Rocky il Personal Trainer','Rocky the Personal Trainer'], kind:'m', col:'#ffd6a5', look:{hair:'buzz',hairColor:'#e8c36a',skin:'#c98b5e',glasses:false,outfit:'#d64545',pants:'#2b2d31',top:'tank',bottom:'shorts',phys:'muscle'}},
  baffo:{room:'beach', x:380, name:['Baffo il Contrabbandiere','Baffo the Smuggler'], kind:'m', col:'#ff9f6e', look:{hair:'bald',hairColor:'#222222',skin:'#a46a43',glasses:false,outfit:'#2b2d31',pants:'#3f5f8a',top:'tank',bottom:'jeans',beard:'mustache',phys:'muscle'}},
  gino:{room:'park', x:230, name:['Gino il Giardiniere','Gino the Gardener'], kind:'m', col:'#caffbf', look:{hair:'bald',hairColor:'#eeeeee',skin:'#eab48a',glasses:true,outfit:'#4f9a4a',pants:'#5a5048',top:'tshirt',bottom:'pants'}},
  salvatore:{room:'barber', x:330, name:['Salvatore il Barbiere','Salvatore the Barber'], kind:'m', col:'#c7f9cc', look:{hair:'slick',hairColor:'#222222',skin:'#c98b5e',glasses:false,outfit:'#eceff2',pants:'#2b2d31',top:'shirt',bottom:'pants',beard:'mustache'}},
  ercole:{room:'bisca', x:400, name:['Ercole il Buttafuori','Ercole the Bouncer'], kind:'m', col:'#ff6b6b', look:{hair:'buzz',hairColor:'#222222',skin:'#7a4a2c',glasses:true,outfit:'#2b2d31',pants:'#2b2d31',top:'tank',bottom:'pants',phys:'muscle'}},
  tonino:{room:'bisca', x:290, name:['Tonino il Liscio','Slick Tonino'], kind:'m', col:'#e0aaff', look:{hair:'slick',hairColor:'#222222',skin:'#eab48a',glasses:false,outfit:'#8a5ac8',pants:'#eceff2',top:'shirt',bottom:'pants',beard:'stubble'}},
  gina:{room:'bisca', x:150, name:['Gina la Squalo','Gina the Shark'], kind:'f', col:'#ffd166', look:{hair:'bob',hairColor:'#222222',skin:'#eab48a',glasses:true,outfit:'#2b2d31',pants:'#2b2d31',top:'jacket',bottom:'skirt'}},
  djmax:{room:'disco', x:405, name:['DJ Max','DJ Max'], kind:'m', col:'#4cc9f0', look:{hair:'mohawk',hairColor:'#4cc9f0',skin:'#f6cfa7',glasses:true,outfit:'#2b2d31',pants:'#2b2d31',top:'hoodie',bottom:'jeans'}},
  tony:{room:'disco', x:90, name:['Tony il Buttafuori','Tony the Bouncer'], kind:'m', col:'#ff6b6b', look:{hair:'bald',hairColor:'#222222',skin:'#5a3520',glasses:true,outfit:'#2b2d31',pants:'#2b2d31',top:'tshirt',bottom:'pants',phys:'muscle'}},
  jacques:{room:'prive', x:420, name:['Jacques','Jacques'], kind:'m', col:'#ffd6a5', look:{hair:'quiff',hairColor:'#e8c36a',skin:'#f6cfa7',glasses:false,outfit:'#2b2d31',pants:'#2b2d31',top:'jacket',bottom:'pants'}},
  contessa:{room:'prive', x:250, name:['La Contessa Vanda','Countess Vanda'], kind:'f', col:'#ff8fab', look:{hair:'wavy',hairColor:'#8a5ac8',skin:'#f6cfa7',glasses:false,outfit:'#d64545',pants:'#d64545',top:'dress',bottom:'skirt',eyes:'#3f7a4a'}},
  toto:{room:'pizzeria', x:300, name:['Totò il Pizzaiolo','Totò the Pizza Man'], kind:'m', col:'#ffe066', look:{hair:'curly',hairColor:'#222222',skin:'#c98b5e',glasses:false,outfit:'#eceff2',pants:'#eceff2',top:'tshirt',bottom:'pants',beard:'full',phys:'belly'}},
  rino:{room:'woods', x:330, name:['Rino l\'Eremita','Rino the Hermit'], kind:'m', col:'#b5e48c', look:{hair:'afro',hairColor:'#eeeeee',skin:'#a46a43',glasses:false,outfit:'#7a6a52',pants:'#5a5048',top:'hoodie',bottom:'shorts',beard:'full'}},
  ciccio:{room:'porto', x:300, name:['Ciccio il Pescatore','Ciccio the Fisherman'], kind:'m', col:'#9be7ff', look:{hair:'curly',hairColor:'#eeeeee',skin:'#a46a43',glasses:false,outfit:'#e9c46a',pants:'#3f5f8a',top:'hoodie',bottom:'jeans',beard:'full'}},
  marisa:{room:'faro', x:200, name:['Marisa la Guardiana','Marisa the Keeper'], kind:'f', col:'#b8f2e6', look:{hair:'braids',hairColor:'#eeeeee',skin:'#eab48a',glasses:true,outfit:'#2b3a67',pants:'#2b2d31',top:'hoodie',bottom:'pants',freckles:true}},
  gennaro:{room:'municipio', x:160, name:['Gennaro l\'Usciere','Gennaro the Porter'], kind:'m', col:'#ffd6a5', look:{hair:'receding',hairColor:'#6b3e26',skin:'#c98b5e',glasses:true,outfit:'#3f5f8a',pants:'#2b2d31',top:'jacket',bottom:'pants',phys:'belly'}},
  gaspare:{room:'municipio', x:330, name:['L\'Assessore Gaspare','Councillor Gaspare'], kind:'m', col:'#c77dff', look:{hair:'sidepart',hairColor:'#222222',skin:'#f6cfa7',glasses:true,outfit:'#2b2d31',pants:'#2b2d31',top:'shirt',bottom:'pants',beard:'goatee'}, gone:()=>F().gaspareGone}
});
AV_CAST.ugo.gone=()=>false;
/* golden Pippi hidden around: id -> description for debugging */
Object.assign(AV_COINS,{ cushion:1, bed:1, grill:1, castle:1, fountain:1, slot:1, crates:1, crypt:1, oven:1, speaker:1, bag:1, bunker:1, cabinet:1, tyres:1 });
const AV_TROPHIES=[
  ['keys','Uscito di casa. Il primo passo è sempre il più schifoso.','Left the house. The first step is always the grossest.'],
  ['distintivo','Investigatore comunale: tre timbri e un\'umiliazione.','Town investigator: three stamps and one humiliation.'],
  ['karaoke','Usignolo stonato: hai battuto Nonna Pina al karaoke.','Off-key nightingale: beat Granny Pina at karaoke.'],
  ['briscola','Hai battuto Tonino a briscola.','Beat Tonino at briscola.'],
  ['gina','Hai battuto Gina la Squalo. Nessuno ci era mai riuscito da sobrio.','Beat Gina the Shark. Nobody ever did it sober.'],
  ['pushups','Rocky approva: 25 flessioni senza morire.','Rocky approves: 25 push-ups without dying.'],
  ['funghi','Viaggio mistico nel bosco. Non chiedere.','Mystic trip in the woods. Don\'t ask.'],
  ['bunker','Hai trovato il bunker del nonno.','Found grandpa\'s bunker.'],
  ['gaspare','Interrogatorio da sbirro vero.','Interrogation like a real cop.'],
  ['coins','Tutti i Pippi d\'oro! Taccagno patentato.','All golden Pippi! Certified tightwad.'],
  ['end','Capitolo 1 completato.','Chapter 1 complete.'],
  ['nohint','Capitolo 1 senza suggerimenti. Genio o bugiardo.','Chapter 1 with no hints. Genius or liar.']
];
