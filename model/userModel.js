import mongoose from "mongoose";
import { type } from "os";

// user schema 
const userSchema = mongoose.Schema({
    "userName":{
        type: "string",
    },
    "userMail":{
        type:"string",
    },
    "userPswd":{
        type:"string",
    },
    "role": {
        type: "string",
        enum : ["voter","admin"],
        default: "voter",
    },
    
})

export const userModel = mongoose.model('user', userSchema);