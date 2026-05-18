const express = require('express');
const router = express.Router();
const adminModel = require('../../models/adminModel')

router.post('/', async (req, res) => {

    try {
        const getEyeRecipent = await adminModel.getKidneyRecipent()

        if (getEyeRecipent.length > 0) {
            res.status(200).json({
                message: getEyeRecipent
            })
        }
        else if (getEyeRecipent.length < 1) {
            res.status(201).json({
                messsage: 'Not found'
            })
        }

    } catch (error) {
        console.log(error)
        if (error.message) {
            console.log(error)
            res.status(409).json({ err: "Database error " })
        } else {
            console.log(error)
            res.status(500).json({ err: "Server error" })
        }
    }
})
module.exports = router;