const express = require("express");
const { health } = require("./controllers/healthController");
const app = express();
const mongodb = require("./database/mongo");
const userRouter = require("./routers/userRouter");
const loginRouter = require("./routers/authRouter");
const healthRouter = require("./routers/healthRouter");
const searchRouter = require("./routers/searchRouter");
const reviewRouter = require("./routers/reviewRouter");
const movieRouter = require("./routers/movieRouter");
const detailRouter=require("./routers/detailRouter");

const axios = require('axios');


var cors = require("cors");
app.use(cors());
app.use(express.json());
mongodb.dbConnect();
require("dotenv").config();

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

app.use("/api/user", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/health", healthRouter);
app.use("/api/search", searchRouter);
app.use("/api/review", reviewRouter);
app.use("/api/movie", movieRouter);
app.use("/api/detail",detailRouter);

module.exports = app;
