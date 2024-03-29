// import config from "./config";
import config from "./config.js";

$(document).ready(function () {
  var searchFormEl = $("#searchForm");
  var asideSection = $("aside");

  async function handleFormSubmit(event) {
    event.preventDefault();

    var searchQuery = $("#searchQuery").val();
    var searchType = $("#searchType").val();
    if (!searchQuery) {
      console.log("No text entered");
      return;
    }
    if (!searchType) {
      console.log("No choice");
      return;
    }

    const my_token = await get_spotify_api_token(clientId, clientSecret);

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

  $("#searchForm").on("submit", handleFormSubmit);

  function displayData(data, searchType) {
    const itemList = asideSection.find("ul");
    itemList.empty();

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
        } else if (searchType === "playlist") {
          const itemLink = $("<a>")
            .attr("href", item.external_urls.spotify)
            .text("Open Playlist");
          itemLi.append(itemName, itemLink);
        } else if (searchType === "track") {
          const artists = item.artists.map((artist) => artist.name).join(", ");
          const albumName = item.album.name;
          const trackContainer = $("<div>").addClass("track-container");
          const playButton = $("<button>")
            .text("Play")
            .addClass("play-button")
            .click(() => playTrack(item));
          const trackInfo = $("<div>").addClass("track-info");
          const artistName = $("<p>").text("Artist(s): " + artists);
          const albumNameP = $("<p>").text("Album: " + albumName);
          trackInfo.append(artistName, albumNameP);
          itemLi.append(itemName, trackContainer);
          trackContainer.append(playButton, trackInfo);
        } else if (searchType === "album") {
          const artists = item.artists.map((artist) => artist.name).join(", ");
          const albumName = item.name;
          const releaseDate = item.release_date;
          const albumLink = $("<a>")
            .attr("href", item.external_urls.spotify)
            .text("Play Album");
          const albumInfo = $("<div>").addClass("album-info");
          const artistName = $("<p>").text("Artist(s): " + artists);
          const albumNameP = $("<p>").text("Album: " + albumName);
          const releaseDateP = $("<p>").text("Release Date: " + releaseDate);
          albumInfo.append(artistName, albumNameP, releaseDateP, albumLink);
          itemLi.append(itemName, albumInfo);
        } else if (searchType === "audiobook") {
          const authors = item.authors.map((author) => author.name).join(", ");
          const descriptionLink = $("<a>")
            .attr("href", "#")
            .text("Description")
            .addClass("description-link")
            .data("description", item.description);
          const audiobookInfo = $("<div>").addClass("audiobook-info");
          const authorName = $("<p>").text("Author(s): " + authors);
          const edition = $("<p>").text("Edition: " + item.edition);
          const language = $("<p>").text(
            "Language: " + item.languages.join(", ")
          );
          audiobookInfo.append(authorName, edition, language, descriptionLink);
          itemLi.append(itemName, audiobookInfo);
        }
        itemList.append(itemLi);
      });
      asideSection.append(itemList);
    } else {
      asideSection.text(`No ${searchType}s found.`);
    }
  }

  const clientId = config.clientId;
  const clientSecret = config.clientSecret;

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
