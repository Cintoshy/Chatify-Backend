const mongoose = require("mongoose");

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, rquired: true, minlength: 3, maxlength: 36 },
    email: {
      type: String,
      rquired: true,
      minlegth: 3,
      maxlegth: 200,
      unique: true,
      validate: [validateEmail, "Invalid email address"],
    },
    password: { type: String, rquired: true, minlength: 8, maxlength: 1024 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
