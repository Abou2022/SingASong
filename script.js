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

    const response = await searchTracks(searchQuery, searchType);

    console.log("Search Results:", response);
  });
