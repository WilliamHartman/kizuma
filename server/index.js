const http = require('http');
const path = require('path');
const express = require('express');
const axios = require('axios');
const massive = require('massive');
const session = require("express-session");
const process = require("process");
const bodyParser = require('body-parser');
const cors = require('cors')
const moment = require('moment');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
//app.use(express.static(__dirname + './../build'));

const SESSION_SECRET = process.env.SESSION_SECRET;

// Use the session middleware
massive(process.env.CONNECTION_STRING)
.then( (db) => {
    console.log('Connected to Heroku')
    app.set('db', db);
}).catch(err=>console.log(err))
 
app.use(session({
    secret: SESSION_SECRET, 
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true
   }));

app.listen(process.env.PORT, () => console.log(`Listening on port: ${process.env.PORT}`));