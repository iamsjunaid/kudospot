const User = require("../models/User");

// @desc    Validate user email
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    res.json({
      message: "Login successful",
      user: { name: user.name, email: user.email },
    });
  } else {
    res.status(401).json({ message: "Unauthorized: Email not found" });
  }
};

module.exports = { loginUser };
