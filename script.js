const token = process.env.SPOTIFY_TOKEN;

document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let searchQuery = document.getElementById("searchQuery").value;
    let searchType = document.getElementById("searchType").value;

    console.log("Search Query: " + searchQuery);
    console.log("Search Type: " + searchType);
  });
