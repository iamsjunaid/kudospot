const express = require("express");
const {
  sendKudos,
  getKudosForUser,
  getKudosAnalytics,
} = require("../controllers/kudosController");

const router = express.Router();

router.post("/send", sendKudos); // Send Kudos
router.get("/analytics", getKudosAnalytics); // Analytics
router.get("/:email", getKudosForUser); // Retrieve Kudos for a User

module.exports = router;
