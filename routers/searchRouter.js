const express = require("express");
const { getSearchResults } = require("../controllers/searchController");

const router = express.Router({ mergeParams: true });

router.route("/").get(getSearchResults);

module.exports = router;
