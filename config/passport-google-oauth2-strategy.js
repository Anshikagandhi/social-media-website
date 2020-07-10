const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');
const env=require('./environment');

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL: env.google_call_back_url
},
function(accessToken,refreshToken, profile ,done){
    //find the user
    User.findOne({email: profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log("Error in passport-google oauth",err); return;
        }
        console.log(profile);
        if(user){
            //if found then set user as req.user
            return done(null,user);
        }
        else{
            //if not found then create a user and then user as req.user
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            },
            function(err,user){
                if(err){
                    console.log("Erro in creating sign in for google oauth",err); return;
                }
                return done(null,user);
            });
            }
    });
}));