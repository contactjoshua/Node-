const path = require('path')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function(req,file, cb) {
        cb(null, path.join(__dirname))
    },
    filename: function(req,file,cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

var upload = multer ({
    storage: storage,
    fileFilter: function(req,file,callback) {
        if(
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg"

        ){
            callback(null,true)
        } else{
            console.log('only jpg & png files  are supported!')
            callback(null,true)
        }
    },
    limits: {
        fileSize: 1500 * 1500 * 2
    }
})

module.exports = upload