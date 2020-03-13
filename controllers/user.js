const User = require  ('../models/user');



exports.userById = (req, res, next, id) => {

    User.findById(id).exec((err, user)=>
    {
        if (err  || !user) {
            return res.status(400).json({
                error: 'Inexisting User'
            });
        }

        // if user we append the user object info to the request

        req.profile = user;
        next();

    }) ;
};

exports.AuthorizedUser = (req, res, next)=> {
    const authorized = req.profile && req.auth && req.profile._id === req.auth.id;

    if (!authorized) {
        return res.status(400).json ({
            error: 'Unauthorized action'
        });
    }
};