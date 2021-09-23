const wordEl = document.getElementById("word");
const wrongLetterEl = document.getElementById("wrong-letters");
const popupContainerEl = document.getElementById("popup-container");
const notificationEl = document.getElementById("notification-container");
const playAgainEl = document.getElementById("play-again");
const finalMessageEl = document.getElementById("final-message");

const words = [
  "react",
  "programming",
  "application",
  "mobile",
  "docker",
  "microsoft",
  "persistent",
];

const selectedWord = words[Math.floor(Math.random() * words.length)];
console.log(selectedWord);

const correctLetters = ["r", "e", "a", "c", "t"];
const wrongLetters = [];

function displayWord() {
  wordEl.innerHTML = `
        ${selectedWord
          .split("")
          .map((letter) => {
            return `<span class="letter">${
              correctLetters.includes(letter) ? letter : ""
            }</span>`;
          })
          .join("")}
    `;

  const innerWord = wordEl.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalMessageEl.innerText = "Congratsulations !!!! You Won !";
    popupContainerEl.style.display = "flex";
  }
}

displayWord();
