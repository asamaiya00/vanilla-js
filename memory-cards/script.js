const cardsEl = [];

const cardsContainer = document.getElementById("cards-container");
const next = document.getElementById("next");
const current = document.getElementById("current");
const prev = document.getElementById("prev");

let currentActiveCard = 0;

const cardsData = [
  {
    question: "What is a Variable?",
    answer: "Storage Container",
  },
  {
    question: "What is React?",
    answer: "A JavaScript library",
  },
  {
    question: "What is Angular?",
    answer: "A JavaScript Framework",
  },
];

function createCards() {
  cardsData.forEach((card, index) => createCard(card, index));
}

function createCard(card, index) {
  const cardEl = document.createElement("div");

  cardEl.classList.add("card");
  if (index === 0) {
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
    current.innerText = `${currentActiveCard+1} / ${cardsEl.length}`
}
createCards();
