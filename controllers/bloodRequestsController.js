const BloodRequestsService = require("../services/bloodRequestServices");

const BloodRequestsController = {
  async createBloodRequest(req, res) {
    try {
      const newRequest = await BloodRequestsService.createBloodRequest(req.body);
      res.status(201).json(newRequest);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getAllBloodRequests(req, res) {
    try {
      const requests = await BloodRequestsService.getAllBloodRequests();
      res.status(200).json(requests);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getBloodRequestById(req, res) {
    try {
      const request = await BloodRequestsService.getBloodRequestById(req.params.id);
      if (!request) {
        return res.status(404).json({ message: "Blood request not found" });
      }
      res.status(200).json(request);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async deleteBloodRequest(req, res) {
    try {
      const result = await BloodRequestsService.deleteBloodRequest(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = BloodRequestsController;
