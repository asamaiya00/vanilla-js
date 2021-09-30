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

text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText.toLowerCase() === randomWord) {
    addWordToDOM();
    updateScore();
    e.target.value = "";
  }
});
