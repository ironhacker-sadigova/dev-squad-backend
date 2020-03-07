const mongoose = require('mongoose');
const uuidv1 = require ('uuid/v1'); 
var CryptoJS = require("crypto-js");
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

userSchema.virtual('password') // in order to have non peristent data :) and save the password but not in DB 
.set(function(password){
    // Temporary password
    this._password = password
    // generating a timestamp
    this.salt = uuidv1()
    // and encrypt the password
    this.hashed_Password= this.encryptPassword(password)
})
.get(function() {
    return this._password;
}) ;

// Encrypted password Method to do the hashing

userSchema.methods = {
    encryptPassword: function(password) {
        if (!password) return "";
        try {  // if successfull
            return CryptoJS.AES.encrypt('my message', this.salt)
            .toString(password);

        } catch (err){
            return "";

        }
    }

};

module.exports = mongoose.model('User', userSchema);