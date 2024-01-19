const jwt = require("jsonwebtoken");
require("dotenv").config();
const generateToken = async (user) => {
  return await jwt.sign(
    { userId: user._id, email: user.email },
    process.env.SECRET_KEY
  );
};

const verifyToken = (req, res, next) => {
  try {
    !req.headers["authorization"] &&
      res.status(403).json({ message: "Unauthorized: Token missing" });
    const token = req.headers["authorization"].toString().split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token missing" });
    }
    jwt.verify(token, process.env.SECRET_KEY, (error, decode) => {
      if (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }
      req.user = decode;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: `Something went wrong : ${error}` });
  }
};

module.exports = { generateToken, verifyToken };
