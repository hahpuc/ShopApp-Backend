const multer = require('multer');

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now());
    },
});


// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         cb(null, true)
//     } else {
//         //reject file
//         cb({
//             message: 'Unsupported file format'
//         }, false)
//     }
// }

const upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 1024 * 1024
    // },
})

module.exports = upload;