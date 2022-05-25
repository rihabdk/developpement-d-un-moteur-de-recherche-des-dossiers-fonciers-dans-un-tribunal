const express = require('express');
const User = require('../models/User');
const { remove } = require('../models/User');
const post = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Post = require('../models/User');
const bcrypt = require('bcryptjs');
const {registrevalidation , loginvalidation} = require('./validation');
//const Subscriber = require('../models/Post');
//validation
  const Joi = require('@hapi/joi');
  const schema = Joi.object({
      firstname: Joi.string()
      .min(6)
      .required(),
      lastname: Joi.string()
      .min(6).required(),
      Emailaddress: Joi.string()
      .min(6)
      .required()
      .email(),
      Password: Joi.string()
      .min(8)
      .required(),
      poste: Joi.string().required()
  });
//get 
router.get('/get', async (req, res) => {
   // res.send('we are on posts');
   try{
    const users = await User.find();
    res.json(users);
}catch(err)
{
    res.json({ message: err})
}
  
});
//submit a post
router.post("/register", async (req, res) => {
    const { firstname,lastname, Emailaddress, Password, poste } = req.body;
  
   // const alreadyExistsUser = await User.findOne({Emailaddress: req.body.Emailaddress}).catch(
     // (err) => {
      //  console.log("Error: ", err);
      //}
  //  );
  
   // if (alreadyExistsUser) {
     // return res.status(409).json({ message: "User with email already exists!" });
    //}
  
    const newUser = new User({ firstname,lastname, Emailaddress, Password, poste});
    const savedUser = await newUser.save().catch((err) => {
      console.log("Error: ", err);
      res.status(500).json({ error: "Cannot register user at the moment!" });
    });
  
    if (savedUser) res.json({ message: "Thanks for registering" });
  });
  

  //login
router.post('/login', async (req, res ) => {
    //lets validate the data before we a user
    const { error} = loginvalidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //checking if the email exists
const usermail = await User.findOne({ Emailaddress: req.body.Emailaddress });
if (!usermail) return res.status(400).send('Email is not found');
//password is correct
///const validPass = await bcrypt.compare(req.body.Password, usermail.Password);
//if (!validPass) return res.status(400).send('password invalid')
// create and assign a token
//const token = jwt.sign({_id: usermail._id}, process.env.token_secret);
//res.header('auth_token', token).send(token);
res.send('Logged in !');
});



  //specific post
  router.get('/:userId', async (req, res) => {
    // console.log(req.params.postId);
    try{
        const user = await User.findById(req.params.userId);
        res.json(user);
    }catch(err){
        res.json({message: err});
    }
   });
   //delete posts
   router.delete('/:userId', async (req, res) => {
     try{
       console.log(req.params.userId)
     const removedUser = await User.remove({_id: req.params.userId}) 
       res.json(removedUser);
   }catch(err){
       res.json({message: err});

   }
  
   });

   //update
   router.patch('/:userId', async (req, res) => {
       try {
       const updatedUser = await User.updateOne(
           {_id: req.params.userId},
           { $set: { firstname: req.body.firstname, lastname: req.body.lastname , 
            Emailaddress: req.body.Emailaddress , Password: req.body.Password, poste:req.body.poste }}
     
          
  );
         res.json(updatedUser);
     }catch(err){
         res.json({message: err});
     }
    
     });

module.exports = router;