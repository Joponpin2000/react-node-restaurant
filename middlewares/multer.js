const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now() + '-' + file.originalname}`);
    }
})
const fileFilter = (req, file, cb) => {
    cb(null, true)
}
var upload = multer({
    storage,
    fileFilter
})

module.exports = upload;