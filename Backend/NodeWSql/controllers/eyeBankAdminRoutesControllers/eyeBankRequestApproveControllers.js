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
    const { requestId, status, don_phone_number, rec_phone_number } = req.body;

    try {

        if (status === 'Pending') {
            const makeApproveQuery = await (await adminModel.makeApproveQueryToWaitingListTable(requestId, status, don_phone_number, rec_phone_number)).makeApproveQueryToWaitingListTable
            const makeApproveQueryForDonationTable = await (await adminModel.makeApproveQueryToWaitingListTable(requestId, status, don_phone_number, rec_phone_number)).makeApproveQueryForDonationTable
            const makeApproveQueryForRecipentsTable = await (await adminModel.makeApproveQueryToWaitingListTable(requestId, status, don_phone_number, rec_phone_number)).makeApproveQueryForRecipentsTable
            if (makeApproveQuery || makeApproveQueryForDonationTable || makeApproveQueryForRecipentsTable) {
                res.status(200).json({
                    message: "Successfull approved"
                })
            }
        }
    }

    catch (error) {
        console.log(error)
        if (error.message) {
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }
})
module.exports = router;