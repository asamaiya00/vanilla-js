const names = [
  {
    slug: "breakout-game",
    label: "Breakout Game",
  },
  {
    slug: "custom-video-player",
    label: "Custom Video Player",
  },
  {
    slug: "dom-array-methods",
    label: "Dom Array Methods",
  },
  {
    slug: "exchange-rate",
    label: "Exchange Rate Converter",
  },
  {
    slug: "expense-tracker",
    label: "Expense Tracker",
  },
  {
    slug: "hangman",
    label: "Hangman",
  },
  {
    slug: "infinte-scroll-posts",
    label: "Infinte Scroll ",
  },
  {
    slug: "lyrics-search",
    label: "Lyrics Search",
  },
  {
    slug: "meal-finder",
    label: "Meal Finder",
  },
  {
    slug: "memory-cards",
    label: "Memory Cards",
  },
  {
    slug: "modal-menu-slider",
    label: "Modal Menu Slider",
  },
  {
    slug: "movie-booking",
    label: "Movie Booking",
  },
  {
    slug: "music-player",
    label: "Music Player",
  },
  {
    slug: "relaxer",
    label: "Relaxer",
  },
  {
    slug: "text-speech-reader",
    label: "text Speech Reader",
  },
  {
    slug: "typing-game",
    label: "Typing Game",
  },
  {
    slug: "voice-number-guesser",
    label: "Voice Number Guesser",
  },
];

const grid = document.getElementById("grid");
names.forEach((proj) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h4>${proj.label}</h4>
    <a href="${proj.slug}">Live Demo<a/>
  `;
  grid.appendChild(card);
});
