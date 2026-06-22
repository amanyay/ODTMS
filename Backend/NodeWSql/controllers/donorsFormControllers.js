const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise');
const JWT = require('jsonwebtoken');
const donorModel = require('../models/donorModel');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const port = process.env.PORT;
const app = express();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/documentImages/donorsDocument')); // make sure uploads/ exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage });

app.use(bodyParser.json());
router.post('/', upload.single('DocumentImage'), async (req, res) => {

    const { firstName, lastName, email, age, location, bloodType, gender, token, organs } = req.body;
    const donorsDocument = req.file.filename;


    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET)
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;


    try {

        const selectionFromDonation = await donorModel.selectionFromDonationByPhoneNumber(actualVerifiedPhoneNumber)

        if (selectionFromDonation.length > 0) {
            const updateQueryResult = await donorModel.donorFormUpdate(firstName, lastName, email, age, location, bloodType, gender, token, organs, actualVerifiedPhoneNumber)
            const updateDonation = await donorModel.updateDonation(organs, actualVerifiedPhoneNumber, donorsDocument)


            if (updateQueryResult || updateDonation) {
                res.status(200).json({
                    message: 'Successfully updated',
                    status: 'ok',
                    data: selectionFromDonation
                })
            }
        }
        else if (selectionFromDonation.length === 0) {
            const updateQueryResult = await donorModel.donorFormUpdate(firstName, lastName, email, age, location, bloodType, gender, token, organs, actualVerifiedPhoneNumber)
            const insertToDonationTable = await donorModel.insertToDonationTable(actualVerifiedPhoneNumber, organs, donorsDocument)

            if (updateQueryResult || insertToDonationTable) {
                res.status(200).json({
                    message: 'Successfully updated',
                    status: 'ok',
                    data: selectionFromDonation
                })
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