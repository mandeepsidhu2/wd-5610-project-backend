const axios = require("axios");

exports.getMovieDetail = async (id) => {
  const url =
  'https://www.omdbapi.com/?i='+id+'&apikey=320622dc';
  const response = await axios.get(url);
  return response.data;
};