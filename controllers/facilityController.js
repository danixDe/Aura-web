const facilityServices = require("../services/facilityServices");

const createFacility = async (req,res) => {
    try{
        const facilityData = req.body;
        const facility = await facilityServices.createFacility(facilityData);
        res.status(201).json(facility);
    }catch(error){
        res.status(400).json({error:error.message});
    }
};

const getAllFacilities = async (req,res) => {
    try{
        const facilities = await facilityServices.getAllFacilities();
        res.status(200).json(facilities);
    }catch(error){
        res.status(400).json({error:error.message});
    }
};


const getFacilityById = async (req,res) => {
    try{
        const id = req.params.id;
        const facility = await facilityServices.getFacilityById(id);
        res.status(200).json(facility);
    }catch(error){
        res.status(400).json({error:error.message});
    }
};


const updateFacility = async (req,res) => {
    try{
        const updatedFacility = await facilityServices.updateFacility(req.params.id,req.body);
        res.status(200).json(updatedFacility);
    }catch(error){
        res.status(400).json({error:error.message});
    }
};

const deleteFacility = async (req,res) => {
    try{
        const id = req.params.id;
        await facilityServices.deleteFacility(id);
        res.status(200).json({message:"Facility deleted successfully"});
    }catch(error){
        res.status(400).json({error:error.message});
    }
};

module.exports = {createFacility,getAllFacilities,getFacilityById,updateFacility,deleteFacility};