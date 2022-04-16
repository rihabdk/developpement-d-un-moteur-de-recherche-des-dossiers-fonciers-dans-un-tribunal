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

const mapsRoute = require('./routes/maps');
app.use('/maps', mapsRoute);

//routes
app.get('/',(req, res) => {
    res.send('we are on home user');
});



//connect db
mongoose.connect(process.env.DB_CONNECTION,
{},() =>
 console.log('connected to db')
);

//how to listn to server
app.listen(4000);



/*fetch('http://localhost:3000/posts')
.then(result => {
    return result.json();
    })
    .then(data => {
      console.log(data);
    }) */