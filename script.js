//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const main = document.querySelector('main');
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
