const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const postSchema = new Schema(
    {
        title: {
            type: String,
            required: 'Please enter a title',
            maxlength:'100',
        },
        body:{
            type: String,
            required:'Your post cannot be empty',
            maxlength:'6000'
        }
    }
);
const Post = mongoose.model('Issue', postSchema);
module.exports = Post; 