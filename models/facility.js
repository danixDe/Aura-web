const db = require("../config/database");

const facilityTable = `
 CREATE TABLE IF NOT EXISTS facility (
 id int AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(255) NOT NULL,
 email VARCHAR(255) UNIQUE NOT NULL,
 phone VARCHAR(15) NOT NULL,
 address VARCHAR(500) NOT NULL,
 city VARCHAR(255) NOT NULL,
 state VARCHAR(255) NOT NULL,
 zip_code VARCHAR(10) NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );
`;

const createFacilityTable = async() => {
    try{
        await db.execute(facilityTable);
    }catch(error){
        console.error("Error creating facility table:",error.message);
    }
}
module.exports = {createFacilityTable};