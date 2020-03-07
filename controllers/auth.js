const User = require ('../models/user');

exports.signup = async (req, res) => {
    const existingUser = await User.findOne({
        email: req.body.email}) // we will check based on the email if exists
        if (existingUser) return res.status(403).json({
            error: " Oops...Already existing email ..."
        })
        const user = await new User(req.body)
        await user.save(),
        res.status(200).json({message:'Successfully signed up, time to login'});
};