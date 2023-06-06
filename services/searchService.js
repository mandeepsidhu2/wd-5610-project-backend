const axios = require("axios");

exports.getMovieSearch = async (criteria, page) => {
  const url =
    "https://www.omdbapi.com/?s=" +
    criteria +
    "&apikey=320622dc&type=movie&page=" +
    page;
  const response = await axios.get(url);
  return response.data;
};
