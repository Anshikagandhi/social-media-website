const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
//to use session-cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo')(session);


app.use(express.urlencoded());
app.use(cookieParser());  //using cookies

app.use(express.static('./assets'));
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
    secret: 'blahsomething',
    saveUninitialized: false, //if the  session is there and not i use
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
// use express route
app.use('/',require('./routes'));



app.listen(port,function(err){
    if(err){
        console.log(`error in running server:${err}`); // interpolation :including a variable inside a string
    }
    console.log(`Server is running on port:${port}`);
});


