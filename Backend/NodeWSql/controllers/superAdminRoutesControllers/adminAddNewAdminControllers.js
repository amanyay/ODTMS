const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise');
const createDBConnection = require('../../config/db');
const JWT = require('jsonwebtoken');
const superAdminModel = require('../../models/superAdminModel')

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const port = process.env.PORT;
const app = express();


app.use(bodyParser.json());

router.post('/', async (req, res) => {

    const { firstName, lastName, age, phoneNumber, email, password, bloodType, gender, location, hospitalId } = req.body;

    try {
        const addNewAdmin = await superAdminModel.superAdminAddNewAdmin(firstName, lastName, age, phoneNumber, email, password, bloodType, gender, location, hospitalId)


        if (addNewAdmin) {
            res.status(200).json({ message: "New admin created successfully" })
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