const Users = require("../model/userModel");

const handleErrors = (err, res) => {
  console.error(err);
  res.status(500).json({ error: err.message });
};

exports.getUser = async (req, res) => {
  try {
    // const userId = req.params.id;
    const userData = await Users.find();

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userData);
  } catch (err) {
    handleErrors(err, res);
  }
};
