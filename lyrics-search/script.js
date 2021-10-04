const API_URL = "https://api.lyrics.ovh";

const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

async function fetchSongs(term) {
  const res = await fetch(`${API_URL}/suggest/${term}`);
  const data = await res.json();

  showDataInDOM(data);
}
async function fetchMoreSongs(url) {
  console.log(url);
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  showDataInDOM(data);
}

function showDataInDOM(data) {
  result.innerHTML = `
        <ul class="songs">
        ${data.data
          .map(
            (song) =>
              `<li>
            <span><strong> ${song.title} </strong> - ${song.artist.name}</span>
            <button class="btn" data-artist="${song.artist.name}" 
            data-songtitle="${song.title}">Get lyrics</button>
          </li>`
          )
          .join("")}
        </ul>
    `;
  console.log(data.data[0]);
  more.innerHTML = `
    ${
      data.prev
        ? `<button onclick=fetchMoreSongs("${data.prev}") class='btn'>Prev</button>`
        : ""
    }
    ${
      data.next
        ? `<button onclick=fetchMoreSongs("${data.next}") class='btn'>Next</button>`
        : ""
    }
    `;
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
