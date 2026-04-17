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
    let verificationMessage = 'default';

    try {

        const [selectionFromUser] = await connection.query(`SELECT * FROM users WHERE phone_number = ? `, [actualVerifiedPhoneNumber])


        if (selectionFromUser[0].role === 'recipents') {
            const [getRecInfoQuery] = await connection.query(`SELECT users.* , recipents_waitinglist.phone_number , recipents_waitinglist.organ_id ,
            organ.organ_id ,organ.organ_name
            FROM recipents_waitinglist 
            JOIN users ON recipents_waitinglist.phone_number = users.phone_number
            JOIN organ ON recipents_waitinglist.organ_id =  organ.organ_id 
            WHERE recipents_waitinglist.phone_number = ? ` , [actualVerifiedPhoneNumber]);

            // console.log(getRecInfoQuery);
            if (selectionFromUser[0].fayda_no === 0 || selectionFromUser[0].fayda_no === null) {
                verificationMessage = "Not Verified"
            }
            else if (selectionFromUser[0].fayda_no !== 0) {
                verificationMessage = "Verified"
            }
            res.status(200).json({
                message: selectionFromUser[0],
                joinMessage: getRecInfoQuery,
                status: 'ok',
                faydaVerfication: verificationMessage
            })



        }
        else if (selectionFromUser[0].role === 'donor') {
            const [getRecInfoQuery] = await connection.query(`SELECT users.* , donations.phone_numbers , donations.organ_id ,
            organ.organ_id ,organ.organ_name
            FROM donations 
            JOIN users ON donations.phone_numbers = users.phone_number
            JOIN organ ON donations.organ_id =  organ.organ_id 
            WHERE donations.phone_numbers = ? ` , [actualVerifiedPhoneNumber])
            // console.log(getRecInfoQuery)
            if (selectionFromUser[0].fayda_no === 0 || selectionFromUser[0].fayda_no === null) {
                verificationMessage = "Not Verified"
            }
            else if (selectionFromUser[0].fayda_no !== 0) {
                verificationMessage = "Verified"
            }
            res.status(200).json({
                message: selectionFromUser[0],
                joinMessage: getRecInfoQuery,
                status: 'ok',
                faydaVerfication: verificationMessage
            })
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