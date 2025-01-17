const inputEl = document.getElementById("input-el"); //Level 200
const searchCount = document.querySelector("#results-count"); // Level 200
const showOption = document.getElementById("select-show"); //Level 400

let allEpisodes = [];
let allShows = [];

async function setup() {
  allShows = await getAllShows();
  searchEpisodes();
  selectEpisode();
  makePageForEpisodes(allEpisodes);
}

////Level 100////
function makePageForEpisodes(episodeList) {
  const main = document.getElementById("all-episodes");
  main.innerHTML = "";

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

/// Level 200: Add a live search input ///

async function searchEpisodes() {
  inputEl.addEventListener("input", () => {
    selectEpisode();
    const searchedWord = inputEl.value.toLowerCase();
    const matchingEpisodes = allEpisodes.filter((episode) => {
      return (
        episode.name.toLowerCase().includes(searchedWord) ||
        episode.summary.toLowerCase().includes(searchedWord)
      );
    });

    makePageForEpisodes(matchingEpisodes);
    updateEpisodeCount(matchingEpisodes.length, allEpisodes.length);
  });
}

//Level 200//
//Display how many episodes match the current search
const updateEpisodeCount = (episodeCount, totalEpisodes) => {
  searchCount.textContent = `Matching episodes: ${episodeCount} / ${totalEpisodes}`;
};

/// Level 200: Episode selector//
const selectEpisode = async () => {
  // allEpisodes = await getAllEpisodes();
  const select = document.getElementById("select-episode");
  select.innerHTML = "";

  allEpisodes.forEach((episode) => {
    const option = document.createElement("option");
    const formattedSeason = String(episode.season).padStart(2, "0");
    const formattedNumber = String(episode.number).padStart(2, "0");
    option.textContent = `S${formattedSeason}E${formattedNumber} - ${episode.name}`;
    option.value = episode.id;
    select.appendChild(option);
  });

  select.addEventListener("change", (ev) => {
    const inputel = document.getElementById("input-el");
    inputel.value = "";
    if (ev.target.value === "all") {
      makePageForEpisodes(allEpisodes);
    } else {
      const selectEpisode = allEpisodes.find(
        (epsd) => epsd.id == ev.target.value
      );
      makePageForEpisodes([selectEpisode]);
      updateEpisodeCount([selectEpisode].length, [selectEpisode].length);
    }
  });
};

// Level 300//

async function getAllEpisodes(showID) {
  const url = `https://api.tvmaze.com/shows/${showID}/episodes`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    allEpisodes = await response.json();
    makePageForEpisodes(allEpisodes);
    selectEpisode();
  } catch (error) {
    console.error(error.message);
  }
}

///// Level 400:Add a `select` element to your page so the user can choose a show.

async function getAllShows() {
  if (allShows.length > 0) return allShows;

  const response = await fetch("https://api.tvmaze.com/shows");
  const data = await response.json();
  console.log(data);
  allShows = data.sort((a, b) => a.name.localeCompare(b.name));

  const defaultOpt = document.createElement("option");
  defaultOpt.value = "all";
  defaultOpt.textContent = "Select a show..";
  showOption.appendChild(defaultOpt);
  allShows.forEach((show) => {
    const option = document.createElement("option");
    option.value = show.id;
    option.textContent = show.name;
    showOption.appendChild(option);
  });

  showOption.addEventListener("change", (event) => {
    
    if (event.target.value === "all") {
      makePageForEpisodes();
    } else {
      getAllEpisodes(event.target.value);
    }
  });
}

window.onload = setup;
