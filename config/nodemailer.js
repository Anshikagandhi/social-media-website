//sending mails procedure
const nodeMailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');
const env=require('./environment');


let transporter=nodeMailer.createTransport(env.smtp);


let renderTemplate=(data,relativePath) => { //relativePath is the place from where this function is being called
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log('Error in rendering template'); return;
            }
            mailHTML=template;
        }
    )
    return mailHTML;

}


module.exports={
    transporter: transporter,
    renderTemplate: renderTemplate
};