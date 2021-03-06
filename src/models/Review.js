const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    album: {
        type: Schema.Types.ObjectId,
        ref: "Album"
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    author: {
        type: String
    },
    date: {
        type: Date
    },
    score: {
        type: Number
    },
    link: {
        type: String,
        required: true,
        unique: true
    },
    text: {
        type: String
    }
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;