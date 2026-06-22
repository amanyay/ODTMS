const express = require('express')
const router = express.Router();
const adminModel = require('../../models/adminModel');


router.post('/', async (req, res) => {

    const { donorPhoneNumber } = req.body;


    try {

        if (donorPhoneNumber !== '') {
            const deleteEyeDonor = await adminModel.deleteEyeDonor(donorPhoneNumber);
            if (deleteEyeDonor) {
                res.status(200).json({
                    message: 'Deleted Succesfullly'
                })
            }
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
module.exports = router