const adminMiddleware = (req, res, next) => {
try {
// authMiddleware must run before this


if (req.user.role !== "admin") {
  return res.status(403).json({ message: "Admin access required" });
}

next();


} catch (error) {
return res.status(500).json({ message: "Authorization failed" });
}
};

module.exports = adminMiddleware;
