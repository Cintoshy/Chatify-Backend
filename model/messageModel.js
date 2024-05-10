const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  channel: { type: mongoose.Schema.Types.ObjectId, ref: "Channel" },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
  readByRecipients: [
    { type: mongoose.Schema.Types.ObjectId, ref: "ReadByRecipient" },
  ],
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", messageSchema);
