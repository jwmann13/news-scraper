const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public/"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/news-scraper";

mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true });

app.listen(PORT, () => {
    console.log(`app listening on http://localhost/${PORT}`);
})