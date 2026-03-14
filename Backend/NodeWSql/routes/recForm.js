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

    const { lastName, age, location, gender, bloodType, tokenToBackEnd, organs } = req.body;
    const verifiedPhoneNumber = JWT.verify(tokenToBackEnd, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;
    const connection = await createDBConnection();

    try {

        const [selectionFromRecTable] = await connection.query(`SELECT * FROM recipents_waitinglist WHERE phone_number = ? `, [actualVerifiedPhoneNumber]);

        if (selectionFromRecTable.length >= 1) {


            const [updateQueryResult] = await connection.query(`UPDATE users SET  last_name = ? , age = ? , location = ? 
                , gender = ? , blood_type = ? WHERE phone_number = ? ` , [lastName, age, location, gender, bloodType, actualVerifiedPhoneNumber]);


            const [updateRecTable] = await connection.query(`UPDATE recipents_waitinglist SET organ_id = ?
                 WHERE phone_number = ? ` , [organs, actualVerifiedPhoneNumber])



            if (updateQueryResult || updateRecTable) {
                res.status(200).json({
                    message: 'Successfully updated',
                    status: 'ok',
                    data: selectionFromRecTable[0],
                })
            }
        }
        else if (selectionFromRecTable.length === 0) {
            const [updateQueryResult] = await connection.query(`UPDATE users SET  last_name = ? , age = ? , location = ? 
                , gender = ? , blood_type = ? WHERE phone_number = ? ` , [lastName, age, location, gender, bloodType, actualVerifiedPhoneNumber]);

            const [insertionToRecTable] = await connection.query(`INSERT INTO recipents_waitinglist 
                (phone_number , organ_id ) VALUES (? , ? ) `, [actualVerifiedPhoneNumber, organs]);

            if (updateQueryResult || insertionToRecTable) {
                res.status(200).json({
                    message: 'Successfully updated',
                    status: 'ok',
                    data: selectionFromRecTable[0],
                })
            }
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