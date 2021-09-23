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

function showNotification() {
  notificationEl.classList.add("show");

  setTimeout(() => {
    notificationEl.classList.remove("show");
  }, 3000);
}

function updatewrongLetterEl(){
    console.log('wrong letter')
}

window.addEventListener("keydown", (e) => {
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

        updatewrongLetterEl();
      } else {
        showNotification();
      }
    }
  }
});

displayWord();
