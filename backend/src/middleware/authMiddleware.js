const jwt = require('jsonwebtoken')
const UserModel = require('../models/usermodel');


const verifyToken = async(req,res,next)=>{
 let token = req.headers['authorization'];
 if (token) {
   // Check if the token starts with 'Bearer '
   if (token.startsWith('Bearer ')) {
     // Remove 'Bearer ' from the token string
     token = token.slice(7);

     
     jwt.verify(token, process.env.SECRET_STRING, async (err, decoded) => {
       if (err) {
         return res.status(401).json({ status: false, message: 'Invalid token' });
       }
       
       try {
         const userId = decoded.id; // Assuming the token contains user ID
         const user = await UserModel.findById(userId); // Fetch user from database
      
         if (!user) {
           return res.status(404).json({ status: false, message: 'User not found' });
         }
         
         

         req.user={
           ...user,
           
         }
       
        next();
       } catch (error) {
         console.error('Error fetching user:', error);
         return res.status(500).json({ status: false, message: 'Internal server error' });
       }
     });
   } else {
     res.status(401).send({ status:false,message: 'Invalid token format' });
   }
 } else {
   res.status(403).send({status:false, message: 'Please add token with header' });
 }
 
}



module.exports= verifyToken;