


const mongoose = require("mongoose");
const uuidv1 = require("uuid/v1");
const crypto = require("crypto");

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
    updated: Date
});

/**
 * Virtual fields are additional fields for a given model.
 * Their values can be set manually or automatically with defined functionality.
 * Keep in mind: virtual properties (password) don’t get persisted in the database.
 * They only exist logically and are not written to the document’s collection.
 */

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