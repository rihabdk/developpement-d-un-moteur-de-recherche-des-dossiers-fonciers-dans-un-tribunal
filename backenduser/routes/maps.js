const express = require('express');
const User = require('../models/User');
const { remove } = require('../models/User');
const map = require('../models/Map');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Map = require('../models/Map');
const bcrypt = require('bcryptjs');
const {registrevalidation , loginvalidation} = require('./validation');
const upload = require('../middleware/upload')
//const Subscriber = require('../models/Post');
//validation
  const Joi = require('@hapi/joi');
const { response } = require('express');
  const schema = Joi.object({
    
      type: Joi.string().required,
      coordinates: Joi.number().required,

  });
//get 
router.get('/', async (req, res) => {
   // res.send('we are on posts');
   try{
    const maps = await Map.find({});
    res.json(maps);
}catch(err)
{
    res.json({ message: err})
}
  
});

//submit a post
//router.post('/ts', async (req, res) => {
  //  const map = new Map({
    //    type: req.body.type,
      //  coordinates: req.body.coordinates
    //})
   // try {
     //   const newMap = await map.save()
       // res.status(201).json(newMap)
      //} catch (err) {
       // res.status(400).json({ message: err.message })
      //}
  //});

  //add new file 
  const store = (req, res, next) => {
    let map = new Map({})
      if (req.file){
        map.avatar = req.file.path
      }
      map.save()
      .then(response => {
        res.json({
          message: 'success'
        })
      })
      .catch(error => {
        res.json({
          message: 'error'

        })
      })
  }


router.post('/store', upload.single('avatar'), store)



 

module.exports = router;