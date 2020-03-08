const jwt = require ('jsonwebtoken'); 
/* Say you want to log in to an app, like say Tinder. 
Tinder allows users to log in using their Facebook profile. 
So when the user selects the option to log in using Facebook, 
the app contacts Facebook’s Authentication server with the user’s credentials
 (username and password).
Once the Authentication server verifies the user’s credentials,
it will create a JWT and sends it to the user. The app now gets this JWT 
and allows the user access to its data.*/

require('dotenv').config(); // because I will need to import some var from the dotenv.
const User = require ('../models/user');


exports.signup = async (req, res) => {
    const existingUser = await User.findOne({
        email: req.body.email}) // we will check based on the email if exists
        if (existingUser) return res.status(403).json({
            error: " Oops...Already existing email ..."
        })()
        const user = await new User(req.body)
        await user.save(),
        res.status(200).json({message:'Successfully signed up, time to login'});
};

exports.signin = (req, res) => {
    // search the user via his email
    const {email,password} = req.body;
    
    User.findOne({email},(err,user) => {
    if(err && !user) {
        return res.status(404).json({
            error: 'Inexisting account. Please try again'
        });
    }    
    
    // I am gonna use here the create authenticated method done in the model

    if (!user.authenticate(password)) {
        return res.status(401).json({
            error: 'Your email and your password do not match'
        });
    }
// generate the cookie based on the user id & the secret in the env file jwt

const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET); // here the token can persist in the cookie youhouu

// and make it expire in a given time

res.cookie('cok', token, {expire: new Date() + 9999});
// this is to be able to display in the front user data
const {_id, name, email} = user ;
return res.json({token, user: {_id, email,name}});

    });

};

/* When we clear the cookie, it signs out. So I am gonna clear it, 
ask Leo how to sign out intentionnaly, and not only when the session expires
*/

exports.signout = (req,res) => {
    res.clearCookie('cok');
    return res.status(200);
};
    
 

