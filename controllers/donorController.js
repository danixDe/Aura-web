const donorServices = require('../services/donorServices');

const createDonor = async (req, res) => {
    try {
        console.log("donor create", req.body);
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

        // Assuming donor object contains a password property
        if (donor && donor.password === password) {
            res.json({ message: "valid" });
        } else {
            res.json({ message: "invalid" });
        }
    } catch (err) {
        console.log("ERROR AUTHENTICATING DONOR", err);
        res.status(500).json({ message: "Error authenticating donor" });
    }
};

const updateLiveLocation = async (req, res) => {
    try {
        const { email, liveLocation } = req.body;
        const result = await donorServices.updateLiveLocation(email, liveLocation);
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

const searchDonors = async (req, res) => {
    try {
        const { blood_group, location } = req.query; 
        const donors = await donorServices.findDonors(blood_group, location); 
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
    searchDonors,
    updateDonor,
    deleteDonor,
    AuthDonor,
    updateLiveLocation
};
