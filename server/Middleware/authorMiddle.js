require("dotenv").config();
const adminAuth = (req, res, next) => {
  const { authorization } = req.headers;
  const realSecret = process.env.ADMIN_SECRET;
  if (!authorization) {
    return res.status(401).json({ message: "Missing admin secret" });
  }

  if (authorization !== realSecret) {
    return res.status(403).json({ message: "Invalid admin secret" });
  }

  next();
};

module.exports = adminAuth;
