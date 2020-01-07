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
        return cheerio.load(response.data);
      })
      .then(function($) {
        // object to hold scraped data
        let data = {
          _reviews: [],
          _albums: []
        };

        // grab each review on the page
        $(".review").each(function(i, el) {
          // begin review object to be pushed to db
          data._reviews.push({
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
          });

          // album object to be pushed to db
          data._albums.push({
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
              .replace("w_160", "w_320")
          });
        });

        console.log("SHIPPING DATA", data);
        return data;
      })
      .then(async function(data) {
        console.log("DATA SCRAPED", data);
        let album_doc = [];
        let review_doc = [];

        // index each album
        for (let i = 0; i < data._albums.length; i++) {
          const el = data._albums[i];
          // create album and push its doc to an array
          album_doc.push(await Album.create(el));
          // add the ObjectId of the resulting album to the corresponding review in the array
          data._reviews[i].album = album_doc[i]._id;
          // create review and push its doc to an array
          review_doc.push(await Review.create(data._reviews[i]))
        }

        return {
          album_doc,
          review_doc
        };
      })
      .then(function(data) {
        console.log("COLLECTIONS CREATED", data);

        // get individual review page for each album to grab score and review text
        // index through each review document
        data.review_doc.forEach(function(review) {

          // get page of the individual review from the doc
          axios.get(review.link)
          .then(function(response) {
            // load review page
            const reviewPage = cheerio.load(response.data);

            // update corresponding review with score and 
            return Review.findByIdAndUpdate(review._id, {
              score: parseFloat(reviewPage(".score").text()),
              text: reviewPage(".review-detail__abstract > p").text(),
            })
          });
        });
      })
      .then((data) => res.status(200).end())
      .catch(err => {
        res.status(400).end();
        if (err) throw err;
      });
  });

  return api;
})();
