const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  firstname: string,
  lastname: string,
  Emailaddress: string,
  Password: string
      
})

module.exports = mongoose.model('Users', UserSchema);
