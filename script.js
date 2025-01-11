//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  searchEpisodes();
  makePageForEpisodes(allEpisodes);
}

const inputEl = document.getElementById('input-el');
const searchBtn = document.querySelector('button');

function searchEpisodes() {
  const allEpisodes = getAllEpisodes();

  inputEl.addEventListener('input', () => {
    const searchedWord = inputEl.value.toLowerCase();
    const matchingEpisodes = allEpisodes.filter(episode => {
      return episode.name.toLowerCase().includes(searchedWord) || episode.summary.toLowerCase().includes(searchedWord);
    });

    makePageForEpisodes(matchingEpisodes);
  })
}

function makePageForEpisodes(episodeList) {
  const main = document.getElementById('all-episodes');
  main.innerHTML = '';

  for (const episode of episodeList) {
    const filmCard = document
      .getElementById("film-card-template")
      .content.cloneNode(true);

    const title = filmCard.querySelector("h3");
    const formattedSeason = String(episode.season).padStart(2, "0");
    const formattedNumber = String(episode.number).padStart(2, "0");
    title.textContent = `${episode.name} - S${formattedSeason}E${formattedNumber}`;

    filmCard.getElementById("summary").innerHTML = episode.summary;
    filmCard.querySelector("img").src = episode.image.medium;

    main.appendChild(filmCard);
  }
}

window.onload = setup;
