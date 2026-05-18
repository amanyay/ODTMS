const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise');
const createDBConnection = require('../../config/db');
const JWT = require('jsonwebtoken');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const port = process.env.PORT;
const app = express();


app.use(bodyParser.json());

router.post('/', async (req, res) => {

    // const { token, donorPhoneNumber, organId, recipentsPhoneNumber } = req.body;
    // const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET).tokenPhoneNumber;



    try {
        const connection = await createDBConnection();

        const [selectionFromWaitingListForHistory] = await connection.query
            (`
            SELECT 
            user_don.phone_number AS don_phone_number ,
            user_don.age AS don_age , 
            user_don.first_name AS don_first_name , 
            user_don.blood_type AS don_blood_type, 
            
            user_rec.phone_number AS rec_phone_number ,
            user_rec.age AS rec_age , 
            user_rec.first_name AS rec_first_name , 
            user_rec.blood_type AS rec_blood_type,  

            waiting_list.*  

            FROM waiting_list

            JOIN 
                users user_don ON waiting_list.don_phone_number = user_don.phone_number
            JOIN 
                users user_rec ON waiting_list.rec_phone_number = user_rec.phone_number
            JOIN 
                organ ON waiting_list.organ_id = organ.organ_id

            WHERE waiting_list.organ_id = ? ` , [1]
            )
        console.log(selectionFromWaitingListForHistory);

        if (selectionFromWaitingListForHistory.length > 0) {
            res.status(200).json({
                message: selectionFromWaitingListForHistory
            })
        }
        else if (selectionFromWaitingListForHistory.length === 0) { 
            res.status(201).json({
                message: 'Empty'
            })
        }


    } catch (error) {
        console.log(error)
        if (error.message) {
            console.log(error)
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }

})
module.exports = router;