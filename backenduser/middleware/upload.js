const path = require('path')
const multer =require('multer')
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
       
      //  let ext = path.extname(file.originalname)
       let f = path.basename(file.originalname)
        cb(null, f  ) 
        //cb(null, f + ext ) 

    }
})

var upload = multer ({
    storage: storage,
    fileFilter: function(req, file, callback){
        callback(null, true)
        console.log('bien')
    }
})
module.exports = upload