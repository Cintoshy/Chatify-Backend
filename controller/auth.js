const Users = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const handleErrors = (err, res) => {
//   console.error(err);
//   res.status(500).json({ error: err.message });
// };
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Assuming you have a User model
    const user = await Users.findOne({ email });

    if (!user) {
      return res.json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.json({ message: "Invalid email or password" });
    }

    // User is authenticated, generate a JWT token
    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Set the token as a cookie
    res.cookie("jwtToken", token, {
      maxAge: 3600000, // 1 hour in milliseconds
      httpOnly: true,
      secure: true,
    });

    // Return a success response with the token
    res.json({ message: "Login successful", status:"OK", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.json({
        message: "Email is already registered",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Users({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.logout = async (req, res) => {
  try {
    // Clear the authentication token by removing the cookie
    res.clearCookie("jwtToken");

    // Return a success response
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
