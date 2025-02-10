async function fetchShows() {
    try {
        const response = await fetch("https://api.tvmaze.com/shows?page=1&limit=100");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const shows = await response.json();
        displayShows(shows);
        setupSearch(shows);
    } catch (error) {
        console.error("Error fetching shows:", error.message);
        alert("Failed to fetch shows.");
    }
}

function displayShows(shows) {
    const container = document.getElementById("shows-container");
    container.innerHTML = "";
    shows.forEach(show => {
        const showCard = document.createElement("div");
        showCard.classList.add("show-card");
        showCard.innerHTML = `
            <img src="${show.image?.medium || ''}" alt="${show.name}">
            <h4>${show.name}</h4>
        `;
        showCard.addEventListener("click", () => {
            window.location.href = `episodePage.html?showId=${show.id}&showName=${show.name}`;
        });
        container.appendChild(showCard);
    });
}

function setupSearch(shows) {
    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filteredShows = shows.filter(show =>
            show.name.toLowerCase().includes(query)
        );
        displayShows(filteredShows);
    });
}

document.addEventListener("DOMContentLoaded", fetchShows);




