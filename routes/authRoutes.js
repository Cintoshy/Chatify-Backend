const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const verifyToken = require("../middleware/verifyToken");

router.post("/register", authController.registerUser);
router.post("/login", authController.login);
router.post("/logout", verifyToken, authController.logout);

module.exports = router;
