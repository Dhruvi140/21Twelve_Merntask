const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/authController");
const AuthTokenController = require("../controllers/authController");

router.post("/login", AuthController.login);
// router.post("/verifytoken", AuthTokenController.tokenUser);

module.exports = router;