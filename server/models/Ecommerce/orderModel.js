import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Customer",
    },
    address : {
        type : String,
        required : true,
    },
    status : {
        type : String,
        enum : ["Pending","Complete"],
        default : "Pending",
    }

},
{timestamps:true});

export const Order = mongoose.model("Order",orderSchema);