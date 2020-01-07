const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const PORT = process.env.PORT || 3000;

const app = express();

app.set("view engine", "ejs")
app.set("views", "./src/views/")

// morgan for dev logging
app.use(logger("dev"));

// body parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("./src/public/"));

// express routings
let { reviews, api } = require("./src/controllers/index");
app.use("/reviews", reviews);
app.use("/api", api);

app.get("/", (req, res) => {
  res.redirect("/reviews")
})

// mongo connection
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/news-scraper";

mongoose.connect(MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
});

// start server
app.listen(PORT, () => {
  console.log(`app listening on http://localhost/${PORT}`);
});
