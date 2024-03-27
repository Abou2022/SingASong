$(document).ready(function () {
  function handleFormSubmit(event) {
    event.preventDefault();

    var searchQuery = $("#searchQuery").val();
    var searchType = $("#searchType").val();

    const my_token =
      "BQBo-hloo5khV2UXkAPxrWwmhTw9-ThY0BQDbO7I_ZzVkiS5o0lkB9C_0N1UUUi7EVbCc5m201UEit14Ub9Mia_6JUcEHxyUwBwa5C_2ArPIMMaonZ7WGrNHP1RPgcKCFkQZbjAcvEdkqw35O6NuM-oo8D6vTzFDuEk2RxjmfKtGaX2y6f6KbJZy5xTIMtcSk3rlzz0eRwu21gJVKtByjmXIR7LCTBKcuiWmH8mkmkS0TlrVQ8hzluWwOqXAVgzvUVZKpC5LQMt66Fevx3Z14w0s";

    const url = `https://api.spotify.com/v1/search?q=${searchQuery}&type=${searchType}&limit=5`;

    try {
      const response = fetch(url, {
        headers: {
          Authorization: `Bearer ${my_token}`,
        },
      });

      const data = response.json();
      displayData(data, searchType);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
});
