const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : [true , "Please Enter your Name"] , 
        maxLength : [40 , "Name cannot exceed 40 characters"],
        minLength : [4 , "Name should have more than 4 characters"]
    } , 
    email : {
        type : String , 
        required : [true , "Please Enter Your Email "] ,
        unique : true ,
        validate : [validator.isEmail , "Please Enter a valid Email"]
    },

    password : {
        type : String ,
        required : [true , "Please Enter your Password"],
        minLength : [8 , "password should be greater than 8 characters"],
        select : false ,
    }, 

    avatar : {
        public_id : {
            type : String ,
            required : true
        },

        url : {
            type : String ,
            required : true
        }
    } , 

    role : {
        type : String ,
        default : "user",
    } ,
    
    resetPasswordToken : String ,
    resetPasswordExpire : Date ,
});
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password,10)
})

//JWT Token 

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

//compare password

userSchema.methods.comparePassword = async function(enteredPassword){
    return bcrypt.compare(enteredPassword,this.password)
}

// Generating password reset token

userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");


    //Hashing and sdd to userSchema
    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    this.resetPasswordExpire = Date.now()+15*60*1000;

    return resetToken;
}

module.exports = mongoose.model("User" , userSchema);