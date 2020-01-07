const express = require("express");
const { Album, Review } = require("../models")

module.exports = (() => {
    const reviews = express.Router();

    reviews.get("/", (req, res) => {
        Review.find({})
        .populate("album")
        .then(data => {
            res.render("pages/index", { data })
        })
        .catch(err => res.json(err))
    });

    

    return reviews;
})();