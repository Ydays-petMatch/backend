const express = require("express");
const router = express.Router();
const sendEmail = require("../middlewares/emailSender");
const checkJWT = require("../middlewares/checkJWT");

router.post("/sendemail", checkJWT, sendEmail);

module.exports = router;