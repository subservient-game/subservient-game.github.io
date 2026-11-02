/* Quanti giocatori ci sono adesso: battito ogni 90 s sul relay gratuito ntfy */
(()=>{ const TOPIC='https://ntfy.sh/subservient-game-v2-presence', WIN=240;
 let id; try{ id=localStorage.getItem('vainDev'); if(!id){ id=Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-4); localStorage.setItem('vainDev',id); } }catch(e){ id='x'+Math.random().toString(36).slice(2,10); }
 const mode=()=>window.ADV?'adv':'online';
 function beat(){ if (document.visibilityState==='hidden') return; try{ fetch(TOPIC,{method:'POST',body:JSON.stringify({d:id,m:mode()})}).catch(()=>{}); }catch(e){} }
 setTimeout(beat,3000); setInterval(beat,90000); document.addEventListener('visibilitychange',()=>{ if (document.visibilityState==='visible') beat(); });
 window.vainPresence=async function(){ const r=await fetch(TOPIC+'/json?poll=1&since='+WIN+'s',{cache:'no-store'}); const t=await r.text(); const last={}; const now=Date.now()/1000;
   for (const line of t.split('\n')){ if(!line.trim()) continue; let m; try{ m=JSON.parse(line); }catch(e){ continue; } if (m.event && m.event!=='message') continue; let b; try{ b=JSON.parse(m.message); }catch(e){ continue; } if (!b||!b.d) continue; if (now-(m.time||now)>WIN) continue; if (!last[b.d]||last[b.d].t<m.time) last[b.d]={t:m.time,m:b.m}; }
   last[id]={t:now,m:mode()}; const c={online:0,adv:0}; Object.values(last).forEach(x=>{ c[x.m==='adv'?'adv':'online']++; }); return c; };
})();
