const Kudos = require("../models/Kudos");
const User = require("../models/User");

// @desc    Send Kudos
// @route   POST /api/kudos/send
const sendKudos = async (req, res) => {
  const { sender, receiver, message } = req.body;

  // Check if sender and receiver exist
  const senderUser = await User.findOne({ email: sender });
  const receiverUser = await User.findOne({ email: receiver });

  if (!senderUser || !receiverUser) {
    return res
      .status(400)
      .json({ message: "Invalid sender or receiver email" });
  }

  const kudos = new Kudos({ sender, receiver, message });
  await kudos.save();

  res.status(201).json({ message: "Kudos sent successfully" });
};

// @desc    Retrieve Kudos for a User
// @route   GET /api/kudos/:email
const getKudosForUser = async (req, res) => {
    console.log("🔍 Fetching Kudos for User...");
  const { email } = req.params;

  const kudos = await Kudos.find({ receiver: email });

  res.json({ kudos });
};

// @desc    Kudos Analytics
// @route   GET /api/kudos/analytics
const getKudosAnalytics = async (req, res) => {
  try {
    console.log("🔍 Fetching Kudos Analytics...");

    const analytics = await Kudos.aggregate([
      {
        $group: {
          _id: "$receiver",
          totalKudos: { $sum: 1 },
        },
      },
      { $sort: { totalKudos: -1 } },
    ]);

    console.log("📊 Analytics Result:", analytics);

    if (!analytics || analytics.length === 0) {
      return res.json({ message: "No Kudos data available", analytics: [] });
    }

    res.json({ analytics });
  } catch (error) {
    console.error("❌ Error fetching analytics:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { sendKudos, getKudosForUser, getKudosAnalytics };
