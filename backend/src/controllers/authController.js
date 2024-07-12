const asyncErrorHandler = require("../utills/asyncErrorHandler");
const CustomError = require("../utills/CustomError");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/usermodel");
// const RoleModel = require("../models/RolesModel");

const signToken = (id,fname,mobile,email) => {
  return jwt.sign({ 
    id:id, 
    fname:fname,
    mobile:mobile,
    email:email,
    
    
  },
    process.env.SECRET_STRING, {
    expiresIn: process.env.LOGIN_EXPIRES,
  });
};

exports.login = asyncErrorHandler(async (req, res, next) => {
  const email = req.body.email;
  const pwd = req.body.pwd;

  // Checking if email and password are provided by the user or not.
  if (!email || !pwd) {
    const error = new CustomError(
      "Please provide email and password for login",
      400
    );
    return next(error);
  }

  // Checking if the user exists in the database or not.
  const user = await UserModel.findOne({ email: email }).select("+password");
  if (!user) {
    const error = new CustomError("User not found", 404);
    return next(error);
  }

  if (!user || !(await user.comparePasswordInDb(pwd, user.pwd))) {
    const error = new CustomError("Incorrect email or password", 400);
    return next(error);
  }
  // If authentication is successful, generate a token
  const token = signToken(
    user._id,
    user.firstName,
    // user.middleName,
    user.lastName,
    // user.email,
     user.role
  );

  res.send({
    token: token,
    
    });
});
exports.tokenUser= asyncErrorHandler(async (req,res,next)=>{
    let token = req.headers['authorization']
    
  
    if (!token) {
      return res.status(400).json({status:false ,message: 'Token is required' });
    }
    if (token.startsWith('Bearer ')) {
      // Remove 'Bearer ' from the token string
      token = token.slice(7);
    }
    //console.log("token",token)
    jwt.verify(token, process.env.SECRET_STRING, async (err, decoded) => {
     // console.log(process.env.SECRET_STRING)
      if (err) {
        console.error(err);
        return res.status(401).json({ status: false, message: 'Invalid token' });
      }
      
      try {
        const userId = decoded.id; // Assuming the token contains user ID
        const user = await UserModel.findById(userId); // Fetch user from database
       
        if (!user) {
          console.error('Token verification error:', err);
          return res.status(404).json({ status: false, message: 'User not found' });
        }
        const role = await RoleModel.findOne({ role: user.role });
  
        if (!role) {
          console.error('Role not found for the user:', user.role);
          return res.status(404).json({ status: false, message: 'Role not found' });
        }
  
        req.user = {
          ...user.toJSON(), // Convert Mongoose document to plain JavaScript object
          permissions: role.permissions
        };
            console.log("req.user",req.user.permissions)
  
        // Assuming user data contains only required fields
        const userData = {
          id: user._id,
          firstName:user.firstName,
          lastName:user.lastName,
          email: user.email,
          role:user.role,
          profilePhoto:user.profilePhoto,
          permissions: role.permissions
          
          // Add other necessary fields
        };
        console.log("AuthUser",userData)
        res.json({  data: userData,status: true, message: 'User successfully fetched' });
      } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
      }
    });
  });