const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title: {
        type: String
    },
    artist: {
        type: String
    },
    genre: {
        type: String
    },
    cover: {
        type: String
    }
});

const Album = mongoose.model("Album", AlbumSchema);

module.exports = Album;