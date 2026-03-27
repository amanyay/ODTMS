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

    const { token, recAge, recBloodType, userOrgan } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;



    try {

        const connection = await createDBConnection();
        const [selectionFromdonation] = await connection.query(`SELECT users.first_name, users.gender , users.age , users.location , users.email,
         users.blood_type ,organ.organ_name , organ.organ_id , donations.phone_numbers , donations.status 
         FROM donations 
         JOIN users ON donations.phone_numbers = users.phone_number
         JOIN organ ON donations.organ_id = organ.organ_id 
         WHERE users.blood_type = ? AND donations.organ_id = ? `, [recBloodType, userOrgan]);


        const [requestSelection] = await connection.query(`SELECT * FROM rec_request WHERE rec_phone_number = ? `
            , [actualVerifiedPhoneNumber])


        if (selectionFromdonation.length > 0) {
            const donAge = selectionFromdonation[0].age;
            const ageDifference = Math.abs(donAge - recAge);

            if (ageDifference >= 10) {
                res.status(201).json({
                    status: '201'
                })
            }
            else if (ageDifference < 10) {
                res.status(200).json({
                    message: selectionFromdonation,
                    status: 'ok',
                    rec_request: requestSelection
                })
            }

        }
        else if (selectionFromdonation.length === 0) {
            res.status(201).json({
                status: '201'
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