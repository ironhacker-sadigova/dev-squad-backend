const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Need to create a relationship between posts & users

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            maxlength:'100',
        },
        body:{
            type: String,
            required: true,
            maxlength:'6000'
        },
        photo: {
            data: Buffer, // when we upload an image it is a space in the buffer where we will store the image till its loaded
            contentFormat: String
        },
        postedBy:{
            type: mongoose.Schema.ObjectId, // will be determined by the type we give
            ref: 'User'

        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);
const Post = mongoose.model('Issue', postSchema);
module.exports = Post; 