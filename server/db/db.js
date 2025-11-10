import mongoose from "mongoose";
import 'dotenv/config'
const connectDB = async () => {
    try {
       const connectionIns = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`Database Connected ! host: ${connectionIns.connection.host}`);
        
    } catch (error) {
        console.log("Db Error",error);
    }
}
export default connectDB;