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

    const { firstName, lastName, email, age, location, bloodType, gender, tokenToBackEnd, organs } = req.body;
    const connection = await createDBConnection();


    const verifiedPhoneNumber = JWT.verify(tokenToBackEnd, JWT_SECRET)
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;

    try {

        const [updateQueryResult] = await connection.query(`UPDATE users SET  last_name = ? , age = ? , location = ? 
        , gender = ? , blood_type = ? WHERE phone_number = ? ` , [lastName, age, location, gender, bloodType, actualVerifiedPhoneNumber]);


        const [selectionFromDonation] = await connection.query(`SELECT * FROM donations 
        WHERE phone_numbers = ? ` , [actualVerifiedPhoneNumber])

        if (selectionFromDonation.length > 0) {
            const [updateDonation] = await connection.query(`UPDATE donations SET organ_id = ?
                 WHERE phone_numbers = ? ` , [organs, actualVerifiedPhoneNumber])

            if (updateQueryResult || updateDonation) {
                res.status(200).json({
                    message: 'Successfully updated',
                    status: 'ok',
                    data: selectionFromDonation
                })
            }
        }
        else if (selectionFromDonation.length === 0) {

            const [insertToDonationTable] = await connection.query(`INSERT INTO donations (phone_numbers , organ_id) 
            VALUES(?,?)`, [actualVerifiedPhoneNumber, organs])

            if (updateQueryResult || insertToDonationTable) {
                res.status(200).json({
                    message: 'Successfully updated',
                    status: 'ok',
                    data: selectionFromDonation
                })
            }
        }


        if (!updateQueryResult) {
            res.status(201).json({ message: 'Error in updating' })
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