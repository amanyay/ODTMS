const express = require('express');
const router = express.Router();
const jsonWebToken = require('jsonwebtoken')
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')

router.post('/', async (req, res) => {

    const { password1, password2, forgetPasswordPhoneNumberToken } = req.body;


    try {

        const hashedPassword = await bcrypt.hash(password2, 10);
        const verifiedForgetPasswordPhoneNumber = jsonWebToken.verify(forgetPasswordPhoneNumberToken, process.env.JWT_SECRET_FORGET_PASSWORD)
        const actualVerifiedForgetPasswordPhoneNumber = verifiedForgetPasswordPhoneNumber.forgetPasswordTokenPhoneNumber



        const updatePassword = await userModel.updatePassword(hashedPassword, actualVerifiedForgetPasswordPhoneNumber)



        if (updatePassword) {
            res.status(200).json({
                message: "Successfully Updated"
            })
        }



    } catch (error) {
        console.log(error)
        if (error.message) {
            console.log(error.message)
            res.status(409).json({ err: "Database error " })
        } else {
            console.log(error)
            res.status(500).json({ err: "Server error" })
        }

    }

})

module.exports = router;