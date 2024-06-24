const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/send-code", authController.sendSignInCode);
router.post("/verify-code", authController.verifySignInCode);

module.exports = router;
