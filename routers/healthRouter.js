const express = require("express");
const {
    health
} = require("../controllers/healthController");

const router = express.Router();

router.route("/").get(health);

module.exports = router;
