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

    const { token } = req.body;

    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;


    try {

        const findByPhoneNumberQueryResult = await userModel.selectionForProfile(actualVerifiedPhoneNumber)

        if (!findByPhoneNumberQueryResult) {
            res.status(404).json({ message: 'Error' })
        }
        else if (findByPhoneNumberQueryResult) {
            const arrayToObject = findByPhoneNumberQueryResult[0];
            res.status(200).json({ message: arrayToObject });
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