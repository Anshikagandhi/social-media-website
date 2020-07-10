const nodeMailer=require('../config/nodemailer');

//const Comment=require('../models/comment');





//creating function to send the mails
//this is another way of exporting a method
exports.newComment = (comment) => {
    // comment is undefined increase font size 
    console.log("Inside newComment mailer");

    nodeMailer.transporter.sendMail({
        from: "anshikagandhi13@yahoo.com",
        to: comment.user.email,
        subject: "New comment published",
        html: "<h1>,Yup,Your comment is now published:</h1>"
    },(err,info) => {
        if(err){
            console.log("Error in sending mail",err); return;
        }

        console.log('Message send',info);
        return;
    });
}