const express=require('express');
const router=express.Router();
const passport= require('passport');

const postscontroller=require('../controllers/posts_controllers');

router.post('/create',passport.checkAuthentication,postscontroller.create);
router.get('/destroy/:id',passport.checkAuthentication,postscontroller.destroy);




module.exports=router;