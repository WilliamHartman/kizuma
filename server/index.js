// const http = require('http');
// const path = require('path');
const express = require('express');
const axios = require('axios');
const massive = require('massive');
const session = require("express-session");
const process = require("process");
const bodyParser = require('body-parser');
const cors = require('cors')
const moment = require('moment');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
//app.use(express.static(__dirname + './../build'));


// Use the session middleware
massive(process.env.CONNECTION_STRING)
.then( (db) => {
    console.log('Connected to Heroku')
    app.set('db', db);
}).catch(err=>console.log(err))
 
app.use(session({
    secret: process.env.SECRET, 
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true
   }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK
}, (accessToken, refreshToken, extraParams, profile, done) => {
    const db = app.get("db");
    const userData = profile._json;
    db.find_user([userData.identities[0].user_id]).then(user => {
    if (user[0]) {
        return done(null, user[0].user_id);
    } else {
        db.create_user([
            userData.name,
            userData.email,
            userData.identities[0].user_id
        ])
        .then(user => {
            return done(null, user[0].user_id);
        });
    }
    });
}))

passport.serializeUser( (profile, done) => {
    done(null, profile);
}) 

passport.deserializeUser( (id, done) => {
    app.get("db").find_session_user([id])
        .then(user => {
        console.log(user);
        done(null, user[0]);
        });
})

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/',
    failureRedirect: '/auth'
}))

app.get('/auth/me', (req, res) => {
    console.log('auth/me endpoint hit')
    if(!req.user){
        return res.status(401).send('No user logged in.');
    }
    return res.status(200).send(req.user);
})

app.listen(process.env.PORT, () => console.log(`Listening on port: ${process.env.PORT}`));