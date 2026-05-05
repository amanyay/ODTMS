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

        const [selectionOrganQuery] = await connection.query(`SELECT 
                organ.* , COALESCE(COUNT(donations.organ_id), 0) AS organ_amount
                FROM organ
                LEFT JOIN donations ON donations.organ_id = organ.organ_id AND donations.status = ?
                WHERE organ.organ_id = ?`, ['Pending', 1]);

        if (selectionOrganQuery.length > 0) {
            res.json({
                message: selectionOrganQuery
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