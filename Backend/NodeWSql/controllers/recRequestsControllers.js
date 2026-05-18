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

    const { token, donorPhoneNumber, organId } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;

    try {
        const selectionFromRecReqTable = await waitingListModel.selectionFromRecReqTableForReqBtn(actualVerifiedPhoneNumber, donorPhoneNumber, organId).selectionFromRecReqTableForReqBtn

        if (selectionFromRecReqTable.length === 0) {

            const insertionQueryForReqBtn = await waitingListModel.selectionFromRecReqTableForReqBtn(actualVerifiedPhoneNumber, donorPhoneNumber, organId).insertionQueryForReqBtn
            if (insertionQueryForReqBtn) {
                res.status(201).json({
                    message: 'ok'
                })
            }
        }
        else if (selectionFromRecReqTable.length >= 1) {
            res.status(200).json({ message: 'Request already sent' })
        }



    } catch (error) {
        console.log(error)
        if (error.message) {
            console.log(error)
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }

})
module.exports = router;