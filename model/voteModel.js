import mongoose from "mongoose";

const VoteSchema = mongoose.Schema({
    "voterId": {
        type: String,
    },
    "candidateId": {
        type: String,
    },
    "electionId": {
        type: String,
    },
    "votedAt": {
        type: Date,
    },
})

export const voteModel = mongoose.model('vote', VoteSchema);