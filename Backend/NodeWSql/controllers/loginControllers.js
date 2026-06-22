const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const userModel = require('../models/userModel')
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const port = process.env.PORT;
const app = express();


app.use(bodyParser.json());

router.post('/', async (req, res) => {

    const { phoneNumber, password } = req.body;




    try {

        const selectedResult = await userModel.userLoginSelection(phoneNumber)


        if (selectedResult.length > 0) {
            const hashedPassword = selectedResult[0].password
            const realPassword = await bcrypt.compare(password, hashedPassword)

            if (realPassword === true) {
                const token = JWT.sign({ tokenPhoneNumber: phoneNumber }, JWT_SECRET, { expiresIn: '24hr' });
                res.status(200).json({ message: "User found", token: token, })
            }
            else if (realPassword !== true) {
                res.status(201).json({ message: 'Incorrect Password' });
            }
        }
        else if (selectedResult.length === 0) {
            res.status(202).json({ message: 'User Not Found' });
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

module.exports = router;