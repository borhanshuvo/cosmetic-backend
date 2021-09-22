// external import
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// internal imports
const User = require("../models/User");

// get users
async function getUsers(req, res, next) {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      message: "Unknown error occured!",
    });
  }
}

// add users
async function addUser(req, res, next) {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // prepare the user object to generate token
  const userObject = {
    name: req.body.name,
    email: req.body.email,
    role: "user",
  };

  // generate token
  const tokenCreate = jwt.sign(userObject, process.env.JWT_SECRET);

  if (req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPassword,
      token: tokenCreate,
    });
  } else {
    newUser = new User({
      ...req.body,
      password: hashedPassword,
      token: tokenCreate,
    });
  }

  // save user or send user
  try {
    const result = await newUser.save();
    res.status(200).json({
      message: "User was added successfully!",
    });
  } catch (err) {
    res.status(500).json({
      message: "Unknown error occured!",
    });
  }
}

module.exports = {
  getUsers,
  addUser,
};
