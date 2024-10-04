const multer = require('multer');
const path = require('path');

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profile'); // Specify the folder for uploads
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Save file with a timestamp
    }
});

const upload = multer({ storage: storage }).single('img');

module.exports = upload;