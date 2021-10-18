const uploader = require("../../utilities/imageUpload");

function avatarUpload(req, res, next) {
  const upload = uploader(
    "avatars",
    ["image/jpeg", "image/png", "image/jpg"],
    10000000,
    "Only .jpg, jpeg and .png format allowed!"
  );

  // call the middleware function
  upload.any()(req, res, err => {
    if (err) {
      res.status(500).json({
        errors: {
          avatar: {
            msg: err,
          },
        },
      });
    } else {
      next();
    }
  });
}

module.exports = avatarUpload;
