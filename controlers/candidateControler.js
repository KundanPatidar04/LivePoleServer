import { candidateModel } from "../model/candidateModel.js";

export const addCandidateControler = async (req, res) => {
    try {
        const { candidateName, party, electionId } = req.body;
        const candidate = candidateModel({ candidateName, party, electionId })

        let result = await candidate.save();
        if (result) {
            return res.status(200)
                .json({ success: true, message: "candidate added... " });
        }
    }
    catch (error) {
        return res.status(200)
            .json({ success: false, message: error });
    }

}

export const getCandidateControler = async (req, res) => {
    try {
        const electionId = req.params.id;
        const candidates = await candidateModel.find({electionId})
         
        return res.status(200)
        .json({success:true, list:candidates});
    }
    catch (error) {
        return res.status(400)
            .json({ success: false, message: error });
    }
}