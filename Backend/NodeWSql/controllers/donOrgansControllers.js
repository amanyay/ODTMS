const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise');
const recipentModel = require('../models/recipentsModel')
const waitingListModel = require('../models/waitingListModel')
const donorModel = require('../models/donorModel')
const adminModel = require('../models/adminModel')
const JWT = require('jsonwebtoken');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const port = process.env.PORT;
const app = express();


app.use(bodyParser.json());


const urgencyOrder = {
    Urgent: 10,
    Low: 5,
}

router.post('/', async (req, res) => {

    const { token, donAge, donBloodType, userOrgan } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber


    try {


        const donorsInfo = await donorModel.selectionFromDonTable(actualVerifiedPhoneNumber)
        const recipentsInfo = await recipentModel.getEyeRecipentForMatching(userOrgan)




        function getMatchScore(eachRecipents) {

            let score = 0;

            if (donorsInfo[0].organ_id === eachRecipents.organ_id) {
                score = score + 35
            }
            if (donorsInfo[0].blood_type === eachRecipents.blood_type) {
                score = score + 35
            }
            if (donorsInfo[0].status === 'Pending' && eachRecipents.status === 'Pending') {
                score = score + 5
            }
            if (donorsInfo[0].age === eachRecipents.age) {
                score = score + 10
            }
            if (Math.abs(donorsInfo[0].age - eachRecipents.age) >= 5) {
                score = score + 5
            }
            if (Math.abs(donorsInfo[0].age - eachRecipents.age) >= 10) {
                score = score * 0
            }
            if (eachRecipents.status === "Pending") {
                score = score + urgencyOrder[eachRecipents.urgency_level] || 0
            }

            return score

        }

        const matchesResult = [];



        for (const recipents of recipentsInfo) {

            const score = getMatchScore(recipents)

            if (score > 0) {
                matchesResult.push(
                    {
                        wait_id: recipents.wait_id,
                        recipient_name: recipents.first_name,
                        recipient_age: recipents.age,
                        organ_name: recipents.organ_name,
                        gender: recipents.gender,
                        recipient_blood_type: recipents.blood_type,
                        rec_status: recipents.status,
                        score: score
                    }
                )


            }
        }


        if (matchesResult.sort((a, b) => b.score - a.score)) {
            res.status(200).json({
                message: matchesResult
            })

        }





    } catch (error) {
        console.log(error)
        if (error.message) {
            res.status(409).json({ err: "Database error " })
        }
        else {
            res.status(500).json({ err: "Server error" })
        }
    }



})
module.exports = router;





