require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const session = require("express-session");
const Auth0Strategy = require('passport-auth0');
const passport = require('passport');
const massive = require('massive');
const axios = require('axios');
const process = require("process");
const moment = require('moment');

const app = express();

//app.use(express.static(__dirname + './../build'));
app.use(bodyParser.json());
app.use(cors());

app.use(session({
    secret: process.env.SECRET, 
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true
   }));


// Use the session middleware
massive(process.env.CONNECTION_STRING)
.then( (db) => {
    console.log('Connected to Heroku')
    app.set('db', db);
}).catch(err=>console.log(err))
 

const strategy = new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK
}, (accessToken, refreshToken, extraParams, profile, done) => {
    const db = app.get("db");
    const userData = profile._json;
    
    db.find_user([userData.identities[0].user_id]).then(user => {
    if (user[0]) {
        console.log(user[0])
        return done(null, user[0].id);
    } else {
        db.create_user([
            userData.given_name,
            userData.family_name,
            userData.email,
            userData.identities[0].user_id
        ])
        .then(user => {
            return done(null, user.id);
        });
    }
    });
})

passport.use(strategy)


passport.serializeUser( (user, done) => {
    //console.log('serializeuser', user)
    done(null, user);
}) 

passport.deserializeUser( (id, done) => {
    console.log(id)
    app.get("db").find_session_user([id])
        .then(user => {
        console.log(user);
        done(null, user[0]);
        });
})

app.use(passport.initialize());
app.use(passport.session()); 

app.get('/auth/me', (req, res) => {
    console.log('auth/me endpoint hit')
    console.log(req.user)
    if(!req.user){
        console.log('if(!req.user) === true')
        return res.status(401).send('No user logged in.');
    }
    return res.status(200).send(req.user);
})

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/'
}))


app.listen(process.env.PORT, () => console.log(`Listening on port: ${process.env.PORT}`));