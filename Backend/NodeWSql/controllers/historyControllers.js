const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise');
const userModel = require('../models/userModel')
const donorModel = require('../models/donorModel')
const recipentsModel = require('../models/recipentsModel')
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


        const selectionFromUsersTable = await userModel.selectionForProfile(actualVerifiedPhoneNumber)


        if (selectionFromUsersTable[0].role === 'recipents') {

            const selectionFromRecReqTable = await waitingListModel.selectionFromRecReqTable(actualVerifiedPhoneNumber)

            res.status(200).json({
                message: selectionFromRecReqTable,
                text: 'Ask to Recieve'
            })
        }
        else if (selectionFromUsersTable[0].role === 'donor') {

            const selectionFromDonTable = await donorModel.selectionFromDonTable(actualVerifiedPhoneNumber)

            res.status(200).json({
                message: selectionFromDonTable,
                text: 'Ask to donate'
            })
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