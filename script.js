$(document).ready(function () {
  var searchFormEl = $("#searchForm");

  async function handleFormSubmit(event) {
    event.preventDefault();

    var searchQuery = $("#searchQuery").val();
    var searchType = $("#searchType").val();

    const my_token = "";

    const url = `https://api.spotify.com/v1/search?q=${searchQuery}&type=${searchType}&limit=5`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${my_token}`,
        },
      });

      const data = await response.json();
      displayData(data, searchType);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  searchFormEl.on("submit", handleFormSubmit);

  function displayData(data, searchType) {
    if (
      data &&
      data[searchType + "s"] &&
      data[searchType + "s"].items.length > 0
    ) {
      const items = data[searchType + "s"].items;
      const itemList = $("<ul>");

      items.forEach((item) => {
        const itemLi = $("<li>");
        const itemName = $("<h4>").text(item.name);

        if (searchType === "artist") {
          const itemGenres = $("<p>").text("Genres: " + item.genres.join(", "));
          const itemPopularity = $("<p>").text(
            "Popularity: " + item.popularity
          );
          itemLi.append(itemName, itemGenres, itemPopularity);
        }
        itemList.append(itemLi);
      });
    }
  }
});
