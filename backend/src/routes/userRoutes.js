const express = require("express");
const router = express.Router();


const UserController = require("../controllers/userController");
 const AuthMiddleware = require('../middleware/authMiddleware');
// const RestrictMiddleWare = require("../middleware/RestrictMiddleware");



router.post("/user", UserController.insertUser);
//router.get("/user", UserController.getAllUsers);


module.exports = router;