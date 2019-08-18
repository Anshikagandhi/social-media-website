const User=require('../models/user');

module.exports.profile=function(req,res){
    console.log("Reached profile");
    console.log(req.params.id)
    if(req.params.id){
        User.findById(req.params.id,function(err,user){
            if(user){
                console.log(user);
                return res.render('user_profile',{
                    title:" User Profile",
                    user: user
                })
            }
            else{
                return res.redirect('/users/sign-in');
            }
        });
    }
    else{
        return res.redirect('/users/sign-in');
    }
}
module
.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');

    }
   
    
    return res.render('user_sign_up',{
        title:"user sign up"

    }
    );
}



//render the sign in page
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');

    }
    
    return res.render('user_sign_in',{
        title:"user sign in"

    }
    );
}





// get the sign up data
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }

        User.findOne({email:req.body.email},function(err,user){
            if(err){console.log('Error in finding user in signing up');return}

            if(!user){
                User.create(req.body,function(err,user){
                    if(err){console.log('Error in creating  user while signing up');return}

                    return res.redirect('/users/sign-in');
                })
            }
            else{
                return res.redirect('back');
            }

        });
    }
      
    

//sign in and create a session for the user
module.exports.createSession=function(req,res){
    //steps to authenticate

    //handle find user
    User.findOne({email: req.body.email},function(err,user){
         //handle user found
         if(err){console.log('Error in finding user in signing in');return}

         if(user){
              //handle mismatch user password
              if(user.password!=req.body.password){
                  return res.redirect('back');
              }


              //handle create sessions
              res.cookie('user_id',user.id);
              return res.redirect('/users/profile');

         }
         else{
              //handle user not found
              return res.redirect('back');

         }
    });
}

module.exports.createSession=function(req,res){
    return res.redirect('/');

}
module.exports.destroySession=function(req,res){
    req.logout();

    return res.redirect('/');
}





