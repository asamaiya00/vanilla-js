const wordEl = document.getElementById("word");
const wrongLetterEl = document.getElementById("wrong-letters");
const popupContainerEl = document.getElementById("popup-container");
const notificationEl = document.getElementById("notification-container");
const playAgainEl = document.getElementById("play-button");
const finalMessageEl = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");
const words = [
  "react",
  "programming",
  "application",
  "mobile",
  "docker",
  "microsoft",
  "persistent",
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
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
    finalMessageEl.innerText = "Congratulations !!!! You Won !";
    popupContainerEl.style.display = "flex";

    window.removeEventListener("keydown", handler);
  }
}

function showNotification() {
  notificationEl.classList.add("show");

  setTimeout(() => {
    notificationEl.classList.remove("show");
  }, 3000);
}

function updateWrongLetterEl() {
  wrongLetterEl.innerHTML = `
        ${wrongLetters.length ? "<p>Wrong</p>" : ""}
        ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;

  const errors = wrongLetters.length;

  figureParts.forEach((part, index) => {
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  if (errors === figureParts.length) {
    finalMessageEl.innerText = "Unfortunately, You Lost!";
    popupContainerEl.style.display = "flex";

    window.removeEventListener("keydown", handler);
  }
}
const handler = (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLetterEl();
      } else {
        showNotification();
      }
    }
  }
};
window.addEventListener("keydown", handler);

playAgainEl.addEventListener("click", () => {
  window.addEventListener("keydown", handler);
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  updateWrongLetterEl();
  displayWord();

  popupContainerEl.style.display = "none";
});

displayWord();
