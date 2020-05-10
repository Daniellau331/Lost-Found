// This is a heaviy commented version of the Glitch app "mission-control-login"

const express = require('express');
const bodyParser = require('body-parser');
// const sqlite3 = require('sqlite3');  // we'll need this later

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const expressSession = require('express-session');
// cookies are used to save authentication
const cookieParser = require('cookie-parser');


passport.use(new GoogleStrategy(
  // Object containing data sent to Google to kick off the login process
  // the process.env values are found in the key.env file of your app
  {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'https://ecs162-login-demo.glitch.me/auth/accepted',
  userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo', // where to go for info
  scope: ['profile']  // the information we will ask for from Google
},
  // function to use to once login is accomplished, to get info about user from Google
  // it is defined down below.
  gotProfile));


// Start setting up the server's pipeline

const app = express();

console.log("setting up pipeline")
// pipeline stage that just echos url, for debugging.
app.use("/", printURL);

// always take HTTP message body and put it as a object into req.body
app.use(bodyParser.urlencoded({extended: true}));

// puts cookies into properties in req
app.use(cookieParser());

// handles encryption of cooikes, and deletes them when they expire
app.use(expressSession(
  { 
  secret:'bananaBread', 
  resave: true, 
  saveUninitialized: true, 
  maxAge: 6 * 60 * 60 * 1000, // Cookie time out - six hours in milliseconds
  }));

// Initializes request object for further handling by passport
app.use(passport.initialize()); 

// If there is a valid cookie, will call deserializeUser()
// This pipeline stage is used once login is completed
app.use(passport.session()); 

// Public files are still serverd as usual out of /public
app.get('/*',express.static('public'));

// special case for base URL, goes to index.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

/*
// on clicking "logoff" the cookie is cleared
app.get('/logoff',
  function(req, res) {
    res.clearCookie('google-passport-example');
    res.redirect('/');
  }
);
*/

// Now the pipeline stages that handle the login process itself

// Handler for url that starts off login with Google.
// The app (in public/index.html) links to here (note not an AJAX request!)
// Kicks off login process by telling Browser to redirect to Google.
app.get('/auth/google', passport.authenticate('google'));
// The first time its called, passport.authenticate sends 302 
// response (redirect) to the Browser
// with fancy redirect URL that Browser will send to Google,
// containing request for profile, and
// using this app's client ID string to identify the app trying to log in. 

app.get('/auth/accepted', 
  passport.authenticate('google', 
    { successRedirect: '/setcookie', failureRedirect: '/' }
  )
);

// on successful auth, a cookie is set before redirecting
// to the protected homepage
app.get('/setcookie', requireUser,
  function(req, res) {
    if(req.get('Referrer') && req.get('Referrer').indexOf("google.com")!=-1){
      res.cookie('google-passport-example', new Date());
      res.redirect('/success');
    } else {
       res.redirect('/');
    }
  }
);


// if cookie exists, success. otherwise, user is redirected to index
app.get('/success', requireLogin,
  function(req, res) {
    if(req.cookies['google-passport-example']) {
      res.sendFile(__dirname + '/user/success.html');
    } else {
      res.redirect('/');
    }
  }
);


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});


// Some functions called by the handlers in the pipeline above


// Function for debugging. Just prints the incoming URL, and calls next.
// Never sends response back. 
function printURL (req, res, next) {
    console.log(req.url);
    next();
}

// function that handles response from Google containint the profiles information. 
// It is called by Passport after the second time passport.authenticate
// is called (in /auth/accepted/)
function gotProfile(accessToken, refreshToken, profile, done) {
    console.log("Google profile",profile);
    // here is a good place to check if user is in DB,
    // and to store him in DB if not already there. 
    // Second arg to "done" will be passed into serializeUser,
    // should be key to get user out of database.

    let dbRowID = 1;  // temporary! Should be the real unique
    // key for db Row for this user in DB table.
    // Note: cannot be zero, has to be something that evaluates to
    // True.  

    done(null, dbRowID); 
}


// Part of Server's sesssion set-up.  
// The second operand of "done" becomes the input to deserializeUser
// on every subsequent HTTP request with this session's cookie. 
passport.serializeUser((dbRowID, done) => {
    console.log("SerializeUser. Input is",dbRowID);
    done(null, dbRowID);
});

// Called by passport.session pipeline stage on every HTTP request with
// a current session cookie (so, while user is logged in)
// Where we should lookup user database info which later pipeline stages 
// might need when handling user queries. 
// Whatever we pass in the "done" callback goes into the req.user property
// and can be grabbed from there by our middleware functions
passport.deserializeUser((dbRowID, done) => {
    console.log("deserializeUser. Input is:", dbRowID);
    // here is a good place to look up user data in database using
    // dbRowID. Put whatever you want into an object. It ends up
    // as the property "user" of the "req" object. 
    let userData = {userData: "maybe data from db row goes here"};
    done(null, userData);
});

function requireLogin (req, res, next) {
  if (!req.cookies['google-passport-example']) {
    res.redirect('/');
  } else {
    next();
  }
};

function requireUser (req, res, next) {
  if (!req.user) {
    res.redirect('/');
  } else {
    next();
  }
};