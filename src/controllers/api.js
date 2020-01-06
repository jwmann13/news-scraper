const express = require("express");
const { Album, Review } = require("../models/index");
const axios = require("axios").default;
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
    // get albums from review landing page
    axios
      .get("https://pitchfork.com/reviews/albums/")
      .then(function(response) {
        const $ = cheerio.load(response.data);

        $(".review").each(function(i, el) {
          // begin review object to be pushed to db
          let newReview = {
            link:
              "https://pitchfork.com" +
              $(this)
                .children("a")
                .attr("href"),
            author: $(this)
              .find(".authors")
              .text()
              .replace("by: ", ""),
            date: $(this)
              .find(".pub-date")
              .attr("datetime")
          };

          // album object to be pushed to db
          let newAlbum = {
            title: $(this)
              .find(".review__title > h2")
              .text(),
            artist: $(this)
              .find(".artist-list > li")
              .text(),
            genre: $(this)
              .find(".genre-list > li")
              .text(),
            cover: $(this)
              .find("img")
              .attr("src")
          };

          Album.create(newAlbum)
            .then(dbAlbum => {
              console.log("ALBUMS", dbAlbum);
              newReview.album = dbAlbum._id;
              return Review.create(newReview);
              // get individual review page for each album for score and review text
            })
            .then(function(dbReview) {
              console.log("REVIEWS", dbReview);
              axios.get(dbReview.link).then(function(response) {
                const reviewPage = cheerio.load(response.data);

                return Review.findByIdAndUpdate(dbReview._id, {
                  score: parseFloat(reviewPage(".score").text()),
                  text: reviewPage(".review-detail__abstract > p").text()
                });
              });
            })
            .then(() => res.send(200).end())
            .catch(err => {
              res.status(400).end();
              if (err) throw err;
            });
        });
      })
      .catch(err => {
        if (err) throw err;
      });
  });

  return api;
})();
