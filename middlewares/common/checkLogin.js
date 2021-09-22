const User = require("../../models/User");

const checkLogin = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const user = await User.find({ token: token });
    if (user.length !== 0) {
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: "Unknown error occured!",
    });
  }
};

module.exports = {
  checkLogin,
};
