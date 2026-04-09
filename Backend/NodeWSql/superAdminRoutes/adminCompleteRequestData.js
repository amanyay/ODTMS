const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise');
const createDBConnection = require('../db');
const JWT = require('jsonwebtoken');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const port = process.env.PORT;
const app = express();


app.use(bodyParser.json());
router.post('/', async (req, res) => {

    const { token, requestId, status } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;
    const connection = await createDBConnection();
    // console.log(requestId)

    try {
        const [selectionFromRequest] = await connection.query(`SELECT users.first_name , users.age ,
        users.location  , users.gender ,
        users.blood_type , organ.organ_id , organ.organ_name ,rec_request.id, 
        rec_request.rec_phone_number , rec_request.don_phone_number ,rec_request.organ_id ,
        rec_request.status ,rec_request.date
        FROM rec_request
        JOIN users ON rec_request.rec_phone_number = users.phone_number 
        JOIN organ ON rec_request.organ_id = organ.organ_id 
        WHERE status = ? ` , ['Approved']);


        if (selectionFromRequest.length > 0) {
            res.status(200).json({
                message: selectionFromRequest
            })
        }
        else if (selectionFromRequest.length === 0) {
            res.status(201).json({
                message: "Not approved user found "
            })

        }



    } catch (error) {
        if (error.message) {
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }

})
module.exports = router;