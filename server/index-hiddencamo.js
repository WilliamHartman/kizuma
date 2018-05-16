require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const massive = require("massive");
// const listings_controller = require("./controllers/listings_controller");
const path = require('path');

const app = express();

// app.use( express.static( `${__dirname}/../build` ) );
app.use(bodyParser.json());
app.use(cors());

// Configure Session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

//setup massive
massive(process.env.CONNECTION_STRING).then(db => {
    console.log('Connected to Heroku') 
    app.set("db", db);
}).catch(err=>console.log(err))

// Configure Strategies
passport.use(
  new Auth0Strategy(
    {
      domain: process.env.AUTH_DOMAIN,
      clientID: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      callbackURL: process.env.AUTH_CALLBACK
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
        const db = app.get("db");
        const userData = profile._json;
    
        db.find_user([userData.identities[0].user_id]).then(user => {
        if (user[0]) {
            //console.log(user[0])
            return done(null, user[0]);
        } else {
            db.create_user([
                userData.given_name,
                userData.family_name,
                userData.email,
                userData.identities[0].user_id
            ])
            .then(user => {
                return done(null, user);
            });
        }
        });
    }))

passport.serializeUser(function(id, done) {
  done(null, id);
});
passport.deserializeUser(function(id, done) {
  app
    .get("db")
    .find_session_user([id])
    .then(user => {
      console.log(user);
      done(null, user[0]);
    });
});

// Endpoints
app.get("/auth", passport.authenticate("auth0"));
app.get(
  "/auth/callback",
  passport.authenticate("auth0", {
    successRedirect: process.env.SUCCESS_REDIRECT
  })
);
app.get("/auth/me", (req, res) => {
    console.log('auth/me endpoint hit')
    console.log(req.user)
  if (req.user) {
    return res.status(200).send(req.user);
  } else {
    return res.status(200).send(false);
  }
});

app.get("/auth/logout", (req, res) => {
  req.logOut();
  res.redirect(process.env.SUCCESSREDIRECT)
})



app.listen(process.env.PORT, () => console.log(`Listening on port: ${process.env.PORT}`));