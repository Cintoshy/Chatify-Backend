const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  name: String,
  age: Number,
});

module.exports = mongoose.model("User", userModel);
