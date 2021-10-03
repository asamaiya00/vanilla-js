const API_URL = "https://api.lyrics.ovh";

const form = document.getElementById("form");
const search = document.getElementById("search");

async function fetchSongs(term) {
  const res = await fetch(`${API_URL}/suggest/${term}`);
  const data = await res.json()

  console.log(data)
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const term = search.value.trim();

  if (!term) {
    alert("Please enter something...");
  } else {
    fetchSongs(term);
  }
});
