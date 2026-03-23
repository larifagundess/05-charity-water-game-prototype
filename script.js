console.log("Game running");

let score = 0;
let lives = 3;
let time = 30;
let currentType = "clean";
let timer = null;

const GAME_TIME = 30;
const WIN_SCORE = 60;

// DOM
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const endScreen = document.getElementById("endScreen");

const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const livesEl = document.getElementById("lives");
const itemText = document.getElementById("itemText");
const feedback = document.getElementById("feedback");
const finalScore = document.getElementById("finalScore");
const timerFill = document.getElementById("timerFill");
const endMessage = document.getElementById("endMessage");
const confettiContainer = document.getElementById("confettiContainer");

// Buttons
document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("restartBtn").addEventListener("click", restartToStart);
document.getElementById("resetBtn").addEventListener("click", resetCurrentGame);
document.getElementById("cleanBtn").addEventListener("click", () => choose("clean"));
document.getElementById("badBtn").addEventListener("click", () => choose("bad"));

// Items
const items = [
  { name: "Dorm Fountain", type: "clean" },
  { name: "Filtered Bottle", type: "clean" },
  { name: "Campus Refill Station", type: "clean" },
  { name: "River Water", type: "bad" },
  { name: "Rusty Pipe Water", type: "bad" },
  { name: "Dirty Runoff", type: "bad" }
];

function startGame() {
  startScreen.classList.remove("active");
  endScreen.classList.remove("active");
  gameScreen.classList.add("active");

  resetValues();
  updateUI();
  clearFeedback();
  nextItem();

  if (timer) {
    clearInterval(timer);
  }

  timer = setInterval(() => {
    time--;
    updateUI();
    updateTimerBar();

    if (time <= 0 || lives <= 0) {
      endGame();
    }
  }, 1000);
}

function resetValues() {
  score = 0;
  lives = 3;
  time = GAME_TIME;
  currentType = "clean";
  updateTimerBar();
}

function choose(choice) {
  if (!gameScreen.classList.contains("active")) {
    return;
  }

  if (choice === currentType) {
    score += 10;
    feedback.textContent = "Correct! +10";
    feedback.classList.remove("wrong");
    feedback.classList.add("correct");
  } else {
    score = Math.max(0, score - 5); // challenge / obstacle
    lives--;
    feedback.textContent = "Wrong! -1 life and -5 points";
    feedback.classList.remove("correct");
    feedback.classList.add("wrong");
  }

  updateUI();

  if (lives <= 0) {
    endGame();
    return;
  }

  nextItem();
}

function nextItem() {
  const item = items[Math.floor(Math.random() * items.length)];
  itemText.textContent = item.name;
  currentType = item.type;
}

function updateUI() {
  scoreEl.textContent = score;
  timeEl.textContent = time;
  livesEl.textContent = lives;
}

function updateTimerBar() {
  const percent = Math.max(0, (time / GAME_TIME) * 100);
  timerFill.style.width = `${percent}%`;
}

function clearFeedback() {
  feedback.textContent = "Choose the correct category.";
  feedback.classList.remove("correct", "wrong");
}

function endGame() {
  clearInterval(timer);
  timer = null;

  gameScreen.classList.remove("active");
  endScreen.classList.add("active");
  finalScore.textContent = score;

  if (score >= WIN_SCORE) {
    endMessage.textContent = "Great job! You protected more clean water sources.";
    launchConfetti();
  } else {
    endMessage.textContent = "Nice start! Play again to improve your score.";
    clearConfetti();
  }
}

function resetCurrentGame() {
  clearInterval(timer);
  timer = null;
  startGame();
}

function restartToStart() {
  clearInterval(timer);
  timer = null;
  clearConfetti();
  endScreen.classList.remove("active");
  gameScreen.classList.remove("active");
  startScreen.classList.add("active");
}

function launchConfetti() {
  clearConfetti();

  const colors = ["#FFC907", "#2E9DF7", "#8BD1CB", "#4FCB53", "#FF902A", "#F16061"];

  for (let i = 0; i < 80; i++) {
    const piece = document.createElement("div");
    piece.classList.add("confetti");
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = `${2 + Math.random() * 3}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    confettiContainer.appendChild(piece);
  }
}

function clearConfetti() {
  confettiContainer.innerHTML = "";
}