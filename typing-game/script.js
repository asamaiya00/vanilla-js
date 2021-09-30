const word = document.getElementById("word");
const text = document.getElementById("text");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const difficultySelect = document.getElementById("difficulty");
const endGameContainer = document.getElementById("end-game-container");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const settingsForm = document.getElementById("settings-form");

const words = [
  "mobile",
  "react",
  "node",
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

let randomWord,
  score = 0,
  time = 10;

let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

difficultySelect.value = difficulty ? difficulty : "medium";
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

addWordToDOM();

function updateScore() {
  score++;
  scoreEl.innerText = score;
}

const timeInterval = setInterval(updateTime, 1000);

function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time <= 0) {
    clearInterval(timeInterval);

    endGame();
  }
}

function endGame() {
  endGameContainer.innerHTML = `
        <h1>Time ran out</h1>
        <h2>Your score is ${score}</h2>
        <button onclick="location.reload()">Reload</button>
      `;

  endGameContainer.style.display = "flex";
}

text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText.toLowerCase() === randomWord) {
    addWordToDOM();
    updateScore();
    e.target.value = "";
    if (difficulty === "easy") {
      time += 5;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 2;
    }
    updateTime();
  }
});

settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
  text.focus()
});
