const jwt = require("jsonwebtoken");
const SECRET = "MA_CLE_SECRETE";

function checkToken(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ 
      status: false, 
      message: "Token non présent ou format invalide (utilisez: Bearer <token>)" 
    });
  }

  const token = authHeader.split(" ")[1]; // Extraction du token

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ status: false, message: "Token incorrect ou expiré" });
  }
}

module.exports = checkToken;