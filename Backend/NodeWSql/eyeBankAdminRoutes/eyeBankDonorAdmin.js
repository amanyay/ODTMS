const express = require('express');
const router = express.Router();
const createDBConnection = require('../db');


router.get('/', async (req, res) => {

    try {

        const connection = await createDBConnection();


        const [getEyeDonorInfo] = await connection.query(`SELECT donations.donation_id , donations.phone_numbers , donations.donation_date , 
            donations.status , users.first_name , users.last_name , users.age ,users.blood_type , organ.organ_name , donations.organ_id ,users.location , users.gender
            FROM donations 
            JOIN users ON donations.phone_numbers = users.phone_number 
            JOIN organ ON donations.organ_id = organ.organ_id
            WHERE donations.organ_id = ? ` , [3]);

        if (getEyeDonorInfo.length > 0) {
            res.status(200).json({
                message: getEyeDonorInfo
            })
        }
        else if (getEyeDonorInfo.length < 1) {
            res.status(201).json({
                message: getEyeDonorInfo
            })
        }




    } catch (error) {
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