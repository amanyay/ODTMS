const express = require('express');
const router = express.Router();
const createDBConnection = require('../db');
const { generateOtp , getOtp } = require('../otpService');


router.post('/', async (req, res) => {

    const otp = generateOtp();
    const getOtps = getOtp();
    console.log(getOtps)

})

module.exports = router


