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

    const { token, recAge, recBloodType, userOrgan } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;



    try {


        const recipentInfo = await recipentModel.selectionFromRecTableJoin(actualVerifiedPhoneNumber)
        const donorInfo = await donorModel.getEyeDonorInfoForMatching(userOrgan)



        function getMatchScore(eachDonors) {

            let score = 0;
        
            if (recipentInfo[0].organ_id === eachDonors.organ_id) {
                score = score + 35
            }
            if (recipentInfo[0].blood_type === eachDonors.blood_type) {
                score = score + 35
            }
            if (recipentInfo[0].status === 'Pending' && eachDonors.status === 'Pending') {
                score = score + 5
            }
            if (recipentInfo[0].age === eachDonors.age) {
                score = score + 10
            }
            if (Math.abs(recipentInfo[0].age - eachDonors.age) >= 5) {
                score = score + 5
            }
            if (Math.abs(recipentInfo[0].age - eachDonors.age) >= 10) {
                score = score * 0
            }

            return score

        }

        const matchesResult = [];



        for (const donor of donorInfo) {

            const score = getMatchScore(donor)

            if (score > 0) {
                matchesResult.push(
                    {
                        donation_id: donor.donation_id,
                        donor_name: donor.first_name,
                        donor_age: donor.age,
                        organ_name: donor.organ_name,
                        gender: donor.gender,
                        donor_blood_type: donor.blood_type,
                        rec_status: donor.status,
                        score: score
                    }
                )


            }
        }


        if (matchesResult.sort((a, b) => b.score - a.score)) {

            console.log(matchesResult)

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