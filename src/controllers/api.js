const express = require("express");
const { Album, Review } = require("../models/index");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = (() => {
  const api = express.Router();

  api.get("/albums", (req, res) => {
    Album.find({})
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json(err);
      });
  });

  api.get("/scrape", (req, res) => {
    axios
      .get("https://pitchfork.com/reviews/albums/")
      .then(function(response) {
        const $ = cheerio.load(response.data);
        // console.log(response.data)

        links = [];

        $(".review").each(function(i, el) {
          console.log($(this).children("a").attr("href"));
          links.push($(this).children("a").attr("href"))
        });
        res.json(links);
      })
      .catch(err => {
        if (err) throw err;
      });
  });

  return api;
})();
