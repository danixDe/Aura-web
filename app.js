const express = require("express");
const bodyParser = require("body-parser");
const donorRoutes = require("./routes/donorRoutes");
const facilityRoutes = require("./routes/facilityRoutes");
const bloodRequestsRoutes = require("./routes/bloodRequestsRoutes");
const medicalRecordsRoutes = require("./routes/medicalRecordRoutes");
const db = require("./config/database"); 
const { createDonorTable } = require("./models/donor");
const { createFacilityTable } = require("./models/facility");
const { createBloodRequestsTable } = require("./models/bloodRequestsTable");
const { createMedicalRecordsTable } = require("./models/medicalRecordsModel");
const cors=require("cors");


createDonorTable();
createFacilityTable();
createBloodRequestsTable();
createMedicalRecordsTable();

const app = express();
const PORT =  5000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api", donorRoutes);
app.use("/api", facilityRoutes);
app.use("/api", bloodRequestsRoutes);
app.use("/api", medicalRecordsRoutes);


app.get("/", (req, res) => {
  res.send("Blood Donation API is running...");
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
