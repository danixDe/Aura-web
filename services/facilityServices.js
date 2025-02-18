const db = require("../config/database");
const facility = require("../models/facility"); 

const createFacility = async(facilityData) => {
    const {name,email,phone,address,city,state,zip_code} = facilityData;
    const query = `INSERT INTO facility (name,email,phone,address,city,state,zip_code) VALUES (?,?,?,?,?,?,?)`;
    try{
        const [row] = await db.execute(query,[name,email,phone,address,city,state,zip_code]);
        return {id:row.insertId,...facilityData};
    }catch(error){
        throw new Error(error.message);
    }
};

const getAllFacilities = async() => {
    const query = `SELECT * FROM facility`;
    try{
        const [rows] = await db.execute(query);
        return rows;
    }catch(error){
        throw new Error(error.message);
    }
};

const getFacilityById = async(id) => {
    const query = `SELECT * FROM facility WHERE id = ?`;
    try{
        const [rows] = await db.execute(query,[id]);
        return rows;
    }catch(error){
        throw new Error(error.message);
    }
};

const updateFacility = async(id,newData) => {
    const {name,email,phone,address,city,state,zip_code} = newData;
    const query = `UPDATE facility SET name = ?,email = ?,phone = ?,address = ?,city = ?,state = ?,zip_code = ? WHERE id = ?`;
    try{
        const [rows] = await db.execute(query,[name,email,phone,address,city,state,zip_code,id]);
        return {id,...newData};
    }catch(error){
        throw new Error(error.message);
    }
};

const deleteFacility = async (id) => {
    const query = `DELETE FROM facility WHERE id = ?;`;
    try {
        await db.execute(query, [id]);
        return { message: "Facility deleted successfully" };
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {createFacility,getAllFacilities,getFacilityById,updateFacility,deleteFacility};

