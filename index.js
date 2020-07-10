const express=require('express');
const env=require('./config/environment');
const logger=require('morgan');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
//to use session-cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');

const passportJWT=require('./config/passport-jwt-strategy');

const passportGoogle=require('./config/passport-google-oauth2-strategy');
//const passportGithub=require('./config/github-strategy');
const MongoStore=require('connect-mongo')(session);
const sassMiddleware= require('node-sass-middleware');
const flash=require('connect-flash');
const customWare=require('./config/middleware');
//set up the chat server to be used with socket.io
const chatServer=require('http').Server(app);
const chatSocket=require('./config/chat_sockets').chatsockets(chatServer);
chatServer.listen(5000);
console.log("Chat serving is listening on 5000");
const path=require('path');

//app.use(express.static('public'));

if(env.name=='development'){

app.use(sassMiddleware({
    src: path.join(__dirname, env.asset_path, 'scss'),
    dest: path.join(__dirname, env.asset_path, 'css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'

}));
}
app.use(express.urlencoded());

app.use(cookieParser());  //using cookies

app.use(express.static(env.asset_path));
//make the upload path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.mode,env.morgan.options));

app.use(expressLayouts);
//extract styles and scripts from the subpages into the layout
 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');
//mongo-store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    //todo change the secret before development in production mode
    secret: env.session_cookie_key,
    saveUninitialized: false, //if the  session is there and not in use
    resave: false,
    cookie:{
        maxAge: (1000 * 60 *100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setupok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customWare.setFlash);
// use express route
app.use('/',require('./routes'));



app.listen(port,function(err){
    if(err){
        console.log(`error in running server:${err}`); // interpolation :including a variable inside a string
    }
    console.log(`Server is running on port:${port}`);
});


