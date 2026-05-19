//Packages
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise');
const JWT = require('jsonwebtoken');
const cors = require('cors')
require('dotenv').config();

// Import
const adminLoginModel = require('../models/adminModel');

//Usage

const JWT_SECRET = process.env.JWT_SECRET;
const port = process.env.PORT;





async function adminLoginController(req, res) {

    try {

        const { phoneNumber, password } = req.body;
        const selectionAdminByPhoneNumber = await adminLoginModel.adminLoginByPhone(phoneNumber, password);



        if (selectionAdminByPhoneNumber.length === 0) {
            return res.status(201).json({ message: 'Admin not found' });
        }

        // Find the matched admin
        const admin = selectionAdminByPhoneNumber[0]; // assuming only one match

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

        const token = JWT.sign({ tokenPhoneNumber: phoneNumber }, JWT_SECRET, { expiresIn: '1d' });


        return res.status(statusCode).json({
            message: admin,
            token: token
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }


}


module.exports = { adminLoginController };