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

    reviews.get("/comment/:id", (req, res) => {
        Comment.find({})

        res.render("partials/comment")
    })

    

    return reviews;
})();