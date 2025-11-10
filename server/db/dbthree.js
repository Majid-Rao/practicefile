import mongoose from "mongoose";

const connectDB = async () => {
    try {
       const connectInt = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log("DB Connected!",connectInt.connection.host);

    } catch (error) {
        console.log("DB ERROR:",error);
        
    }
}
export default connectDB;