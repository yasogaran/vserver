const multer = require('multer');
const path = require('path');

const __uploadDir = path.join('./videos');
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __uploadDir)
    },
    filename: function (req, file, callback) {
        const uniqName = Date.now() + '-' + Math.round(Math.random() * 5500) + '.' + file.originalname.split('.').pop();
        callback(null, uniqName)
    }
})
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype == 'video/mp4' || file.mimetype == 'video/mkv') {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only allowed mp4 and mkv format'))
        }
    },
    limits: { fileSize: 1024 * 1024 * 1024 }
}).single('file');


module.exports = upload;