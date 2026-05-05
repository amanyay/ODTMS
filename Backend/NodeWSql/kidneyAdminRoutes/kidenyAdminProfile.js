const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken')
const createDBConnection = require('../db')

require('dotenv').config
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/', async (req, res) => {

    const { token } = req.body
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;

    try {
        const connection = await createDBConnection();

        const [selectKidneyAdmin] = await connection.query(`SELECT * FROM admin WHERE phone_number = ? AND ID = ? `, [actualVerifiedPhoneNumber, 1])
        if (selectKidneyAdmin.length > 0) {
            res.status(200).json({
                message: selectKidneyAdmin[0]
            })
        }

    } catch (error) {
        console.log(error)
        if (error.message) {
            console.log(error)
        }
        else {
            console.log(error)
        }
    }


})

module.exports = router;