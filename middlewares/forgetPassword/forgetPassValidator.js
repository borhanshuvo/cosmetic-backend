// external imports
const { check, validationResult } = require("express-validator");

// add pass validation
const addPassValidators = [
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be al least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    ),
];

const addPassValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors)?.length === 0) {
    next();
  } else {
    // reponse the errors
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  addPassValidators,
  addPassValidationHandler,
};
