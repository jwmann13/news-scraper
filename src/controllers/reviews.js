const express = require("express");
const { Album, Review } = require("../models")

module.exports = (() => {
    const reviews = express.Router();

    reviews.get("/", (req, res) => {
        Review.find({})
        .populate("album")
        .then(data => {
            res.json(data)
        })
        .catch(err => res.json(err))
    });

    

    return reviews;
})();