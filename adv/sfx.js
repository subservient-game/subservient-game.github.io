/* ================= SUONI ED ENTRATE IN SCENA =================
   Effetti sintetizzati (niente file): passi, oggetti presi, porte, cambio luogo, onde, campane, corvo.
   Si spengono insieme alla musica. Cambio di luogo con dissolvenza e nome del posto. */
(()=>{ if (!window.ADV) return;
let ctx=null, master=null;
function ac(){ try{ if (typeof MUS!=='undefined' && !MUS.on) return null; if (!ctx){ const C=window.AudioContext||window.webkitAudioContext; if (!C) return null; ctx=new C(); master=ctx.createGain(); master.gain.value=.55; master.connect(ctx.destination); } if (ctx.state==='suspended') ctx.resume(); return ctx; }catch(e){ return null; } }
function noise(dur){ const c=ctx, b=c.createBuffer(1, Math.max(1,Math.floor(c.sampleRate*dur)), c.sampleRate), d=b.getChannelData(0); for(let i=0;i<d.length;i++) d[i]=Math.random()*2-1; const s=c.createBufferSource(); s.buffer=b; return s; }
function env(node, t, a, peak, dec){ const g=ctx.createGain(); g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(peak,t+a); g.gain.exponentialRampToValueAtTime(.0001,t+a+dec); node.connect(g); g.connect(master); return g; }
function tone(f, t, dur, type='sine', vol=.15, a=.005, slide=0){ const o=ctx.createOscillator(); o.type=type; o.frequency.setValueAtTime(f,t); if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30,f*slide),t+dur); env(o,t,a,vol,dur); o.start(t); o.stop(t+a+dur+.05); }
function filt(src, type, freq, q=1){ const f=ctx.createBiquadFilter(); f.type=type; f.frequency.value=freq; f.Q.value=q; src.connect(f); return f; }
const SFX={
  step(){ if(!ac()) return; const t=ctx.currentTime; const s=noise(.06); const f=filt(s,'lowpass',420+Math.random()*120,1); env(f,t,.002,.22,.06); s.start(t); s.stop(t+.08); },
  pick(){ if(!ac()) return; const t=ctx.currentTime; tone(880,t,.12,'triangle',.12); tone(1320,t+.07,.18,'triangle',.1); tone(1760,t+.14,.25,'sine',.07); },
  drop(){ if(!ac()) return; const t=ctx.currentTime; tone(520,t,.18,'triangle',.1,.005,.5); },
  door(){ if(!ac()) return; const t=ctx.currentTime; const o=ctx.createOscillator(); o.type='sawtooth'; o.frequency.setValueAtTime(90,t); o.frequency.linearRampToValueAtTime(140,t+.35); o.frequency.linearRampToValueAtTime(70,t+.6); const f=filt(o,'bandpass',600,6); env(f,t,.05,.05,.6); o.start(t); o.stop(t+.7); const s=noise(.08); env(filt(s,'lowpass',300),t+.62,.002,.3,.12); s.start(t+.62); s.stop(t+.75); },
  whoosh(){ if(!ac()) return; const t=ctx.currentTime; const s=noise(.5); const f=ctx.createBiquadFilter(); f.type='bandpass'; f.Q.value=1.2; f.frequency.setValueAtTime(300,t); f.frequency.exponentialRampToValueAtTime(2400,t+.35); s.connect(f); env(f,t,.12,.12,.35); s.start(t); s.stop(t+.55); },
  trophy(){ if(!ac()) return; const t=ctx.currentTime; [523,659,784,1047].forEach((f,i)=>tone(f,t+i*.09,.4,'triangle',.1)); },
  caw(){ if(!ac()) return; const t=ctx.currentTime; for (let k=0;k<2;k++){ const o=ctx.createOscillator(); o.type='sawtooth'; o.frequency.setValueAtTime(700,t+k*.28); o.frequency.exponentialRampToValueAtTime(380,t+k*.28+.22); const f=filt(o,'bandpass',1200,3); env(f,t+k*.28,.01,.18,.22); o.start(t+k*.28); o.stop(t+k*.28+.3); } },
  bell(){ if(!ac()) return; const t=ctx.currentTime; [1,2.76,5.4].forEach((m,i)=>tone(220*m,t,2.2-i*.5,'sine',.12/(i+1))); },
  thud(){ if(!ac()) return; const t=ctx.currentTime; tone(110,t,.25,'sine',.35,.002,.4); const s=noise(.1); env(filt(s,'lowpass',500),t,.002,.25,.1); s.start(t); s.stop(t+.12); },
  blip(){ if(!ac()) return; const t=ctx.currentTime; tone(660,t,.05,'square',.03); },
};
window.avSfx=SFX;
/* onde, vento e grilli in sottofondo */
let amb=null;
function ambient(r){ try{ if (amb){ amb.forEach(n=>{ try{ n.stop(); }catch(e){} }); amb=null; } if (!ac()) return;
  const sea=['porto','faro','beach','isola','laguna'].includes(r), night=['piazza','cimitero','park','garden','woods','stazione'].includes(r), jungle=['giungla','villaggio'].includes(r);
  const nodes=[];
  if (sea){ const s=noise(4); s.loop=true; const f=filt(s,'lowpass',500,.7); const g=ctx.createGain(); g.gain.value=.05; f.connect(g); g.connect(master); const l=ctx.createOscillator(); l.frequency.value=.12; const lg=ctx.createGain(); lg.gain.value=.04; l.connect(lg); lg.connect(g.gain); s.start(); l.start(); nodes.push(s,l); }
  if (night||jungle){ const o=ctx.createOscillator(); o.type='square'; o.frequency.value=jungle?3200:4400; const g=ctx.createGain(); g.gain.value=0; const f=filt(o,'bandpass',jungle?3200:4400,8); f.connect(g); g.connect(master); const l=ctx.createOscillator(); l.type='square'; l.frequency.value=jungle?11:7; const lg=ctx.createGain(); lg.gain.value=.006; l.connect(lg); lg.connect(g.gain); o.start(); l.start(); nodes.push(o,l); }
  amb=nodes; }catch(e){} }
/* dissolvenza e nome del luogo */
const css=document.createElement('style'); css.textContent=`#advFade{position:absolute;inset:0;background:#000;opacity:0;pointer-events:none;z-index:30;transition:opacity .28s}
 #advFade.on{opacity:1} #advPlace{position:absolute;left:0;right:0;top:9%;text-align:center;z-index:31;pointer-events:none;font:700 clamp(18px,5cqw,30px) Fredoka,sans-serif;color:#ffd166;text-shadow:0 2px 0 #000,0 0 10px #000;opacity:0;transform:translateY(8px);transition:opacity .5s,transform .5s}
 #advPlace.on{opacity:1;transform:none}`; document.head.appendChild(css);
function els(){ const cam=document.getElementById('cam'); if (!cam) return {}; let f=document.getElementById('advFade'), p=document.getElementById('advPlace'); if (!f){ f=document.createElement('div'); f.id='advFade'; cam.appendChild(f); } if (!p){ p=document.createElement('div'); p.id='advPlace'; cam.appendChild(p); } return {f,p}; }
let lastRoom=null;
function boot(){
  // passi
  setInterval(()=>{ try{ if (H.pose==='walk'||H.pose==='run') SFX.step(); }catch(e){} },270);
  const oAdd=window.avAdd; if (oAdd) window.avAdd=function(){ const r=oAdd.apply(this,arguments); try{ if (!window.__noSfx) SFX.pick(); }catch(e){} return r; };
  const oT=window.avTrophy; if (oT) window.avTrophy=function(id){ const had=AV.st.tro.includes(id); const r=oT.apply(this,arguments); if (!had) setTimeout(()=>SFX.trophy(),1400); return r; };
  const oGo=window.avGo; if (oGo) window.avGo=async function(r, first){ const {f,p}=els(); const change=r!==H.room;
    if (change && f && !first && !AV.busy){ SFX.whoosh(); f.classList.add('on'); AV.busy=true; await new Promise(z=>setTimeout(z,280)); AV.busy=false; }
    const out=await oGo.apply(this,arguments);
    if (change && f){ f.classList.remove('on'); ambient(H.room); try{ const nm=(AV_PLACES[r]||[])[LANG==='it'?1:2]; if (nm && p && r!==lastRoom && H.room===r){ p.textContent=nm; p.classList.add('on'); clearTimeout(p.__t); p.__t=setTimeout(()=>p.classList.remove('on'),1600); } }catch(e){} lastRoom=H.room; }
    return out; };
  // suoni legati a parole delle battute
  const oS=window.avSay; if (oS) window.avSay=function(who,text){ try{ const s=String(text||''); if (/CRA+|corvo nero/i.test(s)) SFX.caw(); else if (/DONG|campan[ae] suona|rintocc/i.test(s)) SFX.bell(); else if (/CRAC|BUM|TUNK|SBAM|THUD|CRACK/.test(s)) SFX.thud(); else if (/apre|cigola|porta/i.test(s) && who==='voice') SFX.door(); }catch(e){} return oS.apply(this,arguments); };
  try{ if (H.room) ambient(H.room); }catch(e){}
  document.addEventListener('pointerdown',()=>{ try{ if (ctx && ctx.state==='suspended') ctx.resume(); if (!amb && H.room) ambient(H.room); }catch(e){} },{passive:true});
}
if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
