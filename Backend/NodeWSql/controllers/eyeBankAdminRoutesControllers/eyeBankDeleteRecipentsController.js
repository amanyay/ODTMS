const express = require('express')
const router = express.Router();
const adminModel = require('../../models/adminModel')


router.post('/', async (req, res) => {

    const { recipentPhoneNumber } = req.body

    try {

        if (recipentPhoneNumber !== '') {
            const deleteEyeRecipents = await adminModel.deleteEyeRecipents(recipentPhoneNumber);
            if (deleteEyeRecipents) {
                res.status(200).json({
                    message: 'Deleted Succesfull'
                })
            }
        }



    } catch (error) {
        if (error.message) {
            console.log(error)
            res.status(409).json({ err: "Database error " })
        } else {
            console.log(error)
            res.status(500).json({ err: "Server error" })
        }
    }
})

module.exports = router