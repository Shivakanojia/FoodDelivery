const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================
const registerUser = async (req, res) => {
try {
const { name, email, password } = req.body;


// 1️ check user exists
const userExists = await User.findOne({ email });
if (userExists) {
  return res.status(400).json({ message: "User already exists" });
}

// 2️ hash password
const hashedPassword = await bcrypt.hash(password, 10);

// 3️ create user
const user = await User.create({
  name,
  email,
  password: hashedPassword,
});

// 4️ generate token
const token = jwt.sign(
  { id: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

res.status(201).json({
  message: "User registered successfully",
  token,
  role: user.role,
});


} catch (error) {
res.status(500).json({ message: "Registration failed" });
}
};

//  LOGIN 
const loginUser = async (req, res) => {
try {
const { email, password } = req.body;


// 1️ find user
const user = await User.findOne({ email });
if (!user) {
  return res.status(400).json({ message: "Invalid email or password" });
}

// 2️ compare password
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
  return res.status(400).json({ message: "Invalid email or password" });
}

// 3️ generate token
const token = jwt.sign(
  { id: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

res.json({
  message: "Login successful",
  token,
  role: user.role,
});


} catch (error) {
res.status(500).json({ message: "Login failed" });
}
};

module.exports = {registerUser,loginUser}


