const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken')
const createDBConnection = require('../db')

require('dotenv').config
const JWT_SECRET = process.env.JWT_SECRET;

router.get('/', async (req, res) => {  

    try {
        const connection = await createDBConnection();

        const [selectKidneyAdmin] = await connection.query(`SELECT admin_id , first_name , last_name , age , gender ,phone_number , blood_type FROM admin`);
    
        if (selectKidneyAdmin.length > 0) {
            res.status(200).json({
                message: selectKidneyAdmin
            })
        }

    } catch (error) {
        if (error.message) {
            console.log(error)
        }
        else {
            console.log(error)
        }
    }


})

module.exports = router;