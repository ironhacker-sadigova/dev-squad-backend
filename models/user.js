


const mongoose = require("mongoose");
const uuidv1 = require("uuid/v1");
const crypto = require("crypto");
const {ObjectId} = mongoose. Schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,  // it removes space
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now  //no now() because with mongoose we can't
    },
    updated: Date,
    photo: {
        data: Buffer,
        contentType: String 

        /*populate the photo we will have these
         two fields one will with the actual data that will
come in a binary format.*/
    },
    about:{
        type:String,
        trim: true
    },

    following: [{type: ObjectId, // part of mongoose
        ref: "User"}] ,
    followers: [{type: ObjectId, ref:"User"}]
// NEED TO UPDATE THE userByID controller method to populate the returned user object with ofllowers & following
//
    
});


// virtual field
userSchema
    .virtual("password") // in order to have non peristent data :) and save the password but not in DB 
    .set(function(password) {
        // create temporary variable called _password
        this._password = password;
        // generate a timestamp
        this.salt = uuidv1();
        // encryptPassword()
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

// Encrypted password Method to do the hashing

userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
// so the user will be authenticated only if his input matches with the hashed password
    encryptPassword: function(password) {
        if (!password) return "";
        try {
            return crypto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex");
        } catch (err) {
            return "";
        }
    }
};

module.exports = mongoose.model("User", userSchema);