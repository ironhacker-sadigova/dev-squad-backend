const Post = require('../models/post');
const Formidable = require ('formidable'); // its a package to handle files
const FileSystem = require ('fs')


// TO GET ALL THE POSTS FROM THE DATABASE

exports.getPosts = (req,res) => {
    const posts = Post.find()  // it will find and give all the posts normally
    .then((posts)=> {
        res.json({
            posts: posts // the key and value have the same name we could only keep posts if we wanna be modern
        });
    })
    .catch(err=> console.log(error));
};

// to create a new post

exports.createPost = (req,res) => {
    let form = new Formidable.IncomingForm() // method with formidable package incoming fields
    form.keepExtensions = true; // in order not to change the format of the file
    form.parse(req, (err, fields, files)=> {
        if(err){
            return res.status(400).json({
                error: 'Please choose another file. Your file cannot be uploaded'
            });
        }
        let post = new Post(fields) ; // its like a req.body 
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

