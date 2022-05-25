var GeoJSON = require('mongoose-geojson-schema');
var mongoose = require('mongoose');
const { object, date } = require('@hapi/joi');

var Mapschema = new mongoose.Schema({
    id_dossier: String,
    name : String,
    cinclt: String,
    email : String,
    nameadv: String,
    adress: String,
    statut: {
        type: String,
        enum: ['en cours','traité','non traité'],
        default: 'traité'
        
      },
   
    date: {
        type: Date, 
        default: Date.now
      },

avatar: {
          type: String
    } 
    
});
module.exports = mongoose.model('maps', Mapschema);