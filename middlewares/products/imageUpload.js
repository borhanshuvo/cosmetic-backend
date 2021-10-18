const uploader = require("../../utilities/imageUpload");

function imageUpload(req, res, next) {
  const upload = uploader(
    "products",
    ["image/jpeg", "image/png", "image/jpg"],
    1000000,
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

module.exports = imageUpload;
