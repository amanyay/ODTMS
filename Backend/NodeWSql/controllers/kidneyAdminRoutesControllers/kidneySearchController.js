const express = require('express')
const router = express.Router();
const adminModel = require('../../models/adminModel')



router.post('/', async (req, res) => {
    const { searchInput } = req.body

    try {

        const searchResultFromUsersTable = await adminModel.kidneyselectionForSearch(searchInput);

        console.log(searchResultFromUsersTable)

        if (searchResultFromUsersTable.length > 0) {

            res.status(200).json({
                message: searchResultFromUsersTable
            })
        }
        else if (searchResultFromUsersTable.length === 0) {
            res.status(201).json({
                message: 'empty'
            })
        }


    } catch (error) {
        console.log(error)
    }

})

module.exports = router