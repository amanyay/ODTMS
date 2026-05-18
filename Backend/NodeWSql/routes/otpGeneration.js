const express = require('express');
const router = express.Router();

const { generateOtp , getOtp } = require('../services/otpService');


router.post('/', async (req, res) => {

    const otp = generateOtp();
    const getOtps = getOtp();
    console.log(getOtps)

})

module.exports = router


