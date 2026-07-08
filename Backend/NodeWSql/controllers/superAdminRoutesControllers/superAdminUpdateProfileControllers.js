const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken')
const superAdminModel = require('../../models/superAdminModel')
require('dotenv').config
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/', async (req, res) => {

    const { token, firstName, lastName, age, phoneNumber, email, password, gender, bloodType, location } = req.body;
    const actualVerifiedPhoneNumber = JWT.verify(token, JWT_SECRET).tokenPhoneNumber

    const eyeBankAdminUpdateProfile = await superAdminModel.superAdminUpdateProfile(actualVerifiedPhoneNumber, firstName, lastName, age, phoneNumber, email, password, gender, location, bloodType)
    console.log(eyeBankAdminUpdateProfile)
    if (eyeBankAdminUpdateProfile) {
        res.status(200).json({
            message: 'Updated'
        })
    }

})

module.exports = router;