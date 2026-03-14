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




router.post("/", async (req, res) => {

    const { token, firstName, lastName, email, age, location, gender, bloodType, role } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;
    const connection = await createDBConnection();

    try {
        const updateUsersTable = await connection.query(`UPDATE users SET 
        first_name = ? , 
        last_name = ?,
        email = ?,
        age = ? , 
        location = ? , 
        gender = ? , 
        blood_type = ? 
        WHERE phone_number = ? `, [firstName, lastName, email, age, location, gender, bloodType, actualVerifiedPhoneNumber])

        if (updateUsersTable) {
            const [selectionFromUsersTable] = await connection.query('SELECT * FROM users WHERE phone_number = ?', [actualVerifiedPhoneNumber])
            if (selectionFromUsersTable.length > 0) {
                res.status(200).json({
                    message: selectionFromUsersTable[0]
                })
            }
            else if (selectionFromUsersTable.length < 1) {
                res.status(201).json({
                    message: '404'
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