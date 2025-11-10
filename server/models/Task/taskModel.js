import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    taskname : {
        type : String,
        required : true,
    },
    doneBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    complete : {
        type : Boolean,
        default : true,
    }

},
{timestamps:true})

export const Task = mongoose.model("Task",taskSchema);