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
{tag:"PAST HABITS & ADJUSTMENT",title:"Used to, would, be used to, get used to",intro:"La clave es distinguir si hablas de un hábito pasado, de estar acostumbrado o del proceso de acostumbrarte.",body:`
<div class="rule"><b>1) USED TO + verbo base</b> = antes hacía / era algo, pero ahora ya no. Se usa en afirmativa.</div>
<div class="example"><b>I used to sleep with a nightlight.</b><span class="translation">Antes solía dormir con una luz nocturna.</span></div>
<div class="rule"><b>2) DIDN'T USE TO + verbo base</b> = antes no hacía algo. Después de DIDN'T, USE va sin D.</div>
<div class="example"><b>I didn't use to like coffee.</b><span class="translation">Antes no me gustaba el café.</span></div>
<div class="rule"><b>3) DID + subject + USE TO + verbo base?</b> = ¿solías...? En preguntas, DID ya marca el pasado: por eso es USE TO, no USED TO.</div>
<div class="example"><b>Did you use to sleep with a nightlight?</b><span class="translation">¿Solías dormir con una luz nocturna?</span></div>
<div class="rule"><b>4) WOULD + verbo base</b> = acción repetida en el pasado. No se usa normalmente para estados como BE, KNOW o LIKE.</div>
<div class="example"><b>My grandfather would tell us stories.</b><span class="translation">Mi abuelo solía contarnos historias.</span></div>
<div class="rule"><b>5) BE USED TO + sustantivo / verbo -ING</b> = ya estar acostumbrado.</div>
<div class="example"><b>I am used to working at night.</b><span class="translation">Estoy acostumbrado a trabajar de noche.</span></div>
<div class="rule"><b>6) GET USED TO + sustantivo / verbo -ING</b> = acostumbrarse; es el proceso de adaptación.</div>
<div class="example"><b>I'm getting used to waking up early.</b><span class="translation">Me estoy acostumbrando a levantarme temprano.</span></div>
<div class="rule"><b>RESUMEN PARA MEMORIZAR</b><br>USED TO = afirmativa pasada.<br>DIDN'T USE TO = negativa pasada.<br>DID ... USE TO? = pregunta pasada.<br>WOULD = hábito repetido.<br>BE USED TO = ya acostumbrado.<br>GET USED TO = proceso de acostumbrarse.</div>`,remember:"OJO CON LA TRAMPA: Did you USED to...? está mal en este ejercicio. La forma correcta es Did you USE to...? DID ya lleva la marca del pasado."}
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

// Preguntas adicionales tomadas directamente del Second Partial English Review Worksheet.
// Cada pregunta incluye una explicación del error típico para que el alumno entienda por qué falló.
questions.push(
["sense","After working outdoors all day, Tom felt ______ completely exhausted.","Choose the correct sense-verb structure.","Ø","like","as if","to be","FEEL + adjective: felt completely exhausted. No necesitas LIKE ni AS IF antes del adjetivo.","Elegiste una palabra extra. Aquí 'completely exhausted' ya es un adjetivo/frase adjetiva que describe cómo se sentía Tom. La estructura correcta es FEEL + adjective."],
["sense","Your proposal sounds ______.","Choose the correct option.","like a great idea","a great idea","as if a great idea","like","SOUND + LIKE + noun phrase: like a great idea.","Después de SOUND, LIKE introduce una comparación. En esta oración, la opción esperada en el worksheet es 'like a great idea'."],
["sense","The silk fabric feels smooth, almost ______ water running through your fingers.","Choose the correct option.","like","as if","Ø","as","LIKE + noun phrase: like water. Se compara la sensación con agua.","La palabra que sigue es un sustantivo ('water'), no una oración completa. Para comparar con un sustantivo usamos LIKE."],
["sense","It smells ______ toast in the kitchen.","Choose the correct option.","as if someone is burning","like someone burning","someone burns","as if burning","AS IF + subject + verb: someone is burning.","La estructura AS IF necesita una oración con sujeto y verbo: 'someone is burning'. 'Like' también puede introducir una frase nominal, pero aquí el ejercicio practica AS IF + clause."],
["sense","The background noise sounds ______ for a library study area.","Choose the correct option.","too loud","like too loud","as if too loud","loudly","SOUND + adjective: sounds too loud.","'Too loud' describe directamente el sonido. No agregues LIKE ni AS IF antes de un adjetivo."],
["sense","He looked ______ he had just seen a ghost.","Choose the correct option.","as if","like","Ø","as","LOOK + AS IF + subject + verb: he had just seen.","Después de AS IF viene una oración completa: 'he had just seen a ghost'. LIKE se usa para comparar con un sustantivo o frase nominal."],
["used","When we were younger, my grandfather ______ us stories by the fireplace every winter.","Repeated past action. Choose the correct form.","would tell","would told","was used to tell","used telling","WOULD + verbo base expresa una acción repetida en el pasado. También puede ser 'used to tell'.","'Would told' mezcla WOULD con pasado. Después de WOULD siempre va el verbo base: TELL. El worksheet acepta dos posibilidades para rutinas pasadas: WOULD TELL o USED TO TELL."],
["used","Moving to a colder climate was difficult, but I slowly ______ in freezing temperatures.","Process of becoming accustomed.","got used to living","used to live","would live","am used to live","GET USED TO + verb-ing expresa el proceso de acostumbrarse.","La oración habla de un proceso gradual ('slowly'). Por eso es GOT USED TO LIVING. Después de TO en 'get used to', usamos -ING, no el verbo base."],
["used","Don't worry about the busy street noise; I ______ in loud environments.","Present state of being accustomed.","am used to working","used to work","would work","get used to work","BE USED TO + verb-ing = ya estar acostumbrado.","No habla de un hábito pasado ni de un proceso. Dice que actualmente ya estás acostumbrado: AM USED TO. Después va WORKING."],
["used","It took me nearly two months to ______ up at 6:00 AM for my new schedule.","Process of becoming accustomed.","get used to waking","used to wake","would wake","be used to wake","GET USED TO + verb-ing = acostumbrarse poco a poco.","'It took me two months' indica tiempo para adaptarse. Usa GET USED TO y luego WAKING (-ING), no WAKE."],
["used","He no longer finds driving on the left side strange; he ______ it now.","Present state of being accustomed.","is used to doing","used to do","would do","gets used to do","BE USED TO + noun / verb-ing = ya está acostumbrado.","'Now' y 'no longer finds ... strange' indican que ya está acostumbrado actualmente: IS USED TO DOING."],
["used","Did you ______ with a nightlight on when you were a child?","Past habit in a question.","use to sleep","used to sleep","using to sleep","be used to sleep","DID + subject + USE TO + verbo base. DID ya marca el pasado.","Elegiste USED TO, pero en pregunta el auxiliar DID ya marca pasado. Por eso el verbo queda en forma base: USE. La respuesta es DID YOU USE TO SLEEP?"],
["used","They ______ spicy dishes, but now they enjoy them frequently.","Past state that is no longer true.","didn't use to like","wouldn't like","didn't used to like","aren't used to like","DIDN'T USE TO + verbo base = antes no les gustaba.","Después de DIDN'T no uses USED. El auxiliar ya marca pasado: DIDN'T USE TO LIKE."],
["used","Before going into orbit, astronauts must ______ weightlessness through intensive training.","Becoming accustomed.","get used to","used to","would","be used to","GET USED TO = acostumbrarse a algo; aquí se refiere al proceso de adaptación.","El contexto habla del entrenamiento para adaptarse a la ingravidez. GET USED TO expresa ese proceso. BE USED TO significaría que ya están acostumbrados."],
["however","You are welcome to invite ______ you wish to the seminar.","Rewrite using WHOEVER.","whoever","whichever","whatever","whenever","WHOEVER = cualquier persona que. Se refiere a personas.","WHICHEVER es para elegir entre opciones; WHATEVER para cosas; WHENEVER para tiempo. Como hablamos de cualquier persona, usamos WHOEVER."],
["cause","The flight was delayed ______ thick fog at the airport.","Complete with the correct cause phrase.","due to","therefore","as a result","consequently","DUE TO + noun: thick fog.","THICK FOG es un sustantivo/frase nominal. THEREFORE y CONSEQUENTLY introducen resultados, no causas."],
["cause","Heavy rain was the main reason for the cancellation. The cancellation was ______ heavy rain.","Complete the transformation using RESULT.","the result of","as a result","therefore","leads to","THE RESULT OF + noun expresa la causa de un evento.","'As a result' significa 'como consecuencia' y se usa para introducir el efecto. La estructura que completa 'was ___ heavy rain' es THE RESULT OF."],
["however","You can call me at any time that you need assistance. Rewrite using WHENEVER.","Rewrite using WHENEVER.","You can call me whenever you need assistance.","You can call me whoever you need assistance.","You can call me whatever you need assistance.","You can call me wherever you need assistance.","WHENEVER = at any time (en cualquier momento).","La frase original habla de tiempo ('at any time'), no de persona, cosa ni lugar. Por eso se usa WHENEVER."]
);

function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
function toast(s){const t=$("toast");t.textContent=s;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800)}
function stats(){ $("xp").textContent=xp;$("streak").textContent=streak;$("correct").textContent=correctTotal;$("progress-label").textContent=`${correctTotal} respuestas correctas`;$("progress-bar").style.width=Math.min(100,correctTotal/50*100)+"%";}
function showMode(m){["tutorial","vocab","practice","exam"].forEach(x=>{const panel=$(x);if(panel)panel.classList.toggle("hidden",x!==m)});document.querySelectorAll(".mode").forEach(b=>b.classList.toggle("active",b.dataset.mode===m));if(m==="vocab")renderVocab();if(m==="practice")startPractice("all");if(m==="exam")resetExam();}
document.querySelectorAll(".mode").forEach(b=>b.onclick=()=>showMode(b.dataset.mode));
function renderLesson(){const l=lessons[lessonIndex];$("lesson-counter").textContent=`${lessonIndex+1} / ${lessons.length}`;$("lesson-tag").textContent=l.tag;$("lesson-title").textContent=l.title;$("lesson-intro").textContent=l.intro;$("lesson-content").innerHTML=l.body;$("lesson-remember").textContent="🧠 "+l.remember;$("lesson-tabs").innerHTML=lessons.map((x,i)=>`<button class="lesson-tab ${i===lessonIndex?"active":""}" data-i="${i}">${i+1}. ${["However","Wh- words","Cause/effect","Sense verbs","Used to"][i]}</button>`).join("");document.querySelectorAll(".lesson-tab").forEach(b=>b.onclick=()=>{lessonIndex=+b.dataset.i;renderLesson()});$("lesson-prev").disabled=lessonIndex===0;$("lesson-next").textContent=lessonIndex===lessons.length-1?"Volver al inicio":"Siguiente tema →";}
$("lesson-prev").onclick=()=>{lessonIndex=Math.max(0,lessonIndex-1);renderLesson()};$("lesson-next").onclick=()=>{lessonIndex=(lessonIndex+1)%lessons.length;renderLesson()};
function renderVocab(){const v=vocab[vocabIndex];$("vocab-counter").textContent=`${vocabIndex+1} / ${vocab.length}`;$("vocab-word").textContent=v[0].toUpperCase();$("vocab-category").textContent=v[4];$("vocab-meaning").textContent=v[1]+" · "+v[2];$("vocab-example").textContent=v[3];$("vocab-answer").classList.add("hidden");$("vocab-card").querySelector(".card-hint").textContent="TOCA PARA REVELAR";$("dictionary").innerHTML=vocab.map(x=>`<article class="dict-item"><b>${x[0]}</b><div>${x[2]}</div><small>${x[1]}</small></article>`).join("");}
$("vocab-card").onclick=()=>{$("vocab-answer").classList.remove("hidden");$("vocab-card").querySelector(".card-hint").textContent="SIGNIFICADO Y EJEMPLO";};$("vocab-prev").onclick=()=>{vocabIndex=(vocabIndex+vocab.length-1)%vocab.length;renderVocab()};$("vocab-next").onclick=()=>{xp+=2;vocabIndex=(vocabIndex+1)%vocab.length;stats();renderVocab()};
let activeFilter="all";
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");activeFilter=b.dataset.filter;startPractice(activeFilter)});
function startPractice(filter){activeFilter=filter;const selected=filter==="all"?questions:questions.filter(q=>q[0]===filter);practiceSet=shuffle(selected);practiceIndex=0;renderPractice()}
function renderPractice(){if(practiceIndex>=practiceSet.length){$("question-word").textContent="¡TERMINASTE!";$("question-text").textContent="Has completado este bloque. Elige otro tema o vuelve a practicar."; $("answers").innerHTML="";$("feedback").className="feedback hidden";$("practice-counter").textContent=`${practiceSet.length} / ${practiceSet.length}`;$("next-question").disabled=true;return}const q=practiceSet[practiceIndex];practiceLocked=false;$("practice-counter").textContent=`${practiceIndex+1} / ${practiceSet.length}`;$("question-word").textContent=q[1];$("question-text").textContent=q[2];$("feedback").className="feedback hidden";$("next-question").disabled=true;$("answers").innerHTML="";shuffle(q.slice(3,7).map((x,i)=>({text:x,correct:x===q[3]}))).forEach(o=>{const b=document.createElement("button");b.className="answer";b.textContent=o.text;b.onclick=()=>answerPractice(b,o.correct,q);$("answers").appendChild(b)})}
function answerPractice(btn,ok,q){if(practiceLocked)return;practiceLocked=true;[...$("answers").children].forEach(b=>{if(b.textContent===q[3])b.classList.add("correct")});if(!ok)btn.classList.add("wrong");const f=$("feedback");f.className="feedback "+(ok?"good":"bad");f.innerHTML=`<strong>${ok?"¡Correcto! +10 XP":"No exactamente. Vamos a ver por qué:"}</strong>${ok?q[7]:(q[8]||q[7])}<div class="explain-correct"><b>Respuesta correcta:</b> ${q[3]}</div>`;if(ok){xp+=10;streak++;correctTotal++}else streak=0;stats();$("next-question").disabled=false}
$("next-question").onclick=()=>{practiceIndex++;renderPractice()};
function resetExam(){clearInterval(examTimer);examSet=shuffle(questions).slice(0,15);examIndex=0;examScore=0;examSeconds=900;examLocked=true;$("exam-counter").textContent="0 / 15";$("exam-time").textContent="15:00";$("exam-bar").style.width="100%";$("exam-word").textContent="READY?";$("exam-question").textContent="Pulsa comenzar cuando estés listo.";$("exam-answers").innerHTML="";$("exam-feedback").className="feedback hidden";$("exam-result").className="result hidden";$("exam-start").classList.remove("hidden");$("exam-next").disabled=true}
function renderExam(){if(examIndex>=examSet.length){finishExam();return}examLocked=false;const q=examSet[examIndex];$("exam-counter").textContent=`${examIndex+1} / 15`;$("exam-word").textContent=q[1];$("exam-question").textContent=q[2];$("exam-feedback").className="feedback hidden";$("exam-next").disabled=true;$("exam-answers").innerHTML="";shuffle(q.slice(3,7).map(x=>({text:x,correct:x===q[3]}))).forEach(o=>{const b=document.createElement("button");b.className="answer";b.textContent=o.text;b.onclick=()=>answerExam(b,o.correct,q);$("exam-answers").appendChild(b)})}
function answerExam(btn,ok,q){if(examLocked)return;examLocked=true;[...$("exam-answers").children].forEach(b=>{if(b.textContent===q[3])b.classList.add("correct")});if(!ok)btn.classList.add("wrong");const f=$("exam-feedback");f.className="feedback "+(ok?"good":"bad");f.innerHTML=`<strong>${ok?"¡Correcto!":"No exactamente. Vamos a ver por qué:"}</strong>${ok?q[7]:(q[8]||q[7])}${ok?"":`<div class="explain-correct"><b>Respuesta correcta:</b> ${q[3]}</div>`}`;if(ok){examScore++;xp+=5;correctTotal++;streak++}else streak=0;stats();$("exam-next").disabled=false}
function finishExam(){clearInterval(examTimer);examLocked=true;$("exam-word").textContent="EXAMEN TERMINADO";$("exam-question").textContent="Tu resultado:";$("exam-answers").innerHTML="";$("exam-feedback").className="feedback hidden";$("exam-next").disabled=true;$("exam-result").className="result";const grade=examScore/15*10;$("exam-result").innerHTML=`<div style="font-size:34px">${examScore}/15</div><div>Calificación estimada: ${grade.toFixed(1)} / 10</div><p>${grade>=8?"¡Muy bien!":grade>=6?"Vas avanzando. Repasa los errores.":"Vuelve al tutorial y practica los temas que fallaste."}</p><button class="btn primary" id="retry-exam">Repetir simulacro</button>`;$("retry-exam").onclick=resetExam}
$("exam-start").onclick=()=>{$("exam-start").classList.add("hidden");examTimer=setInterval(()=>{examSeconds--;const m=Math.floor(examSeconds/60),s=examSeconds%60;$("exam-time").textContent=`${m}:${String(s).padStart(2,"0")}`;$("exam-bar").style.width=(examSeconds/900*100)+"%";if(examSeconds<=0)finishExam()},1000);renderExam()};
$("exam-next").onclick=()=>{examIndex++;renderExam()};
renderLesson();renderVocab();stats();
