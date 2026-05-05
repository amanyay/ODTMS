const express = require('express');
const router = express.Router();
const createDBConnection = require('../db');

router.get('/', async (req, res) => {

    try {

        const connection = await createDBConnection();
        const [getEyeRecipent] = await connection.query(`SELECT recipents.* , users.first_name ,
             users.last_name , users.age ,users.blood_type , organ.organ_name ,users.location , users.gender 
             FROM recipents 
             JOIN users ON recipents.phone_number = users.phone_number
             JOIN organ ON recipents.organ_id = organ.organ_id
             WHERE recipents.organ_id = ?  ` , [3])

        if (getEyeRecipent.length > 0) {
            res.status(200).json({
                message: getEyeRecipent
            })
        }
        else if (getEyeRecipent.length < 1) {
            res.status(201).json({
                messsage: 'Not found'
            })
        }

    } catch (error) {
        console.log(error)
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