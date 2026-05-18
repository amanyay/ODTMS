const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise');
const createDBConnection = require('../../config/db');
const JWT = require('jsonwebtoken');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const port = process.env.PORT;
const app = express();


app.use(bodyParser.json());
router.post('/', async (req, res) => {

    const { token, newOrgan } = req.body;

    try {
        const connection = await createDBConnection();
        const [addNewOrgan] = await connection.query(`INSERT INTO organ (organ_name) VALUES (?)`, [newOrgan])
        if (addNewOrgan) {
            res.status(200).json({ message: 'Organ Added' });
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