import { set } from "mongoose";
import { electionModel } from "../model/electionModel.js";
import { voteModel } from "../model/voteModel.js";

export const electionCreatControler = async (req, res)=>{
    try{
        const {electionTitle, description, startDate, endDate} = req.body;
        const election = electionModel({electionTitle, description, startDate, endDate});

        let result = await election.save();
        if(result){
            return res.status(200)
            .json({success:true, message:"election created... "});
        }
    }
    catch(error){
        return res.status(401)
        .json({ success: false, message: "Please enter required field correctly.." });
    }
}

export const getElectionsControler = async (req, res)=>{
    try{
        let result = await electionModel.find();
        if(result){
            return res.status(200)
            .json({success:true, data:result});
        }
    }
    catch(error){
        return res.status(401)
        .json({ success: false, message: error });
    }
}

export const getOneElectionControler = async (req, res)=>{
    try{
        const id = req.params.id;
        let election = await electionModel.findOne({_id: id });
        if(election){
            return res.status(200)
            .json({success: true, data:election});
        }
    }
    catch(error){
        return res.status(400)
        .json({success: false, message:error});
    }
}

export const activeElection = async (req, res)=>{
    try{
        const id = req.params.id;
        let result = await electionModel.updateOne({_id: id}, {$set: {isActive:true}});
        if(result){
            return res.status(200)
            .json({success:true, message:"Election Started Successfully"});
        }
    }
    catch(error){
         return res.status(400)
        .json({success: false, message:error});
    }
}

export const voterElectionsControler = async (req, res)=>{
    try{
        const voterId = req.params.voterId; // id of voter logedin

        let result = await electionModel.find({isActive:true}); // active election list
        let voted = await voteModel.find({voterId});  // elections voted by voter   
        
        let votArr = new Set(voted.map((obj)=> obj.electionId));  //list of electionID

        let elections = result.filter((obj)=> !votArr.has(obj.id)) // elections not voted by voter

        if(result){
            return res.status(200)
            .json({success:true, data:elections});
        }
    }
    catch(error){
        return res.status(400)
        .json({ success: false, message: error });
    }
}