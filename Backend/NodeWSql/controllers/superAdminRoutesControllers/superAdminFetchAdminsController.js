const express = require('express')
const router = express.Router();

const superAdminModel = require('../../models/superAdminModel');


router.post('/', async (req, res) => {

    try {

        const superAdmingetAllAdminsInfo = await superAdminModel.superAdmingetAllAdminsInfo()

        if (superAdmingetAllAdminsInfo.length > 0) {
            res.status(200).json({
                message: superAdmingetAllAdminsInfo
            })
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