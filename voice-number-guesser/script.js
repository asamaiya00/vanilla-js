const msgEl = document.getElementById("msg");

const randomNumber = Math.floor(Math.random() * 100) + 1;

console.log("Number is" + randomNumber);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const speechRecognition = new window.SpeechRecognition();

speechRecognition.start();

function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  showMsgInDom(msg);
}

function showMsgInDom(msg) {
    
}

speechRecognition.addEventListener("result", onSpeak);
