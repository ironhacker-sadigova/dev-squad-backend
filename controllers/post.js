const Post = require('../models/post');


// TO GET ALL THE POSTS FROM THE DATABASE

exports.getPosts = (req,res)=> {
    const posts = Post.find()  // it will find and give all the posts normally
    .then((posts)=> {
        res.json({
            posts: posts // the key and value have the same name we could only keep posts if we wanna be modern
        });
    })
    .catch(err);
};

// to create a new post

exports.createPost = (req,res) => {
    const post = new Post(req.body);
    post.save().then(result => {
        res.status(200).json({
            post:result
        });

       /* if(err) {
            return res.status(400).json({
                error: err
            });
        }
        res.status(200).json({
            post: result
        }); */

    });

};

