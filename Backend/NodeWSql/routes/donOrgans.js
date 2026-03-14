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

    const { token, donAge, donBloodType } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber
    const connection = await createDBConnection();
    try {
        const [selectionFromrecTable] = await connection.query(`SELECT users.first_name, users.gender , users.age , users.location , users.email,
         users.blood_type, donations.phone_numbers ,organ.organ_name, organ.organ_id 
         FROM donations
         JOIN users ON donations.phone_numbers = users.phone_number
         JOIN organ ON donations.organ_id = organ.organ_id 
         WHERE users.phone_number = ?`, [actualVerifiedPhoneNumber]);


        //  const [selectionFromrecTable] = await connection.query(`SELECT users.first_name, users.gender , users.age , users.location , users.email,
        //  users.blood_type ,organ.organ_name, organ.organ_id ,recipents_waitinglist.phone_number , recipents_waitinglist.status 
        //  FROM recipents_waitinglist 
        //  JOIN users ON recipents_waitinglist.phone_number = users.phone_number
        //  JOIN organ ON recipents_waitinglist.organ_id = organ.organ_id 
        //  WHERE users.blood_type = ?`, [donBloodType]);


        // const recAge = selectionFromrecTable[0].age;
        // const ageDifference = Math.abs(donAge - recAge);


        if (selectionFromrecTable.length > 0) {


            // if (ageDifference > 10) {
            //     res.json({
            //         message: '404'
            //     })
            // }
            // else if (ageDifference < 10) {
            res.json({
                message: selectionFromrecTable[0],
                status: 'ok'
            })
            // }
        }
        else if (selectionFromrecTable.length === 0) {
            res.json({
                message: '404'
            })

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