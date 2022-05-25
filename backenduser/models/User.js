const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  Emailaddress: String,
  Password: String,
  poste: String
})

module.exports = mongoose.model('Users', UserSchema);
