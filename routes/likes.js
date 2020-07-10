const express= require('express');

const router=express.Router();
const Likescontroller=require('../controllers/like_controller');

router.post('/toggle',Likescontroller.ToggleLike);


module.exports=router;