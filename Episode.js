async function fetchEpisodes() {
    const urlParams = new URLSearchParams(window.location.search);
    const showId = urlParams.get('showId');

    try {
        const response = await fetch(`https://api.tvmaze.com/shows/${showId}/episodes`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const episodes = await response.json();
        document.getElementById("show-name").textContent = urlParams.get('showName');
        displayEpisodes(episodes);
        setupEpisodeDropdown(episodes);
        setupEpisodeSearch(episodes);
    } catch (error) {
        console.error("Error fetching episodes:", error.message);
        alert("Failed to fetch episodes.");
    }
}

function displayEpisodes(episodes) {
    const container = document.getElementById("episodes-container");
    container.innerHTML = "";
    episodes.forEach(episode => {
        const episodeElement = document.createElement("div");
        episodeElement.classList.add("episode-card");
        episodeElement.innerHTML = `
            <img src="${episode.image?.medium || ''}" alt="${episode.name}">
            <h4>${episode.name}</h4>
            <p>${episode.summary || "No summary available."}</p>
        `;
        episodeElement.addEventListener("click", () => {
            window.location.href = episode.url; 
        });
        container.appendChild(episodeElement);
    });
}


function setupEpisodeDropdown(episodes) {
    const dropdown = document.getElementById("episode-dropdown");
    episodes.forEach(episode => {
        const option = document.createElement("option");
        option.value = episode.id;
        option.textContent = `S${episode.season.toString().padStart(2, "0")}E${episode.number.toString().padStart(2, "0")} - ${episode.name}`;
        dropdown.appendChild(option);
    });

    dropdown.addEventListener("change", event => {
        const selectedId = event.target.value;
        if (selectedId) {
            const selectedEpisode = episodes.find(e => e.id == selectedId);
            displayEpisodes([selectedEpisode]);
        } else {
            displayEpisodes(episodes);
        }
    });
}

function setupEpisodeSearch(episodes) {
    const searchInput = document.getElementById("search-episode");
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filteredEpisodes = episodes.filter(episode =>
            episode.name.toLowerCase().includes(query) ||
            episode.summary?.toLowerCase().includes(query)
        );
        displayEpisodes(filteredEpisodes);
    });
}

document.addEventListener("DOMContentLoaded", fetchEpisodes);





