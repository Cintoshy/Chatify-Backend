const Channels = require("../model/channelModel");
const Messages = require("../model/messageModel");

exports.getChannel = async (req, res) => {
  try {
    const channelList = await Channels.find().populate([
      { path: "lastMessage" },
      { path: "members", select: "name email" },
    ]);
    if (!channelList) {
      return res.status(404).json({ message: "Channel not found" });
    }

    res.status(200).json(channelList);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getMessage = async (req, res) => {
  try {
    // const userId = req.params.id;
    const messages = await Messages.find();

    if (!messages) {
      return res.status(404).json({ message: "Channel not found" });
    }

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
