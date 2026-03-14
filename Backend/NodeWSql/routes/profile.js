const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise');
const createDBConnection = require('../db');
const JWT = require('jsonwebtoken');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const port = process.env.PORT;
const app = express();


app.use(bodyParser.json());
router.post('/', async (req, res) => {

    const { token } = req.body;
    const connection = await createDBConnection();


    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;

    try {
        const [findByPhoneNumberQueryResult] = await connection.query(`SELECT * FROM users WHERE phone_number = ? `, [actualVerifiedPhoneNumber]);

        //findByPhoneNumberQueryResult without [] would be return the whole array [rows, fields]. and we only care about
        //the rows (the actual data you care about), not the metadata.So [findByPhoneNumberQueryResult] is simply a neat way 
        // to ignore the metadata and directly get the query results.

        if (!findByPhoneNumberQueryResult) {
            res.status(404).json({ message: 'Error' })
        }
        else if (findByPhoneNumberQueryResult) {
            const arrayToObject = findByPhoneNumberQueryResult[0];
            res.status(200).json({ message: arrayToObject });
        }


    } catch (error) {
        if (error.message) {
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }




})

module.exports = router;