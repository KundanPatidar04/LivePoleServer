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
        type: Number,
        default: 0,
        enum: [0, 1, 2],
    },
})

export const electionModel = mongoose.model('election', electionSchema);