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

// Function to fetch user's top tracks from Spotify API
async function getTopTracks() {
  // Endpoint reference: https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (
    await fetchWebApi("v1/me/top/tracks?time_range=long_term&limit=5", "GET")
  ).items;
}

async function displayTopTracks() {
  const topTracks = await getTopTracks();
  console.log("Top Tracks:", topTracks);
}

const playlistId = "1r0BDMv2Y1OPswRtLxCx7I";
const iframe = document.createElement("iframe");
iframe.title = "Spotify Embed: Recommendation Playlist";
iframe.src = `https://open.spotify.com/embed/playlist/${playlistId}`;
iframe.width = "100%";
iframe.height = "100%";
iframe.style.minHeight = "360px";
iframe.frameBorder = "0";
iframe.allow =
  "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
iframe.loading = "lazy";
document.getElementById("playlistContainer").appendChild(iframe);

displayTopTracks();
