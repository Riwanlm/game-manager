const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const token = req.cookies.auth;
  console.log(req.cookies, "tralalal");

  if (!token) {
    return res.status(401).json({ message: "Accès refusé. Token manquant." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token invalide: ", err);
    return res.status(403).json({ message: "Token invalide" });
  }
};

module.exports = authenticateToken;
