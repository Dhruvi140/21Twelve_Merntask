const UserModel = require("../models/usermodel");
const asyncErrorHandler = require("../utills/asyncErrorHandler");

exports.insertUser = asyncErrorHandler(async (req, res, next) => {
    if (!req.body.fname && !req.body.mobile && !req.body.email && !req.body.pwd && !req.body.cpwd) {
        res.status(400).json({ message: "Content can not be empty!" });
    }



    // Create a new user object
    const user = new UserModel({
        fname: req.body.fname,
        mobile: req.body.mobile,
        email: req.body.email,
        pwd: req.body.pwd,
        cpwd:req.body.cpwd
        
    });
   

    await user.save().then(result => {
        res.send({ user: result, status: true, message: "User created successfully!!" });
    });
    
});




