const express = require('express');
const router = express.Router();
const jsonWebToken = require('jsonwebtoken')
const createConnection = require('../db');

router.post('/', async (req, res) => {

    const { password1, password2, forgetPasswordPhoneNumberToken } = req.body;


    try {

        const verifiedForgetPasswordPhoneNumber = jsonWebToken.verify(forgetPasswordPhoneNumberToken, process.env.JWT_SECRET_FORGET_PASSWORD)
        const actualVerifiedForgetPasswordPhoneNumber = verifiedForgetPasswordPhoneNumber.forgetPasswordTokenPhoneNumber
        const connection = await createConnection();

        const [updatePassword] = await connection.query(`UPDATE users  SET password = ? WHERE phone_number = ? `, [password2, actualVerifiedForgetPasswordPhoneNumber])

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