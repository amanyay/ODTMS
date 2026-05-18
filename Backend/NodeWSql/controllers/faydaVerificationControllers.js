const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken')

require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET;

const userModel = require('../models/userModel');


router.post('/', async (req, res) => {

    const { token, faydaNumber } = req.body;
    const tokenVerifiedPhoneNumber = JWT.verify(token, JWT_SECRET).tokenPhoneNumber;
    const faydaNumberInt = parseInt(faydaNumber)


    try {

        const insertfaydaNumberInt = await userModel.insertfaydaNumberInt(faydaNumberInt, tokenVerifiedPhoneNumber);

        if (insertfaydaNumberInt) {
            res.status(200).json({
                message: 'Fayda number succesfully linked'
            })
        }

    } catch (error) {
        console.log(error)
        if (error.message) {
            console.log(error)
            res.status(409).json({ err: "Database error " })
        } else {
            console.log(error)
            res.status(500).json({ err: "Server error" })
        }
    }

})

module.exports = router