const express = require('express');
const router = express.Router();


const superAdminModel = require('../../models/superAdminModel')


router.post('/', async (req, res) => {

    const { phoneNumber } = req.body;


    try {

        const superAdminDeleteAdmins = await superAdminModel.superAdminDeleteAdmin(phoneNumber);

        if (superAdminDeleteAdmins) {
            res.status(200).json({
                message: 'Admin Successfully delete'
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

module.exports = router;