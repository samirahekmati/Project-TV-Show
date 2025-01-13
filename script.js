
// Store all episodesStore and store search term
let allEpisodes = []; 
let searchTerm = ""; 

// Fetch all episodes
function setup() {
  allEpisodes = getAllEpisodes(); 
  makePageForEpisodes(allEpisodes); 

  const input = document.getElementById("search-input");
  input.addEventListener("keyup", function () {
    searchTerm = input.value.toLowerCase();
    const filteredEpisodes = filterEpisodes(allEpisodes, searchTerm); 
    makePageForEpisodes(filteredEpisodes); 
    displayMatchCount(filteredEpisodes.length, allEpisodes.length); // Update match count
  });
}

// filter all episodes
function filterEpisodes(episodeList, term) {
  return episodeList.filter(
    (episode) =>
      episode.name.toLowerCase().includes(term) || // if match  name
      episode.summary.toLowerCase().includes(term) // if  match  summary
  );
}


// create HTML page and disply the elements
function makePageForEpisodes(episodeList) {
  const container = document.getElementById("episodes-container");
  container.innerHTML = ""; // Clear previous episodes

  for (const episode of episodeList) {
    const filmCard = document.createElement("section");
    filmCard.className = "film-card";

    const title = document.createElement("h3");
    title.className = "title";
    const formattedSeason = String(episode.season).padStart(2, "0");
    const formattedNumber = String(episode.number).padStart(2, "0");
    title.textContent = `${episode.name} - S${formattedSeason}E${formattedNumber}`;
    filmCard.appendChild(title);

    const image = document.createElement("img");
    image.className = "img";
    image.src = episode.image.medium;
    image.alt = `${episode.name} Image`;
    filmCard.appendChild(image);

    const summary = document.createElement("p");
    summary.className = "summary";
    summary.innerHTML = episode.summary;
    filmCard.appendChild(summary);

    container.appendChild(filmCard);
  }
}

function displayMatchCount(filteredCount, totalCount) {
  const matchCount = document.getElementById("match-count");
  matchCount.textContent = `Showing ${filteredCount} out of ${totalCount} episodes`;
}

window.onload = setup;
