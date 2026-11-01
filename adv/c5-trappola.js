/* ================= CAPITOLO 5 — LA TRAPPOLA DELLA CAMPANA VA FATTA SCATTARE AL MOMENTO GIUSTO ================= */
AV_TROPHIES.push(['tempismo','Hai fatto cadere la campana sul Corvo nell\'attimo esatto in cui si chinava sulle monete. Tempismo da sagrestano.','Dropped the bell on the Crow the exact moment he bent over the coins. A sacristan\'s timing.']);
(()=>{ const old=AV_S['c5|use:bell0']; const h=async(...a)=>{ const f=F();
  if (f.mayorFled && !f.caught && f.ropeSaved && (f.mc||0)>=4 && !f.trapTimed){
    await me('Butto il mucchio di monete sotto la campana. Il Corvo si avvicina, annusa, si china... Devo tirare la corda nell\'attimo esatto. Tocca quando il segno è sul verde!','I toss the pile of coins under the bell. The Crow creeps closer, sniffs, bends down... I must pull the rope at the exact moment. Tap when the mark is on the green!');
    const ok=await (window.avShave||avShaveGame)(3); if (!ok) return np('corvo','Ahah! Troppo presto, segugio! Le monete me le riprendo dopo. Riprova, se hai il coraggio.','Haha! Too early, bloodhound! I\'ll grab the coins later. Try again, if you dare.');
    f.trapTimed=1; avSave(); avTrophy('tempismo','Hai fatto cadere la campana sul Corvo nell\'attimo esatto in cui si chinava sulle monete. Tempismo da sagrestano.','Dropped the bell on the Crow the exact moment he bent over the coins. A sacristan\'s timing.'); }
  return old(...a); }; AV_S['c5|use:bell0']=h; AV_S['c5|use:bell0:moneta']=h; AV_S['c5|use:bell0:monete']=h; })();
