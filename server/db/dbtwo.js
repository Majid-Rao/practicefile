import mongoose from 'mongoose';
import 'dotenv/config'

const connectDB = async () => {
    try {
       const connectInt = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`DB Connected! DB host: ${connectInt.connection.host}`);
    } catch (error) {
        console.log("DB ERROR:", error);
        
    }
}
export default connectDB;