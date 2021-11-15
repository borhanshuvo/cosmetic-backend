const uploader = require("../../utilities/imageUpload");

function messageImage(req, res, next) {
  const upload = uploader(
    "msgImage",
    ["image/jpeg", "image/png", "image/jpg"],
    10000000,
    "Only .jpg, jpeg and .png format allowed!"
  );

  // call the middleware function
  upload.any()(req, res, err => {
    if (err) {
      res.status(500).json({
        errors: {
          img: {
            msg: err,
          },
        },
      });
    } else {
      next();
    }
  });
}

module.exports = messageImage;
