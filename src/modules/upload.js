const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const extMap = {
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/gif": ".gif"
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, __dirname + "/../../public/upload");
    },
    filename: (req, file, callback) => {
        let ext = extMap[file.mimetype];
        callback(null, uuidv4() + ext);
    }
});

const fileFilter = (req, file, callback) => {
    callback(null, !!extMap[file.mimetype]);
}

module.exports = multer({ storage, fileFilter });