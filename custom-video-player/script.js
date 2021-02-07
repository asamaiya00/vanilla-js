const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timespan = document.getElementById('timespan');

function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else video.pause();
}

function updatePlayIcon() {
  return true;
}

function updateProgress() {
  return true;
}

function setProgress() {
  return true;
}

function stopVideo() {
  return true;
}

video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

progress.addEventListener('click', setProgress);
