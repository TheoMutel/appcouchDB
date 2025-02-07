// app/Security/checkToken.js
const jwt = require("jsonwebtoken");
const SECRET = "MA_CLE_SECRETE_DE_DEMO";

function checkToken(req, res, next) {
  const token = req.query.token;
  if (!token) {
    return res.status(403).json({ status: false, message: "token absent" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ status: false, message: "token incorrect" });
  }
}

module.exports = checkToken;
