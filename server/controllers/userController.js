import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/User/userModel.js"
import UploadCloudinary from "../utils/FileUpload.js"
import { ApiResponse } from "../utils/ApiResponse.js";
const userRegister = asyncHandler(async(req,res)=>{
   // res.status(200).json({
   //  message:"ok",
   // })

   const {username,email,password,}=req.body;
   console.log(email);
   if ([username,email,password].some((fields)=>
      fields?.trim() === ""
)){
   throw new ApiError(400,"all fields are required")
}

const ExistedUser = User.findOne({
   // for findind by two fields $or:[{username},{email}],
   email,
})
if(ExistedUser){throw new ApiError(409,"user already exist")}
})

const avatarPath = req.files?.avatar[0]?.path;
const coverPath = req.files?.coverimage[0]?.path;
if(!avatarPath){throw new ApiError(400,"file not found");
}
const avatar = await UploadCloudinary(avatarPath);
const coverImage = await UploadCloudinary(coverPath);
if(!avatar){throw new ApiError(400,"file not found");
}

const user = await User.create({
   username,
   email,
   password,
   avatar:avatar.url,
   coverimage: coverImage.url,
})
const createdUser = await User.findById(user._id).select(
   "-password -refreshToken"
)
if(!createdUser){
   throw new ApiError(500,"something went wrong");
}
return res.status(201).json(
   new ApiResponse(200,createdUser,"user Created successfully!")
)

export {
    userRegister};
















