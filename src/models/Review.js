import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    album: {
        type: Schema.Types.ObjectId,
        ref: "Album"
    },
    author: {
        type: String
    },
    date: {
        type: Date
    },
    rating: {
        type: Number
    },
    text: {
        type: String
    }
});

const Review = mongoose.model("Review", ReviewSchema);

export default Review;