import mongoose from "mongoose"

const cartproductSchema = new mongoose.Schema({
    productID : {
        type : mongoose.Schema.ObjectId,
        ref  : "Product"
    },
    userID : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    },
    quantity : {
        type : Number,
        default : 1
    }
}, {
    timestamps : true
})


const cartproductModel = mongoose.model("cartProduct", cartproductSchema)

export default cartproductModel