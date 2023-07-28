const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const messages = require("./messages");
const secretKey = process.env.JWT_SECRET_KEY;

const generateAccessToken = function (payload) {
  return jwt.sign(payload, secretKey, { expiresIn: "1800s" });
};

const refreshToken = (payload) => {
  return jwt.sign(payload, JWT_REFRESH_TOKEN_SECRET_KEY, { expiresIn: "1d" });
};

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: messages.emptyTokenMessage });
    }
  
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: messages.tokenErrorMessage });
      }
      req.user = decoded;
      next();
    });
  };
  
  

module.exports = {
  generateAccessToken,
  refreshToken,
  verifyToken,
};
