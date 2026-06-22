const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise');
const createDBConnection = require('../config/db');
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

    try {

        if (token) {

            const [totalRequestPending] = await connection.query(`SELECT COUNT(*) AS
            total_request_pending FROM waiting_list WHERE status != ? `, ["Complete"]);

            const [total] = await connection.query(`SELECT COUNT(*) AS
            total FROM waiting_list `);


            const [totalRecipents] = await connection.query(`SELECT COUNT(*) AS
            total_recipents FROM recipents `);

            const [totalRequestComplete] = await connection.query(`SELECT COUNT(*) AS
            total_complete FROM waiting_list WHERE status = ? `, ["Completed"]);

            const [totalActiveWaitingList] = await connection.query(`SELECT COUNT(*) AS
            total_request_complete FROM waiting_list WHERE status = ? `, ["Pending"]);





            const completeAmount = totalRequestComplete[0].total_complete;
            const totalRequestAmount = total[0].total;
            const percentages = (completeAmount / totalRequestAmount) * 100;
            const percentage = percentages.toFixed(1)   

            if (totalRequestPending || total || totalRecipents || totalRequestComplete) {
                res.status(200).json(
                    {
                        message:
                        {
                            totalRequestPending,
                            total,
                            totalRecipents,
                            percentage,
                            totalActiveWaitingList
                        }

                    })
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