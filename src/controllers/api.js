const express = require("express")

module.exports = (() => {
    const api = express.Router();

    api.get("/", (req, res) => {
        res.json({
            butt: "butt"
        })
    });

    return api;
})();