const express = require('express');

const map = require('../models/Map');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Map = require('../models/Map');
const bcrypt = require('bcryptjs');

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


  const store = (req, res, next) => {
    let map = new Map(req.body)
      if (req.file){
        const url = req.protocol + "://" + req.get("host");
        console.log(req.body)
    map.avatar = url + "/uploads/" + req.file.filename;
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
router.post('/table', async (req, res) => {
  const { id_dossier,name, cinclt, email, nameadv,adress,statut,date } = req.body;



  const newFolder = new Map({ id_dossier,name, cinclt, email, nameadv,adress,statut,date});
  const savedFolder = await newFolder.save().catch((err) => {
    console.log("Error: ", err);
    res.status(500).json({ error: "Cannot !" });
  });

  if (savedFolder) res.json({ message: "enregistré" });
});


router.get('/get', async (req, res) => {
  // res.send('we are on posts');
  try{
   const maps = await Map.find();
   res.json(maps);
}catch(err)
{
   res.json({ message: err})
}
 
});
router.delete('/:MapId', async (req, res) => {
  try{
    console.log(req.params.MapId)
    
  const removedMap = await Map.remove({_id: req.params.MapId}) 
    res.json(removedMap);
}catch(err){
    res.json({message: err});

}
if (removedMap) res.json({ message: "Element supprimé" });


});
 

module.exports = router;