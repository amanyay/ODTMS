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

    const { firstName, lastName, age, phoneNumber, email, password, location, gender, bloodType } = req.body;

    try {
        const connection = await createDBConnection();
        const [addNewAdmin] = await connection.query(`INSERT INTO users (first_name , last_name , age , role , location ,
            password , phone_number , gender , email , blood_type) 
            VALUES (?,?,?,?,?,?,?,?,?,?)` ,
            [firstName, lastName, age, 'admin', location, password, phoneNumber, gender, email, bloodType]);

        if (addNewAdmin) {
            res.status(200).json({ message: "New admin created successfully" })
        }

    } catch (error) {
        if (error.message) {
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }
})
app.post('/adminAddOrgan', async (req, res) => {

    const { token, newOrgan } = req.body;

    try {
        const connection = await createDBConnection();
        const [addNewOrgan] = await connection.query(`INSERT INTO organ (organ_name) VALUES (?)`, [newOrgan])
        if (addNewOrgan) {
            res.status(200).json({ message: 'Organ Add' });
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