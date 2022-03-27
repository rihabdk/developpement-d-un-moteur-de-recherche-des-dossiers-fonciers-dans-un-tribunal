const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

//middlewares
app.use(cors());
app.use(bodyParser.json());
//import routes 
const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

//routes
app.get('/',(req, res) => {
    res.send('we are on home');
});


//connect db
mongoose.connect(process.env.DB_CONNECTION,
{},() =>
 console.log('connected to db')
);

