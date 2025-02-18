const express = require("express");
const BloodRequestsController = require("../controllers/bloodRequestsController");

const router = express.Router();

router.post("/blood-requests", BloodRequestsController.createBloodRequest);
router.get("/blood-requests", BloodRequestsController.getAllBloodRequests);
router.get("/blood-requests/:id", BloodRequestsController.getBloodRequestById);
router.delete("/blood-requests/:id", BloodRequestsController.deleteBloodRequest);

module.exports = router;
