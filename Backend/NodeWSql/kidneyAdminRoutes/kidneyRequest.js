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


    try {
        const connection = await createDBConnection();
        const [selectionFromRequest] = await connection.query(`SELECT 
        users1.first_name AS rec_first_name , users1.age AS rec_age, users1.location AS rec_location , users1.phone_number AS rec_phone_number , users1.gender AS rec_gender , users1.blood_type AS rec_blood_type , 
        users2.first_name AS don_first_name , users2.age AS don_age, users2.location AS don_location , users1.phone_number AS rec_phone_number,  users2.gender AS don_gender , users2.blood_type AS don_blood_type ,
        organ.organ_id , organ.organ_name ,
        rec_request.id, rec_request.rec_phone_number , rec_request.don_phone_number ,rec_request.organ_id ,rec_request.status ,rec_request.date
        FROM rec_request
        JOIN users users1 ON rec_request.rec_phone_number = users1.phone_number 
        JOIN users users2 ON rec_request.don_phone_number = users2.phone_number 
        JOIN organ  ON rec_request.organ_id = organ.organ_id
        WHERE status = ? AND rec_request.organ_id = ?` , ['Pending', 1]);
        console.log(selectionFromRequest)

        if (selectionFromRequest.length > 0) {
            res.status(200).json({
                message: selectionFromRequest
            })
        }
        else if (selectionFromRequest.length < 1) {
            res.status(201).json({
                message: "Not pending data found"
            })
        }

    }
    catch (error) {
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