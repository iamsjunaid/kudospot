const Kudos = require("../models/Kudos");
const User = require("../models/User");

// @desc    Send Kudos
// @route   POST /api/kudos/send
const sendKudos = async (req, res) => {
  const { sender, receiver, message, badge } = req.body;

  // Validate sender and receiver exist
  const senderUser = await User.findOne({ email: sender });
  const receiverUser = await User.findOne({ email: receiver });

  if (!senderUser || !receiverUser) {
    return res
      .status(400)
      .json({ message: "Invalid sender or receiver email" });
  }

  if (!badge) {
    return res.status(400).json({ message: "Badge is required" });
  }

  const kudos = new Kudos({ sender, receiver, message, badge });
  await kudos.save();

  res.status(201).json({ message: "Kudos sent successfully with badge!" });
};

// @desc    Retrieve Kudos for a User
// @route   GET /api/kudos/:email
const getKudosForUser = async (req, res) => {
  const { email } = req.params;

  const kudos = await Kudos.find({ receiver: email });

  res.json({ kudos });
};

// @desc    Kudos Analytics
// @route   GET /api/kudos/analytics
// const getKudosAnalytics = async (req, res) => {
//   try {
//     const analytics = await Kudos.aggregate([
//       {
//         $group: {
//           _id: "$receiver",
//           totalKudos: { $sum: 1 },
//         },
//       },
//       { $sort: { totalKudos: -1 } },
//     ]);

//     if (!analytics || analytics.length === 0) {
//       return res.json({ message: "No Kudos data available", analytics: [] });
//     }

//     res.json({ analytics });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
// kudosController.js

// kudosController.js

const getKudosAnalytics = async (req, res) => {
  try {
    const leaderboard = await Kudos.aggregate([
      { $group: { _id: "$receiver", totalKudos: { $sum: 1 } } },
      { $sort: { totalKudos: -1 } },
    ]);

    const badgeAnalytics = await Kudos.aggregate([
      { $group: { _id: "$badge", badgeCount: { $sum: 1 } } },
      { $sort: { badgeCount: -1 } },
    ]);

    const badgeData = badgeAnalytics.map((item) => ({
      badge: item._id,
      count: item.badgeCount,
    }));

    const mostLikedPost = await Kudos.findOne().sort({ likes: -1 }).limit(1);

    res.json({
      leaderboard,
      badgeAnalytics: badgeData,
      mostLikedPost,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ error: "Failed to fetch analytics data" });
  }
};

module.exports = { sendKudos, getKudosForUser, getKudosAnalytics };
