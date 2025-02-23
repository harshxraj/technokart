const jwt = require("jsonwebtoken");
require("dotenv").config();

const Auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);

  if (token == null) {
    return res.status(401).json({ error: "No token found" });
  }

  jwt.verify(token, process.env.SECRET_ACCESS_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Access token is invalid" });
    }
    req.user = user.id;
    next();
  });
};

module.exports = { Auth };
