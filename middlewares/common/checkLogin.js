const jwt = require("jsonwebtoken");

const checkLogin = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization;
    if (bearer && bearer.startsWith("Bearer ")) {
      const idToken = bearer.split(" ")[1];
      jwt.verify(idToken, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          res.status(403).json({
            message: "Authentication error!",
          });
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json({
        message: "Authentication error!",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  checkLogin,
};
