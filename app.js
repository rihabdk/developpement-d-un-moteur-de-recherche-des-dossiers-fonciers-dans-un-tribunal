const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = 'mongodb://127.0.0.1:27017/sig';
// app.use('/api/uploads', express.static(process.cwd() + '/uploads'));

mongoose
  .connect(db, {})
  .then(() => console.log('has been connected'))
  .catch((err) => console.log(err));

app.use(cors());

 require('./routes/user.route')(app);

var server = require('http').createServer(app);
const PORT = process.env.PORT || 5000;
server.listen(PORT);