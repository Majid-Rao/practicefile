import {v2 as cloudinary} from "cloudinary";
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
})
const UploadCloudinary = async (fileUrl)=>{
    try {
        if(!fileUrl) return null;
        const response = await cloudinary.uploader.upload(fileUrl,{
            resource_type : "auto",
        });
        console.log("file uploaded!",response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(fileUrl);
        return null;        
    }

}
export default UploadCloudinary;