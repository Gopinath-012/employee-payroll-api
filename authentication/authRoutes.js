const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("./authController");

/**
 * @route POST /api/auth/register
 * @group User - User-related endpoints
 * @param {object} request.body.required - User info
 * @returns {object} 201 - User created
 * @returns {Error} 400 - Bad request
 */
router.post("/register", authController.register);


/**
 * @route POST /api/auth/login
 * @group User - Login endpoint
 * @param {object} request.body.required - Login details
 * @returns {object} 200 - JWT Token
 * @returns {Error} 401 - Unauthorized
 */
router.post("/login", authController.login);

module.exports = router;