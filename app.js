const express = require("express");
const { health } = require("./controllers/healthController");
const app = express();
const mongodb = require("./database/mongo")
const userRouter = require("./routers/userRouter");
const loginRouter = require("./routers/authRouter")
const healthRouter = require("./routers/healthRouter");


app.use(express.json());
mongodb.dbConnect();
require('dotenv').config()

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

app.use("/api/user", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/health", healthRouter);

module.exports = app;







