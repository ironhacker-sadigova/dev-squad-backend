/* It is a set of express.js middlewares that wrap validators & sanitazer functions */

exports.createPostValidator = (req,res,next) => {
    req.check('title', 'Title is required').notEmpty();
    req.check('title', 'Title must not exceed 100 characters').isLength({
        max:100
    });

    req.check('body', 'Content is required').notEmpty();
    req.check('body', 'Content must not exceed 6000 characters').isLength({
        max:6000});

        // check errors if any
        const errors = req.validationErrors();

        //and show them 

        if (errors) {
            const occuredError = errors.map((error)=> error.msg) [0]
            return res.status(400).json({error: occuredError});
        }

        //proceed next and keep running

        next();

    

    };

