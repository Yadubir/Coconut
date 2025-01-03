const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const protect = async (req, res, next) => {
    try {
      const token = req.cookies.token;
      if(!token) {
        return res.status(401).json({
          success: false,
          message: "Not authorized, no token"
        });
      }

      const decoded = await jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded) {
        return res.status(401).json({
          success: false,
          message: "Not authorized, token failed",
        });
      }

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
};

module.exports = { protect };
