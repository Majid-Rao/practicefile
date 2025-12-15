import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User/userModel.js";
import UploadCloudinary from "../utils/FileUpload.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// const generateAccessandRefreshTokens = async(userId) =>{
//   try {
//     const user = await User.findById(userId);
//     const AccessTokens = user.generateAccessToken();
//     const RefreshTokens = user.generateRefreshToken();
//     user.refreshToken = RefreshTokens;
//     await user.save({validateBeforeSave : false});
//     return {AccessTokens,RefreshTokens}
//   } catch (error) {
//     console.log(error,"error in generateAccessandRefreshTokens");
    
//   }
// }
const generateAccessandRefreshTokens = async(userId) => {
const user = await User.findById(userId);
const AccessToken = user.generateAccessToken();
const RefreshToken = user.generateRefreshToken();
user.refreshToken = RefreshToken;
user.save({validBeforeSave: false});
return {AccessToken,RefreshToken};
}
const userRegister = asyncHandler(async (req, res) => {

  const { username, email, password } = req.body;

  if ([username, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  // ✔ FILE PATHS MUST BE INSIDE THE FUNCTION
  const avatarPath = req.files?.avatar?.[0]?.path;
  const coverPath = req.files?.coverimage?.[0]?.path;
  
  if (!avatarPath) {
    throw new ApiError(400, "Avatar file not found");
  }

  // Upload to Cloudinary
  const avatar = await UploadCloudinary(avatarPath);
  const coverImage = await UploadCloudinary(coverPath);

  // Create user
  const user = await User.create({
    username,
    email,
    password,
    avatar: avatar.url,
    coverimage: coverImage?.url || "",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  );
});
const loginUser = asyncHandler(async(req,res)=>{
  // req body 
  // validate fields
  // user already exist
  // password check
  // generate access and refresh tokens
  // cookies
const {username,email,password} = req.body;
if(!username || !email ){
  throw new ApiError(400,"username or email is required");
}
const user = await User.findOne({email});
if(!user){
  throw new ApiError(404,"user not exist!");
}
const PasswordValid = await user.isPasswordCorrect(password);
if(!PasswordValid){throw new ApiError(401,"please insert correct password");
}
const {AccessTokens,RefreshTokens} = await generateAccessandRefreshTokens(user._id);
const LoggedInUser = await User.findById(user._id).select("-password -refreshToken")
const options = {
  httpOnly : true,
  secure : true
}
return res.status(201).cookie("AccessTokens",AccessTokens,options).
cookie("RefreshTokens",RefreshTokens,options).json(
 new ApiResponse (
  200,
  {user:LoggedInUser, AccessTokens,RefreshTokens},
  "User LoggedIn Successfully"
 )

)
})
// const loginUser = asyncHandler(async(req,res)=>{
//   // req body 
//   // validate fields
//   // user already exist
//   // password check
//   // generate access and refresh tokens
//   // cookies

//   const {username,email,password} = req.body;
//   if(!username || !email){
//     throw new ApiError(400,"username or email is empty");
//   }
//   const exist = await User.findOne({email});
//   if(!exist){
//     throw new ApiError(401,"user not exist");
//   }
//   const Passwordcheck = await exist.isPasswordCorrect(password);
//   if(!Passwordcheck){ throw new ApiError(401,"Password Incorrect");
//   }
//   const {AccessToken,RefreshToken} = await generateAccessandRefreshTokens(exist._id);
//   const LoggedInuser = await User.findById(exist._id).select("-password -refreshToken");
//   const options = {
//     httpOnly : true,
//     secure : true, 
//   } // cookie it can't change from frontend only change from server
//   res.status(201).cookie("AccessToken",AccessToken,options).
//   cookie("RefreshToken",RefreshToken,options).json(
//    new ApiResponse =( 200,
//     {
//       exist: LoggedInuser,AccessToken,RefreshToken
//     },
//     "User LoggedIn!"
//   )
//   )
// })
const loggedOut = asyncHandler(async(req,res)=>{
  // authmiddleware 
  // accesstoken from cookies or header
  // verify accesstoken
  await User.findByIdAndUpdate(
     req.user._id,
     {
      $set: {refreshToken : undefined},
     },
     {
      new : true
     } 
  );
  const options = {
  httpOnly : true,
  secure : true
}
  res.status(200).clearCookie("AccessTokens",options).clearCookie("RefreshTokens",options)
  .json(new ApiResponse(200,"logged out!"));
})
export { loggedOut,loginUser,userRegister };
