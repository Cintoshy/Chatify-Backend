const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  channel: { type: mongoose.Schema.Types.ObjectId, ref: "Channel" },
  conversation: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      content: { type: String, required: true },
      readByRecipients: [
        { type: mongoose.Schema.Types.ObjectId, ref: "ReadByRecipient" },
      ],
      replyTo: { type: mongoose.Schema.Types.ObjectId },
      isSeen: { type: Boolean, default: false },
      timestamp: { type: Date, default: Date.now },
    },
    {
      timestamp: true,
    },
  ],
});

module.exports = mongoose.model("Message", messageSchema);
