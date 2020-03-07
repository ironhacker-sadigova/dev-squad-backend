const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            trim: true, // it removes space
            required:true,
        },
        email:{
            type: String,
            trim: true,
            required:true,
        },

        hashedPassword:{
            type: String,
            required: true

        },
        salt: String,
        created: {
            type: Date,
            default: Date.now  // no now() because with mongoose we can't
        },
        updated: Date
    }
);
const User = mongoose.model('Issue', userSchema);
module.exports = User; 