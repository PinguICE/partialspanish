// Vocab Quest — contenido basado en el PDF S2 Vocabulario 1.
const WORDS = [
 {w:"Hender",cat:"Verbo",mini:"Abrir o rajar algo, sin partirlo por completo.",full:"Abrir o rajar un cuerpo sólido sin dividirlo del todo; también abrirse paso o rasgar el aire o el agua.",tip:"Imagina una tabla con una grieta: está rajada, pero sigue siendo una sola pieza.",example:"El carpintero tuvo que hender la madera."},
 {w:"Aherrojar",cat:"Verbo",mini:"Poner cadenas o hierros a alguien; también someterlo.",full:"Poner grillos o cadenas (hierros) a un prisionero; oprimir o subyugar.",tip:"Truco: «hierros» = cadenas. Aherrojar es ponerle hierros a alguien.",example:"Los guardias solían aherrojar a los prisioneros."},
 {w:"Orondo",cat:"Adjetivo",mini:"Hinchado o muy orgulloso de sí mismo.",full:"Hueco, hinchado o redondo; también se dice de alguien satisfecho de sí mismo y con aires de importancia.",tip:"Imagina a alguien caminando con el pecho inflado porque está muy orgulloso.",example:"Caminaba orondo por el pasillo."},
 {w:"Prono",cat:"Adjetivo",mini:"Inclinado hacia delante o acostado boca abajo.",full:"Inclinado hacia adelante, propenso a algo, o tendido boca abajo.",tip:"Piensa en estar boca abajo, con el pecho mirando al suelo.",example:"El atleta quedó tendido en posición prona."},
 {w:"Solaz",cat:"Sustantivo",mini:"Descanso, gusto o alivio después del cansancio.",full:"Descanso, esparcimiento, placer o consuelo que se toma de las fatigas o penas.",tip:"Solaz suena a «sol y paz»: un descanso que te hace sentir bien.",example:"El paseo fue un solaz para su espíritu."},
 {w:"Óbice",cat:"Sustantivo",mini:"Un obstáculo que no te deja avanzar.",full:"Obstáculo, estorbo o impedimento para algo.",tip:"Visualiza una piedra enorme en medio de tu camino: ese es el óbice.",example:"El único óbice era conseguir una recomendación."},
 {w:"Vituperio",cat:"Sustantivo",mini:"Un insulto o una crítica muy dura.",full:"Insulto, ofensa o censura muy dura que se dirige a alguien.",tip:"Vituperio = palabras muy duras contra una persona.",example:"Sus palabras se convirtieron en un vituperio."},
 {w:"Deletéreo",cat:"Adjetivo",mini:"Venenoso o capaz de causar un daño grave.",full:"Mortífero o venenoso; puede causar la muerte o un daño grave.",tip:"Relaciona «deletéreo» con «letal»: algo que puede hacer mucho daño.",example:"Las emanaciones contaminantes pueden ser deletéreas."},
 {w:"Inicuo",cat:"Adjetivo",mini:"Injusto o malvado.",full:"Malvado, injusto, que no tiene equidad.",tip:"Inicuo se relaciona con iniquidad: falta de justicia.",example:"Fue un castigo inicuo."},
 {w:"Efeméride",cat:"Sustantivo",mini:"Una fecha en la que se recuerda algo importante.",full:"Acontecimiento notable que se celebra el día en que ocurre o se cumple un aniversario.",tip:"Piensa en el calendario: una fecha especial que recuerda un acontecimiento.",example:"La caída del muro es una efeméride histórica."},
 {w:"Acuciar",cat:"Verbo",mini:"Apurar o meter prisa.",full:"Apresurar, dar prisa o urgir la ejecución de algo.",tip:"Acuciar = hacer que alguien se apure porque el tiempo se acaba.",example:"La fecha límite comenzó a acuciar al equipo."},
 {w:"Apócrifo",cat:"Adjetivo",mini:"Falso o de autoría dudosa.",full:"Dicho de un escrito o una obra: de autoría no auténtica o dudosa; falso o fingido.",tip:"Piensa en un libro con una firma falsa: parece auténtico, pero no lo es.",example:"El historiador encontró un manuscrito apócrifo."},
 {w:"Perentorio",cat:"Adjetivo",mini:"Urgente: no se puede aplazar.",full:"Definitivo, concluyente o urgente; no admite dilación o aplazamiento.",tip:"Perentorio = no hay prórroga. ¡Tiene que hacerse ya!",example:"El plazo para entregar el trabajo era perentorio."},
 {w:"Yermo",cat:"Sustantivo / Adjetivo",mini:"Un terreno vacío, deshabitado y sin cultivar.",full:"Terreno despoblado e incultivado; también describe algo despoblado o inhabitado.",tip:"Imagina un terreno seco, vacío y sin casas ni cultivos.",example:"El paisaje del desierto parecía yermo."},
 {w:"Displicente",cat:"Adjetivo",mini:"Que muestra desagrado o hace algo sin interés.",full:"Que muestra desagrado o falta de interés y afecto al realizar algo.",tip:"Imagina a alguien atendiendo de mala gana, sin ganas de ayudar.",example:"El mesero atendió con actitud displicente."}
];
const EMOJIS = [
 {emoji:"🪵",label:"rajar / abrir",wrong:["⛓️","🏖️","📅"]},
 {emoji:"⛓️",label:"poner cadenas",wrong:["🪵","🏜️","🎉"]},
 {emoji:"🤴",label:"hinchado de orgullo",wrong:["⛓️","🧱","📅"]},
 {emoji:"🤸",label:"inclinado / boca abajo",wrong:["🏖️","☠️","📅"]},
 {emoji:"🏖️",label:"descanso y placer",wrong:["⛓️","🚨","🤬"]},
 {emoji:"🧱",label:"obstáculo",wrong:["📅","🏖️","🤴"]},
 {emoji:"🤬",label:"insulto muy duro",wrong:["🪵","🏖️","📅"]},
 {emoji:"☠️",label:"venenoso / dañino",wrong:["🎉","🤴","🏖️"]},
 {emoji:"⚖️",label:"injusto / malvado",wrong:["🏖️","🪵","📅"]},
 {emoji:"📅",label:"fecha importante",wrong:["⛓️","☠️","🤬"]},
 {emoji:"⏰",label:"meter prisa",wrong:["🏜️","🏖️","🤴"]},
 {emoji:"🎭",label:"falso / no auténtico",wrong:["🧱","⛓️","📅"]},
 {emoji:"🚨",label:"urgente, no aplazable",wrong:["🏖️","🎉","🪵"]},
 {emoji:"🏜️",label:"terreno vacío",wrong:["🤬","📅","⛓️"]},
 {emoji:"🙄",label:"desagrado / poco interés",wrong:["🏖️","🪵","📅"]}
];
const $=id=>document.getElementById(id);
let xp=0,streak=0,mastered=new Set(),learnOrder=shuffle(WORDS.map((_,i)=>i)),learnIndex=0,quizSet=[],quizIndex=0,quizTimer=null,quizSeconds=40,quizLocked=false,kahootSet=[],kahootIndex=0,kahootTimer=null,kahootSeconds=15,kahootPoints=0,kahootLocked=true,writeOrder=shuffle(WORDS.map((_,i)=>i)),writeIndex=0,matchPairs=[],selectedWord=null,selectedDef=null,matched=0,practiceMode=null,practiceId=null,practiceRemaining=0;
const panels=["learn","quiz","kahoot","emoji","write","review","shop","results"];
function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
function toast(msg){const t=$("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function updateStats(){ $("xp").textContent=xp;if($("shop-xp"))$("shop-xp").textContent=xp;$("streak").textContent=streak;$("mastered").textContent=mastered.size;$("progress-label").textContent=`${mastered.size} de 15 dominadas`;$("progress-bar").style.width=(mastered.size/15*100)+"%";}
function addXP(n){xp+=n;updateStats();if($("shop")&&!$("shop").classList.contains("hidden"))renderShop()}
function showMode(mode){if(mode!=="shop")currentGame=mode;clearInterval(quizTimer);clearInterval(kahootTimer);panels.forEach(p=>$(p).classList.toggle("hidden",p!==mode));document.querySelectorAll(".mode").forEach(b=>b.classList.toggle("active",b.dataset.mode===mode));if(mode==="learn")renderLearn();if(mode==="quiz")startQuiz();if(mode==="kahoot")prepareKahoot();if(mode==="emoji")startEmoji();if(mode==="shop")renderShop();if(mode==="write")renderWrite();}
document.querySelectorAll(".mode").forEach(b=>b.addEventListener("click",()=>{
 const target=b.dataset.mode;
 if(target==="shop")returnGame=currentGame;
 showMode(target);
}));

function renderLearn(){const x=WORDS[learnOrder[learnIndex]];$("learn-counter").textContent=`${learnIndex+1} / 15`;$("learn-word").textContent=x.w.toUpperCase();$("learn-category").textContent=x.cat;$("learn-mini").textContent=x.mini;$("learn-full").textContent="Definición de clase: "+x.full;$("learn-tip").textContent="🧠 Truco para recordarla: "+x.tip;["learn-mini","learn-full","learn-tip"].forEach(id=>$(id).classList.add("hidden"));$("learn-hint").textContent="TOCA PARA VER LA EXPLICACIÓN";}
function revealLearn(){["learn-mini","learn-full","learn-tip"].forEach(id=>$(id).classList.remove("hidden"));$("learn-hint").textContent="¡Lee la mini explicación y el truco!";}
$("flashcard").addEventListener("click",revealLearn);$("flashcard").addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();revealLearn();}});
$("learn-prev").onclick=()=>{learnIndex=(learnIndex+14)%15;renderLearn()};
$("learn-next").onclick=()=>{mastered.add(learnOrder[learnIndex]);addXP(2);learnIndex=(learnIndex+1)%15;renderLearn();toast("¡Palabra repasada! +2 XP");};

function makeOptions(index){const correct=WORDS[index].mini;const wrong=shuffle(WORDS.filter((_,i)=>i!==index).map(x=>x.mini)).slice(0,3);return shuffle([correct,...wrong]);}
function startQuiz(){practiceMode=null;quizSet=shuffle(WORDS.map((_,i)=>i)).slice(0,10);quizIndex=0;renderQuiz();}
function renderQuiz(){if(quizIndex>=quizSet.length){finishMode("¡Quiz terminado!",`Has conseguido ${xp} XP en total. Vuelve a jugar para reforzar las palabras.`);return;}quizLocked=false;quizSeconds=40;const id=quizSet[quizIndex],x=WORDS[id];$("quiz-counter").textContent=`${quizIndex+1} / ${quizSet.length}`;$("quiz-word").textContent=x.w.toUpperCase();$("quiz-question").textContent="¿Qué significa esta palabra?";$("quiz-feedback").className="feedback hidden";$("quiz-next").disabled=true;$("quiz-practice").classList.add("hidden");$("quiz-answers").innerHTML="";makeOptions(id).forEach((text,i)=>{const b=document.createElement("button");b.className="answer";b.textContent=text;b.onclick=()=>answerQuiz(b,text===x.mini,id);$("quiz-answers").appendChild(b)});updateQuizTimer();}
function updateQuizTimer(){clearInterval(quizTimer);$("quiz-time").textContent=quizSeconds;$("quiz-timer-bar").style.width="100%";quizTimer=setInterval(()=>{quizSeconds--;$("quiz-time").textContent=quizSeconds;$("quiz-timer-bar").style.width=(quizSeconds/40*100)+"%";if(quizSeconds<=0){clearInterval(quizTimer);if(!quizLocked){if(practiceMode==="quiz")answerPractice(null,false,true);else answerQuiz(null,false,quizSet[quizIndex],true)}}},1000)}
function answerQuiz(button,ok,id,timeout=false){if(quizLocked)return;quizLocked=true;clearInterval(quizTimer);const x=WORDS[id];[...$("quiz-answers").children].forEach(b=>{if(b.textContent===x.mini)b.classList.add("correct")});if(button&&!ok)button.classList.add("wrong");const f=$("quiz-feedback");f.className="feedback "+(ok?"good":"bad");f.innerHTML=ok?`<strong>¡Correcto! +10 XP 🎉</strong>${x.tip}`:`<strong>${timeout?"¡Se acabó el tiempo!":"¡Casi! Vamos a recordarla."}</strong>Respuesta: <b>${x.mini}</b><br>Truco: ${x.tip}<br>Ejemplo: ${x.example}`;if(ok){addXP(10);streak++;mastered.add(id)}else{streak=0;$("quiz-practice").classList.remove("hidden")}updateStats();$("quiz-next").disabled=false;}
$("quiz-next").onclick=()=>{if(practiceMode==="quiz"){advancePractice();return}quizIndex++;renderQuiz()};

function prepareKahoot(){practiceMode=null;clearInterval(kahootTimer);kahootSet=shuffle(WORDS.map((_,i)=>i)).slice(0,10);kahootIndex=0;kahootPoints=0;$("kahoot-points").textContent="0";$("kahoot-start").classList.remove("hidden");$("kahoot-next").disabled=true;$("kahoot-practice").classList.add("hidden");$("kahoot-feedback").className="feedback hidden";$("kahoot-word").textContent="¿Listo para jugar?";$("kahoot-answers").innerHTML="";$("kahoot-counter").textContent="10 preguntas";$("kahoot-time").textContent="15";}
$("kahoot-start").onclick=()=>{$("kahoot-start").classList.add("hidden");renderKahoot()};
function renderKahoot(){if(kahootIndex>=kahootSet.length){finishMode("¡Partida terminada!",`Puntuación de esta partida: ${kahootPoints} puntos. ¡Reta tu propio récord!`);return;}kahootLocked=false;kahootSeconds=15;const id=kahootSet[kahootIndex],x=WORDS[id];$("kahoot-counter").textContent=`${kahootIndex+1} / ${kahootSet.length}`;$("kahoot-word").textContent=x.w.toUpperCase();$("kahoot-feedback").className="feedback hidden";$("kahoot-next").disabled=true;$("kahoot-answers").innerHTML="";makeOptions(id).forEach(text=>{const b=document.createElement("button");b.className="kahoot-answer";b.textContent=text;b.onclick=()=>answerKahoot(b,text===x.mini,id);$("kahoot-answers").appendChild(b)});kahootTimer=setInterval(()=>{kahootSeconds--;$("kahoot-time").textContent=kahootSeconds;if(kahootSeconds<=0)answerKahoot(null,false,id,true)},1000)}
function answerKahoot(button,ok,id,timeout=false){if(kahootLocked)return;kahootLocked=true;clearInterval(kahootTimer);const x=WORDS[id];[...$("kahoot-answers").children].forEach(b=>{if(b.textContent===x.mini)b.classList.add("correct")});if(button&&!ok)button.classList.add("wrong");const f=$("kahoot-feedback");f.className="feedback "+(ok?"good":"bad");if(ok){const gained=500+kahootSeconds*30;kahootPoints+=gained;addXP(8);streak++;mastered.add(id);f.innerHTML=`<strong>¡Respuesta correcta! +${gained} puntos ⚡</strong>${x.tip}`}else{streak=0;$("kahoot-practice").classList.remove("hidden");f.innerHTML=`<strong>${timeout?"¡Tiempo!":"¡No era esa!"}</strong>La respuesta era: <b>${x.mini}</b><br>Truco: ${x.tip}<br>Ejemplo: ${x.example}`}updateStats();$("kahoot-points").textContent=kahootPoints;$("kahoot-next").disabled=false;}
$("kahoot-next").onclick=()=>{if(practiceMode==="kahoot"){advancePractice();return}kahootIndex++;renderKahoot()};


// Si fallas, puedes repetir esa palabra tres veces seguidas para fijarla.
function beginPractice(mode,id){
  practiceMode=mode;practiceId=id;practiceRemaining=3;
  if(mode==="quiz")renderPracticeQuiz();else renderPracticeKahoot();
}
function renderPracticeQuiz(){
  quizLocked=false;quizSeconds=40;const x=WORDS[practiceId];
  $("quiz-counter").textContent=`PRÁCTICA · ${4-practiceRemaining} / 3`;
  $("quiz-word").textContent=x.w.toUpperCase();$("quiz-question").textContent="Repite esta palabra: ¿qué significa?";
  $("quiz-feedback").className="feedback hidden";$("quiz-next").disabled=true;
  $("quiz-practice").classList.add("hidden");$("quiz-answers").innerHTML="";
  makeOptions(practiceId).forEach(text=>{const b=document.createElement("button");b.className="answer";b.textContent=text;b.onclick=()=>answerPractice(b,text===x.mini);$("quiz-answers").appendChild(b)});
  updateQuizTimer();
}
function renderPracticeKahoot(){
  kahootLocked=false;kahootSeconds=15;const x=WORDS[practiceId];
  $("kahoot-counter").textContent=`PRÁCTICA · ${4-practiceRemaining} / 3`;
  $("kahoot-word").textContent=x.w.toUpperCase();$("kahoot-feedback").className="feedback hidden";
  $("kahoot-next").disabled=true;$("kahoot-practice").classList.add("hidden");$("kahoot-answers").innerHTML="";
  makeOptions(practiceId).forEach(text=>{const b=document.createElement("button");b.className="kahoot-answer";b.textContent=text;b.onclick=()=>answerPractice(b,text===x.mini);$("kahoot-answers").appendChild(b)});
  kahootTimer=setInterval(()=>{kahootSeconds--;$("kahoot-time").textContent=kahootSeconds;if(kahootSeconds<=0)answerPractice(null,false,true)},1000);
}
function answerPractice(button,ok,timeout=false){
  if(practiceMode==="quiz"){
    if(quizLocked)return;quizLocked=true;clearInterval(quizTimer);
    const x=WORDS[practiceId];[...$("quiz-answers").children].forEach(b=>{if(b.textContent===x.mini)b.classList.add("correct")});
    if(button&&!ok)button.classList.add("wrong");
    $("quiz-feedback").className="feedback "+(ok?"good":"bad");
    $("quiz-feedback").innerHTML=ok?`<strong>¡Bien! Esta es la práctica ${4-practiceRemaining} de 3.</strong>${x.tip}`:`<strong>Vamos otra vez, sin presión.</strong>Respuesta: ${x.mini}<br>${x.tip}`;
    if(ok){addXP(3);streak++;}else streak=0;updateStats();$("quiz-next").disabled=false;
    $("quiz-next").textContent=practiceRemaining>1?"Otra repetición ↵":"Terminar práctica ↵";
  }else{
    if(kahootLocked)return;kahootLocked=true;clearInterval(kahootTimer);
    const x=WORDS[practiceId];[...$("kahoot-answers").children].forEach(b=>{if(b.textContent===x.mini)b.classList.add("correct")});
    if(button&&!ok)button.classList.add("wrong");
    $("kahoot-feedback").className="feedback "+(ok?"good":"bad");
    $("kahoot-feedback").innerHTML=ok?`<strong>¡Correcto! Práctica ${4-practiceRemaining} de 3.</strong>${x.tip}`:`<strong>¡Seguimos practicando!</strong>Respuesta: ${x.mini}<br>${x.tip}`;
    if(ok){addXP(3);streak++;}else streak=0;updateStats();$("kahoot-next").disabled=false;
    $("kahoot-next").textContent=practiceRemaining>1?"Otra repetición ↵":"Terminar práctica ↵";
  }
}
function advancePractice(){
  practiceRemaining--;
  if(practiceRemaining>0){if(practiceMode==="quiz")renderPracticeQuiz();else renderPracticeKahoot();return;}
  const mode=practiceMode;practiceMode=null;practiceId=null;
  if(mode==="quiz"){quizIndex++;$("quiz-next").textContent="Siguiente ↵";renderQuiz();}
  else{kahootIndex++;$("kahoot-next").textContent="Siguiente ronda ↵";renderKahoot();}
}
$("quiz-practice").onclick=()=>beginPractice("quiz",quizSet[quizIndex]);
$("kahoot-practice").onclick=()=>beginPractice("kahoot",kahootSet[kahootIndex]);
function newMatch(){const ids=shuffle(WORDS.map((_,i)=>i)).slice(0,5);matchPairs=ids;selectedWord=null;selectedDef=null;matched=0,emojiSet=[],emojiIndex=0,emojiLocked=false,currentGame="learn",returnGame="learn";$("match-count").textContent="0 / 5";$("match-feedback").className="feedback hidden";$("match-words").innerHTML="";$("match-defs").innerHTML="";shuffle(ids).forEach(id=>{let b=document.createElement("button");b.className="match-option";b.textContent=WORDS[id].w;b.dataset.id=id;b.onclick=()=>selectMatch("word",b);$("match-words").appendChild(b)});shuffle(ids).forEach(id=>{let b=document.createElement("button");b.className="match-option";b.textContent=WORDS[id].mini;b.dataset.id=id;b.onclick=()=>selectMatch("def",b);$("match-defs").appendChild(b)})}
function selectMatch(type,b){if(b.classList.contains("matched"))return;const key=type==="word"?"selectedWord":"selectedDef";document.querySelectorAll(type==="word"?"#match-words .match-option":"#match-defs .match-option").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");if(type==="word")selectedWord=b;else selectedDef=b;if(selectedWord&&selectedDef){if(selectedWord.dataset.id===selectedDef.dataset.id){selectedWord.classList.add("matched");selectedDef.classList.add("matched");selectedWord.classList.remove("selected");selectedDef.classList.remove("selected");matched++;addXP(5);mastered.add(Number(selectedWord.dataset.id));$("match-count").textContent=`${matched} / 5`;selectedWord=null;selectedDef=null;if(matched===5){$("match-feedback").className="feedback good";$("match-feedback").textContent="¡Perfecto! Encontraste los cinco pares. +25 XP";streak++;updateStats()}}else{const a=selectedWord,c=selectedDef;setTimeout(()=>{a.classList.remove("selected");c.classList.remove("selected");},450);selectedWord=null;selectedDef=null;streak=0;updateStats()}}}
$("match-new").onclick=newMatch;

function renderWrite(){const x=WORDS[writeOrder[writeIndex]];$("write-counter").textContent=`${writeIndex+1} / 15`;$("write-word").textContent=x.w.toUpperCase();$("write-input").value="";$("write-feedback").className="feedback hidden";}
$("write-check").onclick=()=>{const actualId=writeOrder[writeIndex],x=WORDS[actualId],v=$("write-input").value.trim().toLowerCase();if(!v){toast("Escribe una idea primero.");return}const tokens=x.mini.toLowerCase().split(/[^a-záéíóúñ]+/).filter(t=>t.length>3);const hits=tokens.filter(t=>v.includes(t)).length;const ok=hits>=1||v.length>55;const f=$("write-feedback");f.className="feedback "+(ok?"good":"bad");f.innerHTML=ok?`<strong>¡Bien explicado! +5 XP</strong>Idea clave: ${x.mini}<br>🧠 ${x.tip}`:`<strong>Vamos a mejorarlo.</strong>Idea clave: <b>${x.mini}</b><br>Truco: ${x.tip}<br>Ejemplo: ${x.example}`;if(ok){addXP(5);mastered.add(actualId);streak++}else streak=0;updateStats();writeIndex=(writeIndex+1)%WORDS.length;};


// Emoji game: the emoji is a visual memory clue, not a replacement for the real definition.
function startEmoji(){emojiSet=shuffle(WORDS.map((_,i)=>i)).slice(0,10);emojiIndex=0;renderEmoji();}
function renderEmoji(){
 if(emojiIndex>=emojiSet.length){finishMode("¡Emoji challenge completado!", "Terminaste las 10 preguntas visuales. ¡Buen trabajo!");return;}
 emojiLocked=false;const id=emojiSet[emojiIndex],x=WORDS[id],hint=EMOJIS[id];
 $("emoji-counter").textContent=`${emojiIndex+1} / ${emojiSet.length}`;$("emoji-word").textContent=x.w.toUpperCase();
 $("emoji-clue").textContent="❓";$("emoji-feedback").className="feedback hidden";$("emoji-next").disabled=true;$("emoji-options").innerHTML="";
 const options=shuffle([{...hint,correct:true},...hint.wrong.map((emoji,i)=>({emoji,label:["otra idea","no corresponde","pista falsa"][i],correct:false}))]);
 options.forEach(o=>{const b=document.createElement("button");b.className="emoji-option";b.innerHTML=`${o.emoji}<span>${o.label}</span>`;b.dataset.correct=o.correct?"1":"0";b.onclick=()=>answerEmoji(b,o.correct,id);$("emoji-options").appendChild(b)});
}
function answerEmoji(button,ok,id){
 if(emojiLocked)return;emojiLocked=true;const x=WORDS[id],clue=EMOJIS[id];
 [...$("emoji-options").children].forEach(b=>{if(b.dataset.correct==="1")b.classList.add("correct")});
 if(!ok)button.classList.add("wrong");
 $("emoji-clue").textContent=clue.emoji;
 const f=$("emoji-feedback");f.className="feedback "+(ok?"good":"bad");
 f.innerHTML=ok?`<strong>¡Lo captaste! +8 XP 🎉</strong>${x.mini}<br>🧠 ${x.tip}`:`<strong>¡Casi! Mira la asociación:</strong>${clue.emoji} = ${clue.label}.<br>Significa: <b>${x.mini}</b><br>Truco: ${x.tip}`;
 if(ok){addXP(8);streak++;mastered.add(id)}else streak=0;updateStats();$("emoji-next").disabled=false;
}
$("emoji-next").onclick=()=>{emojiIndex++;renderEmoji()};

// XP shop: items are bought and applied immediately to the active Quiz/Kahoot question.
function renderShop(){
 $("shop-xp").textContent=xp;
 document.querySelectorAll(".buy").forEach(b=>{
   const cost=b.dataset.item==="skip"?120:250;
   b.disabled=xp<cost;
   b.textContent=xp<cost?`Necesitas ${cost-xp} XP`:"Comprar";
 });
}
function buyPower(item){
 const cost=item==="skip"?120:250;
 if(xp<cost){toast(`Te faltan ${cost-xp} XP para comprarlo.`);return;}
 if(!["quiz","kahoot"].includes(currentGame)){toast("Abre primero una partida de Quiz o Kahoot para usar este poder.");return;}
 const isQuiz=currentGame==="quiz",isKahoot=currentGame==="kahoot";
 const locked=isQuiz?quizLocked:kahootLocked;
 if(locked){toast("Primero abre una pregunta activa para usar el poder.");return;}
 xp-=cost;updateStats();
 if(item==="skip"){
   toast("⏭️ Pregunta saltada. ¡A seguir!");
   if(isQuiz){clearInterval(quizTimer);quizLocked=true;quizIndex++;renderQuiz();}
   else{clearInterval(kahootTimer);kahootLocked=true;kahootIndex++;renderKahoot();}
 }else{
   if(isQuiz){answerQuiz(null,false,quizSet[quizIndex],false);$("quiz-feedback").innerHTML=`<strong>🔮 Respuesta revelada (250 XP)</strong>La respuesta es: <b>${WORDS[quizSet[quizIndex]].mini}</b><br>🧠 ${WORDS[quizSet[quizIndex]].tip}`;$("quiz-next").textContent="Continuar ↵";}
   else{answerKahoot(null,false,kahootSet[kahootIndex],false);$("kahoot-feedback").innerHTML=`<strong>🔮 Respuesta revelada (250 XP)</strong>La respuesta es: <b>${WORDS[kahootSet[kahootIndex]].mini}</b><br>🧠 ${WORDS[kahootSet[kahootIndex]].tip}`;$("kahoot-next").textContent="Continuar ↵";}
 }
 renderShop();
}
document.querySelectorAll(".buy").forEach(b=>b.addEventListener("click",()=>buyPower(b.dataset.item)));
$("back-game").onclick=()=>{
 const target=returnGame||"learn";
 panels.forEach(p=>$(p).classList.toggle("hidden",p!==target));
 document.querySelectorAll(".mode").forEach(b=>b.classList.toggle("active",b.dataset.mode===target));
 currentGame=target;
 if(target==="quiz"&&!quizLocked){
   clearInterval(quizTimer);
   $("quiz-time").textContent=quizSeconds;
   $("quiz-timer-bar").style.width=(quizSeconds/40*100)+"%";
   quizTimer=setInterval(()=>{quizSeconds--;$("quiz-time").textContent=quizSeconds;$("quiz-timer-bar").style.width=(quizSeconds/40*100)+"%";if(quizSeconds<=0){clearInterval(quizTimer);if(!quizLocked){if(practiceMode==="quiz")answerPractice(null,false,true);else answerQuiz(null,false,quizSet[quizIndex],true)}}},1000);
 }
 if(target==="kahoot"&&!kahootLocked){
   clearInterval(kahootTimer);
   kahootTimer=setInterval(()=>{kahootSeconds--;$("kahoot-time").textContent=kahootSeconds;if(kahootSeconds<=0){if(practiceMode==="kahoot")answerPractice(null,false,true);else answerKahoot(null,false,kahootSet[kahootIndex],true)}},1000);
 }
};

$("dictionary").innerHTML=WORDS.map((x,i)=>`<article class="dict-item"><b>${i+1}. ${x.w}</b><div class="mini">${x.mini}</div><small>${x.cat} · ${x.full}</small></article>`).join("");
function finishMode(title,text){panels.forEach(p=>$(p).classList.toggle("hidden",p!=="results"));document.querySelectorAll(".mode").forEach(b=>b.classList.remove("active"));$("result-title").textContent=title;$("result-text").textContent=text;}
$("result-again").onclick=()=>showMode("learn");
renderLearn();updateStats();renderShop();

// Enter funciona como botón de continuar/enviar para avanzar más rápido.
document.addEventListener("keydown",e=>{
  if(e.key!=="Enter"||e.repeat)return;
  const tag=(document.activeElement&&document.activeElement.tagName||"").toLowerCase();
  if(tag==="textarea"||tag==="input")return;
  const visible=id=>!$(id).classList.contains("hidden");
  if(visible("learn")){e.preventDefault();$("learn-next").click();}
  else if(visible("quiz")&&!$("quiz-next").disabled){e.preventDefault();$("quiz-next").click();}
  else if(visible("kahoot")&&!$("kahoot-next").disabled){e.preventDefault();$("kahoot-next").click();}
  else if(visible("emoji")&&!$("emoji-next").disabled){e.preventDefault();$("emoji-next").click();}
  else if(visible("write")){e.preventDefault();$("write-check").click();}
});
