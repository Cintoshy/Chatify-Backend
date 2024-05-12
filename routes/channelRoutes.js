const express = require("express");
const router = express.Router();
const chatController = require("../controller/chat");

router.get("/:id", chatController.getChannel);

module.exports = router;
