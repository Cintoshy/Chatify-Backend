const Channel = require("../model/channelModel");
const Message = require("../model/messageModel");

//get all channel
exports.getChannel = async (req, res) => {
  const memberId = req.params.id;
  try {
    const channelList = await Channel.find({
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

//get all messages by channel
exports.getMessage = async (req, res) => {
  try {
    const { firstId, secondId } = req.params;

    const memberChannel = await Channel.findOne({
      $and: [
        { members: firstId },
        { members: secondId },
        { members: { $not: { $elemMatch: { $nin: [firstId, secondId] } } } },
      ],
    });

    if (!memberChannel) {
      return res.json([{ message: "Fresh Channel" }]);
    }

    const channelId = memberChannel;
    const messages = await Message.find({ channel: channelId });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const createChannel = async (firstId, secondId) => {
  try {
    const newChannel = await new Promise((resolve) => {
      setTimeout(() => {
        const channel = new Channel({
          name: "DM",
          members: [firstId, secondId],
          lastMessage: null,
        });
        resolve(channel);
      }, 1000);
    });

    const savedChannel = await newChannel.save();
    return savedChannel;
    // res.status(201).json(savedChannel);
  } catch (error) {
    console.error("Error creating channel:", error);
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { conversationId, firstId, secondId, content } = req.body;

    let channel;
    // If conversationId is provided, find the existing channel
    if (conversationId) {
      channel = await Channel.findById(conversationId);
      if (!channel) {
        return res.status(404).json({ error: "Channel not found" });
      }
    } else {
      // Create a new channel if conversationId is not provided

      channel = await createChannel(firstId, secondId);
    }

    // Create a new message
    const newMessage = new Message({
      channel: channel._id,
      conversation: [
        {
          sender: firstId,
          content: content,
        },
      ],
    });

    // Save the new message to the database
    await newMessage.save();

    if (channel.lastMessage === null) {
      channel.lastMessage = newMessage._id;
      await channel.save();
    }
    res.status(201).json({ status: "Message Sent", message: newMessage });
  } catch (err) {
    console.error("Error sending message:", err);
    res
      .status(500)
      .json({ error: "An error occurred while sending the message" });
  }
};
