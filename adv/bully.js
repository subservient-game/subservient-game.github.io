/* Oggetti inutili: il protagonista li tira addosso a Tonino il Liscio */
(()=>{ if (!window.ADV) return;
const NEED={"1":["agofilo","ascia","baffi","barattolo","basilico","berretto","brillantina","caffe","caglio","campione","candela","chiave","cioccolato","cravatta","cravattap","dentiera","distintivo","enigma1","enigma2","enigma3","etichetta","farina","fiori","forchetta","funghi","grappa","guanti","impermeabile","imperstrappato","impronta","latte","legna","lente","lettera","lievito","lumacceso","lumino","mantellina","marca","mestolo","modulo","moka","mokapiena","mozzarella","occhiali","olio","pettine","piuma","pizza","polpette","polvere","puntina","retino","ricevuta","ritratto","rosa","sardine","scotch","sigaro","taccuino","tanica","tazzina","tessera","torcia","valvola","vasetto","vero","vinile","vino"],"2":["biglietto_rosy","bigliettogina","cartolina","chiavetta","chiavetta2","ciabatta","cima","cioccolato","corda","delega","diario","fiammiferi","fischietto","foto","fotopezzi","gomma","gommamast","grappa","lente","letterapina","lumino","mappa","olio2","pacco","pezzo2","pezzo3","pezzo3a","pezzo3b","pezzo4","pile","piselli","piuma","piuma2","rasoio","remo","ricevuta87","sveglia","taccuino","tanica","tessE","tessP","tessPi","tessera","timbro","torcia","vero"],"3":["amuleto","assi","banana","bananaverde","benda","bottiglia","bussola","cappello","chiodi","cocco","coccorotto","collana","conchiglia","conchpiena","corda","corona","diario","foglie","foto","frittata","gallette","lancia","lente","liana","pesce","pescecotto","pescedoro","pescesalato","rami","remo","retino","rum","sale","selce","stecca","taccuino","uovo"],"4":["asso","carbone","catrame","catramecaldo","ciuffo","cocco","diario","fiaccola","fiaccolaaccesa","foglia1","foglie","foto","granchio","lancia","lente","liana","moneta","occhiali","occhialin","olio","pagina","pentola","pesce","pettine","piuma","rami","rinuncia","rullino","sacco","sandali","selce","taccuino"],"5":["acquasanta","bozza","burro","burrogelato","cambiale","confessione","dentiera5","diario","foto","fotovera","legna","legna5","lente","lettera","letteragis","manifesto","moneta","monete","nuovomestolo","pane","pentola","piuma","ricetta","riso","risotto","sacco","solvente","solvented","taccuino","tinta","vino5","zafferano"],"6":["anello","lente","mestolo6","nuovomestolo","pentolone","riso6","taccuino","zaff6"]};
const L=(it,en)=>[it,en];
function dead(item){ const c=CHN(); const u=(window.AV_USED||{})[c]; const f=F();
  if (u && u[item] && u[item].every(k=>f.__iu&&f.__iu[item+'|'+k])) return true;
  for (let k=c;k<=6;k++) if ((NEED[k]||[]).includes(item)) return false;
  return true; }
window.avItemDead=dead;
let last={};
const pick=(k,a)=>{ let i; do { i=Math.floor(Math.random()*a.length); } while (a.length>1 && i===last[k]); last[k]=i; return a[i]; };
const WAKE=[
 L('Un momento. {I}? Ma che cazzo ci faccio ancora con questa roba? Non serve più a niente.','Hang on. {I}? Why the hell am I still lugging this around? It\'s useless now.'),
 L('{I}. Guardo meglio: inutile come un ombrello in un sottomarino.','{I}. I look closer. Useless as an umbrella in a submarine.'),
 L('Ah, {i}. Già dato tutto, come mio nonno a ottant\'anni.','Ah, {i}. It\'s given everything. Like Grandad at eighty.'),
 L('Perché ho ancora {i} in tasca? Il mio cervello è un magazzino di cazzate.','Why have I still got {i}? My brain is a warehouse of crap.'),
 L('{I}: missione compiuta da un pezzo. È ora della pensione. Una pensione violenta.','{I}: mission accomplished ages ago. Time to retire it. Violently.'),
 L('{I}: non serve più a niente. E conosco la persona giusta per un regalo. In faccia.','{I}. Don\'t need it any more. And I know just who deserves it. In the face.'),
];
const ARRIVE=[
 L('Guarda chi passa. Tonino il Liscio. Il destino esiste e ha una mira.','Look who\'s passing. Slick Tonino. Fate exists, and it has good aim.'),
 L('Tonino! Proprio lui. Sempre nel posto sbagliato al momento giusto.','Tonino! Of course. Always in the wrong place at the right time.'),
 L('Eccolo, Tonino. Ha la faccia di uno che sta per ricevere qualcosa in testa.','There\'s Tonino. He has the face of someone about to get something on his head.'),
 L('Tonino spunta da dietro l\'angolo. Ogni universo ha bisogno di un bersaglio.','Tonino pops round the corner. Every universe needs a target.'),
];
const TONINO=[
 L('AHIA! Ma che cazzo ti ho fatto?! ...Ok, tante cose. Ma questa è sproporzionata!','OUCH! What the hell did I do to you?! ...Okay, lots. But this is excessive!'),
 L('Il mio ciuffo! Due ore di brillantina buttate! Sei un animale!','My quiff! Two hours of hair gel wasted! You animal!'),
 L('Ti denuncio! Appena trovo un avvocato che non mi conosce!','I\'m suing! As soon as I find a lawyer who doesn\'t know me!'),
 L('Sempre a me! Perché sempre a me?! Mia madre aveva ragione, dovevo fare il prete!','Always me! Why always me?! Mum was right, I should\'ve been a priest!'),
 L('Me lo merito, eh. Però mirare alle palle no, dai.','Fine, I deserved it. But not in the nuts, come on.'),
 L('Grazie! Domani lo rivendo al mercato. ...AHIA, che botta, però.','Thanks! I\'ll flog it at the market. ...OUCH, though.'),
 L('Un giorno mi vendicherò! Quel giorno non è oggi. Oggi zoppico.','One day I\'ll have my revenge! Not today. Today I\'m limping.'),
 L('Lo dico al Corvo! ...No, il Corvo mi tira le cose pure lui.','I\'m telling the Crow! ...No, the Crow throws stuff at me too.'),
 L('Ma non potevi buttarlo nel cestino come una persona normale?!','Couldn\'t you just bin it like a normal person?!'),
 L('Mi hai preso nell\'occhio buono! Ora ho due occhi cattivi!','You got my good eye! Now both my eyes are bad!'),
];
const AFTER=[
 L('Raccolta differenziata: indifferenziata, su Tonino.','Recycling: general waste, onto Tonino.'),
 L('Tasche più leggere, coscienza uguale. Cioè sporca.','Lighter pockets, same conscience. Filthy.'),
 L('Mi sento meglio. È il potere terapeutico della violenza gratuita.','I feel better. The healing power of gratuitous violence.'),
 L('Dieci punti per la mira. Zero per l\'educazione.','Ten points for aim. Zero for manners.'),
 L('Un giorno qualcuno mi chiederà perché lo faccio. Risponderò: perché c\'era Tonino.','One day someone will ask why I do it. I\'ll say: because Tonino was there.'),
];
const cap=s=>s?s.charAt(0).toUpperCase()+s.slice(1):s;
const fill=(l,item)=>{ const i=avItemName(item).toLowerCase(); return [l[0],l[1]].map(s=>s.split('{I}').join(cap(i)).split('{i}').join(i)); };
const sayL=(who,l,item)=>{ const [a,b]=fill(l,item); return who==='me'?me(a,b):(who==='voice'?avSay('voice',T(a,b)):np(who,a,b)); };
function fly(item, x0, y0, x1, y1, ms){ return new Promise(res=>{ const g=document.createElementNS(NS,'g'); const ic=AV_ICONS&&AV_ICONS[item];
  g.innerHTML=ic?`<g transform="translate(-16 -16) scale(.66)">${ic}</g>`:`<text font-size="26" text-anchor="middle" dominant-baseline="middle">${(AV_ITEMS[item]||['❓'])[0]}</text>`;
  (typeof fxL!=='undefined'?fxL:scene).appendChild(g); const t0=performance.now();
  (function st(now){ const f=Math.min(1,(now-t0)/ms); const x=x0+(x1-x0)*f, y=y0+(y1-y0)*f-Math.sin(f*Math.PI)*70; g.setAttribute('transform',`translate(${x} ${y}) rotate(${f*720})`); if (f<1) requestAnimationFrame(st); else { g.remove(); res(); } })(t0); }); }
async function bully(item){
  if (!castOf('tonino')) AV_CAST.tonino=AV_CAST.tonino||{name:['Tonino il Liscio','Slick Tonino'],kind:'m',col:'#e0aaff',look:{hair:'slick',hairColor:'#222222',skin:'#eab48a',outfit:'#8a5ac8',pants:'#eceff2',top:'shirt',bottom:'pants'}};
  await sayL('me', pick('w',WAKE), item);
  let n=AV.npcs.find(x=>x.avId==='tonino'), temp=false;
  if (!n){ const c=castOf('tonino')||AV_CAST.tonino; const side=H.X>240?-1:1; const sx=side>0?520:-40;
    n=makeNPC({name:c.name[LANG==='it'?0:1], kind:'m', room:H.room, x:sx}); n.avId='tonino'; n.look={...c.look,kind:'m'}; npcLook(n,n.look); temp=true; AV.npcs.push(n); n.keep=1;
    await npcWalk(n, Math.max(30,Math.min(450,H.X+side*150))); await sayL('voice', pick('a',ARRIVE), item); }
  n.keep=1; H.dir=n.X>H.X?1:-1;
  try { setPose(P([{aR:-170,eR:-40,rot:-5},{aR:-75,eR:0,rot:5}],170,{usesR:1})); } catch(e){ setPose('point'); }
  await fly(item, H.X+H.dir*14, STAND-95, n.X, STAND-105, 650);
  setPose('idle'); npcPose(n,'scared','scared');
  try{ avDel(item); avSave(); avRender(); }catch(e){}
  await sayL('tonino', pick('t',TONINO), item);
  if (temp){ npcPose(n,'run','scared'); await npcWalk(n, n.X<H.X?-60:540); removeNPC(n); AV.npcs=AV.npcs.filter(x=>x!==n); }
  else { n.keep=0; npcPose(n,'idle'); }
  avTrophy('tonino', 'Hai tirato la tua prima cianfrusaglia addosso a Tonino. Non sarà l\'ultima.', 'Threw your first piece of junk at Tonino. Won\'t be the last.');
  return sayL('me', pick('f',AFTER), item);
}
AV_TROPHIES.push(['tonino','Hai tirato la tua prima cianfrusaglia addosso a Tonino. Non sarà l\'ultima.','Threw your first piece of junk at Tonino. Won\'t be the last.']);
const od=window.avDefault;
window.avDefault=function(verb,t,item){ if (item && (verb==='use'||verb==='give') && (t&&t.id)!=='tonino' && dead(item)) return bully(item); return od.apply(this,arguments); };
})();
