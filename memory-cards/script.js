const cardsEl = [];

const cardsContainer = document.getElementById("cards-container");
const nextBtn = document.getElementById("next");
const current = document.getElementById("current");
const prevBtn = document.getElementById("prev");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const addCardBtn = document.getElementById("add-card");
const addContainer = document.getElementById("add-container");
const questionTextArea = document.getElementById("question");
const answerTextArea = document.getElementById("answer");
const clearBtn = document.getElementById("clear");

let currentActiveCard = 0;

const cardsData =
  localStorage.getItem("cards") === null
    ? []
    : JSON.parse(localStorage.getItem("cards"));

function createCards() {
  cardsData.forEach((card, index) => createCard(card, index));
}

function createCard(card, index) {
  const cardEl = document.createElement("div");

  cardEl.classList.add("card");
  if (cardsEl.length == 0 || index === 0) {
    cardEl.classList.add("active");
  }

  cardEl.innerHTML = `
  <div class="inner-card">
  <div class="inner-card-front">
    <p>${card.question}</p>
  </div>

  <div class="inner-card-back">
    <p>${card.answer}</p>
  </div>
</div>
`;
  cardEl.addEventListener("click", () =>
    cardEl.classList.toggle("show-answer")
  );
  cardsEl.push(cardEl);

  cardsContainer.appendChild(cardEl);
  updateCurrent();
}

function updateCurrent() {
  current.innerText = `${currentActiveCard + 1} / ${cardsEl.length}`;
}
createCards();

nextBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card left";
  currentActiveCard++;
  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = "card active";

  updateCurrent();
});
prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card right";
  currentActiveCard--;
  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = "card active";

  updateCurrent();
});

showBtn.addEventListener("click", () => addContainer.classList.add("show"));
hideBtn.addEventListener("click", () => addContainer.classList.remove("show"));

addCardBtn.addEventListener("click", () => {
  const question = questionTextArea.value;
  const answer = answerTextArea.value;

  if (question.trim() && answer.trim()) {
    createCard({ question, answer });

    questionTextArea.value = "";
    answerTextArea.value = "";
    addContainer.classList.remove("show");

    cardsData.push({ question, answer });
    localStorage.setItem("cards", JSON.stringify(cardsData));
  } else {
    alert("Please enter question and answer");
  }
});

clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardsContainer.innerHTML = ``;
  window.location.reload();
});
