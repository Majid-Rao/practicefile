import mongoose from "mongoose";
const childSchema = new mongoose.Schema({
    admin : {
        type : String,
        required : true,
    },
    Salary : {
        type : String,
        required : true,
    }
});
const hospitalSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    Address : {
        type : String,
        required : true,
    },
    city : {
        type : String,
        required : true,
    },
    zipcode : {
        type : String,
        required : true,
    },
    admin : [childSchema],
},{timestamps:true});

export const Hospital = mongoose.model("Hospital",hospitalSchema);