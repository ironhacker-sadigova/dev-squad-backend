
const Post = require("../models/post");
const formidable = require("formidable"); // its a package to handle files , we can also use multer package 
const fs = require("fs");
const _ = require("lodash"); //we will use it to edit & update posts


// TO GET ALL THE POSTS FROM THE DATABASE

exports.postById = (req, res, next, id) => {
    Post.findById(id)
        .populate("postedBy", "_id name")
        .exec((err, post) => {
            if (err || !post) {
                return res.status(400).json({
                    error: err
                });
            }
                    // if posts we append the post object info to the request

            req.post = post;
            next();
        });
};

exports.getPosts = (req, res) => {
    const posts = Post.find()
        .populate("postedBy", "_id name")
        .select("_id title body")
        .then(posts => {
            res.json({ posts });
        })
        .catch(err => console.log(err));
};

// to create a new post
// I can not test in postman cauz its waiting for the fields used with formidables
exports.createPost = (req, res, next) => {
    let form = new formidable.IncomingForm();// method with formidable package incoming fields
    form.keepExtensions = true; // in order not to change the format of the file
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        let post = new Post(fields);

        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        post.postedBy = req.profile;

        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }
        post.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
};

// To show all posts posted by a user based on the id
// we can't use select but populate because its in a different model 

exports.postsByUser = (req, res) => {
    Post.find({ postedBy: req.profile._id })
        .populate("postedBy", "_id name")
        .sort("_created") // it will show the most recents
        .exec((err, posts) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(posts);
        });
};


// CHECKING IF THE POST IS THE ONE OF THE USER

exports.isPoster = (req, res, next) => {
    let isPoster =
        req.post && req.auth && req.post.postedBy._id == req.auth._id;

    if (!isPoster) {
        return res.status(403).json({
            error: "User is not authorized"
        });
    }
    next();
};


// EDIT POST

exports.updatePost = (req, res, next) => {
    let post = req.post;
    post = _.extend(post, req.body);  //lodash method
    post.updated = Date.now();
    post.save(err => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(post);
    });
};



// DELETE METHOD Whenever there is post id in the url execute postById()
// postById() will query the DB & return the post
// it will populate the user who created the post and make available in req.post
exports.deletePost = (req, res) => {
    let post = req.post;
    post.remove((err, post) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: "Post deleted successfully"
        });
    });
};














