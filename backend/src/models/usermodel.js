const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema(
    {

        fname: {
            type: String,
            required: true
        },
        mobile: {
            type: Number,
            required: true,
            
        },

        email: {
            type: String,
            required: true,
            unique: true,

        },
        pwd: {
            type: String,
            required: true,
            // select: false
        },
        cpwd:{
            type:String,
            required:true,
        }


    },
    {
        timestamps: true
    });

    userSchema.pre('save', async function(next) {
        // Only hash the password if it has been modified (or is new)
        if (!this.isModified('pwd')) return next();
    
        // Hash the password with cost of 12
        this.pwd = await bcrypt.hash(this.pwd, 12);
        next();
    });
    
    userSchema.methods.comparePasswordInDb = async function (pwd, pwdDB) {
        return await bcrypt.compare(pwd, pwdDB);
    };






const user = new mongoose.model("users", userSchema);
module.exports = user;