const DetailService=require("../services/detailService");

exports.getDetailResults = async (req, res) => {
    try {
      const { id } = req.query;
      const movies = await DetailService.getMovieDetail(id);
      res.json(movies);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
