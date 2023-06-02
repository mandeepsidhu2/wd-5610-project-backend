exports.health = async (req, res) => {
    try {
      res.json({ data: "pong", status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };