const Channels = require("../model/channelModel");
const Messages = require("../model/messageModel");

exports.getChannel = async (req, res) => {
  const memberId = req.params.id;
  try {
    const channelList = await Channels.find({
      members: { $in: [memberId] },
    }).populate([
      {
        path: "lastMessage",
      },
      { path: "members", select: "name email" },
    ]);

    // Check if channelList is empty or not
    if (channelList.length === 0) {
      return res.status(404).json({ message: "Channel not found" });
    }

    channelList.forEach((channel) => {
      if (channel.lastMessage.length > 10) {
        channel.lastMessage = channel.lastMessage.slice(0, 10);
      }
    });

    res.status(200).json(channelList);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
// exports.getChannel = async (req, res) => {
//   const { firstId, secondId } = req.params;
//   try {
//     const channelList = await Channels.findOne({
//       members: { $all: [firstId, secondId] },
//     });
//     console.log(channelList);

//     res.status(200).json(channelList);
//   } catch (err) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

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
