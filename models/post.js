const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
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


module.exports = mongoose.model('Post', 'postSchema');