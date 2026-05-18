const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise');
const createDBConnection = require('../db');
const JWT = require('jsonwebtoken');
const cors = require('cors')

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const port = process.env.PORT;
const app = express();  



router.post('/', async (req, res) => {



    const { phoneNumber, password } = req.body;

    // console.log(phoneNumber)

    // try {
    const connection = await createDBConnection();

    // const [superAdminCheck] = await connection.query(`SELECT * FROM admin WHERE role = ? AND phone_number = ? AND password = ?
    //     AND ID = ? ` , ['super_admin', phoneNumber, password, 0]);

    // if (superAdminCheck.length > 0) {
    //     const token = JWT.sign({ tokenPhoneNumber: phoneNumber }, JWT_SECRET);
    //     res.status(200).json({
    //         message: superAdminCheck[0],
    //         token: token 
    //     })
    // }



    // const [selectedResult] = await connection.query(`SELECT * FROM admin WHERE role = ? AND phone_number = ? AND password = ?
    //     AND ID = ?  `, ['admin', phoneNumber, password, 2]);


    // if (selectedResult.length > 0) {
    //     const token = JWT.sign({ tokenPhoneNumber: phoneNumber }, JWT_SECRET);
    //     res.status(201).json({
    //         message: selectedResult[0],
    //         token: token,
    //     })
    // }
    // else if (selectedResult.length < 1) {
    //     res.status(202).json({ message: 'Admin not found' });
    // }

    // const [kidneyAdminCheck] = await connection.query(`SELECT * FROM admin WHERE role = ? AND phone_number = ? AND password = ?
    //     AND ID = ?  `, ['admin', phoneNumber, password, 1]);

    // if (kidneyAdminCheck.length > 0) {
    //     const token = JWT.sign({ tokenPhoneNumber: phoneNumber }, JWT_SECRET);
    //     res.status(203).json({
    //         message: kidneyAdminCheck[0],
    //         token: token
    //     })
    // }

    try {
        const [rows] = await connection.query(
            `SELECT * FROM admin WHERE phone_number = ? AND password = ? 
            AND ((role = 'super_admin' AND ID = 0) OR (role = 'admin' AND ID IN (1, 2)))`,
            [phoneNumber, password]
        );

        // console.log(rows)
        if (rows.length === 0) {
            return res.status(201).json({ message: 'Admin not found' });
        }

        // Find the matched admin
        const admin = rows[0]; // assuming only one match

        let statusCode;
        if (admin.role === 'super_admin' && admin.ID === 0) {
            statusCode = 200;
        } else if (admin.role === 'admin' && admin.ID === 2) {
            statusCode = 200;
        } else if (admin.role === 'admin' && admin.ID === 1) {
            statusCode = 200;
        } else {
            statusCode = 203;
        }

        const token = JWT.sign({ tokenPhoneNumber: phoneNumber }, JWT_SECRET);

        return res.status(statusCode).json({
            message: admin,
            token: token
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }


    // } catch (error) {

    //     if (error.message) {
    //         res.status(409).json({ err: "Database error " })
    //     } else {
    //         res.status(500).json({ err: "Server error" })
    //     }

    // }


})

module.exports = router;