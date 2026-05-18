const express = require('express')
const router = express.Router();
const JWT = require('jsonwebtoken');

require('dotenv').config()

const superADminModel = require('../../models/superAdminModel')

router.post('/', async (req, res) => {

    const { token } = req.body
    const actualVerifiedPhoneNumber = JWT.verify(token, process.env.JWT_SECRET).tokenPhoneNumber

    try {


        const superAdminProfileData = await superADminModel.superAdminProfileData(actualVerifiedPhoneNumber)

        if (superAdminProfileData) {
            res.status(200).json({
                message: superAdminProfileData
            })
        }



    } catch (error) {

        console.log(error)

    }


})

module.exports = router