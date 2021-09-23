// external import
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// internal import
const User = require("../models/User");

// do login
async function login(req, res, next) {
  try {
    // find a user who has this email/password
    const user = await User.findOne({ email: req.body.email });
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // user object
    const userObject = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    // token generate
    const accessToken = jwt.sign(userObject, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    if (isValidPassword) {
      const { password, ...rest } = user._doc;
      res.status(200).json({ rest, accessToken });
    } else {
      res.status(500).json({
        message: "Authentication error!",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
}

module.exports = {
  login,
};
