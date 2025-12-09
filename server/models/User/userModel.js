import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password :{
        type : String,
        required : [true,"password is required"],
    },
    avatar: {
        type : String,
        required : true,
    },
    coverimage : {
        type : String,
    },
    watchHistory : [{
        type : Schema.Types.ObjectId,
        ref : "Video"
    }],
    refreshToken : {
        type : String,
    }
},{timestamps:true});

userSchema.pre("save", async function (next){
if(!this.isModified("password")) return next();
this.password = await bcrypt.hash(this.password, 10)
next();
})
userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password,this.password);
}
//jwt
userSchema.methods.generateAccessToken = function (){
    return jwt.sign({
        _id : this._id,
        email : this.email,
    },
    process.env.ACCESS_TOKENS,
    {
        expiresIn : process.env.ACCESS_TOKENS_EXPIRY
    }
)
}
//refreshtoken
userSchema.methods.generateRefreshToken = function (){
   return jwt.sign({
        _id : this._id,
    },
    process.env.REFRESH_TOKENS,
    {
        expiresIn : process.env.REFRESH_TOKENS_EXPIRY,
    }
)
}


export const User = mongoose.model("User",userSchema);