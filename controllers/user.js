const _ = require("lodash");  //  a JS lib providing methods & functionalities and we always write _
const User = require("../models/user");
const formidable = require("formidable");
const fs = require("fs");

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found"
            });
        }
                // if user we append the user object info to the request

        req.profile = user; 
        next();
    });
};

exports.hasAuthorization = (req, res, next) => {
    const authorized =
        req.profile && req.auth && req.profile._id === req.auth._id;
    if (!authorized) {
        return res.status(403).json({
            error: "User is not authorized to perform this action"
        });
    }
};

exports.allUsers = (req, res) => {
    User.find((err, users) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(users);
    }).select("name email updated created");
};


// return the profile object from the request url thats enough to show the user

exports.getUser = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};


// USER PROFILE UPDATE METHOD

/*exports.updateUser = (req, res, next) => {
    let form = new formidable.IncomingForm(); 
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Photo could not be uploaded"
            });
        }
        // save user
        let user = req.profile; // first we extract user info 
        user = _.extend(user, fields);// lodash method extend : it changes the source object (user)
        user.updated = Date.now();

        if (files.photo) {
            user.photo.data = fs.readFileSync(files.photo.path);
            user.photo.contentType = files.photo.type;
        }

    // save the updated user in the DB 
        user.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }

            // in order not to give the properties of password to the front we set it to undefined
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        });
    });
};

*/

exports.updateUser = (req, res, next) => {
    let form = new formidable.IncomingForm(); // will handle the form request 
    form.keepExtensions = true;// to keep the extension
    form.parse(req, (err, fields, files) => { // we give 2 argumentd to this method with the data comming & how to handle it with a callback funct
        if (err) {
            return res.status(400).json({
                error: 'Fail to upload your photo'
            });
        }
        // save the user
        let user = req.profile;
    
    user = _.extend(user, fields); // LODASH METHOD :) 

        user.updated = Date.now();

        console.log(user);

        if (files.photo) { // IF THERES IS A PHOTO , WE ADD IT TO THE MODEL PHOTO 
            user.photo.data = fs.readFileSync(files.photo.path);
            user.photo.contentType = files.photo.type;
        }
// NOW WE SAVE THE USER 

        user.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        });
    });
};

exports.userPhoto = (req, res, next) => {
    if (req.profile.photo.data) {
// IF THE CASE MEANS THE USER UPLOADED THEIR PHOTOS 
        res.set(('Content-Type', req.profile.photo.contentType));
        return res.send(req.profile.photo.data);
    }
    next();
};

// DELETE USER


exports.deleteUser = (req, res, next) => {
    let user = req.profile;
    user.remove((err, user) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({ message: "User deleted successfully" });
    });
};





