import mongoose from "mongoose";

const electionSchema = mongoose.Schema({
    "electionTitle": {
        type: String,
    },
    "description": {
        type : String,
    },
    "startDate": {
        type : Date,
    },
    "endDate": {
        type : Date,
    },
    "isActive":{
        type: Boolean,
        default: false,
    },
})

export const electionModel = mongoose.model('election', electionSchema);