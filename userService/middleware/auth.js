const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header("Authorization");

  //Check is not token
  if (!token) {
    return res.status(401).json({ msg: "No token, Authorization Denied" });
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
