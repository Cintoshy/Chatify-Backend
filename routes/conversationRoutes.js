const express = require("express");
const router = express.Router();
const chatController = require("../controller/chat");

router.get("/:id", chatController.getMessage);

module.exports = router;
