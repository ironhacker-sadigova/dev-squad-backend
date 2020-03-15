const Post = require('../models/post');
const Formidable = require ('formidable'); // its a package to handle files , we can also use multer package 
const FileSystem = require ('fs');


// TO GET ALL THE POSTS FROM THE DATABASE

exports.getPosts = (req,res) => {
    const posts = Post.find()  // it will find and give all the posts normally
    .populate("postedBy", "_id name" )
    .select("_id title body")
    .then((posts)=> {
        res.json({
            posts: posts // the key and value have the same name we could only keep posts if we wanna be modern
        });
    })
    .catch(err=> console.log(error));
};

// to create a new post
// I can not test in postman cauz its waiting for the fields used with formidables
exports.createPost = (req,res) => {
    let form = new Formidable.IncomingForm(); // method with formidable package incoming fields
    form.keepExtensions = true; // in order not to change the format of the file
    form.parse(req, (err, fields, files)=> {
        if(err){
            return res.status(400).json({
                error: 'Please choose another file. Your file cannot be uploaded'
            });
        }
        let post = new Post(fields) ; // its like a req.body 

        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;        
        post.postedBy = req.profile ; // req.profile has the user info and the post will be by that user
        if (files.photo){ // it will come from front-end client, once we handle the files :
            post.photo.data = FileSystem.readFileSync(files.photo.path); // will read the photo path
            post.photo.contentFormat = files.photo.type; // we populate the model

        }

        post.save((err,result) => {
            if (err){
                return res.status(400).json({
                    error:err
                });
            }
            res.json({
                post:result
            });
        });

    });

};

// To show all posts posted by a user based on the id
// we can't use select but populate because its in a different model 
exports.allpostsByUser = (req, res)=> {
    Post.find({postedBy: req.profile._id})
        .populate("postedBy", "_id name")
        .sort("_created") // it will show the most recents
        .exec((err, posts) => {
            if(err){
                return res.status(400).json(
                    {
                        error: err
                    }
                );
                
            }
            res.json(posts);
        });

};



exports.postById = (req, res, next, id) => {

    Post.findById(id)
        .populate("postedBy", "_id name")
        .exec((err,post)=> {
        if (err  || !post) {
            return res.status(400).json({
                error: err
            });
        }

        // if posts we append the post object info to the request

        req.post = post;
        next();

    }) ;
};

// CHECKING IF THE POST IS THE ONE OF THE USER
exports.isPostOwner = (req,res,next)=> {
    let isPostOwner = req.post && req.auth && req.post.postedBy._id === req.auth._id
    if (!isPostOwner){
        return res.status(400).json({
            error: 'You can not perform this action, you are not the owner'
        });
    }
    next();
};

// DELETE METHOD Whenever there is post id in the url execute postById()
// postById() will query the DB & return the post
// it will populate the user who created the post and make available in req.post

exports.deletePost = (req,res)=> {
    let post = req.post
    post.remove((err,deletedpost) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'Your post has been deleted.'
        });
    });
};