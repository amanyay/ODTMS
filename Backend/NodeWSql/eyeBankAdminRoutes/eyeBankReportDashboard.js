const express = require('express')
const router = express.Router();
const createDBConnection = require('../db')

router.get('/', async (req, res) => {

    try {
        const connection = await createDBConnection();
        const [reportSelection] = await connection.query(`
            SELECT COUNT(users.phone_number) , 
            COUNT(donations.phone_numbers),
            COUNT(recipents.phone_number),

            `)

    } catch (error) {
        console.log(error)
    }


})

module.exports = router