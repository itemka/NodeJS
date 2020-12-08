const multer = require('multer');
const { allowedImgTypes } = require('../utils/constants');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'images');
  },
  filename(req, file, cb) {
    cb(null, `${new Date().toISOString()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (allowedImgTypes.includes(file.mimetype)) cb(null, true);
  else cb(null, false);
}

module.exports = multer({
  storage,
  fileFilter
})