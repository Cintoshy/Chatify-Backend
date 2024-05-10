const mongoose = require("mongoose");

const readByRecipientSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  readAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ReadByRecipient", readByRecipientSchema);
