// external imports
const { check, validationResult } = require("express-validator");

const doLoginValidators = [
  check("email").isEmail().withMessage("Invalid email address"),
  check("password")
    .isLength({
      min: 1,
    })
    .withMessage("Password is required!"),
];

const doLoginValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // reponse the errors
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  doLoginValidators,
  doLoginValidationHandler,
};
