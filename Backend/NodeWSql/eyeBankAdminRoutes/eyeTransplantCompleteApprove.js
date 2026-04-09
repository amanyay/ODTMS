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

    const { token, rec_phone_number, don_phone_number, requestId, status } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;
    const connection = await createDBConnection();

    try {

        if (status === 'Approved') {
            const [makeApproveQuery] = await connection.query(`UPDATE rec_request SET status = ? WHERE id = ?  `, ['Completed', requestId]);
            if (makeApproveQuery) {
                const [updateQueryDonations] = await connection.query(`UPDATE donations SET status = ? WHERE phone_numbers = ?  AND organ_id  = ? `, ['Completed', don_phone_number, 3]);
                const [updateQueryRecipents] = await connection.query(`UPDATE recipents_waitinglist SET status = ? WHERE phone_number = ?  AND organ_id  = ?  `, ['Completed', rec_phone_number, 3]);
                if (updateQueryRecipents || updateQueryDonations) {
                    res.status(200).json({
                        message: 'Transplant Success'
                    })
                }
            }
        }
    }
    catch (error) {
        if (error.message) {
            console.log(error)
            res.status(409).json({ err: "Database error " })
        } else {
            console.log(error)
            res.status(500).json({ err: "Server error" })
        }
    }

})
module.exports = router;