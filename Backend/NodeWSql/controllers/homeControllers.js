const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise');
const userModel = require('../models/userModel')
const donorModel = require('../models/donorModel')
const recipentsModel = require('../models/recipentsModel')
const JWT = require('jsonwebtoken');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const port = process.env.PORT;
const app = express();

app.use(bodyParser.json());
router.post('/', async (req, res) => {


    try {

        const { token } = req.body;

        const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
        const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;
        let verificationMessage = 'default';



        const selectionFromUser = await userModel.selectionForProfile(actualVerifiedPhoneNumber)



        if (selectionFromUser[0].role === 'recipents') {
            const getRecInfoQuery = await recipentsModel.getRecInfoQuery(actualVerifiedPhoneNumber)


            if (selectionFromUser[0].fayda_no === 0 || selectionFromUser[0].fayda_no === null) {
                verificationMessage = "Not Verified"
            }
            else if (selectionFromUser[0].fayda_no !== 0) {
                verificationMessage = "Verified"
            }
            res.status(200).json({
                message: selectionFromUser[0],
                joinMessage: getRecInfoQuery,
                status: 'ok',
                faydaVerfication: verificationMessage
            })



        }
        else if (selectionFromUser[0].role === 'donor') {

            const getDonInfoQuery = await donorModel.getDonInfoQuery(actualVerifiedPhoneNumber)

            if (selectionFromUser[0].fayda_no === 0 || selectionFromUser[0].fayda_no === null) {
                verificationMessage = "Not Verified"
            }
            else if (selectionFromUser[0].fayda_no !== 0) {
                verificationMessage = "Verified"
            }
            res.status(200).json({
                message: selectionFromUser[0],
                joinMessage: getDonInfoQuery,
                status: 'ok',
                faydaVerfication: verificationMessage
            })
        }


    } catch (error) {
        console.log(error)
        if (error.expiredAt) {
            res.status(401).json({ err: 'Unauthorized User' })
        }
        else if (error.message) {
            res.status(409).json({ err: "Unkown error " })
        }
        else {
            res.status(500).json({ err: "Server error" })
        }
    }




})
module.exports = router;