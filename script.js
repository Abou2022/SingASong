const token = process.env.SPOTIFY_TOKEN;

async function searchTracks(query, type) {
  const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
    query
  )}&type=${type}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

document
  .getElementById("searchForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    let searchQuery = document.getElementById("searchQuery").value;
    let searchType = document.getElementById("searchType").value;

    if (!searchQuery || !searchType) {
      alert("Please enter a search query and select a search type.");
      return;
    }

    try {
      const response = await searchTracks(searchQuery, searchType);
      displaySearchResults(response);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching search results.");
    }
  });
