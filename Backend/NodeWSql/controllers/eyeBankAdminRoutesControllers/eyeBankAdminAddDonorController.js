const express = require('express')
const router = express.Router();
const adminModel = require('../../models/adminModel')
const userModel = require('../../models/userModel');
const donorModel = require('../../models/donorModel');

router.post('/', async (req, res) => {

    const { firstName, lastName, age, phoneNumber, gender, bloodType, organ, location } = req.body;

    try {

        const selectFromuser = await userModel.userSignUp(phoneNumber)
        if (selectFromuser.length === 0) {

            const insertToUserTable = await adminModel.adminAddEyeDonor(firstName, lastName, age, phoneNumber, gender, bloodType, organ, location)
            const insertToDonationTable = await donorModel.insertToDonationTable(phoneNumber, organ)

            if (insertToUserTable || insertToDonationTable) {
                res.status(200).json({
                    message: 'Successfully register'
                })
            }



        }
        else if (selectFromuser.length > 1) {
            res.status(201).json({
                message: 'User Already register'
            })
        }





    } catch (error) {
        console.log(error)
        if (error.message) {
            res.status(409).json({ err: "Database error " })
        }
        else {
            res.status(500).json({ err: "Server error" })
        }
    }

})
module.exports = router