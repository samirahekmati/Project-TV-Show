//You can edit ALL of the code here
async function setup() {
  const allEpisodes = await getAllEpisodes();
  searchEpisodes();

  selectEpisode();

  makePageForEpisodes(allEpisodes);
  updateEpisodeCount(allEpisodes.length, allEpisodes.length);
}

const inputEl = document.getElementById("input-el");

const searchCount = document.querySelector("#results-count");

async function searchEpisodes() {
  const allEpisodes = await getAllEpisodes();

  inputEl.addEventListener("input", () => {
    const selected = document.getElementById('selected');
    selected.setAttribute('selected', 'true');
    selectEpisode()
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

const selectEpisode = async () => {

  const allEpisodes = await getAllEpisodes();
  const select = document.getElementById("select-episode");

  allEpisodes.forEach((episode) => {
    const option = document.createElement("option");
    const formattedSeason = String(episode.season).padStart(2, "0");
    const formattedNumber = String(episode.number).padStart(2, "0");
    option.textContent = `S${formattedSeason}E${formattedNumber} - ${episode.name}`;
    option.value = episode.id;
    select.appendChild(option);
  });

  select.addEventListener("change", (ev) => {
    const inputel = document.getElementById('input-el');
    inputel.value = ""
    if (ev.target.value === "all") {
      makePageForEpisodes(allEpisodes);
    } else {
      const selectEpisode = allEpisodes.find(
        (epsd) => epsd.id == ev.target.value
      );
      makePageForEpisodes([selectEpisode]);
      updateEpisodeCount([selectEpisode].length,[selectEpisode].length)
    }
  });
};

const updateEpisodeCount = (episodeCount, totalEpisodes) => {
  searchCount.textContent = `Matching episodes: ${episodeCount} / ${totalEpisodes}`;
};

async function getAllEpisodes() {
  const url = "https://api.tvmaze.com/shows/82/episodes";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
    return json
  } catch (error) {
    console.error(error.message);
  
  }
  
}

window.onload = setup;
