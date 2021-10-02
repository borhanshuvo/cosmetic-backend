// external imports
const { check, validationResult } = require("express-validator");
const path = require("path");
const { unlink } = require("fs");

// internal imports
const User = require("../../models/User");

// add user
const addUserValidators = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject("E-mail already in use!");
        }
      } catch (err) {
        res.status(500).json({
          errors: err.message,
        });
      }
    }),
  check("aboutMe").isLength({ min: 1 }).withMessage("Bio is required"),
  check("instagramUsername")
    .isLength({ min: 1 })
    .withMessage("Instagram Username is required"),
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be al least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    ),
];

const addUserValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors)?.length === 0) {
    next();
  } else {
    // remove upload file
    if (req.files?.length > 0) {
      const { filename } = req.files[0];
      unlink(
        path.join(__dirname, `/../../public/uploads/avatars/${filename}`),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }

    // reponse the errors
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  addUserValidators,
  addUserValidationHandler,
};
