const Post = require('../models/post')

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
    console.log('A new post is being created', post);

};

