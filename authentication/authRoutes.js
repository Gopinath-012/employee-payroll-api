const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("./authController");


router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;