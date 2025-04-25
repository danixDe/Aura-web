const donorServices = require('../services/donorServices');

const createDonor = async (req, res) => {
    try {
        const donor = await donorServices.addDonor(req.body);
        res.status(201).json({ message: "Donor added successfully", donor });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const AuthDonor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const donor = await donorServices.getDonor(email);
        if (donor && donor.password === password) {
            res.json({ message: "valid" });
        } else {
            res.json({ message: "invalid" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error authenticating donor" });
    }
};

const updateLiveLocation = async (req, res) => {
    try {
        const { email, liveLocation, coordinates } = req.body;
        const result = await donorServices.updateLiveLocation(email, liveLocation, coordinates);
        res.status(200).json({ message: "Live location updated", result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDonors = async (req, res) => {
    try {
        const donors = await donorServices.getAllDonors();
        res.status(200).json(donors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getDonorByEmail = async(req,res)=>{
    const {email} = req.params;
    try{
        const donor = await donorServices.getDonor(email);
        if(!donor){
            return res.status(404).json({message:"Donor not found"})
        }
        res.json(donor);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}
const searchDonors = async (req, res) => {
    try {
        const { blood_group, lat, lng, radius } = req.query;
        const donors = await donorServices.findNearbyDonors(blood_group, lat, lng, radius);
        res.status(200).json(donors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateDonor = async (req, res) => {
    try {
        const donor = await donorServices.updateDonor(req.params.id, req.body);
        res.status(200).json({ message: "Donor updated successfully", donor });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteDonor = async (req, res) => {
    try {
        const message = await donorServices.deleteDonor(req.params.id);
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createDonor,
    getDonors,
    getDonorByEmail,
    searchDonors,
    updateDonor,
    deleteDonor,
    AuthDonor,
    updateLiveLocation
};
