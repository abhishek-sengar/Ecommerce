const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : [true , "Please , Enter the product Name"]
    },

    description : {
        type : String ,
        required : [true , "Please , Enter the product description"]
    },

    price : {
        type : Number , 
        required  : [true , "Please Enter product Price"],
        maxLength : [8 , "price cannot exceed 8 characters"]
    } ,

    rating : {
        type : Number ,
        default : 0 ,
    } , 

    images : [
        {
            public_id : {
                type : String ,
                required : true
            },

            url : {
                type : String ,
                required : true
            }
        }
    ] , 
    category : {
        type : String ,
        required : [true , "Please , Enter the product category"]
    },

    Stock : {
        type : Number ,
        required : [true , "Please Enter the product stock"],
        maxLength : [4 , "Stock cannot exceed 4 characters"],
        default : 1 ,
    },

    numOfReviews : {
        type : Number ,
        default : 0,
    }, 

    reviews : [
        {
            name : {
                type : String ,
                required : true ,
            },
            rating : {
                type : String ,
                required : true ,
            },
            comment : {
                type : String ,
                required : true ,
            }
        }
    ],

    createdAt : {
        type : Date ,
        default : Date.now(),
    }
})


module.exports = mongoose.model("Product" , productSchema);