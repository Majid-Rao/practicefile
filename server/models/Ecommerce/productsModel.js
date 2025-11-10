import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    picture : {
        type : String,
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category"
    }

},
{timestamps : true})

export const Products = mongoose.model("Products",productSchema);