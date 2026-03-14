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

    try {
        const connection = await createDBConnection();
        const [selectionFromUser] = await connection.query(`SELECT users.first_name , users.age , users.location  , users.gender ,
        users.blood_type , organ.organ_id , organ.organ_name , recipents_waitinglist.phone_number , recipents_waitinglist.reg_date , recipents_waitinglist.status
        FROM recipents_waitinglist
        JOIN users ON recipents_waitinglist.phone_number = users.phone_number 
        JOIN organ ON recipents_waitinglist.organ_id = organ.organ_id  `);

        if (selectionFromUser.length > 0) {
            res.json({
                message: selectionFromUser
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