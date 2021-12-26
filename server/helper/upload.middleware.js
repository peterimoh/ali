const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/api/static/productImg');
  },
    filename: (req, file, cb) => {
      console.log(file);
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const fileFilter = (req, files, cb) => {
  if (
    files.mimetype === 'image/jpeg' ||
    files.mimetype === 'image/png' ||
    files.mimetype === 'image/jpg' ||
    files.mimetype === 'image/JPG'
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        'file uploaded is not of valid compression type (allowed are zip, tar.gz, 7z, gtar, rar)'
      )
    );
  }
};

const upload = multer({ storage, fileFilter })

module.exports = upload