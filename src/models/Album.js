import mongoose from "mongoose";

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
    }
});

const Album = mongoose.model("Album", AlbumSchema);

export default Album;