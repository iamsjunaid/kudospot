const mongoose = require("mongoose");

const kudosSchema = new mongoose.Schema({
  sender: { type: String, required: true }, // Sender's email
  receiver: { type: String, required: true }, // Receiver's email
  badge: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Kudos = mongoose.model("Kudos", kudosSchema);

module.exports = Kudos;
