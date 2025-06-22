const multer = require("multer");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname - Date.now()}`);
  },
});
const fileFilter=(req,file,cb)=>{
  // we are accepting the images so true -> accept
    // we are rejecting the images so false -> reject

  if(file.mimetype.startsWith('image/'))
      cb(null,true);
  else
    cb(new Error('Only images are allowed'),false);
}
const upload = multer({ storage,fileFilter });
module.exports = upload;
