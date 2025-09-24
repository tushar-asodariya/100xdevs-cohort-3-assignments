const jwt = require("jsonwebtoken");
const { JWT_USER_SECRET } = require("../config/config");

function userMiddleware(req, res, next) {
  const token = req.headers.token;

  let isValidToken = "";
  try {
    isValidToken = jwt.verify(token, JWT_USER_SECRET);
    if (!isValidToken) {
      res.status(403).json({
        message: "You are not signed in",
      });
      return;
    }
  } catch (e) {
    res.status(403).json({
      message: "Invalid user",
    });
    return;
  }

  req.userId = isValidToken.id;
  next();
}

module.exports = {
  userMiddleware,
};
