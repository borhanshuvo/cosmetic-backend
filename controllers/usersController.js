// external import
const bcrypt = require("bcrypt");

// internal imports
const User = require("../models/User");

// get users
async function getUsers(req, res, next) {
  try {
    const users = await User.find({});
    const { password, ...rest } = users[0]._doc;
    res.status(200).json(rest);
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

  if (req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body,
      avatar: `${process.env.URL}/uploads/avatars/${req.files[0].filename}`,
      password: hashedPassword,
    });
  } else {
    newUser = new User({
      ...req.body,
      password: hashedPassword,
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
