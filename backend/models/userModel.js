const mongoose = require('mongoose');
const validator = require("validator");

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

module.exports = mongoose.model("User" , userSchema);