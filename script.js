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
          const itemImage = $("<img>")
            .attr(
              "src",
              item.images.length > 0
                ? item.images[0].url
                : "default-image-url.jpg"
            )
            .attr("alt", item.name)
            .addClass("artist-image");
          itemLi.append(itemName, itemGenres, itemPopularity, itemImage);
        }
        itemList.append(itemLi);
      });
      asideSection.append(itemList);
    } else {
      asideSection.text(`No ${searchType}s found.`);
    }
  }

  async function get_spotify_api_token(client_id, client_secret) {
    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(client_id + ":" + client_secret),
        },
        body: "grant_type=client_credentials",
      });
      if (!response.ok) {
        throw new Error("Failed to retrieve access token");
      }

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error("Error retrieving access token:", error);
      return null;
    }
  }
});
