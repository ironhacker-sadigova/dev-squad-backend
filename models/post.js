

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

// Need to create a relationship between posts & users
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    photo: {
        data: Buffer,
        contenType: String
    },
    postedBy: {
        type: ObjectId,// will be determined by the type we give
        ref: "User"
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Post", postSchema);


