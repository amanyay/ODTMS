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
    

    try {
        const selectionFromRequest = await adminModel.waitingListDataDisplay();
        if (selectionFromRequest.length > 0) {
            res.status(200).json({
                message: selectionFromRequest
            })
        }
        else if (selectionFromRequest.length < 1) {
            res.status(201).json({
                message: "Not pending data found"
            })
        }

    }
    catch (error) {
        console.log(error)
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