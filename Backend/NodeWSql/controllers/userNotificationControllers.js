const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise');
const userModel = require('../models/userModel')
const donorModel = require('../models/donorModel')
const waitingListModel = require('../models/waitingListModel')
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

        const selectionRole = await userModel.selectionRole(actualVerifiedPhoneNumber)


        if (selectionRole[0].role === 'recipents') {

            const approvedRecipentSelection = await waitingListModel.approvedNotification(actualVerifiedPhoneNumber)
            const approvedRecipentSelectionQuery = approvedRecipentSelection.approvedRecipentSelectionQuery


            if (approvedRecipentSelectionQuery.length > 0) {
                res.status(200).json({
                    message: approvedRecipentSelectionQuery,
                    arrow: '←'
                })
            }
            else if (approvedRecipentSelectionQuery.length < 1) {
                res.status(201).json({ message: 'Empty Notification' })
            }

        }
        else if (selectionRole[0].role === 'donor') {

            const approvedDonorSelection = await waitingListModel.approvedNotification(actualVerifiedPhoneNumber)
            const approvedDonorSelectionQuery = approvedDonorSelection.approvedDonorSelectionQuery
            console.log(approvedDonorSelectionQuery)
            if (approvedDonorSelectionQuery.length > 0) {
                res.status(200).json({
                    message: approvedDonorSelectionQuery,
                    status: 'ok',
                    arrow: '→'
                })
            }
            else if (approvedDonorSelectionQuery.length < 1) {
                res.status(201).json({ message: 'Empty Notification' })
            }
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