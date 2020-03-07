const Post = require('../models/post');

exports.getPosts = (req,res)=> {
    res.json({
        posts: [
            {title: 'Any post'},
            {title: 'Any other post'}
        ]
    });
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

