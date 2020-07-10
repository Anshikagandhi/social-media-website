// const passport=require('passport');
// const githubStrategy=require('passport-github').Strategy;
// const cryto=require('crypto');
// const User=require('../models/user');

// passport.use(new githubStrategy({
//     clientID: " 0fe7f5ce30f4f4196332",
//     clientSecret: " 0557b923a19c69866ebb5b0ce1b2de38022cad2a",
//     callbackURL: "http://localhost:8000/users/auth/github/callback"
// },
// function(accessToken,refreshToken, profile ,done){
//     //find the user
//     User.findOne({email: profile.emails[0].value}).exec(function(err,user){
//         if(err){
//             console.log("Error in github oauth",err); return;
//         }
//         console.log(profile);
//         if(user){
//             //if found then set user as req.user
//             return done(null,user);
//         }
//         else{
//             //if not found then create a user and then user as req.user
//             User.create({
//                 name: profile.displayName,
//                 email: profile.emails[0].value,
//                 password: crypto.randomBytes(20).toString('hex')
//             },
//             function(err,user){
//                 if(err){
//                     console.log("Erro in creating sign in for github oauth",err); return;
//                 }
//                 return done(null,user);
//             });
//             }
//     });
// }));