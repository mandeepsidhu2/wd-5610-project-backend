const express = require("express");
const {getDetailResults}=require("../controllers/detailController");

const router = express.Router({ mergeParams: true });

router.get("/",getDetailResults);

module.exports = router;