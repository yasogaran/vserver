const multer  = require('multer');
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
const upload = multer({ storage: storage });


// SAVE TO DATABASE
function saveToDb({id, title, path, user, date, size}){}



module.exports = upload;