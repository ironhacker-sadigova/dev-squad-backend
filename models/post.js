const mongoose = require('mongoose')
const Schema = mongoose.Schema;

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
        }
    }
);
const Post = mongoose.model('Issue', postSchema);
module.exports = Post; 