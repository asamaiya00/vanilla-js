const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const title = document.getElementById("title");
const cover = document.getElementById("cover");
const audio = document.getElementById("audio");

const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");

const songs = ["hey", "summer", "ukulele"];

let songIndex = 2;
loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");

  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");

  audio.pause();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  progress.style.width = `${(currentTime / duration) * 100}%`;
}

function setProgress(e) {
  const { offsetX } = e;
  audio.currentTime = (offsetX / this.clientWidth) * audio.duration;
}

function playNextSong() {
  songIndex = songIndex < songs.length - 1 ? songIndex + 1 : 0;
  loadSong(songs[songIndex]);
  playSong();
}

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  isPlaying ? pauseSong() : playSong();
});
prevBtn.addEventListener("click", () => {
  songIndex = songIndex > 0 ? songIndex - 1 : songs.length - 1;
  loadSong(songs[songIndex]);
  playSong();
});
nextBtn.addEventListener("click", playNextSong);

audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", playNextSong);
