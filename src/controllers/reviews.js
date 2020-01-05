const express = require("express")

module.exports = (() => {
    const reviews = express.Router();

    reviews.get("/", (req, res) => {
        res.send("hello")
    });

    return reviews;
})();