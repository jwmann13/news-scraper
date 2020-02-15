const express = require("express");
const { Review } = require("../models");

module.exports = (() => {
  const reviews = express.Router();

  reviews.get("/", (req, res) => {
    Review.find({})
      .populate("album")
      .then(data => {
        res.render("pages/index", { data });
      })
      .catch(err => res.json(err));
  });

  reviews.get("/comment/:id", (req, res) => {
    Review.findOne({ _id: req.params.id })
      .populate("comments")
      .then(dbReview => {
        res.render("partials/comment", {
          review: req.params.id,
          comments: dbReview.comments
        });
      });
  });

  return reviews;
})();
