const express = require('express');
const router = express.Router();
const createDBConnection = require('../db');

router.get('/', async (req, res) => {

    try {

        const connection = await createDBConnection();
        const [getEyeRecipent] = await connection.query(`SELECT recipents_waitinglist.* , users.first_name ,
             users.last_name , users.age ,users.blood_type , organ.organ_name ,users.location , users.gender 
             FROM recipents_waitinglist 
             JOIN users ON recipents_waitinglist.phone_number = users.phone_number
             JOIN organ ON recipents_waitinglist.organ_id = organ.organ_id
             WHERE recipents_waitinglist.organ_id = ?  ` , [3])

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