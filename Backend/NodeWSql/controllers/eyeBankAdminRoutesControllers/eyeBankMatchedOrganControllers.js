const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise');
const JWT = require('jsonwebtoken');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const port = process.env.PORT;
const app = express();
const adminModel = require('../../models/adminModel')

app.use(bodyParser.json());

const urgencyOrder = {
    Urgent: 10,
    Low: 5,
}

router.get('/', async (req, res) => {


    try {


        const donorsInfo = await adminModel.getEyeDonorInfoForMatching()
        const recipentsInfo = await adminModel.getEyeRecipentForMatching()




        function getMatchScore(eachDonor, eachRecipents) {

            let score = 0;

            if (eachDonor.organ_id === eachRecipents.organ_id) {
                score = score + 35
            }
            if (eachDonor.blood_type === eachRecipents.blood_type) {
                score = score + 35
            }
            if (eachDonor.status === 'Pending' && eachRecipents.status === 'Pending') {
                score = score + 5
            }
            if (eachDonor.age === eachRecipents.age) {
                score = score + 10
            }
            if (Math.abs(eachDonor.age - eachRecipents.age) >= 5) {
                score = score + 5
            }
            if (Math.abs(eachDonor.age - eachRecipents.age) >= 10) {
                score = score * 0
            }
            if (eachRecipents.status === "Pending") {
                score = score + urgencyOrder[eachRecipents.urgency_level] || 0
            }

            return score


        }

        const matchesResult = [];


        for (const donor of donorsInfo) {

            for (const recipents of recipentsInfo) {

                const score = getMatchScore(donor, recipents)


                if (score > 79) {

                    matchesResult.push(
                        {
                            don_phone_number: donor.phone_numbers,
                            donor_name: donor.first_name,
                            donor_blood_type: donor.blood_type,
                            donor_age: donor.age,
                            don_status: donor.status,
                            donor_doc: donor.donor_doc,
                            organ_id: donor.organ_id,
                            rec_phone_number: recipents.phone_number,
                            recipient_name: recipents.first_name,
                            recipient_blood_type: recipents.blood_type,
                            recipient_age: recipents.age,
                            rec_status: recipents.status,
                            recipents_doc: recipents.recipents_doc,
                            score: score

                        }
                    )


                }
            }


            if (matchesResult.length === 0) {
                res.status(200).json({ message: 'No match found' })
            }
            else if (matchesResult.length > 0) {
                if (matchesResult.sort((a, b) => b.score - a.score)) {
                    res.status(200).json({
                        message: matchesResult
                    })
                }

            }


        }





    } catch (error) {
        console.log(error.Error.code)
        if (error.message) {
            res.status(409).json({ err: "Database error " })
        }
        else {
            res.status(500).json({ err: "Server error" })
        }
    }






})

module.exports = router;
