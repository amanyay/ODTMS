const express = require('express');
const router = express.Router();
const createDBConnection = require('../../config/db');
const JWT = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;


router.post('/', async (req, res) => {

    const { token } = req.body;
    const verifiedToken = JWT.verify(token, JWT_SECRET).tokenPhoneNumber;

    try {
        const connection = await createDBConnection();
        const [adminProfileData] = await connection.query(`SELECT * FROM admin WHERE phone_number = ? `, [verifiedToken]);
        if (adminProfileData) {
            res.status(200).json({
                message: adminProfileData[0]
            })
        }

    } catch (error) {
        console.log(error)
        if (error.message) {
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }

})
module.exports = router