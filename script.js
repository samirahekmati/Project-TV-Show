
// Store all episodesStore and store search term
let allEpisodes = []; 
let searchTerm = ""; 

// Fetch all episodes
function setup() {
  allEpisodes = getAllEpisodes(); 
  makePageForEpisodes(allEpisodes); 
  populateEpisodeSelector(allEpisodes) 
  const input = document.getElementById("search-input");
  input.addEventListener("keyup", function () {
    searchTerm = input.value.toLowerCase();
    let filteredEpisodes = filterEpisodes(allEpisodes, searchTerm);
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
// Create the episode selection menu
function populateEpisodeSelector(episodes) {
  const selector = document.getElementById("episode-option-selector");
  selector.innerHTML = '<option value="">Show All Episodes</option>';
  episodes.forEach((episode) => {
    const option = document.createElement("option");
    const formattedSeason = String(episode.season).padStart(2, "0");
    const formattedNumber = String(episode.number).padStart(2, "0");
    option.value = `${episode.season}-${episode.number}`;
    option.textContent = `S${formattedSeason}E${formattedNumber} - ${episode.name}`;
    selector.appendChild(option);
  });
}


// updating the display when an episode is selected 
const episodeSelector = document.getElementById("episode-option-selector");
episodeSelector.addEventListener("change", function () {
  const selectedValue = episodeSelector.value; // Get the value of the selected option

  if (selectedValue === "") {
    makePageForEpisodes(allEpisodes); // Show all episodes
  } else {
    const [season, number] = selectedValue.split("-");
    const selectedEpisode = allEpisodes.find(
      (ep) =>
        ep.season === parseInt(season) &&
        ep.number === parseInt(number)
    );
    makePageForEpisodes(selectedEpisode ? [selectedEpisode] : []);
    const matchCount = document.getElementById("NumsOfEpisodes");
  matchCount.style.display = "none";
 
  }

  // If the `episodeHandler` object is implemented, update it here
  if (typeof episodeHandler !== "undefined") {
    episodeHandler.updateSelectedEpisode(selectedValue);
   
  }
});




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
 
// Update the user interface with the number of filtered episodes currently displayed versus the total number of episodes available
function displayMatchCount(filteredCount, totalCount) {
  const matchCount = document.getElementById("NumsOfEpisodes");
  matchCount.innerHTML = "";
  matchCount.innerHTML = `${filteredCount}/${totalCount}`;
}

window.onload = setup;
