import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    name : {
        type : String,
        require : [true , "Name is required"],
    },
    email : {
        type : String,
        require : [true , "Email is required"],
        unique : true,
    },
    password : {
        type : String,
        require : [true , "Password is required"],
    },
    avatar : {
        type : String,
        default : ""
    },
    mobile : {
        type : Number,
        default : null
    },
    refresh_token : {
        type : String,
        default : ""
    },
    verify_email : {
        type : Boolean,
        default : false
    },
    last_login_date :{
        type : Date,
        default : ""
    },
    status :{
        type : String,
        enum : ['Active', 'Inactive', 'Suspended'],
        default : "Active"
    },
    address_detail : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'address'
        }
    ],
    shooping_cart : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'cartProduct'
        }
    ],
    orderHistory : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'Order'
        }
    ],
    forget_password_otp : {
        type : String,
        default : ""
    },
    forget_password_expiry : {
        type : Date,
        default : ""
    },
    role : {
        type : String,
        enum : ['user', 'admin'],
        default : "user"
    },
    
}, {
    timestamps : true
})

const userModel = mongoose.model('User', userSchema)

export default userModel