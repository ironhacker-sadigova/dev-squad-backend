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

// CHECKING WHILE SIGNIG UP

    exports.createUserValidator = (req,res,next) => {
    // restricting the name 
    req.check('name', 'Please write your Name').notEmpty();
    // valid email containing required characters 
    req.check("email, 'Invalid email, please try again").matches(/.+\@.+ \..+/) // MDN REGULAR EXPRESSIONS
    .withMessage('Email must contain @')
    // checking if password
    req.check('password', 'Password is required').notEmpty()
    req.check('password')
    .isLength({min:7})
    .withMessage('Your password must contain at least 7 characters')
    .matches(/\d/) // stands for digits
    .withMessage('Your password must contain a number');
// Check errors 
const errors = req.validationErrors();

if (errors) {
    const occuredError = errors.map((error)=> error.msg) [0]
    return res.status(400).json({error: occuredError});
}

next();
    };
