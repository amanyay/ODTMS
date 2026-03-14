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

    const { token, donorPhoneNumber, organId } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;
    const connection = await createDBConnection();



    try {
        const [selectionFromRecReqTable] = await connection.query(`SELECT * FROM rec_request WHERE 
            rec_phone_number = ? AND don_phone_number = ? `, [actualVerifiedPhoneNumber, donorPhoneNumber]);


        if (selectionFromRecReqTable.length === 0) {
            const insertionQuery = await connection.query(`INSERT INTO rec_request (rec_phone_number , don_phone_number , organ_id)
         VALUES (?,?,?)`, [actualVerifiedPhoneNumber, donorPhoneNumber, organId]);

            if (insertionQuery) {
                res.status(201).json({
                    message: 'ok'
                })
            }
        }
        else if (selectionFromRecReqTable.length >= 1) {
            res.status(200).json({ message: 'Request already sent' })
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