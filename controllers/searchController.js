const SearchService = require("../services/searchService");

exports.getSearchResults = async (req, res) => {
  try {
    const movies = await SearchService.getMovieSearch(
      req.query.criteria,
      req.query.page
    );
    res.json({ data: movies, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
