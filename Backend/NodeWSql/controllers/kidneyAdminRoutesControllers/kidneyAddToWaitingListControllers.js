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

    const { token, donorPhoneNumber, organId, recipentsPhoneNumber } = req.body;
    // const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET).tokenPhoneNumber;


    try {


        const selectionFromWaitingListTable = await adminModel.kidneyselectionFromWaitingListTable(recipentsPhoneNumber, donorPhoneNumber)
        const selectionFromWaitingListTableToCheckDuplicateDonor = await adminModel.kidneyselectionFromWaitingListTableToCheckDuplicateDonor(donorPhoneNumber)
        const selectionFromWaitingListTableToCheckDuplicateRecipents = await adminModel.kidneyselectionFromWaitingListTableToCheckDuplicateRecipents(recipentsPhoneNumber)


        if (selectionFromWaitingListTableToCheckDuplicateRecipents.length === 0 && selectionFromWaitingListTableToCheckDuplicateRecipents.length === 0) {
            if (selectionFromWaitingListTable.length === 0) {

                const insertionIntoWaitingList = await adminModel.kidneyinsertionIntoWaitingList(recipentsPhoneNumber, donorPhoneNumber, organId)

                if (insertionIntoWaitingList) {
                    res.status(200).json({
                        message: 'ok'
                    })
                }
            }
            else if (selectionFromWaitingListTable.length >= 1) {

                res.status(203).json({ message: 'Request already sent' })
            }


        }
        else if (selectionFromWaitingListTableToCheckDuplicateRecipents.length >= 1) {

            res.status(201).json({
                message: 'User already wait for transplantation'
            })
        }
        else if (selectionFromWaitingListTableToCheckDuplicateRecipents.length >= 1) {
            res.status(202).json({
                message: 'User already wait to transplantation'
            })
        }




    } catch (error) {
        if (error.message) {
            console.log(error)
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }

})
module.exports = router;