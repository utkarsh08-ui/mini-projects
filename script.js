// WORD PACKS (EXPANDED)
const packs = {
  general: ["apple","banana","keyboard","javascript","coding","python","developer","project","college","computer","focus","screen","internet","software","hardware","study","student","teacher","laptop","mobile"],
  cricket: ["cricket","bowler","batsman","umpire","wicket","boundary","innings","over","pitch","fielding","sixer","yorker","googly","spin","bouncer","scoreboard","stadium","bat","ball","captain"],
  food: ["pizza","burger","pasta","noodles","fries","momos","biryani","coffee","tea","juice","milkshake","icecream","samosa","dosa","idli","paneer","cheese","sandwich","salad","kitchen"],
  gaming: ["game","mission","controller","player","server","lobby","match","victory","defeat","weapon","shield","attack","arena","rank","battle","points","health","energy","zombie","survival"],
  anime: ["naruto","sasuke","goku","vegeta","eren","mikasa","luffy","zoro","shinchan","doraemon","avengers","ironman","thor","hulk","spiderman","batman","joker","superman","pikachu","marvel"],
  hard: ["encyclopedia","architecture","phenomenon","psychology","consequence","philosophy","extraordinary","achievement","determination","responsibility","communication","management","interpretation","environment","development"]
};

let words = Object.values(packs).flat();

// ELEMENTS
const wordEl = document.getElementById("word");
const textEl = document.getElementById("text");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const difficultyEl = document.getElementById("difficulty");
const wordPackEl = document.getElementById("wordPack");
const musicBtn = document.getElementById("musicBtn");
const container = document.querySelector(".game-container");
const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScore = document.getElementById("finalScore");

// SOUNDS
const correctSound = new Audio("correct.wav");
const gameOverSound = new Audio("gameover.wav");
const beepSound = new Audio("beep.wav");
const bgMusic = new Audio("bg.wav");
bgMusic.loop = true;

let score = 0;
let time = 12;
let timerStarted = false;
let timer;

// CHANGE WORD PACK
wordPackEl.addEventListener("change", () => {
  words = (wordPackEl.value === "all") ? Object.values(packs).flat() : packs[wordPackEl.value];
  newWord();
});

function newWord() {
  wordEl.textContent = words[Math.floor(Math.random() * words.length)];
  wordEl.style.animation = "pop 0.4s ease-out";
}

function startTimer() {
  timer = setInterval(() => {
    time--;
    timeEl.textContent = time;

    if (time <= 3) { timeEl.classList.add("low-time"); beepSound.play(); }
    else timeEl.classList.remove("low-time");

    if (time <= 0) {
      clearInterval(timer);
      container.classList.add("hide");
      finalScore.textContent = score;
      gameOverScreen.classList.add("show");
      gameOverSound.play();
    }
  }, 1000);
}

newWord();

// START GAME
document.getElementById("startBtn").onclick = () => {
  startScreen.classList.remove("show");
  container.classList.remove("hide");
  bgMusic.play();
  textEl.focus();
};

// RESTART
document.getElementById("restartBtn").onclick = () => location.reload();

// MUSIC TOGGLE
musicBtn.onclick = () => bgMusic.paused ? bgMusic.play() : bgMusic.pause();

// TYPING
textEl.addEventListener("input", () => {
  if (!timerStarted) { startTimer(); timerStarted = true; }

  if (textEl.value === wordEl.textContent) {
    correctSound.play();
    score++;
    scoreEl.textContent = score;
    textEl.value = "";
    newWord();

    let mode = difficultyEl.value;
    time = mode === "hard" ? 10 : mode === "medium" ? 12 : 15;
    timeEl.textContent = time;
  }
});
