const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise');
const createDBConnection = require('../db');
const JWT = require('jsonwebtoken');
const OpenAiAPI = require('openai-api-node');
const OpenAI = require('openai')
const axios = require("axios")
require('dotenv').config();


const JWT_SECRET = process.env.JWT_SECRET;
const port = process.env.PORT;
const app = express();


const endpoint = "https://router.huggingface.co/v1";

app.use(bodyParser.json());
router.use('/', async (req, res) => {

    const { token } = req.body;

    const verifyToken = JWT.verify(token, JWT_SECRET)
    const actualVerifiedPhoneNumber = verifyToken.tokenPhoneNumber;

    try {
        const connection = await createDBConnection();
        const [selectForqr] = await connection.query(`SELECT phone_number , first_name FROM users 
            WHERE phone_number = ? `, [actualVerifiedPhoneNumber])


        if (selectForqr.length > 0) {
            res.status(200).json({ message: selectForqr[0] })
        } else {
            res.status(201).json({ message: 'Not Found' })
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