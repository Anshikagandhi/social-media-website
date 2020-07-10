const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');

const logdirectory=path.join(__dirname,'../production_logs');
fs.existsSync(logdirectory)|| fs.mkdirSync(logdirectory);

const accesslogstream=rfs.createStream('access.log' , {
    interval:'1d',
    path: logdirectory
});


const development={
    name:'development',
    asset_path:'./assets',//made a key
    session_cookie_key:'blahsomething ',
    db:'codeial_development',
    smtp:{
        service: 'gmail',
        host:'smtp.gmail.com', //created gmail domain
        port:587,
        secure: false,
        auth:{
            user:'anshikagandhi31',
            pass:'anshika1!'
        }
    },
    google_client_id:'1043263709655-nqtj19eugdtdsjbt9s4sqe6023bpjs0j.apps.googleusercontent.com',
    google_client_secret:'BTClewgU4xDe92NVMbkg7hSa',
    google_call_back_url:'http://localhost:8000/users/auth/google/callback',
    jwt_secret: 'codeial',
    morgan:{
        mode:'dev',
        options:{stream:accesslogstream}


    }

    

}


const production={
    name: process.env.CODEIAL_ENVIRONMENT,
    asset_path:process.env.CODEIAL_ASSET_PATH,//made a key
    session_cookie_key:process.env.CODEIAL_SESSION_COOKIE_KEY,
    db:process.env.CODEIAL_DB,
    smtp:{
        service: 'gmail',
        host:'smtp.gmail.com', //created gmail domain
        port:587,
        secure: false,
        auth:{
            user:process.env.CODEIAL_GMAIL_USERNAME,
            pass:process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_client_id:process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret:process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url:process.env.CODEIAL_CALLBACL_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan:{
        mode:'combined',
        options:{stream: accesslogstream}


    }

    //create the keys for every credentials
}
module.exports=eval(process.env.CODEIAL_ENVIRONMENT)== undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);
