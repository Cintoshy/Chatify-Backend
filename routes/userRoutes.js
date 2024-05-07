const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken);
router.get("/", userController.getUser);
router.put("/changePassword", userController.changePassword);

module.exports = router;
