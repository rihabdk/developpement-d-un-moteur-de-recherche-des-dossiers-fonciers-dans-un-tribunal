const express = require('express');
const User = require('../models/User');
const { remove } = require('../models/User');
const post = require('../models/User');
const router = express.Router();
const Post = require('../models/User');

//get 
router.get('/', async (req, res) => {
   // res.send('we are on users');
   try{
       const posts = await Post.find();
       res.json(posts);
   }catch(err)
   {
       res.json({ message: err})
   }
});

//submit a post
router.post('/', async (req, res) => {
    const user = new User({
        firstname: req.body.firstname,
      lastname: req.body.lastname
    })
    try {
        const newPost = await post.save()
        res.status(201).json(newUser)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
  });

  module.exports = router;
