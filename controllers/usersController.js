// external import
const bcrypt = require("bcrypt");
const { unlink } = require("fs");
const path = require("path");

// internal imports
const User = require("../models/User");

// get users
async function getUsers(req, res, next) {
  try {
    const users = await User.find({});
    const { password, ...rest } = users[0]._doc;
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error!",
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
      avatar: `${req.files[0].filename}`,
      imgURL: `${process.env.URL}/uploads/avatars/${req.files[0].filename}`,
      password: hashedPassword,
    });
  } else {
    newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
  }

  // save user
  try {
    const result = await newUser.save();
    res.status(200).json({
      message: "User was added successfully!",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
}

// update user
async function updateUser(req, res, next) {
  const id = req.params.id;
  const user = await User.find({ _id: id });
  if (req.files && req.files.length > 0) {
    // remove avatar from directory
    if (user.avatar !== "") {
      unlink(
        path.join(__dirname, `/../public/uploads/avatars/${user[0].avatar}`),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
    req.body.avatar = `${req.files[0].filename}`;
    req.body.imgURL = `${process.env.URL}/uploads/avatars/${req.files[0].filename}`;
  }
  // save user
  try {
    const result = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
}

module.exports = {
  getUsers,
  addUser,
  updateUser,
};
