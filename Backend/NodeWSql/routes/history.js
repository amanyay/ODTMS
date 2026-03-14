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
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;
    const connection = await createDBConnection();

    try {


        const [selectionFromUsersTable] = await connection.query("SELECT * FROM users WHERE phone_number = ?", [actualVerifiedPhoneNumber]);

        if (selectionFromUsersTable[0].role === 'recipents') {
            const [selectionFromRecReqTable] = await connection.query(`SELECT organ.organ_name, users.first_name ,
            users.role, organ.organ_id , rec_request.*
            FROM rec_request
            JOIN organ ON rec_request.organ_id = organ.organ_id 
            JOIN users ON rec_request.rec_phone_number = users.phone_number
            WHERE rec_phone_number = ?` , [actualVerifiedPhoneNumber])
            // console.log(selectionFromRecReqTable)

            res.status(200).json({
                message: selectionFromRecReqTable,
                text: 'Ask to Recieve'
            })
        }
        else if (selectionFromUsersTable[0].role === 'donor') {
            const [selectionFromDonTable] = await connection.query(`SELECT organ.organ_name, users.first_name ,users.role, organ.organ_id , 
            donations.donation_id AS id , donations.phone_numbers , donations.organ_id , donations.status , donations.donation_date AS date
            FROM donations
            JOIN organ ON donations.organ_id = organ.organ_id 
            JOIN users ON donations.phone_numbers = users.phone_number
            WHERE phone_numbers = ?` , [actualVerifiedPhoneNumber])
            // console.log(selectionFromDonTable)

            res.status(200).json({
                message: selectionFromDonTable,
                text: 'Ask to donate'
            })
        }
    }
    catch (error) {
        if (error.message) {
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }



})
module.exports = router;