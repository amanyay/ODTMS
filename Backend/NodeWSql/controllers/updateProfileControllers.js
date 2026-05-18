const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const userModel = require('../models/userModel');
const JWT = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');



require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const port = process.env.PORT;
const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads')); // make sure uploads/ exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });



router.post('/', upload.single('PPImage'), async (req, res) => {

    const { firstname, lastName, age, location, gender, email, bloodType, token } = req.body
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;
    const fileName = req.file.filename;

    try {
        const updateUsersTable = await userModel.updateUserProfile(firstname, lastName, email, age, location, gender, bloodType, fileName, actualVerifiedPhoneNumber)
        if (updateUsersTable) {
            const selectionFromUsersTable = await userModel.selectionForProfile(actualVerifiedPhoneNumber)

            if (selectionFromUsersTable.length > 0) {
                res.status(200).json({
                    message: selectionFromUsersTable[0]
                })
            }
            else if (selectionFromUsersTable.length < 1) {
                res.status(201).json({
                    message: '404'
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