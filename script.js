const $=id=>document.getElementById(id);
let xp=0,streak=0,correctTotal=0,lessonIndex=0,vocabIndex=0,practiceSet=[],practiceIndex=0,practiceLocked=false,examSet=[],examIndex=0,examScore=0,examTimer=null,examSeconds=900,examLocked=true;
const lessons=[
{tag:"CONNECTORS · CONTRAST",title:"HOWEVER: las dos formas que debes distinguir",intro:"Esta palabra aparece en tu transformación de oraciones. Ojo: tiene dos usos diferentes.",body:`
<div class="rule">1) HOWEVER = “sin embargo” (contraste entre dos ideas). Normalmente conecta dos oraciones; puede ir al inicio o en medio.</div>
<div class="example"><b>I was tired. However, I studied.</b><span class="translation">Estaba cansado. Sin embargo, estudié.</span></div>
<div class="example"><b>I was tired; however, I studied.</b><span class="translation">También es correcto: punto y coma antes de however y coma después.</span></div>
<div class="rule">2) HOWEVER + adjective/adverb = “por muy… que / sin importar qué tan…”. La estructura es: <b>However + adjective/adverb + subject + verb</b>.</div>
<div class="example"><b>However tired I am, I will study.</b><span class="translation">Por muy cansado que esté, estudiaré.</span></div>
<div class="example"><b>However long it takes, I will finish.</b><span class="translation">No importa cuánto tiempo tome, terminaré.</span></div>
<div class="rule">También memoriza estas expresiones del vocabulario: <b>however old</b> (sin importar la edad), <b>however much/many</b> (sin importar cuánto/cuántos), <b>however long</b> (sin importar cuánto tiempo).</div>
<div class="example">Worksheet #1: “It doesn't matter how long it takes; I am determined to solve this problem.” → <b>However long it takes, I am determined to solve this problem.</b></div>`,remember:"TRUCO: si significa “sin embargo”, contrasta dos ideas. Si después viene un adjetivo como LONG, OLD o MUCH/MANY, significa “sin importar qué tan/cuánto”."},
{tag:"INDEFINITE EXPRESSIONS",title:"Whatever, whenever, wherever, whoever, whichever",intro:"Todas empiezan con wh- y expresan “no importa qué / cuándo / dónde / quién / cuál”.",body:`
<div class="rule"><b>Whatever</b> = cualquier cosa que / no importa qué.</div><div class="example"><b>Do whatever you want.</b><span class="translation">Haz lo que quieras.</span></div>
<div class="rule"><b>Whenever</b> = cuando sea / en cualquier momento que.</div><div class="example"><b>Call me whenever you need help.</b><span class="translation">Llámame cuando necesites ayuda.</span></div>
<div class="rule"><b>Wherever</b> = donde sea.</div><div class="example"><b>I will follow you wherever you go.</b><span class="translation">Te seguiré dondequiera que vayas.</span></div>
<div class="rule"><b>Whoever</b> = quien sea / cualquier persona que.</div><div class="example"><b>Whoever finishes first can leave.</b><span class="translation">Quien termine primero puede salir.</span></div>
<div class="rule"><b>Whichever + noun</b> = cualquiera de las opciones (va seguido de un sustantivo).</div><div class="example"><b>Choose whichever course you prefer.</b><span class="translation">Elige el curso que prefieras.</span></div>`,remember:"TRUCO: WHAT = cosa, WHEN = tiempo, WHERE = lugar, WHO = persona, WHICH = opción. WHICHEVER suele llevar un sustantivo después."},
{tag:"CAUSE & EFFECT",title:"Expresar causa y consecuencia",intro:"Causa = por qué pasó. Efecto = qué pasó como resultado.",body:`
<div class="rule">PARA DAR LA CAUSA (razón):</div><div class="example"><b>because / since / as + subject + verb</b><span class="translation">Because he was tired, he went to bed. = Porque estaba cansado, se fue a dormir.</span></div>
<div class="example"><b>because of / due to + noun o gerund (-ing)</b><span class="translation">The flight was delayed due to thick fog. = El vuelo se retrasó debido a la niebla espesa.</span></div>
<div class="rule">PARA DAR EL RESULTADO (consecuencia):</div><div class="example"><b>therefore / consequently / as a result / so</b><span class="translation">He was tired; therefore, he went to bed. = Estaba cansado; por lo tanto, se fue a dormir.</span></div>
<div class="example"><b>lead to / result in / cause + noun o -ing</b><span class="translation">Stress leads to exhaustion. = El estrés conduce al agotamiento.</span></div>
<div class="example"><b>One reason for + noun + is that + sentence</b><span class="translation">One reason for his absence is that he was sick.</span></div>
<div class="example"><b>... is the result of + noun</b><span class="translation">The cancellation was the result of heavy rain.</span></div>`,remember:"TRUCO DE EXAMEN: BECAUSE / SINCE + oración (sujeto + verbo). BECAUSE OF / DUE TO + sustantivo. THEREFORE / AS A RESULT anuncian consecuencia. LEADS TO / RESULTS IN van seguidos de sustantivo o verbo -ing."},
{tag:"SENSE VERBS",title:"Look, sound, smell, taste, feel",intro:"Después de estos verbos puedes describir una sensación. El examen mezcla adjetivos, like y as if.",body:`
<div class="rule">1) SENSE VERB + ADJECTIVE. No uses adverbio para describir la sensación.</div><div class="example"><b>The soup smells delicious.</b><span class="translation">La sopa huele deliciosa. (NO: smells deliciously)</span></div>
<div class="example"><b>The juice tastes bitter.</b><span class="translation">El jugo sabe amargo.</span></div>
<div class="rule">2) SENSE VERB + LIKE + NOUN / noun phrase (comparación con algo).</div><div class="example"><b>That sounds like a great idea.</b><span class="translation">Eso suena como una gran idea.</span></div><div class="example"><b>The thunder sounded like a loud explosion.</b></div>
<div class="rule">3) SENSE VERB + AS IF + SUBJECT + VERB (parece que…).</div><div class="example"><b>She looks as if she hasn't slept.</b><span class="translation">Parece que no ha dormido.</span></div><div class="example"><b>It smells as if someone is burning toast.</b></div>`,remember:"TRUCO: adjetivo directo (smells delicious); LIKE + cosa (sounds like an explosion); AS IF + oración completa (looks as if she is tired)."},
{tag:"PAST HABITS & ADJUSTMENT",title:"Used to, would, be used to, get used to",intro:"Este tema parece confuso porque se parecen, pero cada uno tiene una función.",body:`
<div class="rule"><b>USED TO + verb base</b> = hábito o estado del pasado que ya no es verdad.</div><div class="example"><b>Sarah used to be shy.</b><span class="translation">Sarah antes era tímida (ahora ya no).</span></div>
<div class="rule"><b>WOULD + verb base</b> = acción repetida en el pasado. No se usa normalmente para estados como be/know/like.</div><div class="example"><b>My grandfather would tell us stories.</b><span class="translation">Mi abuelo solía contarnos historias.</span></div>
<div class="rule"><b>BE USED TO + noun / verb-ing</b> = ya estar acostumbrado.</div><div class="example"><b>I am used to working at night.</b><span class="translation">Estoy acostumbrado a trabajar de noche.</span></div>
<div class="rule"><b>GET USED TO + noun / verb-ing</b> = proceso de acostumbrarse.</div><div class="example"><b>I'm getting used to waking up early.</b><span class="translation">Me estoy acostumbrando a levantarme temprano.</span></div>`,remember:"TRUCO: USED TO + verbo base. WOULD + verbo base (rutina repetida). BE USED TO / GET USED TO + sustantivo o verbo -ING. BE = ya acostumbrado; GET = proceso."}
];
const vocab=[
["Anxious","Feeling worried or nervous","Ansioso / preocupado","She felt anxious before the exam.","Feelings"],
["Bitter","Angry and hurt because of unfair treatment","Resentido / amargado","He felt bitter about the decision.","Feelings"],
["Cheerful","Happy, positive and energetic","Alegre","She looked cheerful today.","Feelings"],
["Envious","Wanting something that belongs to someone else","Envidioso","He was envious of his friend's success.","Feelings"],
["Fed up","Annoyed after enduring something for a long time","Harto","I'm fed up with this noise.","Feelings"],
["Furious","Extremely angry","Furioso","My dad was furious.","Feelings"],
["Grateful","Thankful and appreciative","Agradecido","I'm grateful for your help.","Feelings"],
["Grumpy","Easily annoyed; bad-tempered","Gruñón / de mal humor","He gets grumpy when he is tired.","Feelings"],
["Homesick","Sad because you miss home","Extrañar tu hogar","She felt homesick abroad.","Feelings"],
["Irritated","Slightly angry or annoyed","Irritado","I was irritated by the noise.","Feelings"],
["Lonely","Sad because you are alone or disconnected","Solo","He felt lonely in the new city.","Feelings"],
["Puzzled","Confused","Perplejo / confundido","They were puzzled by the question.","Feelings"],
["Relieved","Happy because stress or danger ended","Aliviado","I felt relieved after the exam.","Feelings"],
["Shocked","Extremely surprised or upset","Impactado","We were shocked by the news.","Feelings"],
["Thrilled","Extremely excited and delighted","Emocionadísimo","She was thrilled to win.","Feelings"],
["Fall asleep","Pass from awake into sleep","Quedarse dormido","I fall asleep at 10 p.m.","Sleep"],
["Fast asleep","Completely and deeply asleep","Profundamente dormido","The baby is fast asleep.","Sleep"],
["Go off","An alarm starts ringing","Sonar (alarma)","My alarm goes off at 6.","Sleep"],
["Insomnia","Difficulty falling or staying asleep","Insomnio","Insomnia kept him awake.","Sleep"],
["Keep you awake","Prevent you from sleeping","No dejarte dormir","The noise keeps me awake.","Sleep"],
["Mattress","Soft pad on a bed","Colchón","This mattress is comfortable.","Sleep"],
["Nap","A short daytime sleep","Siesta","I take a nap after lunch.","Sleep"],
["Nod off","Fall asleep unintentionally","Cabecear / dormitar","He nodded off in class.","Sleep"],
["Oversleep","Sleep longer than intended","Quedarse dormido de más","I overslept and missed the bus.","Sleep"],
["Pillow","Cushion for your head","Almohada","I need another pillow.","Sleep"],
["Set an alarm","Program an alarm","Poner una alarma","Set an alarm for 7 a.m.","Sleep"],
["Sleepy","Tired and ready to sleep","Soñoliento","I feel sleepy.","Sleep"],
["Snore","Make a noisy sound while sleeping","Roncar","My brother snores loudly.","Sleep"],
["Yawn","Open your mouth when tired or bored","Bostezar","I yawn when I'm sleepy.","Sleep"],
["Whatever","Anything / no matter what","Lo que sea","Do whatever you want.","Relative words"],
["Whenever","At any time","Cuando sea","Call me whenever you need help.","Relative words"],
["Wherever","In any place","Donde sea","Sit wherever you like.","Relative words"],
["Whoever","Any person who","Quien sea","Whoever arrives first can start.","Relative words"],
["Whichever (+ noun)","Any one option from a group","Cualquiera de las opciones","Choose whichever subject you prefer.","Relative words"],
["However old","Regardless of age","Sin importar qué edad","However old you are, you can learn.","However"],
["However long","Regardless of the time required","Sin importar cuánto tiempo","However long it takes, keep trying.","However"],
["However much/many","Regardless of quantity/number","Sin importar cuánto/cuántos","However much it costs, compare first.","However"],
["Because / since / as","Introduce a reason","Porque / ya que","Since it was late, we left.","Cause & effect"],
["Because of / due to","Because of + noun or -ing","Debido a","The match was cancelled due to rain.","Cause & effect"],
["Therefore / so / that's why","Introduce a result","Por lo tanto / por eso","It rained; therefore, we stayed home.","Cause & effect"],
["As a result / consequence","State what happened because of something","Como resultado","As a result, sales increased.","Cause & effect"],
["Lead to / result in / cause","One thing creates another","Conducir a / provocar","Stress can lead to exhaustion.","Cause & effect"],
["One reason for... is that...","Introduce a reason","Una razón de... es que...","One reason for this is that he was tired.","Cause & effect"],
["... is the result of","Shows the cause of an event","Es el resultado de","The delay is the result of fog.","Cause & effect"]
];
const questions=[
["however","It doesn't matter how long it takes; I will finish.","Choose the correct transformation.","However long it takes, I will finish.","However long does it take, I will finish.","However it long takes, I will finish.","However long takes it, I will finish.","“However long” + subject + verb. No se invierte el orden."],
["however","I was tired. ______, I finished my homework.","Choose the best connector.","However","Because of","Due to","As a result of","Aquí contrasta dos ideas: estaba cansado, pero terminé."],
["however","______ old you are, you can learn something new.","Complete the expression.","However","Whenever","Whoever","Wherever","HOWEVER OLD = sin importar qué edad."],
["however","You can call me at any time that you need help.","Rewrite using WHENEVER.","You can call me whenever you need help.","You can call me whoever you need help.","You can call me whatever you need help.","You can call me wherever you need help.","WHENEVER se refiere al tiempo: en cualquier momento que."],
["however","You may select ______ elective course you prefer.","Choose the correct word.","whichever","whoever","whenever","whatever","WHICHEVER + noun: whichever elective course."],
["cause","The flight was delayed ______ thick fog.","Complete with a cause phrase.","due to","therefore","as a result","consequently","DUE TO + sustantivo: thick fog."],
["cause","He was ill; ______, he stayed home.","Choose the result connector.","therefore","because","due to","since","THEREFORE introduce la consecuencia."],
["cause","Chronic stress often ______ severe exhaustion.","Choose the correct verb phrase.","leads to","because","since","due to","LEADS TO + sustantivo: severe exhaustion."],
["cause","The cancellation of the match was ______ heavy rain.","Complete the transformation.","the result of","therefore","because","leads to","“Was the result of” indica la causa del evento."],
["sense","That soup smells ______.","Choose the correct option.","delicious","deliciously","like delicious","as if delicious","SENSE VERB + adjetivo: smells delicious."],
["sense","The thunder sounded ______ a loud explosion.","Choose the correct option.","like","as if","Ø","like as","LIKE + noun phrase: a loud explosion."],
["sense","Elena looks ______ she hasn't slept in days.","Choose the correct option.","as if","like","as","Ø","AS IF + sujeto + verbo: she hasn't slept."],
["sense","This grapefruit juice tastes ______.","Choose the correct option.","bitter","bitterly","like bitter","as bitterly","TASTES + adjetivo."],
["used","Sarah ______ quite shy in middle school, but now she is outgoing.","Past state: choose the correct form.","used to be","would be","is used to be","get used to be","USED TO expresa un estado pasado; WOULD no suele usarse para estados."],
["used","My grandfather ______ us stories every winter.","Repeated past action.","would tell","is used to tell","get used to tell","would telling","WOULD + verbo base para una acción repetida."],
["used","I am used to ______ in loud environments.","Complete the structure.","working","work","worked","to work","BE USED TO + verbo -ING."],
["used","I slowly ______ living in a colder climate.","Process of becoming accustomed.","got used to","used to","would","am used to","GET USED TO expresa el proceso de acostumbrarse."],
["used","Did you ______ with a nightlight when you were a child?","Choose the correct form.","use to sleep","used to sleep","using to sleep","be used to sleep","En preguntas con DID, se usa USE TO + verbo base."],
["vocab","Maya felt extremely ______ before her presentation because she was nervous.","Choose the vocabulary word.","anxious","cheerful","grateful","thrilled","ANXIOUS = worried or nervous."],
["vocab","The alarm will ______ at 7:00 a.m.","Choose the phrasal verb.","go off","nod off","oversleep","snore","GO OFF = empezar a sonar (alarma)."],
["vocab","He fell asleep unintentionally in class. He ______.","Choose the expression.","nodded off","went off","set an alarm","was fast asleep","NOD OFF = dormitar / quedarse dormido sin querer."],
["vocab","After months of noise, I'm completely ______ with it.","Choose the expression.","fed up","relieved","puzzled","thrilled","FED UP = harto después de aguantar algo."],
["vocab","They were ______ by the unexpected results.","Choose the word.","puzzled","grateful","homesick","cheerful","PUZZLED = confundido."],
["vocab","I was so tired that I started to ______.","Choose the verb.","yawn","snore","nap","pillow","YAWN = bostezar."]
];
function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
function toast(s){const t=$("toast");t.textContent=s;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800)}
function stats(){ $("xp").textContent=xp;$("streak").textContent=streak;$("correct").textContent=correctTotal;$("progress-label").textContent=`${correctTotal} respuestas correctas`;$("progress-bar").style.width=Math.min(100,correctTotal/30*100)+"%";}
function showMode(m){["tutorial","vocab","practice","exam"].forEach(x=>$(x).classList.toggle("hidden",x!==m));document.querySelectorAll(".mode").forEach(b=>b.classList.toggle("active",b.dataset.mode===m));if(m==="vocab")renderVocab();if(m==="practice")startPractice("all");if(m==="exam")resetExam();}
document.querySelectorAll(".mode").forEach(b=>b.onclick=()=>showMode(b.dataset.mode));
function renderLesson(){const l=lessons[lessonIndex];$("lesson-counter").textContent=`${lessonIndex+1} / ${lessons.length}`;$("lesson-tag").textContent=l.tag;$("lesson-title").textContent=l.title;$("lesson-intro").textContent=l.intro;$("lesson-content").innerHTML=l.body;$("lesson-remember").textContent="🧠 "+l.remember;$("lesson-tabs").innerHTML=lessons.map((x,i)=>`<button class="lesson-tab ${i===lessonIndex?"active":""}" data-i="${i}">${i+1}. ${["However","Wh- words","Cause/effect","Sense verbs","Used to"][i]}</button>`).join("");document.querySelectorAll(".lesson-tab").forEach(b=>b.onclick=()=>{lessonIndex=+b.dataset.i;renderLesson()});$("lesson-prev").disabled=lessonIndex===0;$("lesson-next").textContent=lessonIndex===lessons.length-1?"Volver al inicio":"Siguiente tema →";}
$("lesson-prev").onclick=()=>{lessonIndex=Math.max(0,lessonIndex-1);renderLesson()};$("lesson-next").onclick=()=>{lessonIndex=(lessonIndex+1)%lessons.length;renderLesson()};
function renderVocab(){const v=vocab[vocabIndex];$("vocab-counter").textContent=`${vocabIndex+1} / ${vocab.length}`;$("vocab-word").textContent=v[0].toUpperCase();$("vocab-category").textContent=v[4];$("vocab-meaning").textContent=v[1]+" · "+v[2];$("vocab-example").textContent=v[3];$("vocab-answer").classList.add("hidden");$("vocab-card").querySelector(".card-hint").textContent="TOCA PARA REVELAR";$("dictionary").innerHTML=vocab.map(x=>`<article class="dict-item"><b>${x[0]}</b><div>${x[2]}</div><small>${x[1]}</small></article>`).join("");}
$("vocab-card").onclick=()=>{$("vocab-answer").classList.remove("hidden");$("vocab-card").querySelector(".card-hint").textContent="SIGNIFICADO Y EJEMPLO";};$("vocab-prev").onclick=()=>{vocabIndex=(vocabIndex+vocab.length-1)%vocab.length;renderVocab()};$("vocab-next").onclick=()=>{xp+=2;vocabIndex=(vocabIndex+1)%vocab.length;stats();renderVocab()};
let activeFilter="all";
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");activeFilter=b.dataset.filter;startPractice(activeFilter)});
function startPractice(filter){activeFilter=filter;const selected=filter==="all"?questions:questions.filter(q=>q[0]===filter);practiceSet=shuffle(selected);practiceIndex=0;renderPractice()}
function renderPractice(){if(practiceIndex>=practiceSet.length){$("question-word").textContent="¡TERMINASTE!";$("question-text").textContent="Has completado este bloque. Elige otro tema o vuelve a practicar."; $("answers").innerHTML="";$("feedback").className="feedback hidden";$("practice-counter").textContent=`${practiceSet.length} / ${practiceSet.length}`;$("next-question").disabled=true;return}const q=practiceSet[practiceIndex];practiceLocked=false;$("practice-counter").textContent=`${practiceIndex+1} / ${practiceSet.length}`;$("question-word").textContent=q[1];$("question-text").textContent=q[2];$("feedback").className="feedback hidden";$("next-question").disabled=true;$("answers").innerHTML="";shuffle(q.slice(3,7).map((x,i)=>({text:x,correct:x===q[3]}))).forEach(o=>{const b=document.createElement("button");b.className="answer";b.textContent=o.text;b.onclick=()=>answerPractice(b,o.correct,q);$("answers").appendChild(b)})}
function answerPractice(btn,ok,q){if(practiceLocked)return;practiceLocked=true;[...$("answers").children].forEach(b=>{if(b.textContent===q[3])b.classList.add("correct")});if(!ok)btn.classList.add("wrong");const f=$("feedback");f.className="feedback "+(ok?"good":"bad");f.innerHTML=`<strong>${ok?"¡Correcto! +10 XP":"No exactamente. Repasa la regla:"}</strong>${q[7]}`;if(ok){xp+=10;streak++;correctTotal++}else streak=0;stats();$("next-question").disabled=false}
$("next-question").onclick=()=>{practiceIndex++;renderPractice()};
function resetExam(){clearInterval(examTimer);examSet=shuffle(questions).slice(0,15);examIndex=0;examScore=0;examSeconds=900;examLocked=true;$("exam-counter").textContent="0 / 15";$("exam-time").textContent="15:00";$("exam-bar").style.width="100%";$("exam-word").textContent="READY?";$("exam-question").textContent="Pulsa comenzar cuando estés listo.";$("exam-answers").innerHTML="";$("exam-feedback").className="feedback hidden";$("exam-result").className="result hidden";$("exam-start").classList.remove("hidden");$("exam-next").disabled=true}
function renderExam(){if(examIndex>=examSet.length){finishExam();return}examLocked=false;const q=examSet[examIndex];$("exam-counter").textContent=`${examIndex+1} / 15`;$("exam-word").textContent=q[1];$("exam-question").textContent=q[2];$("exam-feedback").className="feedback hidden";$("exam-next").disabled=true;$("exam-answers").innerHTML="";shuffle(q.slice(3,7).map(x=>({text:x,correct:x===q[3]}))).forEach(o=>{const b=document.createElement("button");b.className="answer";b.textContent=o.text;b.onclick=()=>answerExam(b,o.correct,q);$("exam-answers").appendChild(b)})}
function answerExam(btn,ok,q){if(examLocked)return;examLocked=true;[...$("exam-answers").children].forEach(b=>{if(b.textContent===q[3])b.classList.add("correct")});if(!ok)btn.classList.add("wrong");const f=$("exam-feedback");f.className="feedback "+(ok?"good":"bad");f.innerHTML=`<strong>${ok?"Correcto":"Respuesta correcta: "+q[3]}</strong>${q[7]}`;if(ok){examScore++;xp+=5;correctTotal++;streak++}else streak=0;stats();$("exam-next").disabled=false}
function finishExam(){clearInterval(examTimer);examLocked=true;$("exam-word").textContent="EXAMEN TERMINADO";$("exam-question").textContent="Tu resultado:";$("exam-answers").innerHTML="";$("exam-feedback").className="feedback hidden";$("exam-next").disabled=true;$("exam-result").className="result";const grade=examScore/15*10;$("exam-result").innerHTML=`<div style="font-size:34px">${examScore}/15</div><div>Calificación estimada: ${grade.toFixed(1)} / 10</div><p>${grade>=8?"¡Muy bien!":grade>=6?"Vas avanzando. Repasa los errores.":"Vuelve al tutorial y practica los temas que fallaste."}</p><button class="btn primary" id="retry-exam">Repetir simulacro</button>`;$("retry-exam").onclick=resetExam}
$("exam-start").onclick=()=>{$("exam-start").classList.add("hidden");examTimer=setInterval(()=>{examSeconds--;const m=Math.floor(examSeconds/60),s=examSeconds%60;$("exam-time").textContent=`${m}:${String(s).padStart(2,"0")}`;$("exam-bar").style.width=(examSeconds/900*100)+"%";if(examSeconds<=0)finishExam()},1000);renderExam()};
$("exam-next").onclick=()=>{examIndex++;renderExam()};
renderLesson();renderVocab();stats();
