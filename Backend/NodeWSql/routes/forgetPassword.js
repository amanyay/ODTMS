const express = require('express');
const app = express()
const router = express.Router();
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise');
const jsonWebToken = require('jsonwebtoken');

const createDBConnection = require('../db');
const { generateOtp, getOtp } = require("../otpService");

app.use(express.json())

require('dotenv').config();



router.post('/', async (req, res) => {

    const { phoneNumber } = req.body;

    try {

        const connection = await createDBConnection();

        const [selectionFromUsersTable] = await connection.query(`SELECT phone_number FROM users 
            WHERE phone_number = ? AND role != ? ` , [phoneNumber, 'admin'])

        if (selectionFromUsersTable.length > 0) {

            const forgetPasswordToken = jsonWebToken.sign({ forgetPasswordTokenPhoneNumber: selectionFromUsersTable[0].phone_number }, process.env.JWT_SECRET_FORGET_PASSWORD);

            const otp = generateOtp();
            const getOtps = getOtp();
            console.log(getOtps)

            res.status(200).json({
                message: forgetPasswordToken,
            })
        }
        else if (selectionFromUsersTable.length < 1) {
            res.status(201).json({
                message: "Account not found"
            })
        }


    } catch (error) {
        if (error.message) {
            res.status(409).json({ err: "Database error " })
            console.log(error)
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }


})

module.exports = router
