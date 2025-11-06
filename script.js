const words = [

  // ----- General -----
  "apple","banana","keyboard","javascript","coding","mobile","study","school","teacher","laptop","chocolate","speed","mouse",
  "screen","internet","software","hardware","python","developer","science","student","college","project","computer","network",
  "camera","speaker","charger","battery","notebook","pencil","table","classroom","education","library","assignment","function",
  "variable","server","database","browser","system","machine","memory","monitor","device","application","upload","folder",
  "document","picture","gallery","sound","volume","profile","button","timer","score","level","focus","brain","skill",

  // ----- 🏏 Cricket Pack -----
  "cricket","stadium","batsman","bowler","umpire","wicket","boundary","innings","over","pitch","crease","fielding","catch",
  "runout","sixer","yorker","googly","bouncer","spin","powerplay","tournament","bat","ball","helmet","pads","stumps","scoreboard",

  // ----- 🍔 Food Pack -----
  "pizza","burger","pasta","noodles","sandwich","fries","momos","chicken","biryani","sauce","curry","tandoori","roll","coffee",
  "tea","juice","milkshake","icecream","chocolate","samosa","dosa","idli","paneer","sweet","spice","salad","cheese","kitchen",

  // ----- 🎮 Gaming Pack -----
  "game","mission","controller","player","server","lobby","match","victory","defeat","weapon","shield","power","attack","combo",
  "character","loading","quest","adventure","arena","rank","battle","points","health","energy","zombie","survival","warrior","ninja",

  // ----- 🧠 Hard English Pack -----
  "encyclopedia","architecture","phenomenon","psychology","consequence","philosophy","refrigeration","extraordinary","achievement",
  "determination","concentration","responsibility","communication","management","interpretation","cooperation","environment","development",

  // ----- 🎬 Movies / Anime Pack -----
  "naruto","sasuke","goku","vegeta","eren","mikasa","luffy","zoro","shinchan","doraemon","avengers","ironman","thor","hulk","spiderman",
  "batman","joker","superman","harrypotter","hermione","voldemort","pokemon","pikachu","marvel","dc","anime","superhero"

];


const wordEl = document.getElementById("word");
const textEl = document.getElementById("text");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const difficultyEl = document.getElementById("difficulty");
const musicBtn = document.getElementById("musicBtn");

let score = 0;
let time = 12;
timeEl.textContent = time;

// 🎵 sounds (correct filenames)
const correctSound = new Audio("correct.wav");
const gameOverSound = new Audio("gameover.wav");
const bgMusic = new Audio("bg.wav");
bgMusic.loop = true;

// play/pause background music
musicBtn.addEventListener("click", () => {
  if (bgMusic.paused) bgMusic.play();
  else bgMusic.pause();
});

// get new random word
function newWord() {
  wordEl.textContent = words[Math.floor(Math.random() * words.length)];
}
newWord();

// countdown
let timer = setInterval(() => {
  time--;
  timeEl.textContent = time;

  if (time <= 0) {
    clearInterval(timer);
    gameOverSound.play();
    alert("Time Over! Score: " + score);
    location.reload();
  }
}, 1000);

// typing check
textEl.addEventListener("input", () => {
  if (textEl.value === wordEl.textContent) {
    correctSound.play();
    score++;
    scoreEl.textContent = score;
    textEl.value = "";
    newWord();

    // difficulty time increase
    let difficulty = difficultyEl.value;
    if (difficulty === "hard") time += 2;
    else if (difficulty === "medium") time += 3;
    else time += 5;

    timeEl.textContent = time;
  }
});
