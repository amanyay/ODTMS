const express = require('express')
const router = express.Router();
const createDBConnection = require('../db')

router.get('/', async (req, res) => {

    try {
        const connection = await createDBConnection();
        const [reportSelection] = await connection.query
            (`
            SELECT 
            COUNT(users.phone_number) AS total_user , 
            COUNT(donations.phone_numbers) AS total_donor,
            COUNT(recipents.phone_number) AS total_recipents
            FROM users 
            LEFT JOIN 
            donations ON users.phone_number = donations.phone_numbers
            LEFT JOIN
            recipents ON users.phone_number = recipents.phone_number
            `)

        console.log(reportSelection)
    } catch (error) {
        console.log(error)
    }


})

module.exports = router