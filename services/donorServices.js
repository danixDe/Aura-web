const db = require('../config/database');
const donor = require('../models/donor');

const addDonor = async(donorData) => {
    console.log("add donor in services");
   const {dName,email,phone,location,blood_group,preferred_notification,password} = donorData;
   const query = `INSERT INTO donor (dName,email,phone,location,blood_group,preferred_notification,password) VALUES (?,?,?,?,?,?,?)`;

   try{
    const [result] = await db.execute(query,[dName,email,phone,location,blood_group,preferred_notification,password]);
    return{id:result.insertId,...donorData};
   }catch(err){
         throw new Error(err.message);
   }
};

const updateLiveLocation = async (email, location) => {
    const query = `UPDATE donor SET last_known_location = ? WHERE email = ?`;
    try {
      const [rows] = await db.execute(query, [location, email]);
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
};
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

const deleteDonor = async(id) => {
    const query = `DELETE FROM donor WHERE id = ?`;
    try{
        await db.execute(query,[id]);
        return {message: "Donor deleted succesfully"};
    }catch(err){
        throw new Error(err.message);
    }
};

module.exports = {addDonor,getAllDonors,findDonors,updateDonor,deleteDonor,getDonor};
