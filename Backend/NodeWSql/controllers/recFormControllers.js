const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise');
const userModel = require('../models/userModel')
const donorModel = require('../models/donorModel')
const recipentsModel = require('../models/recipentsModel')
const JWT = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');


require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const port = process.env.PORT;
const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/documentImages/recipentsDocument')); // make sure uploads/ exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage });


app.use(bodyParser.json());


router.post('/', upload.single('DocumentImage'), async (req, res) => {

    const { firstName, lastName, age, location, gender, bloodType, token, organs } = req.body;
    const recipentsDoc = req.file.filename;
    console.log(firstName)


    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;


    try {

        const selectionFromRecTable = await recipentsModel.selectionFromRecTable(actualVerifiedPhoneNumber)


        if (selectionFromRecTable.length > 0) {


            const updateUserForm = await userModel.updateUserForm(firstName, lastName, age, location, gender, bloodType, actualVerifiedPhoneNumber)
            const updateRecTable = await recipentsModel.updateRecTable(actualVerifiedPhoneNumber, organs, recipentsDoc)


            if (updateRecTable || updateUserForm) {
                res.status(200).json({
                    message: 'Successfully updated',
                    status: 'ok',
                    data: selectionFromRecTable[0],
                })
            }
        }
        else if (selectionFromRecTable.length === 0) {

            const updateUserForm = await userModel.updateUserForm(firstName, lastName, age, location, gender, bloodType, actualVerifiedPhoneNumber)
            const insertionToRecTable = await recipentsModel.insertionToRecTable(actualVerifiedPhoneNumber, organs, recipentsDoc)

            if (updateUserForm || insertionToRecTable) {
                res.status(200).json({
                    message: 'Successfully updated',
                    status: 'ok',
                    data: selectionFromRecTable[0],
                })
            }
        }

    } catch (error) {
        console.log(error)
        if (error.message) {
            res.status(409).json({ err: "Unkown error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }


})
module.exports = router;