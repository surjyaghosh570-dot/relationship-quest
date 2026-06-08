let questBank = [
"Describe your partner in 3 words ❤️",
"What made you smile about them today?",
"If you could change one thing in them (soft answer), what would it be?",
"Rate your partner's vibe today (1–10)",
"What do you miss most about them right now?",
"One thing you secretly admire about them?"
];

let currentQuest = "";

window.onload = () => {
loadProfile();
generateQuest();
updateStreak();
loadLog();
};

// SAVE PROFILE
function saveProfile(){
let p1 = document.getElementById("p1").value;
let p2 = document.getElementById("p2").value;

localStorage.setItem("p1",p1);
localStorage.setItem("p2",p2);

document.getElementById("status").innerText =
`${p1} ❤️ ${p2} connected`;
}

function loadProfile(){
let p1 = localStorage.getItem("p1");
let p2 = localStorage.getItem("p2");

if(p1 && p2){
document.getElementById("status").innerText =
`${p1} ❤️ ${p2}`;
}
}

// QUEST
function generateQuest(){
let index = new Date().getDate() % questBank.length;
currentQuest = questBank[index];

document.getElementById("quest").innerText = currentQuest;
}

// ANSWER
function submitAnswer(){
let ans = document.getElementById("answer").value;
if(!ans) return;

let data = JSON.parse(localStorage.getItem("log")||"[]");

data.push({
q: currentQuest,
a: ans,
time: new Date().toLocaleDateString()
});

localStorage.setItem("log",JSON.stringify(data));

document.getElementById("answer").value="";

updateStreak();
loadLog();

document.getElementById("result").innerText =
"Answer saved ❤️";
}

// STREAK
function updateStreak(){
let last = localStorage.getItem("last") || 0;
let streak = parseInt(localStorage.getItem("streak")||0);

let now = Date.now();

if(now - last > 86400000){
streak++;
}

localStorage.setItem("last",now);
localStorage.setItem("streak",streak);

document.getElementById("streak").innerText =
streak + " days 🔥";
}

// LOG
function loadLog(){
let log = JSON.parse(localStorage.getItem("log")||"[]");

let box = document.getElementById("log");
box.innerHTML = "";

log.slice(-5).forEach(x=>{
box.innerHTML += `
<p>📌 <b>${x.time}</b><br>${x.q}<br>→ ${x.a}</p>
<hr>`;
});
}
