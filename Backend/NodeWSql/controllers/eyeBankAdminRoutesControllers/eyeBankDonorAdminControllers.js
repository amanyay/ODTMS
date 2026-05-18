const express = require('express');
const router = express.Router();
const adminModel = require('../../models/adminModel')


router.get('/', async (req, res) => {

    try {
        const getEyeDonorInfo = await adminModel.getEyeDonorInfo()


        if (getEyeDonorInfo.length > 0) {
            res.status(200).json({
                message: getEyeDonorInfo
            })
        }
        else if (getEyeDonorInfo.length < 1) {
            res.status(201).json({
                message: getEyeDonorInfo
            })
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
module.exports = router;