require('dotenv').config()
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const tokenRouter = require("./Routes/token.routes");
const usdRouter = require("./Routes/usd.routes");
const playerRouter = require("./Routes/player.routes");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://" + process.env.USER_NAME + ":" + process.env.PASSWORD + "@cluster0.rmjxgjt.mongodb.net/ardaDb");

app.use("/api/tokens", tokenRouter);
app.use("/api/usd", usdRouter);
app.use("/api/player", playerRouter);


app.listen(3000, () => console.log("Listening on port 3000"));