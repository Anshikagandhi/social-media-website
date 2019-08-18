const express=require('express');
const router=express.Router();

const postscontroller=require('../controllers/posts_controllers');

router.get('/userposts',postscontroller.userposts);




module.exports=router;