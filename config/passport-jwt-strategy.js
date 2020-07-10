 //setting up jwt
 //imported set of libraries
 //header contains jwt
 const passport=require('passport');
const JWTstrategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;

const User=require('../models/user');
const env=require('../config/environment');


let opts={
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey: env.jwt_secret
}


passport.use(new JWTstrategy(opts,function(JwtPayload,done){
    //find the user
    User.findById(JwtPayload._id,function(err,user){
        if(err){
            console.log('Error in finding user in jwt');
            return;
        }
        //if found return the user
        if(user){
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    });
}));

module.exports=passport;

