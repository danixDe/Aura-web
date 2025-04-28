const express = require("express");
const router = express.Router();
const facilityController = require("../controllers/facilityController");

router.post("/facilities", facilityController.createFacility);
router.get("/facilities", facilityController.getAllFacilities);
router.get("/facilities/:id", facilityController.getFacilityById);
router.put("/facilities/:id", facilityController.updateFacility);
router.delete("/facilities/:id", facilityController.deleteFacility);
router.post("/facility/login",facilityController.AuthFacility)

module.exports = router;
