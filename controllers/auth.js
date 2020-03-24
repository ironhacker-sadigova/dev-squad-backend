const jwt = require ('jsonwebtoken'); 
/* Say you want to log in to an app, like say Tinder. 
Tinder allows users to log in using their Facebook profile. 
So when the user selects the option to log in using Facebook, 
the app contacts Facebook’s Authentication server with the user’s credentials
 (username and password).
Once the Authentication server verifies the user’s credentials,
it will create a JWT and sends it to the user. The app now gets this JWT 
and allows the user access to its data.*/
const expressjwt = require('express-jwt');

//express-jwt helps to protect routes : if the user is logged in and has a valid json token


require('dotenv').config(); // because I will need to import some var from the dotenv.
const User = require ('../models/user');
const _= require('lodash');


exports.signup = async (req, res) => {
    const existingUser = await User.findOne({
        email: req.body.email}); // we will check based on the email if exists
        if (existingUser) return res.status(403).json({
            error: " Oops...Already existing email ..."
        });
        const user = await new User(req.body)
        await user.save(),
        res.status(200).json({message:'Successfully signed up, time to login'});
};

exports.signin = (req, res) => {
    // search the user via his email
    const {email,password} = req.body;
    
    User.findOne({email},(err,user) => {
    if(err || !user) {
        return res.status(401).json({
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

// when the user tries to access some routes, will be possible only if signed in
// I can use this method in any of my routes and apply it as a middleware
 exports.signinRequire = expressjwt({
     secret: process.env.JWT_SECRET,
     userProperty: 'auth' // so that we know the user is authenticated 
 });

 /*
When user tries to access the  protected routes ( pages) server expects 
our client app to send the secret ( JWT_SECRET ) that we have saved in .env file 
and this secret will be checked with the Tocken  which is stored in browser's local storage 
 as cookie when user is logged in (tocken = user_id + JWT_SECRET ) . 
If both the secret key are matched then user will get an access to pages
 */


 