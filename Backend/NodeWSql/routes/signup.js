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

    const { firstName, lastName, phoneNumber, email, password, selectedValue } = req.body;
    const connection = await createDBConnection();

    try {
        const [selectionFromUsersTable] = await connection.query(`SELECT phone_number FROM users WHERE phone_number = ? `, [phoneNumber]);

        if (selectionFromUsersTable.length > 0) {
            res.status(200).json({ message: 'Already have an account' })
        }
        else if (selectionFromUsersTable.length < 1) {
            const insertionQuery = await connection.query(`INSERT INTO users (first_name, last_name ,phone_number ,email ,
                 password , role) VALUES (?,?,?,?,?,?)` , [firstName, lastName, phoneNumber, email, password, selectedValue]);

            if (insertionQuery) {
                res.status(200).json({ message: 'Successfully Registerd' })
            } 
        }

    } catch (error) {

        if (error.message) {
            res.status(409).json({ err: "Database error " })
            console.log(error.message)
        } else {
            res.status(500).json({ err: "Server error" })
        }

    }

})
module.exports = router;