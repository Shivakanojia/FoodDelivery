const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
try {
// Step 1: Get token from header
const header = req.headers.authorization;


// Step 2: Check if token exists
if (!header) {
  return res.status(401).json({ message: "Token not provided" });
}

// Step 3: Extract token (Bearer TOKEN)
const token = header.split(" ")[1];

// Step 4: Verify token
const decoded = jwt.verify(token, process.env.JWT_SECRET);

// Step 5: Attach user data to request
req.user = decoded;

// Step 6: Allow request to continue
next();


} catch (error) {
return res.status(401).json({ message: "Invalid token" });
}
};

module.exports = authMiddleware;
