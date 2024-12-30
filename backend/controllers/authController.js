const User = require("../models/User");

// @desc    Get All Users
// @route   GET /api/auth/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'name email'); // Fetch only name & email fields
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

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

module.exports = { loginUser, getAllUsers };
