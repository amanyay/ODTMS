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

    const { token, organID } = req.body
    console.log(organID)
    try {

        const connection = await createDBConnection();
        const [deleteOrgans] = await connection.query(`DELETE FROM donations WHERE donation_id = ? `, [organID]);
        if (deleteOrgans) {
            res.status(200).json({
                message: 'Successfully deleted'
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