import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js'
const app = express();

app.use(cors(
    {
  origin: process.env.CLIENT_URL,
  credentials: true,
    }
))
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded());
app.use(express.static("./uploads"));
app.use(cookieParser());
app.get('/',(req,res)=>{
    res.send("server ready");
});
//routes declare
app.use("/api",userRoutes);
// app.get('/api/jokes',(req,res)=>{
//     const jokes = [
//         {
//             id:1,
//             Name:"majid",
//             Age:22,
//         },
//         {
//             id:2,
//             Name:"ibad",
//             Age:23,
//         },
// ];
// res.send(jokes);
// });
export default app;