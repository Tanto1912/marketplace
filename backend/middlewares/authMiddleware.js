const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "Token tidak ditemukan." });

  jwt.verify(token, "SECRET_KEY_YANG_KAMU_GUNAKAN", (err, user) => {
    if (err) return res.status(403).json({ message: "Token tidak valid." });
    req.user = user;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Akses hanya untuk admin." });
  }
  next();
};
