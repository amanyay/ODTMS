const express = require('express');
const router = express.Router();
const superAdminModel = require('../../models/superAdminModel');
const e = require('express');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const port = process.env.PORT;
const app = express();


router.post('/', async (req, res) => {

    try {

        const selectionFromWaitingListForHistory = await superAdminModel.selectionFromWaitingListForHistory();
        if (selectionFromWaitingListForHistory) {
            res.status(200).json({
                message: selectionFromWaitingListForHistory
            })
        }

    }
    catch (error) {
        console.log(error)
        if (error.message) {
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }

})
module.exports = router;