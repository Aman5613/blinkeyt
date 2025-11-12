import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    userID : {
        type : mongoose.Schema.ObjectId, 
        ref : "User"
    },
    productID : {
        type : mongoose.Schema.ObjectId,
        ref : "Product"
    },
    orderID : {
        type : String,
        require : [true, "Provide orderID"],
        unique : true
    },
    product_details : {
        name  : String,
        image : Array
    },
    paymentID : {
        type : String,
        default : ""
    },
    payment_status : {
        type : String,
        default : ""
    },
    dilvery_address : {
        type : mongoose.Schema.ObjectId,
        ref : "address"
    },
    delivery_status : {
        type : Boolean,
        default : false
    },
    totalAmount : {
        type : Number,
        default : 0
    },
    invoice_reciept : {
        type : String,
        default :""
    },

}, {
    timestamps : true
})

const orderModel = mongoose.model("Order", orderSchema)


export default orderModel;