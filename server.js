require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const channelRoutes = require("./routes/channelRoutes");
const conversationRoutes = require("./routes/conversationRoutes");

//middleware
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

//Routes
app.get("/", (req, res) => {
  return res.json({ status: true });
});
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/channels", channelRoutes);
app.use("/conversation", conversationRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: " + err.message);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Application runnning at port ${PORT}`);
});
