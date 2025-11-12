import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    name: String,
  },
  image: {
    type: Array,
    default: [],
  },
  category : [
    {
        type : mongoose.Schema.ObjectId,
        ref : 'category'
    }
  ],
  subCategory : [
    {
        type : mongoose.Schema.ObjectId,
        ref : 'subCategory'
    }
  ],
  unit : {
    type : String,
    default : ""
  },
  stock : {
    type : Number,
    default : null
  },
  price : {
    type : Number,
    default : null
  },
  description : {
    type : String,
    default : ""
  },
  discount : {
    type : Number,
    default : null
  },
  more_detail : {
    type : Object,
    default : {}
  },
  publish : {
    type : Boolean,
    default : true
  }

},{
    timestamps : true
});

const productModel = mongoose.model("Product", productSchema)

export default productModel