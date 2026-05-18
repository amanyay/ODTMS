const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise');
const userModel = require('../models/userModel')
const JWT = require('jsonwebtoken');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const port = process.env.PORT;
const app = express();


app.use(bodyParser.json());
router.post("/", async (req, res) => {

    const { firstName, lastName, phoneNumber, email, password, selectedValue } = req.body;

    try {

        const userSignUp = await userModel.userSignUp(phoneNumber)


        if (userSignUp.length > 0) {
            res.status(200).json({ message: 'Already have an account' })
        }
        else if (userSignUp.length === 0) {

            const signupInsertionQuery = await userModel.signupInsertionQuery(phoneNumber, firstName, lastName, email, password, selectedValue)

            if (signupInsertionQuery) {
                res.status(200).json({ message: 'Successfully Registerd' })
            }
        }

    } catch (error) {

        if (error.message) {
            console.log(error)
            res.status(409).json({ err: "Database error " })
            console.log(error.message)
        } else {
            res.status(500).json({ err: "Server error" })
        }

    }

})
module.exports = router;