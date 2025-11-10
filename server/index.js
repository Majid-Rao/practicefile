import app from './app.js';
import 'dotenv/config';
import connectDB from './db/dbthree.js';
const port = process.env.PORT || 5000;
connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log("Server is run at:",port);
    })
})
.catch((err)=>{
console.log("mongo making error :",err);
})

// const port = process.env.PORT || 3000;
// app.listen(port, ()=>{
//     console.log(`Serve at http://localhost:${port}`);
// })

