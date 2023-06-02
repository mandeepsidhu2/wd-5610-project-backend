const express = require("express");
const {
    login
} = require("../controllers/authContoller");

const router = express.Router();

router.route("/").post(login);

module.exports = router;
