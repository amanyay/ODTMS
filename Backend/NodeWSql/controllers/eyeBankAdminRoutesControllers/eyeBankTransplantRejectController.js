const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise');
const JWT = require('jsonwebtoken');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const port = process.env.PORT;
const app = express();

const adminModel = require('../../models/adminModel')

app.use(bodyParser.json());

router.post('/', async (req, res) => {

    const { rec_phone_number, don_phone_number, requestId, status } = req.body;

    try {


        const makeTransplantReject = await adminModel.makeTransplantReject(status, requestId);
        const RejectQueryDonations = (await adminModel.RejectDonationsAndRecipentTable(rec_phone_number, don_phone_number)).RejectQueryDonations;
        const RejectQueryRecipents = (await adminModel.RejectDonationsAndRecipentTable(rec_phone_number, don_phone_number)).RejectQueryRecipents;


        if (makeTransplantReject || RejectQueryDonations || RejectQueryRecipents) {
            res.status(200).json({
                message: 'Transplant Rejected'
            })
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