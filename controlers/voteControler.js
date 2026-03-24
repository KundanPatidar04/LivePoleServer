import { candidateModel } from "../model/candidateModel.js";
import { voteModel } from "../model/voteModel.js";

export const addVoteControler = async (req, res)=>{
    try{
        const {voterId , candidateId, electionId} = req.body;
        const votedAt = new Date();

        const vote = voteModel({voterId , candidateId, electionId, votedAt});

        let candidate = await candidateModel.findOne({_id: candidateId});
        let voteCount = candidate.voteCount;

        let cndRes = await candidateModel.updateOne({_id:candidateId}, {$set: {voteCount: voteCount+1}});

        let result = await vote.save();
        if(result){
            return res.status(200)
                .json({ success: true, message: "vote submitted ..." });
        }
    }
    catch(error){
        return res.status(400)
                .json({ success: false, message: error });
    }
}