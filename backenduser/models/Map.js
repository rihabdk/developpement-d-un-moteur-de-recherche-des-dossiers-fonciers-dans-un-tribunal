var GeoJSON = require('mongoose-geojson-schema');
var mongoose = require('mongoose');
const { object } = require('@hapi/joi');

var Mapschema = new mongoose.Schema({
 //   type: String,

    //  coordinates: [[[Number]]]
    avatar: {
          type: String
    }
    
});
module.exports = mongoose.model('maps', Mapschema);