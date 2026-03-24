import mongoose from "mongoose";

export const connectDb = ()=> {
    mongoose.connect(process.env.mongooseUrl)
    .then(()=>{
        console.log("database connected ...");
    }).catch((error)=>{
        console.log(error);
    })
}