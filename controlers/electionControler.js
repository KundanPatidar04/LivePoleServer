import { set } from "mongoose";
import { electionModel } from "../model/electionModel.js";
import { voteModel } from "../model/voteModel.js";
import { candidateModel } from "../model/candidateModel.js";
import { resultModel } from "../model/resultModel.js";

export const electionCreatControler = async (req, res) => {
    try {
        const { electionTitle, description, startDate, endDate } = req.body;
        const election = electionModel({ electionTitle, description, startDate, endDate });

        let result = await election.save();
        if (result) {
            return res.status(200)
                .json({ success: true, message: "election created... " });
        }
    }
    catch (error) {
        return res.status(401)
            .json({ success: false, message: "Please enter required field correctly.." });
    }
}

export const getElectionsControler = async (req, res) => {
    try {
        let result = await electionModel.find();
        if (result) {
            return res.status(200)
                .json({ success: true, data: result });
        }
    }
    catch (error) {
        return res.status(401)
            .json({ success: false, message: error });
    }
}

export const getOneElectionControler = async (req, res) => {
    try {
        const id = req.params.id;
        let election = await electionModel.findOne({ _id: id });
        if (election) {
            return res.status(200)
                .json({ success: true, data: election });
        }
    }
    catch (error) {
        return res.status(400)
            .json({ success: false, message: error });
    }
}

export const activeElection = async (req, res) => {
    try {
        const id = req.params.id;
        let result = await electionModel.updateOne({ _id: id }, { $set: { isActive: 1 } });
        if (result) {
            return res.status(200)
                .json({ success: true, message: "Election Started Successfully" });
        }
    }
    catch (error) {
        return res.status(400)
            .json({ success: false, message: error });
    }
}

export const stopElection = async (req, res) => {
    try {
        const id = req.params.id;
        const cndItem = [];     // list of candidates in election
        let winner = [{
            'name': '',
            'voteCount': 0
        }];

        let election = await electionModel.findOne({ _id: id });    // details of election
        let cndds = await candidateModel.find({ electionId: id });  // details of election candidates

        cndds.forEach((items, index) => {
            cndItem.push({ 'name': items.candidateName, 'party': items.party, 'voteCount': items.voteCount });

            if (items.voteCount > winner[0].voteCount) {    // adding winners details
                winner = [{
                    'name': items.candidateName,
                    'voteCount': items.voteCount
                }]
            } else if (items.voteCount == winner[0].voteCount) {
                if (items.voteCount == 0) {
                    winner = [{
                        'name': items.candidateName,
                        'voteCount': items.voteCount
                    }]
                } else {
                    winner.push({
                        'name': items.candidateName,
                        'voteCount': items.voteCount
                    })
                }
            }
        });

        const electionResult = {        // creating election's result object
            'electionId': election._id,
            'title': election.electionTitle,
            'description': election.description,
            'candidates': cndItem,
            'winner': winner
        }

        const rsModel = resultModel(electionResult);
        let saved = await rsModel.save();               //saving election result into database
        let stoped = await electionModel.updateOne({_id: id}, {$set: {isActive:2}});    //election ended

        if(stoped){
            return res.status(200)
            .json({success:true, message:"Election Stoped Successfully"});
        }
    }
    catch (error) {
        return res.status(400)
            .json({ success: false, message: error });
    }
}

export const voterElectionsControler = async (req, res) => {
    try {
        const voterId = req.params.voterId; // id of voter logedin

        let result = await electionModel.find({ isActive: true }); // active election list
        let voted = await voteModel.find({ voterId });  // elections voted by voter   

        let votArr = new Set(voted.map((obj) => obj.electionId));  //list of electionID

        let elections = result.filter((obj) => !votArr.has(obj.id)) // elections not voted by voter

        if (result) {
            return res.status(200)
                .json({ success: true, data: elections });
        }
    }
    catch (error) {
        return res.status(400)
            .json({ success: false, message: error });
    }
}