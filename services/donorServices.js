const db = require('../config/database');

const ensureJSONString = (obj) => 
  typeof obj === 'string' ? obj : JSON.stringify(obj);

const validateCoordinates = (coordinates) => {
    if (!coordinates || !coordinates.lng || !coordinates.lat) {
        throw new Error("Invalid coordinates");
    }
};

const addDonor = async (donorData) => {
    const {
        dName,
        email,
        phone,
        location_info,
        coordinates,
        blood_group,
        preferred_notification,
        password
    } = donorData;

    validateCoordinates(coordinates);

    const point = `POINT(${coordinates.lng} ${coordinates.lat})`;

    const query = `
        INSERT INTO donor 
        (dName, email, phone, location_info, coordinates, blood_group, preferred_notification, password)
        VALUES (?, ?, ?, ?, ST_GeomFromText(?), ?, ?, ?)
    `;

    try {
        const [result] = await db.execute(query, [
            dName,
            email,
            phone,
            ensureJSONString(location_info),
            point,
            blood_group,
            preferred_notification,
            password
        ]);
        return { id: result.insertId, ...donorData };
    } catch (err) {
        throw new Error(err.message);
    }
};

const updateLiveLocation = async (email, location_info, coordinates) => {
    validateCoordinates(coordinates);

    const query = `
        UPDATE donor 
        SET last_known_location = ?, coordinates = ST_GeomFromText(?) 
        WHERE email = ?
    `;
    const point = `POINT(${coordinates.lng} ${coordinates.lat})`;

    try {
        const [rows] = await db.execute(query, [
            ensureJSONString(location_info),
            point,
            email
        ]);
        return rows;
    } catch (err) {
        throw new Error(err.message);
    }
  };
  
const getAllDonors = async() => {
    const query = `SELECT * FROM donor`;
    try{
        const [rows] = await db.execute(query);
        return rows;
    }catch(err){
        throw new Error(err.message);
    }
=======
const getDonor = async (email) => {
    const query = `SELECT * FROM donor WHERE email = ?`;
    try {
      const [rows] = await db.execute(query, [email]);
      if (rows.length > 0) return rows[0];
      else return null;
    } catch (err) {
      throw new Error("Error fetching donor profile: " + err.message);
    }
  };
  
const findDonors = async(blood_group,location) => {
   const query = `SELECT * FROM donor WHERE blood_group = ? AND location = ?`;
   try{
    const [rows] = await db.execute(query,[blood_group,location]);
    return rows;
   }catch(err){
    throw new Error(err.message);
   }
>>>>>>> 27ed4e0f51fafee5d387363dcc1b51b284477b21
};

const getDonor = async (email) => {
    const query = `SELECT * FROM donor WHERE email = ?`;
    try {
        const [rows] = await db.execute(query, [email]);
        return rows.length > 0 ? rows[0] : null;
    } catch (err) {
        throw new Error(err.message);
    }
};

const findNearbyDonors = async (blood_group, lat, lng, radius = 10) => {
    const query = `
        SELECT *, ST_Distance_Sphere(coordinates, POINT(?, ?)) AS distance 
        FROM donor 
        WHERE blood_group = ? 
        HAVING distance <= ? 
        ORDER BY distance ASC
    `;
    try {
        const [rows] = await db.execute(query, [parseFloat(lng), parseFloat(lat), blood_group, radius * 1000]);
        return rows.map(donor => ({
            ...donor,
            distance_in_km: (donor.distance / 1000).toFixed(2)
        }));
    } catch (err) {
        throw new Error(err.message);
    }
};

const updateDonor = async(id,newData) => {
   const {dName,email,phone,location,blood_group,preffered_notification} = newData;
   const query =`UPDATE donor SET dName = ?,email = ?,phone = ?,location = ?,blood_group = ?,preffered_notification = ? WHERE id = ?`;
   try{
    const [rows] = await db.execute(query,[dName,email,phone,location,blood_group,preffered_notification,id]);
    return {id, ...newData};
   }catch(err){
    throw new Error(err.message);
   }
};

const deleteDonor = async (id) => {
    const query = `DELETE FROM donor WHERE id = ?`;
    try {
        await db.execute(query, [id]);
        return { message: "Donor deleted successfully" };
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
    addDonor,
    getAllDonors,
    getDonor,
    updateLiveLocation,
    findNearbyDonors,
    updateDonor,
    deleteDonor
};
