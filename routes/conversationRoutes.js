const express = require("express");
const router = express.Router();
const chatController = require("../controller/chat");

router.get("/:firstId/:secondId", chatController.getMessage);
router.post("/sendMessage", chatController.sendMessage);
module.exports = router;
