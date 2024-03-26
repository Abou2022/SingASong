const token = process.env.SPOTIFY_TOKEN;

async function searchTracks(query) {
  const endpoint = `v1/search?q=${encodeURIComponent(query)}&type=track`;
  const response = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}
