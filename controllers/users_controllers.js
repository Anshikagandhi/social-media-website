const User=require('../models/user');
const fs= require('fs');
const path = require('path');
//lets keeps it back 
module.exports.profile=function(req,res){
    
    User.findById(req.params.id,function(err,user){
        //console.log(req.user);
        return res.render('user_profile',{
                            title:" User Profile",
                            profile_user: user
                        });
    });
    
    // if(req.cookies.user_id){
      

    //     User.findById(req.cookies.user_id,function(err,user){
    //         if(user){
    //             return res.render('user_profile',{
    //                 title:" User Profile",
    //                 user: user
    //             })
               
    //         }
    //         else{
    //             return res.redirect('/users/sign-in'); //pick up the call
    //         }
    //     });
    // }

    // else{
    //     return res.redirect('/users/sign-in');
    // }
    

}

module.exports.update= async function(req,res){
    if(req.user.id== req.params.id){
        try{
            let user=await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log("***multer error",err);

                }
                
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){

                    if(user.avatar){
                       fs.unlinkSync(path.join(__dirname, '..',user.avatar )); //this  unlinksync deletes the file uploaded  before so that file memory is not increased

                    }
                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar= path.join( '/'+ User.avatarPath, (req.file.filename));
                }
                user.save();
                return res.redirect('back');
            
                
            });
        }
        catch(err){
            req.flash('error',err);
            return res.redirect('back');
         }

    }
    else{
        req.flash('error','Unauthorised');
        return res.status(401).send('Unauthorised');

    }
 //   if(req.user.id== req.params.id){
  //      User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
  //          return res.redirect('back');
  //      })
 //   }
  //  else{
//
  //      return res.status(401).send('Unauthorised');
    };
module.exports.signUp=function(req,res){
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
    
    //return res.redirect('/users/sign-in');
    
    return res.render('user_sign_in',{
        title:"user sign up"

    }
    );

}





// get the sign up data
module.exports.create=function(req,res){
    console.log(req.body);
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
//sign in and create a session for the user

module.exports.createSession=function(req,res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/');

}
module.exports.destroySession=function(req,res){
    req.logout();
    req.flash('success','You have logged out');

    return res.redirect('/');
}






