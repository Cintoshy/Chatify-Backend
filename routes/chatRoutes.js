const express = require("express");
const router = express.Router();
const chatController = require("../controller/chat");

router.get("/", chatController.getChannel);

module.exports = router;
