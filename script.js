function launchConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

let score = 0;
let timeLeft = 30;
let gameInterval, dropInterval;

const soundClean = document.getElementById("sound-clean");
const soundDirty = document.getElementById("sound-dirty");

const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const playArea = document.getElementById("play-area");
const gameOver = document.getElementById("game-over");
const finalScore = document.getElementById("final-score");
const resetBtn = document.getElementById("reset-btn");

function startGame() {
  score = 0;
  timeLeft = 30;
  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;
  gameOver.classList.add("hidden");
  resetBtn.disabled = false;

  gameInterval = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) endGame();
  }, 1000);

  dropInterval = setInterval(createDrop, 700);
}

function createDrop() {
  const drop = document.createElement("div");
  drop.classList.add("drop");

  const isClean = Math.random() > 0.3;
  drop.classList.add(isClean ? "clean" : "dirty");

  drop.style.left = `${Math.random() * 90}%`;

 drop.addEventListener("click", () => {
  if (isClean) {
    score += 10;
    soundClean.currentTime = 0;
    soundClean.play().catch(e => console.warn("Clean sound blocked:", e));
    if (score >= 100) {
      launchConfetti();
    }
  } else {
    score -= 5;
    soundDirty.currentTime = 0;
    soundDirty.play().catch(e => console.warn("Dirty sound blocked:", e));
  }
  scoreEl.textContent = score;

  drop.classList.add("splash");
  setTimeout(() => drop.remove(), 300);
});

  drop.addEventListener("animationend", () => drop.remove());
  playArea.appendChild(drop);
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(dropInterval);
  document.querySelectorAll(".drop").forEach(d => d.remove());
  finalScore.textContent = score;
  gameOver.classList.remove("hidden");
  resetBtn.disabled = false;
}

resetBtn.addEventListener("click", () => {
  clearInterval(gameInterval);
  clearInterval(dropInterval);
  document.querySelectorAll(".drop").forEach(d => d.remove());
  startGame();
});

startGame();
