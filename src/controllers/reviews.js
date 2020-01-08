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
        console.log(req.params.id);
        
        Review.findOne({ _id: req.params.id })
        .populate("comment")
        .then((dbReview) => {
            console.log(dbReview.album);
            
        })

        res.render("partials/comment", {review: req.params.id})
    })

    return reviews;
})();