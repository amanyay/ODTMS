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

        if (status === 'Approved') {

            const makeApproveQuery = await adminModel.makeTransplantCompleteApprove(status, requestId);
            const updateQueryDonations = (await adminModel.updateDonationsAndRecipentTable(rec_phone_number, don_phone_number)).updateQueryDonations;
            const updateQueryRecipents = (await adminModel.updateDonationsAndRecipentTable(rec_phone_number, don_phone_number)).updateQueryRecipents;


            if (makeApproveQuery || updateQueryDonations || updateQueryRecipents) {
                res.status(200).json({
                    message: 'Transplant Success'
                })
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