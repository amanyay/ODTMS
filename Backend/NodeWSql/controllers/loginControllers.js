const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise');
const JWT = require('jsonwebtoken');
const userModel = require('../models/userModel')
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const port = process.env.PORT;
const app = express();


app.use(bodyParser.json());

router.post('/', async (req, res) => {

    const { phoneNumber, password } = req.body;



    try {

        const selectedResult = await userModel.userLoginSelection(phoneNumber, password)

        if (selectedResult.length > 0) {
            const token = JWT.sign({ tokenPhoneNumber: phoneNumber }, JWT_SECRET);
            res.status(200).json({ message: "User found", token: token, })
        }
        else if (selectedResult.length < 1) {
            res.status(201).json({ message: 'User not found' });
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