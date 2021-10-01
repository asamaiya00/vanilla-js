const textarea = document.getElementById("text");
const main = document.querySelector("main");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");
const readBtn = document.getElementById("read");
const voicesSelect = document.getElementById("voices");

let data = [
  {
    image: "./img/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./img/drink.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "./img/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./img/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./img/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./img/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./img/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./img/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./img/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./img/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./img/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./img/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];

function createBox({ image, text }) {
  const boxEl = document.createElement("div");
  boxEl.classList.add("box");

  boxEl.innerHTML = `
        <img src=${image} alt ="${text}"/>
        <p class="info" >${text}</p>
    `;

  boxEl.addEventListener("click", () => {
    setMessageText(text);
    speakText();

    boxEl.classList.add("active");
    setTimeout(() => boxEl.classList.remove("active"), 1000);
  });
  main.appendChild(boxEl);
}

data.forEach(createBox);

let voices = [];

const message = new SpeechSynthesisUtterance();

function setMessageText(text) {
  message.text = text;
}

function speakText() {
  speechSynthesis.speak(message);
}

function getVoices() {
  voices = window.speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    voicesSelect.appendChild(option);
  });
}

toggleBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.toggle("show")
);

closeBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.remove("show")
);

speechSynthesis.addEventListener("voiceschanged", getVoices);

// getVoices();
