import mongoose from "mongoose";

const candidateSchema = mongoose.Schema({
    "candidateName": {
        type: String,
    },
    "party": {
        type: String,
    },
    "electionId": {
        type: String,
    },
    "voteCount": {
        type: Number,
        default: 0,
    }
})

export const candidateModel = mongoose.model("candidate", candidateSchema);