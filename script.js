//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  searchEpisodes();

  selectEpisode();

  makePageForEpisodes(allEpisodes);
}

const inputEl = document.getElementById('input-el');

const searchCount = document.querySelector('#results-count');



function searchEpisodes() {
  const allEpisodes = getAllEpisodes();

  inputEl.addEventListener('input', () => {
    const searchedWord = inputEl.value.toLowerCase();
    const matchingEpisodes = allEpisodes.filter(episode => {
      return episode.name.toLowerCase().includes(searchedWord) || episode.summary.toLowerCase().includes(searchedWord);
    });

    makePageForEpisodes(matchingEpisodes);

    updateEpisodeCount(matchingEpisodes.length, allEpisodes.length);

  })
}

function makePageForEpisodes(episodeList) {


  const main = document.getElementById('all-episodes');
  main.innerHTML = '';

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

const selectEpisode = () => {
  const allEpisodes = getAllEpisodes();
  const select = document.getElementById('select-episode');

  allEpisodes.forEach(episode => {
    const option = document.createElement('option');
    const formattedSeason = String(episode.season).padStart(2, "0");
    const formattedNumber = String(episode.number).padStart(2, "0");
    option.textContent = `S${formattedSeason}E${formattedNumber} - ${episode.name}`;
    option.value = episode.id;
    select.appendChild(option);
  });

  select.addEventListener('change', (ev) => {
    if(ev.target.value === 'all') {
      makePageForEpisodes(allEpisodes);
    }
    else {
      const selectEpisode = allEpisodes.find(epsd => epsd.id == ev.target.value);
      makePageForEpisodes([selectEpisode]);
    }
  });
  
}

const updateEpisodeCount = (episodeCount, totalEpisodes) => {
  searchCount.textContent = `Matching episodes: ${episodeCount} / ${totalEpisodes}`;
}

window.onload = setup;
