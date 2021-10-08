const msgEl = document.getElementById("msg");

const randomNumber = Math.floor(Math.random() * 100) + 1;

console.log("Number is " + randomNumber);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const speechRecognition = new window.SpeechRecognition();

speechRecognition.start();

function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  showMsgInDom(msg);
  checkNum(msg);
}

function showMsgInDom(msg) {
  msgEl.innerHTML = `
        <div>You said:</div>
        <span class='box'>${msg}</span>
        `;
}

function checkNum(msg) {
  const num = +msg;

  if (Number.isNaN(num)) {
    msgEl.innerHTML += "<div>Please try a number</div>";
    return;
  }

  if (num < 1 || num > 100) {
    msgEl.innerHTML += "<div>Number is between 1 - 100</div>";
    return;
  }

  if (num < randomNumber) {
    msgEl.innerHTML += "<div>GO HIGHER</div>";
    return;
  }

  if (num > randomNumber) {
    msgEl.innerHTML += "<div>GO LOWER</div>";
    return;
  }

  if (num === randomNumber) {
    document.body.innerHTML = `
    <h1>You Won</h1>
    <br>
    <button id="btn" onclick="window.location.reload()">Play again</button>
    `;
    return;
  }
}

speechRecognition.addEventListener("result", onSpeak);
speechRecognition.addEventListener("end", () => speechRecognition.start());
