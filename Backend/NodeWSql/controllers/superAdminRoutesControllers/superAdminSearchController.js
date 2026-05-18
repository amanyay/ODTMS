const express = require('express')
const router = express.Router();
const superAdminModel = require('../../models/superAdminModel')
const userModel = require('../../models/userModel')


router.post('/', async (req, res) => {
    const { superAdminSearchInput } = req.body


    try {

        const selectionRole = await userModel.selectionRole(superAdminSearchInput)

        if (selectionRole.length > 0) {
            if (selectionRole[0].role === 'donor') {
                const superAdminSearchForDon = await superAdminModel.superAdminSearchForDon(superAdminSearchInput);

                console.log(superAdminSearchForDon)

                if (superAdminSearchForDon.length > 0) {

                    res.status(200).json({
                        message: superAdminSearchForDon
                    })
                }
                else if (superAdminSearchForDon.length === 0) {
                    res.status(201).json({
                        message: 'empty'
                    })
                }

            }
            else if (selectionRole[0].role === 'recipents') {

                const superAdminSearchForRec = await superAdminModel.superAdminSearchForRec(superAdminSearchInput);
                console.log(superAdminSearchForRec)
                if (superAdminSearchForRec.length > 0) {

                    res.status(200).json({
                        message: superAdminSearchForRec
                    })
                }
                else if (superAdminSearchForRec.length === 0) {
                    res.status(201).json({
                        message: 'empty'
                    })
                }
            }
        }
        else if (selectionRole.length === 0) {
            res.status(201).json({
                message: 'empty'
            })
        }




    } catch (error) {
        console.log(error)
    }

})

module.exports = router