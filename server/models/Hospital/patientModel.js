import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
    },
    Diagoneddetails : {
        type:String,
        required:true,
    },
    AdmittedIn : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Hospital",
    }
},{timestamps:true});

export const Patient = mongoose.model("Patient",patientSchema);