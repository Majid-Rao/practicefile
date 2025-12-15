import User from '../models/User/userModel';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import jwt from 'jsonwebtoken';
import 'dotenv/config.js';
const verifyTokens = asyncHandler(async(req,res,next)=>{
    try {
     const tokens = req.cookies?.AccessTokens || req.header("Authorization").replace("Bearer ","")
    if(!tokens){ throw new ApiError(401,"tokens not availale!");}
    const decode = jwt.verify(tokens,process.env.ACCESS_TOKENS);
    // if(!decode){throw new ApiError(401,"decode not works");}
    const user = await User.findById(decode?._id).select("-password -refreshToken") 
    if(!user){throw new ApiError(401,"invalid Tokens");}
    req.user = user; 
    next();   
} catch (error) {
        console.log("error here",error);
    }
})
export {verifyTokens}