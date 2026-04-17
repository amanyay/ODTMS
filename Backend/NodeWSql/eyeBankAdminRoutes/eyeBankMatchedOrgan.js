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

const urgencyOrder = {
    Urgent: 4,
    Low: 3,
}

router.get('/', async (req, res) => {


    try {

        const connection = await createDBConnection();
        const [selectionFromdonation] = await connection.query(`SELECT 
            donations.donation_id,
            donations.organ_id AS don_organ_id ,
            donations.phone_numbers AS don_phone_number,     
            donations.status AS don_status ,     

            u_donor.phone_number AS don_phone_number,
            u_donor.first_name AS donor_name,
            u_donor.blood_type AS donor_blood_type,
            u_donor.age AS donor_age,

            organ.organ_id , 
            organ.organ_name,

            u_recipient.phone_number AS rec_phone_number,
            u_recipient.first_name AS recipient_name,
            u_recipient.blood_type AS recipient_blood_type,
            u_recipient.age AS recipient_age,
            
            recipents_waitinglist.wait_id,
            recipents_waitinglist.organ_id AS rec_organ_id,
            recipents_waitinglist.phone_number AS rec_phone_number,
            recipents_waitinglist.status AS rec_status,
            recipents_waitinglist.urgency_level AS urgency_level    

            FROM donations 
            JOIN 
                recipents_waitinglist ON donations.organ_id = recipents_waitinglist.organ_id
            JOIN 
                organ ON donations.organ_id = organ.organ_id
            JOIN 
                users u_donor ON donations.phone_numbers = u_donor.phone_number
            JOIN 
                users u_recipient ON recipents_waitinglist.phone_number = u_recipient.phone_number
            WHERE u_donor.blood_type = u_recipient.blood_type
            AND donations.organ_id = ? 
            AND recipents_waitinglist.status = ? 
            AND donations.status = ? ` , [3, 'Pending', 'Pending']);

        // console.log(selectionFromdonation)



        if (selectionFromdonation.length > 0) {


            res.status(200).json({
                message: selectionFromdonation,
                status: 'ok',
            })

        }
        else if (selectionFromdonation.length === 0) {
            res.status(201).json({
                status: '201'
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