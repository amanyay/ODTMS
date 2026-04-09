const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise');
const createDBConnection = require('../db');
const JWT = require('jsonwebtoken');
const forgetPassword = require('./forgetPassword')
const { getOtp } = require("../otpService");

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const port = process.env.PORT;
const app = express();




router.post('/', async (req, res) => {
    const { code1, code2, code3, code4, code5, code6 } = req.body;
    const userOtp = code1 + code2 + code3 + code4 + code5 + code6;
    const generatedOtp = getOtp()
    
    

    if (userOtp !== generatedOtp) {
        console.log("Not matched")
        res.status(201).json({
            message : 'Not Matched'
        })
    }
    else if (userOtp === generatedOtp) {
        res.status(200).json({
            message: 'ok'
        })
    }




})

module.exports = router