const Users = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const crypto = require("crypto");

// exports.generateJWT = async (req, res) => {
//   const jwtSecret = crypto.randomBytes(32).toString("hex");
//   console.log("JWT Secret:", jwtSecret);
// };

exports.getUser = async (req, res) => {
  try {
    // const userId = req.params.id;
    const userData = await Users.find();

    if (!userData) {
      return res.status(404).json({ message: "Users not found" });
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getSuggestedUser = async (req, res) => {
  try {
    // const userId = req.params.id;
    const userData = await Users.find().select("name");

    if (!userData) {
      return res.status(404).json({ message: "Users not found" });
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    // Retrieve the user from the database
    const user = await Users.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the old password matches
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedNewPassword;
    await user.save();

    // Return a success response
    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
