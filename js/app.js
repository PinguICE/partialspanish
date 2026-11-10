/* ============ BUILD QUESTION BANK ============ */
const QB=[];const CARDS=[];
Object.entries(CATS).forEach(([ck,c])=>{
  const backs=[...new Set(c.d.map(x=>x[1]))], fronts=c.d.map(x=>x[0]);
  c.d.forEach(([f,b],i)=>{
    const id=ck+i;
    CARDS.push({id,t:c.t,cat:ck,front:c.ask.replace('{f}',f),back:b,sub:f});
    QB.push({id:id+'f',t:c.t,type:'mc',q:c.ask.replace('{f}',f),a:b,pool:backs,e:`${f} → ${b}`,cat:ck,f,b});
    if(c.rev) QB.push({id:id+'r',t:c.t,type:'mc',q:c.rev.replace('{b}',b),a:f,pool:fronts,e:`${f} → ${b}`,cat:ck,f,b});
  });
});
HQ.forEach((h,i)=>{
  const [t,type,q,a,x,e]=h;const id='h'+i;
  if(type==='mc') QB.push({id,t,type,q,a,pool:[a,...x],e});
  else if(type==='tf') QB.push({id,t,type,q,a,e});
  else {QB.push({id,t,type,q,a,alts:x,e});CARDS.push({id:'fc'+id,t,cat:'fill',front:q.replace('____','<span style="color:#afafaf">____</span>'),back:a,ex:e});}
});
const QBI=Object.fromEntries(QB.map(q=>[q.id,q]));

/* ============ UTIL ============ */
const $=s=>document.querySelector(s);
const shuf=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
function seeded(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const sshuf=(a,seed)=>{const r=seeded(seed);a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const norm=s=>String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9 ]/g,'').trim().replace(/\s+/g,' ');
function lev(a,b){const m=a.length,n=b.length;const d=Array.from({length:m+1},(_,i)=>[i,...Array(n).fill(0)]);for(let j=1;j<=n;j++)d[0][j]=j;for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[m][n]}
function checkFill(q,val){const v=norm(val);if(!v)return false;return q.alts.some(a=>{const n=norm(a);return v===n||(n.length>5&&lev(v,n)<=1)})}
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const plain=s=>String(s).replace(/<br>/g,' ').replace(/<[^>]+>/g,'');
function opts(q){
  if(q.type==='tf') return ['True','False'];
  const d=shuf(q.pool.filter(x=>x!==q.a)).slice(0,3);
  return shuf([q.a,...d]);
}
const isRight=(q,ans)=>q.type==='tf'?(ans===(q.a?'True':'False')):q.type==='fill'?checkFill(q,ans):ans===q.a;
const answerText=q=>q.type==='tf'?(q.a?'True':'False'):q.a;

/* ============ STATE ============ */
const KEY='biolingo-v1';
let S={xp:0,streak:0,last:'',done:{},mist:{},best:{},known:{},snd:true};
try{const raw=localStorage.getItem(KEY);if(raw)S=Object.assign(S,JSON.parse(raw))}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}refreshTop()}
const today=()=>new Date().toISOString().slice(0,10);
function addXp(n){
  S.xp+=n;const t=today();
  if(S.last!==t){const y=new Date(Date.now()-864e5).toISOString().slice(0,10);S.streak=(S.last===y)?S.streak+1:1;S.last=t}
  save();
}
function miss(id){S.mist[id]=(S.mist[id]||0)+1}
function fix(id){if(S.mist[id]){S.mist[id]--;if(S.mist[id]<=0)delete S.mist[id]}}
function refreshTop(){
  $('#sXp').textContent=S.xp;$('#sStreak').textContent=S.streak;
  $('#sErr').textContent=Object.keys(S.mist).filter(k=>QBI[k]).length;
  $('#sndBtn').textContent=S.snd?'🔊':'🔇';
}

/* ============ SOUND ============ */
let AC;
function tone(seq){
  if(!S.snd)return;
  try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();let t=AC.currentTime;
    seq.forEach(([f,d,type])=>{const o=AC.createOscillator(),g=AC.createGain();o.type=type||'sine';o.frequency.value=f;g.gain.setValueAtTime(.12,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+d);t+=d*.8})}catch(e){}
}
const sOk=()=>tone([[660,.12],[880,.18]]),sBad=()=>tone([[220,.18,'square'],[180,.22,'square']]),sWin=()=>tone([[523,.12],[659,.12],[784,.12],[1047,.3]]);

/* ============ MASCOT ============ */
function mascot(sz=80,mood='happy'){
  const mouth=mood==='sad'?'<path d="M40 62 Q50 55 60 62" stroke="#2b5c00" stroke-width="3.5" fill="none" stroke-linecap="round"/>':'<path d="M38 58 Q50 70 62 58" stroke="#2b5c00" stroke-width="3.5" fill="#fff" stroke-linecap="round"/>';
  return `<svg class="mascot" width="${sz}" height="${sz}" viewBox="0 0 100 100"><ellipse cx="50" cy="94" rx="26" ry="4" fill="#0001"/>
  <path d="M50 8 C76 8 92 26 90 52 C88 78 72 90 50 90 C28 90 11 78 10 52 C9 26 24 8 50 8Z" fill="#58cc02"/>
  <path d="M50 8 C76 8 92 26 90 52 C70 40 30 40 10 52 C9 26 24 8 50 8Z" fill="#7ee03a" opacity=".5"/>
  <circle cx="22" cy="68" r="4" fill="#46a302"/><circle cx="80" cy="30" r="3" fill="#46a302"/><circle cx="76" cy="70" r="5" fill="#46a302"/>
  <circle cx="37" cy="40" r="11" fill="#fff"/><circle cx="63" cy="40" r="11" fill="#fff"/>
  <circle cx="39" cy="42" r="5.5" fill="#1e2b3a"/><circle cx="61" cy="42" r="5.5" fill="#1e2b3a"/>
  <circle cx="41" cy="40" r="1.8" fill="#fff"/><circle cx="63" cy="40" r="1.8" fill="#fff"/>
  <circle cx="27" cy="54" r="4" fill="#ff8fa3" opacity=".6"/><circle cx="73" cy="54" r="4" fill="#ff8fa3" opacity=".6"/>${mouth}
  <path d="M46 8 Q44 -2 52 0" stroke="#46a302" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`;
}
const TIPS=[
 'Vitaminas liposolubles: <b>A·D·E·K</b>. Hidrosolubles: <b>B·C</b> (se van con el agua 💧).',
 'Polisacáridos: <b>S</b>i <b>G</b>loria <b>C</b>ome <b>C</b>hocolate → Starch, Glycogen, Cellulose, Chitin.',
 'Disacáridos <b>L-M-S</b>: Lactose (milk), Maltose (beer, cereal), Saccharose (table sugar).',
 '<b>S</b>aturated = <b>S</b>ingle bonds = animal 🥩. Unsaturated = double bonds = vegetable oils 🫒.',
 'Fat molecule = <b>glycerol + fatty acids</b>.',
 'Vitamin <b>C</b> → absorbe <b>hierro</b>. Vitamin <b>D</b> → absorbe <b>calcio</b>.',
 'Fe = <b>F</b>errum (iron), K = <b>K</b>alium (potassium). ¡No te confundas!',
 '<b>Actin</b> sale dos veces: structural y contractile.',
 'Vitamins = <b>organic</b> · Minerals = <b>inorganic</b>.',
 'Ribose → <b>RNA</b>. Glucose → sangre y fotosíntesis.',
 'Glycogen → hígado y músculo. Cellulose → plantas. Chitin → insectos y crustáceos.'
];

/* ============ NAV ============ */
let tab='learn';
document.querySelectorAll('.nav button').forEach(b=>b.onclick=()=>go(b.dataset.tab));
function go(t,arg){tab=t;document.querySelectorAll('.nav button').forEach(b=>b.classList.toggle('on',b.dataset.tab===t));window.scrollTo(0,0);
  ({learn:renderLearn,cards:renderCards,kahoot:renderKahoot,exam:renderExam,notes:renderNotes})[t](arg)}
$('#sErrBtn').onclick=()=>practiceMistakes();
$('#sndBtn').onclick=()=>{S.snd=!S.snd;save()};

/* ============ LEARN PATH ============ */
function lessonChunks(t){
  const pool=sshuf(QB.filter(q=>q.t===t).map(q=>q.id),ORDER.indexOf(t)*97+13);
  const n=Math.ceil(pool.length/12),out=[];
  for(let i=0;i<n;i++)out.push(pool.filter((_,k)=>k%n===i));
  return out;
}
function renderLearn(){
  const tip=TIPS[Math.floor(Math.random()*TIPS.length)];
  const nm=Object.keys(S.mist).filter(k=>QBI[k]).length;
  let h=`<div class="hero">${mascot(84)}<div class="bubble">💡 ${tip}</div></div>`;
  if(nm) h+=`<div class="card row" style="justify-content:space-between;border-color:#ffb2b2;background:#fff5f5"><div><b style="font-weight:900;color:var(--red)">💔 ${nm} preguntas que fallaste</b><div style="color:var(--muted);font-weight:700;font-size:14px">Repásalas hasta que salgan bien</div></div><button class="btn red sm" onclick="practiceMistakes()">Practicar</button></div>`;
  let firstOpen=null;
  ORDER.forEach((t,ui)=>{
    const tt=T[t],chunks=lessonChunks(t);
    h+=`<div class="unit" style="background:${tt.c};box-shadow:0 4px 0 ${tt.d}"><div><p>UNIDAD ${ui+1}</p><h2>${tt.i} ${tt.n}</h2><p>${tt.es}</p></div><button class="btn sm" onclick="go('notes','${t}')">📖 Apuntes</button></div><div class="path">`;
    const nodes=chunks.map((c,i)=>({k:t+'-L'+i,ic:['⭐','📚','🧪','🔬','🧠','⚡'][i%6],lbl:'Lección '+(i+1),act:`startTopicLesson('${t}',${i})`}));
    nodes.push({k:t+'-match',ic:'🧩',lbl:'Une parejas',act:`startMatchLesson('${t}')`});
    nodes.push({k:t+'-fc',ic:'🃏',lbl:'Flashcards',act:`go('cards','${t}')`,nodone:1});
    nodes.push({k:t+'-ex',ic:'🏆',lbl:'Mini examen',act:`startExam('${t}',15)`,gold:1});
    nodes.forEach((n,i)=>{
      const cnt=S.done[n.k]||0,best=S.best[t];
      const doneN=n.gold?(best!=null):cnt>0;
      const off=Math.round(Math.sin(i*1.1)*70);
      const col=n.gold?(doneN?'#ffc800':tt.c):(doneN?'#ffc800':tt.c),dcol=n.gold?(doneN?'#e5a800':tt.d):(doneN?'#e5a800':tt.d);
      const isFirst=!firstOpen&&!doneN&&!n.nodone;if(isFirst)firstOpen=n.k;
      h+=`<div class="node-wrap" style="transform:translateX(${off}px)">${isFirst?'<div class="start-tip">¡EMPIEZA!</div>':''}
        <button class="node" style="background:${col};box-shadow:0 7px 0 ${dcol}" onclick="${n.act}">${n.ic}${cnt>0&&!n.gold?`<span class="crowns">👑${cnt}</span>`:''}${n.gold&&best!=null?`<span class="crowns">${best}%</span>`:''}</button>
        <div class="node-lbl">${n.lbl}</div></div>`;
    });
    h+='</div>';
  });
  h+=`<div class="unit" style="background:#3c3c3c;box-shadow:0 4px 0 #111"><div><p>REPASO FINAL</p><h2>🎯 Todo mezclado</h2><p>Para el día antes del examen</p></div></div><div class="path">
   <div class="node-wrap"><button class="node" style="background:#ce82ff;box-shadow:0 7px 0 #a568cc" onclick="startMixed()">🔀</button><div class="node-lbl">Lección mixta</div></div>
   <div class="node-wrap" style="transform:translateX(60px)"><button class="node" style="background:#46178f;box-shadow:0 7px 0 #2c0e5a" onclick="go('kahoot')">🎮</button><div class="node-lbl">Kahoot</div></div>
   <div class="node-wrap"><button class="node" style="background:#ffc800;box-shadow:0 7px 0 #e5a800" onclick="startExam('all',30)">🏆</button><div class="node-lbl">Examen final (30)</div></div></div>`;
  $('#main').innerHTML=h;
}
function startTopicLesson(t,i){const ids=lessonChunks(t)[i];runLesson(shuf(ids).map(id=>QBI[id]),{key:t+'-L'+i,title:T[t].n,match:t})}
function startMatchLesson(t){
  const cats=Object.keys(CATS).filter(c=>CATS[c].t===t&&CATS[c].rev);
  const qs=shuf(cats).slice(0,4).map(c=>({type:'match',cat:c,t,id:'m-'+c}));
  runLesson(qs,{key:t+'-match',title:T[t].n});
}
function startMixed(){runLesson(shuf(QB).slice(0,15),{key:'mixed',title:'Mixta',match:ORDER[Math.floor(Math.random()*5)]})}
function practiceMistakes(){
  const ids=Object.keys(S.mist).filter(k=>QBI[k]);
  if(!ids.length){toast('¡No tienes errores pendientes! 🎉');return}
  runLesson(shuf(ids).slice(0,15).map(id=>QBI[id]),{key:'mist',title:'Errores',mistakes:true});
}
function toast(msg){const d=document.createElement('div');d.textContent=msg;d.style.cssText='position:fixed;left:50%;top:70px;transform:translateX(-50%);background:#3c3c3c;color:#fff;padding:12px 18px;border-radius:14px;font-weight:800;z-index:200';document.body.appendChild(d);setTimeout(()=>d.remove(),2200)}

/* ============ LESSON ENGINE ============ */
let L=null;
function runLesson(qs,o){
  qs=[...qs];
  if(o.match){const cats=Object.keys(CATS).filter(c=>CATS[c].t===o.match&&CATS[c].rev);qs.splice(Math.min(4,qs.length),0,{type:'match',cat:cats[Math.floor(Math.random()*cats.length)],t:o.match,id:'m'})}
  L={qs,o,i:0,total:qs.length,correct:0,hearts:5,firstTry:0,answered:0,requeued:new Set(),start:Date.now(),state:'ask',sel:null};
  document.body.style.overflow='hidden';
  showQ();
}
function closeLesson(){$('#overlay').innerHTML='';document.body.style.overflow='';L=null;document.onkeydown=null;go(tab)}
function lessonShell(inner,foot){
  const pct=Math.round(L.correct/L.total*100);
  $('#overlay').innerHTML=`<div class="lesson"><div class="lhead"><button class="x" onclick="confirmQuit()">✕</button><div class="bar"><i style="width:${pct}%"></i></div><div class="hearts">❤️ ${L.hearts}</div></div>
  <div class="lbody" id="lbody">${inner}</div><div class="lfoot" id="lfoot">${foot}</div></div>`;
}
function confirmQuit(){
  if(L.correct===0){closeLesson();return}
  $('#lfoot').className='lfoot';$('#lfoot').innerHTML=`<div class="lfoot-in"><div class="fb" style="color:var(--ink)"><h3>¿Seguro que quieres salir?</h3><p>Perderás el progreso de esta lección.</p></div><div class="row"><button class="btn ghost sm" onclick="showQ()">Seguir</button><button class="btn red sm" onclick="closeLesson()">Salir</button></div></div>`;
}
function topicTag(t){const tt=T[t];return `<span style="color:${tt.d}">${tt.i} ${tt.n}</span>`}
function showQ(){
  if(L.i>=L.qs.length){finishLesson();return}
  const q=L.qs[L.i];L.state='ask';L.sel=null;
  const foot=`<div class="lfoot-in"><button class="btn ghost sm" onclick="skipQ()">Saltar</button><button class="btn" id="chk" disabled onclick="check()">Comprobar</button></div>`;
  let inner='';
  if(q.type==='match'){renderMatch(q);return}
  if(q.type==='mc'){
    L.opts=opts(q);
    inner=`<div class="qtag">${topicTag(q.t)} · Elige la respuesta correcta</div><div class="qtext">${q.q}</div><div class="opts">${L.opts.map((o,k)=>`<button class="opt" data-k="${k}" onclick="pick(${k})"><span class="k">${k+1}</span>${esc(o)}</button>`).join('')}</div>`;
  }else if(q.type==='tf'){
    L.opts=['True','False'];
    inner=`<div class="qtag">${topicTag(q.t)} · ¿Verdadero o falso?</div><div class="qtext">${q.q}</div><div class="tfgrid">${['✅ True','❌ False'].map((o,k)=>`<button class="opt" data-k="${k}" onclick="pick(${k})">${o}</button>`).join('')}</div>`;
  }else{
    inner=`<div class="qtag">${topicTag(q.t)} · Completa la frase</div><div class="qtext">${q.q.replace('____','<span style="color:var(--blue)">____</span>')}</div><input class="fill" id="fillIn" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Escribe en inglés…">`;
  }
  lessonShell(inner,foot);
  if(q.type==='fill'){const f=$('#fillIn');f.focus();f.oninput=()=>{L.sel=f.value;$('#chk').disabled=!f.value.trim()}}
  document.onkeydown=e=>{
    if(!L)return;
    if(e.key==='Enter'){e.preventDefault();if(L.state==='ask'&&L.sel!=null&&String(L.sel).trim())check();else if(L.state==='fb')next()}
    else if(L.state==='ask'&&q.type!=='fill'&&/^[1-4]$/.test(e.key)&&+e.key<=L.opts.length)pick(+e.key-1);
  };
}
function pick(k){if(L.state!=='ask')return;L.sel=L.opts[k];document.querySelectorAll('.opt').forEach(b=>b.classList.toggle('sel',+b.dataset.k===k));$('#chk').disabled=false}
function skipQ(){L.sel='__skip__';check()}
function check(){
  const q=L.qs[L.i];const ok=L.sel!=='__skip__'&&isRight(q,L.sel);L.state='fb';
  document.querySelectorAll('.opt').forEach(b=>{b.disabled=true;const v=L.opts[+b.dataset.k];if(v===answerText(q))b.classList.add('good');else if(v===L.sel)b.classList.add('badc');b.classList.remove('sel')});
  const fi=$('#fillIn');if(fi)fi.disabled=true;
  if(ok){
    sOk();L.correct++;if(!L.requeued.has(q.id))L.firstTry++;
    if(L.o.mistakes)fix(q.id);
  }else{
    sBad();L.hearts--;miss(q.id);
    if(!L.requeued.has(q.id)){L.requeued.add(q.id);L.qs.push(q)}else{L.qs.push(q)}
  }
  save();
  const praise=['¡Excelente!','¡Bien hecho!','¡Correcto!','¡Genial!','¡Eso es!'];
  const f=$('#lfoot');f.className='lfoot '+(ok?'ok':'bad');
  f.innerHTML=`<div class="lfoot-in"><div class="fb"><h3>${ok?'✔ '+praise[Math.floor(Math.random()*praise.length)]:'✖ Respuesta correcta:'}</h3><p>${ok?esc(plain(q.e||'')):'<b>'+esc(answerText(q))+'</b><br>'+esc(plain(q.e||''))}</p></div><button class="btn" onclick="next()">Continuar</button></div>`;
  $('.lhead .bar i').style.width=Math.round(L.correct/L.total*100)+'%';
  $('.hearts').textContent='❤️ '+L.hearts;
}
function next(){
  if(L.hearts<=0){outOfHearts();return}
  L.i++;showQ();
}
function outOfHearts(){
  lessonShell(`<div class="done-screen">${mascot(130,'sad')}<h1 style="color:var(--red)">¡Te quedaste sin vidas!</h1><p class="sub">No pasa nada: los errores ya se guardaron para repasarlos. ¡Inténtalo otra vez!</p></div>`,
   `<div class="lfoot-in"><button class="btn ghost" onclick="closeLesson()">Salir</button><button class="btn" onclick="retryLesson()">Reintentar</button></div>`);
}
function retryLesson(){const base=L.qs.slice(0,L.total).filter(q=>q.type!=='match');const o=L.o;runLesson(shuf(base),o)}
function finishLesson(){
  const secs=Math.round((Date.now()-L.start)/1000);
  const acc=Math.round(L.firstTry/L.total*100);
  const xp=10+L.firstTry*2+(L.hearts===5?5:0);
  addXp(xp);S.done[L.o.key]=(S.done[L.o.key]||0)+1;save();sWin();confetti();
  lessonShell(`<div class="done-screen">${mascot(130)}<h1>¡Lección completada!</h1>
   <div class="tiles"><div class="tile" style="border-color:#ffc800"><div class="h" style="background:#ffc800">XP total</div><div class="v" style="color:#e5a800">⚡ ${xp}</div></div>
   <div class="tile" style="border-color:#58cc02"><div class="h" style="background:#58cc02">Precisión</div><div class="v" style="color:#58a700">🎯 ${acc}%</div></div>
   <div class="tile" style="border-color:#1cb0f6"><div class="h" style="background:#1cb0f6">Tiempo</div><div class="v" style="color:#1899d6">⏱ ${Math.floor(secs/60)}:${String(secs%60).padStart(2,'0')}</div></div></div>
   <p class="sub">${acc>=90?'¡Dominas este tema! Prueba el mini examen 🏆':acc>=70?'¡Vas muy bien! Repite la lección para subir la precisión.':'Revisa los apuntes 📖 y vuelve a intentarlo.'}</p></div>`,
   `<div class="lfoot-in"><button class="btn ghost" onclick="retryLesson()">Repetir</button><button class="btn" onclick="closeLesson()">Continuar</button></div>`);
  document.onkeydown=e=>{if(e.key==='Enter')closeLesson()};
}
function confetti(){const cs=['#58cc02','#1cb0f6','#ffc800','#ff4b4b','#ce82ff'];for(let i=0;i<60;i++){const d=document.createElement('div');d.className='confetti';d.style.left=Math.random()*100+'vw';d.style.background=cs[i%5];d.style.animationDuration=(1.6+Math.random()*1.6)+'s';d.style.animationDelay=Math.random()*.4+'s';document.body.appendChild(d);setTimeout(()=>d.remove(),3800)}}

/* match */
function renderMatch(q){
  const c=CATS[q.cat];const pairs=shuf(c.d).slice(0,5);
  const lefts=shuf(pairs.map(p=>p[0])),rights=shuf(pairs.map(p=>p[1]));
  const map=Object.fromEntries(pairs);
  L.m={map,left:null,right:null,done:0,n:pairs.length,err:0};
  const label={'carb-desc':'carbohidrato ↔ descripción','lipid-type':'lípido ↔ descripción','lipid-fat':'término ↔ descripción','prot-ex':'tipo de proteína ↔ ejemplos','prot-fn':'tipo de proteína ↔ función','vit-fn':'vitamina ↔ función','vit-src':'vitamina ↔ alimentos','vit-def':'vitamina ↔ deficiencia','min-sym':'mineral ↔ símbolo','min-fn':'mineral ↔ función','min-src':'mineral ↔ alimentos','min-def':'mineral ↔ deficiencia'}[q.cat]||'parejas';
  lessonShell(`<div class="qtag">${topicTag(q.t)} · Une las parejas</div><div class="qtext">Toca las parejas: ${label}</div>
   <div class="match"><div class="col">${lefts.map((x,i)=>`<button class="mbtn" data-s="l" data-v="${esc(x)}" onclick="mTap(this)">${esc(x)}</button>`).join('')}</div>
   <div class="col">${rights.map(x=>`<button class="mbtn" data-s="r" data-v="${esc(x)}" onclick="mTap(this)">${esc(x)}</button>`).join('')}</div></div>`,
   `<div class="lfoot-in"><span></span><button class="btn" id="chk" disabled>Comprobar</button></div>`);
  document.onkeydown=null;
}
function mTap(b){
  if(b.classList.contains('done'))return;
  const s=b.dataset.s;document.querySelectorAll(`.mbtn[data-s="${s}"]`).forEach(x=>x.classList.remove('sel'));
  b.classList.add('sel');L.m[s==='l'?'left':'right']=b;
  const {left,right}=L.m;if(!left||!right)return;
  const lv=left.textContent,rv=right.textContent;
  if(L.m.map[lv]===rv){
    sOk();[left,right].forEach(x=>{x.classList.remove('sel');x.classList.add('right');setTimeout(()=>{x.classList.remove('right');x.classList.add('done')},350)});
    L.m.done++;
    if(L.m.done===L.m.n){
      L.correct++;if(L.m.err<2)L.firstTry++;L.state='fb';
      setTimeout(()=>{const f=$('#lfoot');f.className='lfoot ok';f.innerHTML=`<div class="lfoot-in"><div class="fb"><h3>✔ ¡Todas las parejas!</h3><p>${L.m.err?L.m.err+' intento(s) fallido(s)':'¡Perfecto, sin errores!'}</p></div><button class="btn" onclick="next()">Continuar</button></div>`;$('.lhead .bar i').style.width=Math.round(L.correct/L.total*100)+'%';document.onkeydown=e=>{if(e.key==='Enter')next()}},380);
    }
  }else{
    sBad();L.m.err++;[left,right].forEach(x=>{x.classList.remove('sel');x.classList.add('wrong');setTimeout(()=>x.classList.remove('wrong'),400)});
  }
  L.m.left=L.m.right=null;
}

/* ============ FLASHCARDS ============ */
let FC=null;
function renderCards(t){
  const topic=t||(FC&&FC.topic)||'all';
  const deck=CARDS.filter(c=>topic==='all'||c.t===topic);
  FC={topic,queue:shuf(deck.filter(c=>!S.known[c.id])),total:deck.length,flip:false};
  drawCards();
}
function drawCards(){
  const known=CARDS.filter(c=>(FC.topic==='all'||c.t===FC.topic)&&S.known[c.id]).length;
  let h=`<h1 class="title">🃏 Flashcards</h1><p class="sub">Toca la tarjeta para voltearla. Si te la sabes, desaparece; si no, vuelve a salir más adelante.</p>
  <div class="chips">${['all',...ORDER].map(k=>`<button class="chip ${FC.topic===k?'on':''}" onclick="renderCards('${k}')">${k==='all'?'🌐 Todo':T[k].i+' '+T[k].es}</button>`).join('')}</div>
  <div class="row" style="justify-content:space-between;margin-bottom:6px"><b style="color:var(--green-d)">✅ ${known}/${FC.total} dominadas</b><button class="btn ghost sm" onclick="resetCards()">↺ Reiniciar mazo</button></div>
  <div class="bar" style="flex:none"><i style="width:${Math.round(known/FC.total*100)}%"></i></div>`;
  if(!FC.queue.length){
    h+=`<div class="empty">${mascot(110)}<h2 style="margin:10px 0">¡Dominaste todo este mazo! 🎉</h2><p>Reinícialo para repasar otra vez o pasa al modo Kahoot.</p><br><button class="btn" onclick="resetCards()">Repasar de nuevo</button></div>`;
  }else{
    const c=FC.queue[0],tt=T[c.t];
    h+=`<div class="fc-wrap"><div class="fc ${FC.flip?'flip':''}" id="fc" onclick="flipCard()">
      <div class="fc-face"><span class="t" style="color:${tt.d}">${tt.i} ${tt.n}</span><div class="main">${c.front}</div><span class="hint">toca para ver la respuesta · espacio</span></div>
      <div class="fc-face fc-back"><span class="t" style="color:var(--ok-ink)">Respuesta</span><div class="main">${esc(c.back)}</div>${c.ex?`<div class="ex">${esc(c.ex)}</div>`:''}</div></div></div>
      <div class="row" style="justify-content:center;gap:14px"><button class="btn red" onclick="cardAns(false)">😵 Otra vez</button><button class="btn" onclick="cardAns(true)">✅ Me la sé</button></div>
      <p style="text-align:center;color:var(--muted);font-weight:700;margin-top:14px;font-size:14px">Quedan ${FC.queue.length} · Teclado: espacio = voltear, ← otra vez, → me la sé</p>`;
  }
  $('#main').innerHTML=h;
  document.onkeydown=e=>{if(tab!=='cards'||L||K)return;if(e.key===' '){e.preventDefault();flipCard()}else if(e.key==='ArrowRight')cardAns(true);else if(e.key==='ArrowLeft')cardAns(false)};
}
function flipCard(){FC.flip=!FC.flip;const f=$('#fc');if(f)f.classList.toggle('flip',FC.flip)}
function cardAns(ok){
  if(!FC.queue.length)return;const c=FC.queue.shift();
  if(ok){S.known[c.id]=1;addXp(1)}else{FC.queue.splice(Math.min(3+Math.floor(Math.random()*3),FC.queue.length),0,c)}
  FC.flip=false;save();drawCards();
}
function resetCards(){CARDS.forEach(c=>{if(FC.topic==='all'||c.t===FC.topic)delete S.known[c.id]});save();renderCards(FC.topic)}

/* ============ KAHOOT ============ */
let K=null,KCFG={topic:'all',n:15,time:20};
function renderKahoot(){
  $('#main').innerHTML=`<div style="background:#46178f;color:#fff;border-radius:20px;padding:24px;margin-bottom:18px;box-shadow:0 5px 0 #2c0e5a">
   <h1 style="font-size:30px;font-weight:900">🎮 Modo Kahoot!</h1><p style="font-weight:700;opacity:.9;margin-top:6px">Contra reloj: entre más rápido contestes, más puntos. ¡Encadena rachas para bonus! Compites contra tus “compañeros” virtuales.</p></div>
   <div class="lbl">Tema</div><div class="chips" id="kTopic">${['all',...ORDER].map(k=>`<button class="chip ${KCFG.topic===k?'on':''}" data-v="${k}">${k==='all'?'🌐 Todo':T[k].i+' '+T[k].es}</button>`).join('')}</div>
   <div class="lbl">Preguntas</div><div class="chips" id="kN">${[10,15,20,30].map(k=>`<button class="chip ${KCFG.n===k?'on':''}" data-v="${k}">${k}</button>`).join('')}</div>
   <div class="lbl">Tiempo por pregunta</div><div class="chips" id="kT">${[10,20,30].map(k=>`<button class="chip ${KCFG.time===k?'on':''}" data-v="${k}">${k}s</button>`).join('')}</div>
   <br><button class="btn wide" style="background:#46178f;box-shadow:0 4px 0 #2c0e5a" onclick="startKahoot()">▶ Jugar</button>`;
  [['kTopic','topic',x=>x],['kN','n',Number],['kT','time',Number]].forEach(([id,key,cv])=>document.querySelectorAll('#'+id+' .chip').forEach(b=>b.onclick=()=>{KCFG[key]=cv(b.dataset.v);renderKahoot()}));
}
const SHAPES=['<svg viewBox="0 0 32 32"><path d="M16 3 L30 28 H2Z" fill="#fff"/></svg>','<svg viewBox="0 0 32 32"><path d="M16 2 L30 16 L16 30 L2 16Z" fill="#fff"/></svg>','<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="#fff"/></svg>','<svg viewBox="0 0 32 32"><rect x="4" y="4" width="24" height="24" fill="#fff"/></svg>'];
const BOTS=['Sofi','Diego','Vale','Emi','Regina','Santi'];
function startKahoot(){
  const pool=QB.filter(q=>(KCFG.topic==='all'||q.t===KCFG.topic)&&q.type!=='fill');
  K={qs:shuf(pool).slice(0,KCFG.n),i:0,score:0,streak:0,correct:0,bots:shuf(BOTS).slice(0,4).map(n=>({n,s:0,skill:.45+Math.random()*.4})),timer:null};
  document.body.style.overflow='hidden';kQ();
}
function kQ(){
  const q=K.qs[K.i];K.opts=opts(q);K.t0=Date.now();K.locked=false;
  const lim=KCFG.time;
  $('#overlay').innerHTML=`<div class="kh"><div class="kh-top"><span>${K.i+1} / ${K.qs.length}</span><span>${T[q.t].i} ${T[q.t].n}</span><span>${K.score} pts ${K.streak>1?'🔥'+K.streak:''}</span></div>
   <div class="kh-q">${q.type==='tf'?'¿Verdadero o falso? ':''}${q.q}</div>
   <div class="kh-mid"><div class="kh-timer" id="kTime">${lim}</div><div style="text-align:right;font-weight:900"><div style="font-size:30px" id="kAnsN">0</div>respuestas</div></div>
   <div class="kh-ans">${K.opts.map((o,k)=>{const ci=q.type==='tf'?(k===0?1:0):k;return `<button class="kh-a c${ci}" data-k="${k}" onclick="kPick(${k})">${SHAPES[ci]}<span>${esc(o)}</span></button>`}).join('')}</div>
   <div style="text-align:center;padding-bottom:10px"><button style="color:#fff;opacity:.6;font-weight:800" onclick="kQuit()">Salir</button></div></div>`;
  clearInterval(K.timer);
  let botN=0;
  K.timer=setInterval(()=>{
    const left=lim-Math.floor((Date.now()-K.t0)/1000);
    const el=$('#kTime');if(el)el.textContent=Math.max(0,left);
    if(Math.random()<.35&&botN<K.bots.length){botN++;const n=$('#kAnsN');if(n)n.textContent=botN}
    if(left<=0)kPick(-1);
  },250);
  document.onkeydown=e=>{if(K&&!K.locked&&/^[1-4]$/.test(e.key)&&+e.key<=K.opts.length)kPick(+e.key-1)};
}
function kPick(k){
  if(K.locked)return;K.locked=true;clearInterval(K.timer);
  const q=K.qs[K.i];const el=(Date.now()-K.t0)/1000,lim=KCFG.time;
  const ok=k>=0&&isRight(q,K.opts[k]);let pts=0;
  if(ok){K.streak++;K.correct++;pts=Math.round(1000*(1-Math.min(el,lim)/lim/2))+(K.streak>1?Math.min(K.streak-1,5)*100:0);K.score+=pts;sOk();fix(q.id)}
  else{K.streak=0;sBad();miss(q.id)}
  K.bots.forEach(b=>{if(Math.random()<b.skill)b.s+=Math.round(500+Math.random()*450)});
  save();
  const rank=[...K.bots.map(b=>b.s),K.score].sort((a,b)=>b-a).indexOf(K.score)+1;
  $('#overlay').innerHTML=`<div class="kh ${ok?'ok':'bad'}"><div class="kh-res">
   <h2>${ok?'✔ ¡Correcto!':k<0?'⏰ ¡Se acabó el tiempo!':'✖ Incorrecto'}</h2>
   ${ok?`<div class="pts">+${pts}</div>${K.streak>1?`<div style="font-weight:900;font-size:20px">🔥 Racha de ${K.streak}</div>`:''}`:`<div class="pts" style="font-size:20px">Respuesta: ${esc(answerText(q))}</div>`}
   <div class="exp">${esc(plain(q.e||''))}</div>
   <div style="font-weight:900;font-size:18px">Vas en el lugar #${rank} · ${K.score} pts</div>
   <button class="kh-btn" onclick="kNext()">${K.i+1<K.qs.length?'Siguiente ▶':'Ver podio 🏆'}</button></div></div>`;
  document.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();kNext()}};
}
function kNext(){K.i++;if(K.i<K.qs.length)kQ();else kEnd()}
function kEnd(){
  const all=[...K.bots.map(b=>({n:b.n,s:b.s})),{n:'Tú',s:K.score,me:1}].sort((a,b)=>b.s-a.s);
  const myRank=all.findIndex(x=>x.me)+1;
  addXp(Math.round(K.score/200));if(myRank===1){sWin();confetti()}
  const pod=[all[1],all[0],all[2]];const hts=[120,170,90];
  $('#overlay').innerHTML=`<div class="kh" style="overflow:auto"><div class="kh-res">
   <h2>${myRank===1?'🏆 ¡GANASTE!':myRank<=3?'🥈 ¡Al podio!':'¡Buen intento!'}</h2>
   <div style="font-weight:800">${K.correct} de ${K.qs.length} correctas</div>
   <div class="podium">${pod.map((p,i)=>p?`<div class="pod ${p.me?'me':''}" style="height:${hts[i]}px"><div style="font-size:26px">${['🥈','🥇','🥉'][i]}</div>${p.n}<div style="font-size:13px">${p.s}</div></div>`:'').join('')}</div>
   <div class="board">${all.map((p,i)=>`<div class="${p.me?'me':''}"><span>${i+1}. ${p.n}</span><span>${p.s}</span></div>`).join('')}</div>
   <div class="row" style="justify-content:center;margin-top:10px"><button class="kh-btn" onclick="startKahoot()">↻ Otra vez</button><button class="kh-btn" style="background:transparent;color:#fff;border:2px solid #fff" onclick="kQuit()">Salir</button></div></div></div>`;
  document.onkeydown=null;
}
function kQuit(){if(K)clearInterval(K.timer);K=null;$('#overlay').innerHTML='';document.body.style.overflow='';document.onkeydown=null;go(tab)}

/* ============ EXAM ============ */
let EX=null,ECFG={topic:'all',n:20};
function renderExam(){
  if(EX&&!EX.graded){drawExam();return}
  const bests=ORDER.map(t=>S.best[t]!=null?`<span class="chip">${T[t].i} ${S.best[t]}%</span>`:'').join('')+(S.best.all!=null?`<span class="chip">🌐 Final ${S.best.all}%</span>`:'');
  $('#main').innerHTML=`<h1 class="title">📝 Examen de práctica</h1><p class="sub">Como el examen real: no ves si acertaste hasta que entregas. Al final te doy calificación sobre 10, qué temas reforzar y la explicación de cada error.</p>
   ${bests?`<div class="lbl">Tus mejores resultados</div><div class="chips">${bests}</div>`:''}
   <div class="lbl">Tema</div><div class="chips" id="eTopic">${['all',...ORDER].map(k=>`<button class="chip ${ECFG.topic===k?'on':''}" data-v="${k}">${k==='all'?'🌐 Todo':T[k].i+' '+T[k].es}</button>`).join('')}</div>
   <div class="lbl">Número de preguntas</div><div class="chips" id="eN">${[10,20,30,40].map(k=>`<button class="chip ${ECFG.n===k?'on':''}" data-v="${k}">${k}</button>`).join('')}</div>
   <br><button class="btn wide gold" onclick="startExam(ECFG.topic,ECFG.n)">Comenzar examen</button>`;
  [['eTopic','topic',x=>x],['eN','n',Number]].forEach(([id,key,cv])=>document.querySelectorAll('#'+id+' .chip').forEach(b=>b.onclick=()=>{ECFG[key]=cv(b.dataset.v);renderExam()}));
}
function startExam(topic,n){
  let pool=QB.filter(q=>topic==='all'||q.t===topic);
  let qs;
  if(topic==='all'){const per=Math.ceil(n/5);qs=shuf(ORDER.flatMap(t=>shuf(pool.filter(q=>q.t===t)).slice(0,per))).slice(0,n)}
  else qs=shuf(pool).slice(0,n);
  // ensure mix of types: sort so not all same? keep random
  EX={topic,qs:qs.map(q=>({q,opts:q.type==='fill'?null:opts(q),ans:null})),start:Date.now(),graded:false};
  ECFG.topic=topic;ECFG.n=n;
  if(L)closeLesson();go('exam');
}
let exTimer=null;
function drawExam(){
  let h=`<div class="row" style="justify-content:space-between;margin-bottom:14px"><h1 class="title" style="margin:0">📝 Examen · ${EX.topic==='all'?'Todo':T[EX.topic].n}</h1><b id="exClock" style="color:var(--muted);font-size:18px">⏱ 0:00</b></div>`;
  EX.qs.forEach((it,i)=>{
    const q=it.q;
    h+=`<div class="eq" id="eq${i}"><div class="n"><span>PREGUNTA ${i+1}</span><span>${T[q.t].i} ${T[q.t].n}</span></div><div class="qq">${q.type==='tf'?'True or false: ':''}${q.type==='fill'?q.q.replace('____','<span style="color:var(--blue)">____</span>'):q.q}</div>`;
    if(q.type==='fill')h+=`<input class="fill" style="font-size:17px;padding:12px" data-i="${i}" oninput="exFill(this)" value="${esc(it.ans||'')}" placeholder="Tu respuesta (en inglés)…" autocomplete="off" spellcheck="false">`;
    else h+=it.opts.map((o,k)=>`<label class="eopt ${it.ans===o?'sel':''}"><input type="radio" name="q${i}" ${it.ans===o?'checked':''} onchange="exPick(${i},${k})">${esc(o)}</label>`).join('');
    h+='</div>';
  });
  h+=`<div class="sticky-sub"><b id="exCount"></b><button class="btn gold" onclick="gradeExam()">Entregar examen</button></div>`;
  $('#main').innerHTML=h;exCount();
  clearInterval(exTimer);exTimer=setInterval(()=>{const c=$('#exClock');if(!c||!EX||EX.graded){clearInterval(exTimer);return}const s=Math.round((Date.now()-EX.start)/1000);c.textContent=`⏱ ${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`},1000);
}
function exPick(i,k){EX.qs[i].ans=EX.qs[i].opts[k];document.querySelectorAll(`#eq${i} .eopt`).forEach((l,j)=>l.classList.toggle('sel',j===k));exCount()}
function exFill(el){EX.qs[+el.dataset.i].ans=el.value;exCount()}
function exCount(){const n=EX.qs.filter(x=>x.ans&&String(x.ans).trim()).length;const c=$('#exCount');if(c)c.textContent=`${n}/${EX.qs.length} contestadas`}
function gradeExam(){
  const blank=EX.qs.filter(x=>!x.ans||!String(x.ans).trim()).length;
  if(blank&&!EX.warned){EX.warned=true;toast(`Te faltan ${blank} preguntas. Toca “Entregar” otra vez para entregar así.`);return}
  clearInterval(exTimer);EX.graded=true;
  const secs=Math.round((Date.now()-EX.start)/1000);
  let right=0;const by={};
  EX.qs.forEach(it=>{it.ok=!!it.ans&&isRight(it.q,it.ans);if(it.ok){right++;fix(it.q.id)}else miss(it.q.id);by[it.q.t]=by[it.q.t]||[0,0];by[it.q.t][1]++;if(it.ok)by[it.q.t][0]++});
  const pct=Math.round(right/EX.qs.length*100),grade=(right/EX.qs.length*10).toFixed(1);
  S.best[EX.topic]=Math.max(S.best[EX.topic]||0,pct);addXp(right*2);save();
  if(pct>=80){sWin();confetti()}
  const col=pct>=80?'var(--green)':pct>=60?'#e5a800':'var(--red)';
  const weak=Object.entries(by).filter(([t,[a,b]])=>a/b<.7).map(([t])=>t);
  let h=`<div class="card" style="text-align:center;border-color:${col}">
    <div class="row" style="justify-content:center;gap:20px">${mascot(90,pct>=60?'happy':'sad')}<div><div class="grade" style="color:${col}">${grade}</div><b style="color:var(--muted)">de 10 · ${right}/${EX.qs.length} · ${Math.floor(secs/60)}:${String(secs%60).padStart(2,'0')} min</b></div></div>
    <p style="font-weight:800;margin-top:12px">${pct>=90?'¡Estás listo! 🔥':pct>=80?'¡Muy bien! Unos detalles más y queda perfecto.':pct>=60?'Vas aprobando, pero refuerza los temas marcados.':'Necesitas repasar. Ve a Apuntes y luego a las lecciones.'}</p></div>
   <div class="lbl">Por tema</div><div class="breaks">${Object.entries(by).map(([t,[a,b]])=>{const p=Math.round(a/b*100);return `<div class="brk"><span style="width:150px">${T[t].i} ${T[t].es}</span><div class="bb"><i style="width:${p}%;background:${p>=80?'var(--green)':p>=60?'var(--gold)':'var(--red)'}"></i></div><span style="width:70px;text-align:right">${a}/${b}</span></div>`}).join('')}</div>
   ${weak.length?`<div class="tip">📌 Refuerza: ${weak.map(t=>`<a href="#" onclick="go('notes','${t}');return false" style="color:#b37a00">${T[t].es}</a>`).join(', ')}</div>`:''}
   <div class="row" style="margin:14px 0"><button class="btn sm" onclick="startExam(EX.topic,EX.qs.length)">↻ Otro examen</button>${EX.qs.some(x=>!x.ok)?'<button class="btn red sm" onclick="practiceMistakes()">Practicar mis errores</button>':''}<button class="btn ghost sm" onclick="EX=null;renderExam()">Cambiar tema</button></div>
   <div class="lbl">Revisión</div>`;
  EX.qs.forEach((it,i)=>{
    const q=it.q;const corr=answerText(q);
    h+=`<div class="eq ${it.ok?'right':'wrong'}"><div class="n"><span>${it.ok?'✅':'❌'} PREGUNTA ${i+1}</span><span>${T[q.t].i} ${T[q.t].n}</span></div><div class="qq">${q.type==='tf'?'True or false: ':''}${q.q}</div>`;
    if(q.type==='fill')h+=`<div class="eopt ${it.ok?'good':'badc'}">Tu respuesta: <b>${esc(it.ans||'—')}</b></div>${it.ok?'':`<div class="eopt good">Correcta: <b>${esc(corr)}</b></div>`}`;
    else h+=it.opts.map(o=>`<div class="eopt ${o===corr?'good':o===it.ans?'badc':''}">${o===corr?'✔':o===it.ans?'✖':'○'} ${esc(o)}</div>`).join('');
    h+=`<div class="why">💡 ${esc(plain(q.e||''))}</div></div>`;
  });
  $('#main').innerHTML=h;window.scrollTo(0,0);
}

/* ============ NOTES ============ */
function tbl(head,rows){return `<div style="overflow-x:auto"><table style="min-width:${head.length>3?560:0}px"><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</table></div>`}
function renderNotes(t){
  const V=CATS['vit-fn'].d.map((x,i)=>[x[0].replace('Vitamin ',''),CATS['vit-type'].d[i][1],x[1],CATS['vit-src'].d[i][1],CATS['vit-def'].d[i][1]]);
  const M=CATS['min-fn'].d.map((x,i)=>[x[0],CATS['min-sym'].d[i][1],x[1],CATS['min-src'].d[i][1],CATS['min-def'].d[i][1]]);
  const P=CATS['prot-ex'].d.map((x,i)=>[x[0],x[1],CATS['prot-fn'].d[i][1]]);
  $('#main').innerHTML=`<div class="notes"><h1 class="title">📖 Apuntes rápidos</h1><p class="sub">Todo lo de tus PDFs, resumido. Lee un tema y luego haz su lección.</p>
  <div class="toc">${ORDER.map(k=>`<button class="chip" onclick="document.getElementById('n-${k}').scrollIntoView({behavior:'smooth'})">${T[k].i} ${T[k].es}</button>`).join('')}</div>

  <h2 id="n-carbs" style="color:${T.carbs.d}">🍞 Carbohydrates</h2>
  <p>Macromolecules that include <b>glucose and polymers of glucose</b>. Divided into <b>simple</b> and <b>complex</b>.</p>
  ${tbl(['Group','Type','Examples'],[['Simple','Monosaccharides','Glucose, fructose, galactose, ribose'],['Simple','Disaccharides','Lactose, maltose, saccharose'],['Complex','Oligosaccharides','Starch dextrins'],['Complex','Polysaccharides','Starch, glycogen, cellulose, chitin']])}
  ${tbl(['Carbohydrate','Key fact'],CATS['carb-desc'].d.map(x=>[`<b>${x[0]}</b>`,x[1]]))}
  <div class="tip">🧠 Polisacáridos: <b>S</b>i <b>G</b>loria <b>C</b>ome <b>C</b>hocolate (Starch, Glycogen, Cellulose, Chitin)<br>🧠 Disacáridos <b>L-M-S</b>: Lactose 🥛 · Maltose 🍺 · Saccharose 🍬</div>
  <button class="btn sm" onclick="startTopicLesson('carbs',0)">Practicar Carbohydrates →</button>

  <h2 id="n-lipids" style="color:${T.lipids.d}">🧈 Lipids</h2>
  <ul><li>Cells store energy for <b>long-term</b> use as <b>fats</b>.</li><li>Provide <b>insulation</b>; water-repellent (<b>hydrophobic</b>) layer keeps aquatic birds and mammals dry.</li><li>Building blocks of many <b>hormones</b>; part of <b>all cell membranes</b>.</li></ul>
  <h3>Functions</h3><ul><li>Provide energy and maintain body temperature</li><li>Transport proteins</li><li>Form membranes of organs and tissues</li><li>Create texture and flavor in foods</li><li>Regulate basic bodily functions for growth</li></ul>
  <h3>Types</h3>${tbl(['Type','Note'],[['Fats and oils','Glycerol + fatty acids'],['Waxes','—'],['Phospholipids','Found in cell membranes'],['Acylglycerides','Reserve triglycerides in animals'],['Steroids','Cholesterol and bile salts'],['Carotenoids','Vitamin A precursors']])}
  <h3>Fats and oils</h3>${tbl(['','Saturated','Unsaturated'],[['Bonds','Single bonds only','Double bonds'],['Source','Animal foods (meat, dairy)','Vegetable oils, omegas'],['Health','Can be toxic → heart problems','Good effects on health']])}
  <p><b>Glycerol</b> = glycerin (organic compound). <b>Fatty acids</b> = simplest form of lipids (carbon chains).</p>
  <div class="tip">🧠 <b>S</b>aturated = <b>S</b>ingle bonds = animal 🥩 · Unsaturated = double = plants 🫒</div>
  <button class="btn sm" onclick="startTopicLesson('lipids',0)">Practicar Lipids →</button>

  <h2 id="n-proteins" style="color:${T.proteins.d}">🥩 Proteins</h2>
  <ul><li>One of the most abundant <b>organic</b> molecules in living systems.</li><li>May serve in <b>transport, storage, or membranes</b>.</li><li>Each cell may contain <b>thousands</b> of proteins, each with a unique function; structures vary greatly.</li></ul>
  ${tbl(['Type','Examples','Function'],P.map(r=>[`<b>${r[0]}</b>`,r[1],r[2]]))}
  <div class="tip">🧠 <b>Actin</b> aparece en structural y contractile · <b>Albumin</b> en transport y storage (egg white)</div>
  <button class="btn sm" onclick="startTopicLesson('proteins',0)">Practicar Proteins →</button>

  <h2 id="n-vitamins" style="color:${T.vitamins.d}">🥕 Vitamins</h2>
  <p><b>Organic</b> micronutrients needed in small amounts for health, growth and normal body functions. They <b>do not provide energy directly</b>.</p>
  ${tbl(['Vit.','Type','Function','Sources','Deficiency'],V.map(r=>[`<b>${r[0]}</b>`,...r.slice(1)]))}
  ${tbl(['Fat-soluble: A·D·E·K','Water-soluble: B·C'],[['Dissolve in fats','Dissolve in water'],['Can be stored in the body','Most not stored in large amounts'],['Absorbed with dietary fats','Need regular dietary intake']])}
  <div class="tip">🧠 Vitamin <b>C</b> helps absorb <b>iron</b> · Vitamin <b>D</b> helps absorb <b>calcium</b></div>
  <button class="btn sm" onclick="startTopicLesson('vitamins',0)">Practicar Vitamins →</button>

  <h2 id="n-minerals" style="color:${T.minerals.d}">🪨 Minerals</h2>
  <p><b>Inorganic</b> micronutrients that help build body structures and regulate physiological processes.</p>
  ${tbl(['Mineral','Symbol','Function','Sources','Deficiency'],M.map(r=>[`<b>${r[0]}</b>`,`<b>${r[1]}</b>`,...r.slice(2)]))}
  <h3>Vitamins vs. Minerals</h3>${tbl(['','Vitamins','Minerals'],[['Chemical nature','Organic','Inorganic'],['Examples','A, B, C, D, E, K','Fe, Ca, K, Zn'],['Main role','Regulate body processes','Structural and regulatory functions'],['Sources','Fruits, vegetables, animal foods','Vegetables, dairy, meat, seafood']])}
  <div class="tip">🧠 Fe = <b>F</b>errum (iron) · K = <b>K</b>alium (potassium) · Iodine → thyroid → goiter</div>
  <button class="btn sm" onclick="startTopicLesson('minerals',0)">Practicar Minerals →</button>
  </div>`;
  if(t&&T[t])setTimeout(()=>document.getElementById('n-'+t).scrollIntoView(),30);
}

refreshTop();go('learn');
