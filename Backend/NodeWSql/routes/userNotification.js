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

    const { token } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;
    const connection = await createDBConnection();
    console.log(actualVerifiedPhoneNumber)
    try {

        const [selectionRole] = await connection.query(`SELECT role from users WHERE phone_number = ? `, [actualVerifiedPhoneNumber]);


        if (selectionRole[0].role === 'recipents') {
            const [approvedRecipentSelectionQuery] = await connection.query(`SELECT  waiting_list.id , u1.first_name AS rec_name, 
                waiting_list.rec_phone_number , waiting_list.don_phone_number,waiting_list.date, waiting_list.status,
                organ.organ_name, organ.organ_id, u2.first_name AS don_name
                FROM waiting_list
                JOIN organ ON waiting_list.organ_id = organ.organ_id 
                JOIN users AS u1 ON waiting_list.rec_phone_number = u1.phone_number
                JOIN users AS u2 ON waiting_list.don_phone_number = u2.phone_number
                WHERE waiting_list.rec_phone_number = ?
                ORDER BY waiting_list.date DESC`, [actualVerifiedPhoneNumber]);

            console.log(approvedRecipentSelectionQuery)


            if (approvedRecipentSelectionQuery.length > 0) {
                res.status(200).json({
                    message: approvedRecipentSelectionQuery,
                    arrow: '←'
                })
            }
            else if (approvedRecipentSelectionQuery.length < 1) {
                res.status(201).json({message:'Empty Notification'})
            }

        }
        else if (selectionRole[0].role === 'donor') {
            const [approvedDonorSelectionQuery] = await connection.query(`SELECT waiting_list.id , u2.first_name AS rec_name, waiting_list.rec_phone_number ,
                waiting_list.don_phone_number,
                organ.organ_name, organ.organ_id, u1.first_name AS don_name
                FROM waiting_list
                JOIN organ ON waiting_list.organ_id = organ.organ_id 
                JOIN users AS u1 ON waiting_list.rec_phone_number = u1.phone_number
                JOIN users AS u2 ON waiting_list.don_phone_number = u2.phone_number
                WHERE waiting_list.don_phone_number = ? `, [actualVerifiedPhoneNumber]);

            // console.log(approvedDonorSelectionQuery)

            if (approvedDonorSelectionQuery.length > 0) {
                res.status(200).json({
                    message: approvedDonorSelectionQuery,
                    status: 'ok',
                    arrow: '→'
                })
            }
            else if (approvedRecipentSelectionQuery.length < 1) {
                res.status(201)
            }
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