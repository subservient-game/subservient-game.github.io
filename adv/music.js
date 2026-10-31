/* ================= MUSICA DI SOTTOFONDO (sintetizzata, stile MIDI, rilassante) ================= */
const MUS={ ctx:null, on:true, timer:null, step:0, track:'day', master:null, next:0 };
try { MUS.on = localStorage.getItem('vainMusic')!=='off'; } catch(e){}
const MUS_TRACKS={
  /* tempo, chords (midi roots + type), melody (scale degrees per 8th, null = rest) */
  day:{ bpm:76, chords:[[60,'M'],[57,'m'],[53,'M'],[55,'M']], scale:[60,62,64,67,69,72,74,76],
    mel:[4,null,5,4, 2,null,1,null, 3,null,2,1, 0,null,null,null, 4,5,7,5, 4,null,2,null, 1,2,3,1, 2,null,null,null] },
  night:{ bpm:64, chords:[[57,'m'],[53,'M'],[50,'m'],[52,'M']], scale:[57,60,62,64,67,69,72,74],
    mel:[2,null,null,3, 4,null,3,null, 2,null,1,null, 0,null,null,null, 4,null,5,4, 3,null,2,null, 1,null,null,2, 0,null,null,null] },
  sea:{ bpm:70, chords:[[62,'m'],[60,'M'],[58,'M'],[60,'M']], scale:[62,64,65,67,69,72,74,77],
    mel:[0,null,2,null, 4,null,3,2, 1,null,null,null, 2,3,4,null, 5,null,4,null, 3,null,1,null, 2,null,null,null, null,null,null,null] }
};
const MUS_ROOM=r=>['bisca','prive','cimitero','bunker','cellar','municipio','disco','karaoke'].includes(r)?'night':(['beach','porto','faro'].includes(r)?'sea':'day');
const mfreq=m=>440*Math.pow(2,(m-69)/12);
function musNote(t, midi, dur, type, vol, attack){ const c=MUS.ctx; const o=c.createOscillator(), g=c.createGain(); o.type=type; o.frequency.value=mfreq(midi);
  g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(vol,t+(attack||.02)); g.gain.exponentialRampToValueAtTime(.0001,t+dur); o.connect(g); g.connect(MUS.master); o.start(t); o.stop(t+dur+.05); }
function musTick(){ if (!MUS.ctx || !MUS.on) return; const c=MUS.ctx;
  while (MUS.next < c.currentTime+0.4){ const tr=MUS_TRACKS[MUS.track], e=60/tr.bpm/2, s=MUS.step%32, t=MUS.next;
    const ch=tr.chords[Math.floor(s/8)%4];
    if (s%8===0){ const [r,k]=ch; const third=k==='m'?3:4; [r-12, r-12+7].forEach(m=>musNote(t,m,e*8,'triangle',.05,.3)); [r, r+third, r+7].forEach(m=>musNote(t,m,e*8,'sine',.022,.6)); }
    if (s%4===2){ const [r,k]=ch; musNote(t, r+(k==='m'?3:4)+12, e*1.5,'sine',.012); }
    const d=tr.mel[s]; if (d!=null && (MUS.step>=32 || s<16 || true)){ const v=(Math.floor(MUS.step/32)%2 && s>=16) ? (tr.scale[(d+2)%tr.scale.length]) : tr.scale[d]; musNote(t, v, e*1.9, 'triangle', .045, .015); }
    MUS.next += e; MUS.step++; } }
function musStart(){ if (!MUS.on) return; try{
  if (!MUS.ctx){ MUS.ctx=new (window.AudioContext||window.webkitAudioContext)(); MUS.master=MUS.ctx.createGain(); MUS.master.gain.value=.7; const lp=MUS.ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=2600; MUS.master.connect(lp); lp.connect(MUS.ctx.destination); }
  if (MUS.ctx.state==='suspended') MUS.ctx.resume();
  if (!MUS.timer){ MUS.next=MUS.ctx.currentTime+.1; MUS.timer=setInterval(musTick, 120); } } catch(e){} }
function musStop(){ clearInterval(MUS.timer); MUS.timer=null; try{ MUS.ctx && MUS.ctx.suspend(); }catch(e){} }
function musRoom(r){ const t=MUS_ROOM(r); if (t!==MUS.track){ MUS.track=t; MUS.step=0; } }
function musToggle(){ MUS.on=!MUS.on; try{ localStorage.setItem('vainMusic', MUS.on?'on':'off'); }catch(e){} if (MUS.on) musStart(); else musStop(); const b=$('advMusic'); if (b) b.textContent=MUS.on?'🎵':'🔇'; }
document.addEventListener('visibilitychange',()=>{ if (!window.ADV) return; if (document.hidden) musStop(); else if (MUS.on && MUS.ctx) musStart(); });
['pointerdown','keydown'].forEach(ev=>document.addEventListener(ev,()=>{ if (window.ADV && MUS.on && !MUS.timer) musStart(); },{passive:true}));
