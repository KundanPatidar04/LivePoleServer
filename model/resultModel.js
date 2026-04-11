import mongoose from "mongoose";

const resultSchema = mongoose.Schema({
            'electionId': {
                type: String,
            },
            'title': {
                type: String,
            },
            'description': {
                type: String,
            },
            'candidates': {
                type: Array,
            },
            'winner': {
                type: Array,
            }
        })

export const resultModel = mongoose.model('result', resultSchema);