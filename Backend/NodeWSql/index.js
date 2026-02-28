const express = require('express');
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise');
const createDBConnection = require('./db');
const JWT = require('jsonwebtoken');
require('dotenv').config();



const app = express();
const JWT_SECRET = process.env.JWT_SECRET;
const port = process.env.PORT;

app.use(bodyParser.json());

app.listen(port, () => {
    console.log("server running in port", port);
})


app.post('/adminLogin', async (req, res) => {

    const { phoneNumber, password } = req.body;
    const connection = await createDBConnection();


    try {
        const [selectedResult] = await connection.query(`SELECT * FROM users WHERE phone_number = ? AND password = ?
            AND role = ?  `, [phoneNumber, password, 'admin']);
        // console.log(selectedResult)
        // it shows you why [0][0] use

        if (selectedResult.length > 0) {
            const token = JWT.sign({ tokenPhoneNumber: phoneNumber }, JWT_SECRET);
            res.status(200).json({ message: "Admin found", token: token, })
        }
        else if (selectedResult.length < 1) {
            res.status(201).json({ message: 'Admin not found' });
        }

    } catch (error) {

        if (error.message) {
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }

    }


})


app.post("/signUp", async (req, res) => {

    const { firstName, phoneNumber, email, password, selectedValue } = req.body;
    const connection = await createDBConnection();

    try {
        const [selectionFromUsersTable] = await connection.query(`SELECT phone_number FROM users WHERE phone_number = ? `, [phoneNumber]);

        if (selectionFromUsersTable.length > 0) {
            res.status(200).json({ message: 'Already have an account' })
        }
        else if (selectionFromUsersTable.length < 1) {
            const insertionQuery = await connection.query(`INSERT INTO users (first_name ,phone_number ,email ,
                 password , role) VALUES (?,?,?,?,?)` , [firstName, phoneNumber, email, password, selectedValue]);

            if (insertionQuery) {
                res.status(200).json({ message: 'Successfully Registerd' })
            }
        }

    } catch (error) {

        if (error.message) {
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }

    }

})



app.post('/login', async (req, res) => {

    const { phoneNumber, password } = req.body;
    const connection = await createDBConnection();


    try {
        const [selectedResult] = await connection.query(`SELECT * FROM users WHERE phone_number = ? AND password = ? `, [phoneNumber, password]);
        console.log(selectedResult)
        // it shows you why [0][0] use

        if (selectedResult.length > 0) {
            const token = JWT.sign({ tokenPhoneNumber: phoneNumber }, JWT_SECRET);
            res.status(200).json({ message: "User found", token: token, })
        }
        else if (selectedResult.length < 1) {
            res.status(201).json({ message: 'User not found' });
        }

    } catch (error) {

        if (error.message) {
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }

    }






})

app.post('/home', async (req, res) => {

    const { token } = req.body;
    const connection = await createDBConnection();

    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;

    try {

        const [selectionFromUser] = await connection.query(`SELECT * FROM users WHERE phone_number = ? `, [actualVerifiedPhoneNumber])

        if (selectionFromUser[0].role === 'recipents') {
            const [getRecInfoQuery] = await connection.query(`SELECT users.* , recipents_waitinglist.phone_number , recipents_waitinglist.organ_id ,
            organ.organ_id ,organ.organ_name
            FROM recipents_waitinglist 
            JOIN users ON recipents_waitinglist.phone_number = users.phone_number
            JOIN organ ON recipents_waitinglist.organ_id =  organ.organ_id 
            WHERE recipents_waitinglist.phone_number = ? ` , [actualVerifiedPhoneNumber]

            )
            res.status(200).json({
                message: selectionFromUser[0],
                joinMessage: getRecInfoQuery,
                status: 'ok'
            })
        }
        else if (selectionFromUser[0].role === 'donor') {
            const [getRecInfoQuery] = await connection.query(`SELECT users.* , donations.phone_numbers , donations.organ_id ,
            organ.organ_id ,organ.organ_name
            FROM donations 
            JOIN users ON donations.phone_numbers = users.phone_number
            JOIN organ ON donations.organ_id =  organ.organ_id 
            WHERE donations.phone_numbers = ? ` , [actualVerifiedPhoneNumber]

            )
            // console.log(getRecInfoQuery)
            res.status(200).json({
                message: selectionFromUser[0],
                joinMessage: getRecInfoQuery,
                status: 'ok'
            })
        }


    } catch (error) {
        if (error.message) {
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }




})


app.post('/profile', async (req, res) => {

    const { token } = req.body;
    const connection = await createDBConnection();


    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;

    try {
        const [findByPhoneNumberQueryResult] = await connection.query(`SELECT * FROM users WHERE phone_number = ? `, [actualVerifiedPhoneNumber]);

        //findByPhoneNumberQueryResult without [] would be return the whole array [rows, fields]. and we only care about
        //the rows (the actual data you care about), not the metadata.So [findByPhoneNumberQueryResult] is simply a neat way 
        // to ignore the metadata and directly get the query results.

        if (!findByPhoneNumberQueryResult) {
            res.status(404).json({ message: 'Error' })
        }
        else if (findByPhoneNumberQueryResult) {
            const arrayToObject = findByPhoneNumberQueryResult[0];
            res.status(200).json({ message: arrayToObject });
        }


    } catch (error) {
        if (error.message) {
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }




})

app.post('/donorsForm', async (req, res) => {

    const { firstName, lastName, email, age, location, bloodType, gender, tokenToBackEnd, organs } = req.body;
    const connection = await createDBConnection();


    const verifiedPhoneNumber = JWT.verify(tokenToBackEnd, JWT_SECRET)
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;

    try {

        const [updateQueryResult] = await connection.query(`UPDATE users SET  last_name = ? , age = ? , location = ? 
        , gender = ? , blood_type = ? WHERE phone_number = ? ` , [lastName, age, location, gender, bloodType, actualVerifiedPhoneNumber]);


        const [selectionFromDonation] = await connection.query(`SELECT * FROM donations 
        WHERE phone_numbers = ? ` , [actualVerifiedPhoneNumber])

        if (selectionFromDonation.length > 0) {
            const [updateDonation] = await connection.query(`UPDATE donations SET organ_id = ?
                 WHERE phone_numbers = ? ` , [organs, actualVerifiedPhoneNumber])

            if (updateQueryResult || updateDonation) {
                res.status(200).json({
                    message: 'Successfully updated',
                    status: 'ok',
                    data: selectionFromDonation
                })
            }
        }
        else if (selectionFromDonation.length === 0) {

            const [insertToDonationTable] = await connection.query(`INSERT INTO donations (phone_numbers , organ_id) 
            VALUES(?,?)`, [actualVerifiedPhoneNumber, organs])

            if (updateQueryResult || insertToDonationTable) {
                res.status(200).json({
                    message: 'Successfully updated',
                    status: 'ok',
                    data: selectionFromDonation
                })
            }
        }


        if (!updateQueryResult) {
            res.status(201).json({ message: 'Error in updating' })
        }
    } catch (error) {
        if (error.message) {
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }



})

app.post('/recForm', async (req, res) => {

    const { lastName, age, location, gender, bloodType, tokenToBackEnd, organs } = req.body;
    const verifiedPhoneNumber = JWT.verify(tokenToBackEnd, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;
    const connection = await createDBConnection();

    try {

        const [selectionFromRecTable] = await connection.query(`SELECT * FROM recipents_waitinglist WHERE phone_number = ? `, [actualVerifiedPhoneNumber]);

        if (selectionFromRecTable.length >= 1) {


            const [updateQueryResult] = await connection.query(`UPDATE users SET  last_name = ? , age = ? , location = ? 
                , gender = ? , blood_type = ? WHERE phone_number = ? ` , [lastName, age, location, gender, bloodType, actualVerifiedPhoneNumber]);


            const [updateRecTable] = await connection.query(`UPDATE recipents_waitinglist SET organ_id = ?
                 WHERE phone_number = ? ` , [organs, actualVerifiedPhoneNumber])



            if (updateQueryResult || updateRecTable) {
                res.status(200).json({
                    message: 'Successfully updated',
                    status: 'ok',
                    data: selectionFromRecTable[0],
                })
            }
        }
        else if (selectionFromRecTable.length === 0) {
            const [updateQueryResult] = await connection.query(`UPDATE users SET  last_name = ? , age = ? , location = ? 
                , gender = ? , blood_type = ? WHERE phone_number = ? ` , [lastName, age, location, gender, bloodType, actualVerifiedPhoneNumber]);

            const [insertionToRecTable] = await connection.query(`INSERT INTO recipents_waitinglist 
                (phone_number , organ_id ) VALUES (? , ? ) `, [actualVerifiedPhoneNumber, organs]);

            if (updateQueryResult || insertionToRecTable) {
                res.status(200).json({
                    message: 'Successfully updated',
                    status: 'ok',
                    data: selectionFromRecTable[0],
                })
            }
        }

    } catch (error) {
        if (error.message) {
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }


})





app.post('/recOrgans', async (req, res) => {

    const { token, recAge, recBloodType, userOrgan } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;
    const connection = await createDBConnection();



    const [selectionFromdonation] = await connection.query(`SELECT users.first_name, users.gender , users.age , users.location , users.email,
         users.blood_type ,organ.organ_name , organ.organ_id , donations.phone_numbers , donations.status 
         FROM donations 
         JOIN users ON donations.phone_numbers = users.phone_number
         JOIN organ ON donations.organ_id = organ.organ_id 
         WHERE users.blood_type = ? AND donations.organ_id = ? `, [recBloodType, userOrgan]);


    try {

        if (selectionFromdonation.length > 0) {
            const donAge = selectionFromdonation[0].age;
            const ageDifference = Math.abs(donAge - recAge);

            if (ageDifference >= 10) {
                res.status(201).json({
                    status: '201'
                })
            }
            else if (ageDifference < 10) {
                res.status(200).json({
                    message: selectionFromdonation,
                    status: 'ok'
                })
            }

        }
        else if (selectionFromdonation.length === 0) {
            res.status(201).json({
                status: '201'
            })

        }
    } catch (error) {
        if (error.message) {
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }






})

app.post('/donOrgans', async (req, res) => {

    const { token, donAge, donBloodType } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber
    const connection = await createDBConnection();
    try {
        const [selectionFromrecTable] = await connection.query(`SELECT users.first_name, users.gender , users.age , users.location , users.email,
         users.blood_type, donations.phone_numbers ,organ.organ_name, organ.organ_id 
         FROM donations
         JOIN users ON donations.phone_numbers = users.phone_number
         JOIN organ ON donations.organ_id = organ.organ_id 
         WHERE users.phone_number = ?`, [actualVerifiedPhoneNumber]);


        //  const [selectionFromrecTable] = await connection.query(`SELECT users.first_name, users.gender , users.age , users.location , users.email,
        //  users.blood_type ,organ.organ_name, organ.organ_id ,recipents_waitinglist.phone_number , recipents_waitinglist.status 
        //  FROM recipents_waitinglist 
        //  JOIN users ON recipents_waitinglist.phone_number = users.phone_number
        //  JOIN organ ON recipents_waitinglist.organ_id = organ.organ_id 
        //  WHERE users.blood_type = ?`, [donBloodType]);


        // const recAge = selectionFromrecTable[0].age;
        // const ageDifference = Math.abs(donAge - recAge);


        if (selectionFromrecTable.length > 0) {


            // if (ageDifference > 10) {
            //     res.json({
            //         message: '404'
            //     })
            // }
            // else if (ageDifference < 10) {
            res.json({
                message: selectionFromrecTable[0],
                status: 'ok'
            })
            // }
        }
        else if (selectionFromrecTable.length === 0) {
            res.json({
                message: '404'
            })

        }
    } catch (error) {
        if (error.message) {
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }





})



app.post('/recRequests', async (req, res) => {

    const { token, donorPhoneNumber, organId } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;
    const connection = await createDBConnection();



    try {
        const [selectionFromRecReqTable] = await connection.query(`SELECT * FROM rec_request WHERE 
            rec_phone_number = ? AND don_phone_number = ? `, [actualVerifiedPhoneNumber, donorPhoneNumber]);


        if (selectionFromRecReqTable.length === 0) {
            const insertionQuery = await connection.query(`INSERT INTO rec_request (rec_phone_number , don_phone_number , organ_id)
         VALUES (?,?,?)`, [actualVerifiedPhoneNumber, donorPhoneNumber, organId]);

            if (insertionQuery) {
                res.status(201).json({
                    message: 'ok'
                })
            }
        }
        else if (selectionFromRecReqTable.length >= 1) {
            res.status(200).json({ message: 'Request already sent' })
        }



    } catch (error) {
        if (error.message) {
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }

})



// app.post('/donRequest', async (req, res) => {

//     const { token, recPhoneNumber, organId } = req.body;
//     const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
//     const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;
//     const connection = await createDBConnection();

//     // try {r

//     const insertionQuery = await connection.query("INSERT INTO don_request (don_phone_number , rec_phone_number , organ_id) VALUES (?,?,?)", [actualVerifiedPhoneNumber, recPhoneNumber, organId]);

//     if (insertionQuery) {
//         res.json({
//             status: 'ok'
//         })
//     }

//     // } catch (error) {
//     //     if(error.code === 'Duplicate entry'){
//     //         res.json({
//     //             status:'no'
//     //         })

//     //     }

//     // }




// })

app.post('/userNotification', async (req, res) => {

    const { token } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;
    const connection = await createDBConnection();
    try {

        const [selectionRole] = await connection.query(`SELECT role from users WHERE phone_number = ? `, [actualVerifiedPhoneNumber]);


        if (selectionRole[0].role === 'recipents') {
            const [approvedRecipentSelectionQuery] = await connection.query(`SELECT  rec_request.id , u1.first_name AS rec_name, 
        rec_request.rec_phone_number , rec_request.don_phone_number,rec_request.date,
        organ.organ_name, organ.organ_id, u2.first_name AS don_name
        FROM rec_request
        JOIN organ ON rec_request.organ_id = organ.organ_id 
        JOIN users AS u1 ON rec_request.rec_phone_number = u1.phone_number
        JOIN users AS u2 ON rec_request.don_phone_number = u2.phone_number
        WHERE rec_request.rec_phone_number = ? AND status = ? `, [actualVerifiedPhoneNumber, 'Approved']);



            if (approvedRecipentSelectionQuery < 1) {
                res.status(201).json({
                    status: '404'
                })
            } else if (approvedRecipentSelectionQuery.length > 0) {
                res.status(200).json({
                    message: approvedRecipentSelectionQuery,
                    status: 'ok',
                    arrow: '←'
                })
            }

        }
        else if (selectionRole[0].role === 'donor') {
            const [approvedDonorSelectionQuery] = await connection.query(`SELECT rec_request.id , u2.first_name AS rec_name, rec_request.rec_phone_number ,
        rec_request.don_phone_number,
        organ.organ_name, organ.organ_id, u1.first_name AS don_name
        FROM rec_request
        JOIN organ ON rec_request.organ_id = organ.organ_id 
        JOIN users AS u1 ON rec_request.rec_phone_number = u1.phone_number
        JOIN users AS u2 ON rec_request.don_phone_number = u2.phone_number
        WHERE rec_request.don_phone_number = ? AND status = ? `, [actualVerifiedPhoneNumber, 'Approved']);

            // console.log(approvedDonorSelectionQuery)

            if (approvedDonorSelectionQuery.length < 1) {
                res.status(201).json({
                    status: '404'
                })
            }
            if (approvedDonorSelectionQuery.length > 0) {
                res.status(200).json({
                    message: approvedDonorSelectionQuery,
                    status: 'ok',
                    arrow: '→'
                })
            }
        }


    } catch (error) {
        if (error.message) {
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }




})


app.post("/updateProfile", async (req, res) => {

    const { token, firstName, lastName, email, age, location, gender, bloodType, role } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;
    const connection = await createDBConnection();

    try {
        const updateUsersTable = await connection.query(`UPDATE users SET 
        first_name = ? , 
        last_name = ?,
        email = ?,
        age = ? , 
        location = ? , 
        gender = ? , 
        blood_type = ? 
        WHERE phone_number = ? `, [firstName, lastName, email, age, location, gender, bloodType, actualVerifiedPhoneNumber])

        if (updateUsersTable) {
            const [selectionFromUsersTable] = await connection.query('SELECT * FROM users WHERE phone_number = ?', [actualVerifiedPhoneNumber])
            if (selectionFromUsersTable.length > 0) {
                res.status(200).json({
                    message: selectionFromUsersTable[0]
                })
            }
            else if (selectionFromUsersTable.length < 1) {
                res.status(201).json({
                    message: '404'
                })
            }
        }

    } catch (error) {
        if (error.message) {
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }


})

app.post('/deleteAccount', async (req, res) => {

    const { token } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;
    const connection = await createDBConnection();

    try {

        const deleteAccount = connection.query(`DELETE FROM users WHERE phone_number = ?`, [actualVerifiedPhoneNumber])

        if (deleteAccount) {
            res.status(200).json({ message: 'Successfully Delete' })
        }

    } catch (error) {
        if (error.message) {
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }

})



app.post('/history', async (req, res) => {

    const { token } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;
    const connection = await createDBConnection();

    try {


        const [selectionFromUsersTable] = await connection.query("SELECT * FROM users WHERE phone_number = ?", [actualVerifiedPhoneNumber]);

        if (selectionFromUsersTable[0].role === 'recipents') {
            const [selectionFromRecReqTable] = await connection.query(`SELECT organ.organ_name, users.first_name ,
            users.role, organ.organ_id , rec_request.*
            FROM rec_request
            JOIN organ ON rec_request.organ_id = organ.organ_id 
            JOIN users ON rec_request.rec_phone_number = users.phone_number
            WHERE rec_phone_number = ?` , [actualVerifiedPhoneNumber])
            // console.log(selectionFromRecReqTable)

            res.status(200).json({
                message: selectionFromRecReqTable,
                text: 'Ask to Recieve'
            })
        }
        else if (selectionFromUsersTable[0].role === 'donor') {
            const [selectionFromDonTable] = await connection.query(`SELECT organ.organ_name, users.first_name ,users.role, organ.organ_id , 
            donations.donation_id AS id , donations.phone_numbers , donations.organ_id , donations.status , donations.donation_date AS date
            FROM donations
            JOIN organ ON donations.organ_id = organ.organ_id 
            JOIN users ON donations.phone_numbers = users.phone_number
            WHERE phone_numbers = ?` , [actualVerifiedPhoneNumber])
            // console.log(selectionFromDonTable)

            res.status(200).json({
                message: selectionFromDonTable,
                text: 'Ask to donate'
            })
        }
    }
    catch (error) {
        if (error.message) {
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }



})



app.post('/statstics', async (req, res) => {

    const { token } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;
    const connection = await createDBConnection();

    try {

        if (token) {

            const [totalRequestPending] = await connection.query(`SELECT COUNT(*) AS
            total_request_pending FROM rec_request WHERE status != ? `, ["Complete"]);

            const [totalDonors] = await connection.query(`SELECT COUNT(*) AS
            total_donors FROM donations `);
            const [totalRecipents] = await connection.query(`SELECT COUNT(*) AS
            total_recipents FROM recipents_waitinglist `);

            const [totalRequestComplete] = await connection.query(`SELECT COUNT(*) AS
            total_request_complete FROM rec_request WHERE status = ? `, ["Complete"]);

            const [totalRequests] = await connection.query(`SELECT COUNT(*) AS
            total_request FROM rec_request`);

            const completeAmount = totalRequestComplete[0].total_request_complete;
            const totalRequestAmount = totalRequests[0].total_request;
            const percentages = (completeAmount / totalRequestAmount) * 100;
            const percentage = percentages.toFixed(3)


            // console.log(completeAmount)
            // console.log(totalRequestAmount)
            // console.log(percentage)

            if (totalRequestPending || totalDonors || totalRecipents || totalRequestComplete) {
                res.status(200).json(
                    {
                        message:
                        {
                            totalRequestPending,
                            totalDonors,
                            totalRecipents,
                            percentage
                        }

                    })
            }

        }


    } catch (error) {
        if (error.message) {
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }

})




















//          ADMIN API





app.post('/adminOrgansData', async (req, res) => {

    const { token } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;

    try {


        const connection = await createDBConnection();

        const [selectionOrganQuery] = await connection.query(`SELECT * FROM organ `);

        if (selectionOrganQuery.length > 0) {
            res.json({
                message: selectionOrganQuery
            })
        }

    } catch (error) {
        if (error.message) {
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }

})


app.post('/adminDonorsData', async (req, res) => {

    const { token } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;

    try {

        const connection = await createDBConnection();
        const [selectionFromUser] = await connection.query(`SELECT users.first_name , users.age , users.location  , users.gender ,
        users.blood_type , organ.organ_id , organ.organ_name , donations.phone_numbers ,donations.donation_id, donations.donation_date , donations.status
        FROM donations 
        JOIN users ON donations.phone_numbers = users.phone_number 
        JOIN organ ON donations.organ_id = organ.organ_id `);

        if (selectionFromUser.length > 0) {
            res.json({
                message: selectionFromUser
            })
        }

    } catch (error) {
        if (error.message) {
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }



})


app.post('/adminRecipentsData', async (req, res) => {

    const { token } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;

    try {
        const connection = await createDBConnection();
        const [selectionFromUser] = await connection.query(`SELECT users.first_name , users.age , users.location  , users.gender ,
        users.blood_type , organ.organ_id , organ.organ_name , recipents_waitinglist.phone_number , recipents_waitinglist.reg_date , recipents_waitinglist.status
        FROM recipents_waitinglist
        JOIN users ON recipents_waitinglist.phone_number = users.phone_number 
        JOIN organ ON recipents_waitinglist.organ_id = organ.organ_id  `);

        if (selectionFromUser.length > 0) {
            res.json({
                message: selectionFromUser
            })
        }

    } catch (error) {
        if (error.message) {
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }



})


app.post('/adminRequestData', async (req, res) => {

    const { token, requestId, status } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;


    try {
        const connection = await createDBConnection();
        const [selectionFromRequest] = await connection.query(`SELECT users.first_name , users.age ,
        users.location  , users.gender ,
        users.blood_type , organ.organ_id , organ.organ_name ,rec_request.id, 
        rec_request.rec_phone_number , rec_request.don_phone_number ,rec_request.organ_id ,
        rec_request.status ,rec_request.date
        FROM rec_request
        JOIN users ON rec_request.rec_phone_number = users.phone_number 
        JOIN organ ON rec_request.organ_id = organ.organ_id
        WHERE status = ? ` , ['Pending']);



        if (selectionFromRequest.length > 0) {
            res.status(200).json({
                message: selectionFromRequest
            })
        }
        else if (selectionFromRequest.length < 1) {
            res.status(201).json({
                message: "Not pending data found"
            })
        }

    }
    catch (error) {
        if (error.message) {
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }



})

app.post('/adminRequestApp', async (req, res) => {
    const { token, requestId, status } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;


    try {
        const connection = await createDBConnection();
        if (status === 'Pending') {
            const [makeApproveQuery] = await connection.query(`UPDATE rec_request SET status = ? WHERE id = ?  `, ['Approved', requestId]);
            if (makeApproveQuery) {
                res.status(200).json({
                    message: "Successfull approved"
                })
            }
        }
    }

    catch (error) {
        if (error.message) {
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }
})



app.post('/adminCompleteRequestData', async (req, res) => {

    const { token, requestId, status } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;
    const connection = await createDBConnection();
    // console.log(requestId)

    try {
        const [selectionFromRequest] = await connection.query(`SELECT users.first_name , users.age ,
        users.location  , users.gender ,
        users.blood_type , organ.organ_id , organ.organ_name ,rec_request.id, 
        rec_request.rec_phone_number , rec_request.don_phone_number ,rec_request.organ_id ,
        rec_request.status ,rec_request.date
        FROM rec_request
        JOIN users ON rec_request.rec_phone_number = users.phone_number 
        JOIN organ ON rec_request.organ_id = organ.organ_id 
        WHERE status = ? ` , ['Approved']);


        if (selectionFromRequest.length > 0) {
            res.status(200).json({
                message: selectionFromRequest
            })
        }
        else if (selectionFromRequest.length === 0) {
            res.status(201).json({
                message: "Not approved user found "
            })

        }



    } catch (error) {
        if (error.message) {
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }

})

app.post('/adminCompleteReq', async (req, res) => {

    const { token, rec_phone_number, don_phone_number, requestId, status } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;
    const connection = await createDBConnection();
    console.log(status)
    try {

        if (status === 'Approved') {
            const [makeApproveQuery] = await connection.query(`UPDATE rec_request SET status = ? WHERE id = ?  `, ['Completed', requestId]);
            if (makeApproveQuery) {
                const [updateQueryDonations] = await connection.query(`UPDATE donations SET status = ? WHERE phone_numbers = ?  `, ['Completed', don_phone_number]);
                const [updateQueryRecipents] = await connection.query(`UPDATE recipents_waitinglist SET status = ? WHERE phone_number = ?  `, ['Completed', rec_phone_number]);
                if (updateQueryRecipents || updateQueryDonations) {
                    res.status(200).json({
                        message: 'Transplant Success'
                    })
                }
            }
        }
    }
    catch (error) {
        if (error.message) {
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }

})
app.post('/adminAddNewAdmin', async (req, res) => {

    const { firstName, lastName, age, phoneNumber, email, password, location, gender, bloodType } = req.body;

    try {
        const connection = await createDBConnection();
        const [addNewAdmin] = await connection.query(`INSERT INTO users (first_name , last_name , age , role , location ,
            password , phone_number , gender , email , blood_type) 
            VALUES (?,?,?,?,?,?,?,?,?,?)` ,
            [firstName, lastName, age, 'admin', location, password, phoneNumber, gender, email, bloodType]);

        if (addNewAdmin) {
            res.status(200).json({ message: "New admin created successfully" })
        }

    } catch (error) {
        if (error.message) {
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }
})
app.post('/adminAddOrgan', async (req, res) => {

    const { token, newOrgan } = req.body;

    try {
        const connection = await createDBConnection();
        const [addNewOrgan] = await connection.query(`INSERT INTO organ (organ_name) VALUES (?)`, [newOrgan])
        if (addNewOrgan) {
            res.status(200).json({ message: 'Organ Add' });
        }

    } catch (error) {
        if (error.message) {
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }

})
app.post('/deleteDonors', async (req, res) => {

    const { token, organID } = req.body
    console.log(organID)
    try {

        const connection = await createDBConnection();
        const [deleteOrgans] = await connection.query(`DELETE FROM donations WHERE donation_id = ? `, [organID]);
        if (deleteOrgans) {
            res.status(200).json({
                message: 'Successfully deleted'
            })
        }

    } catch (error) {
        if (error.message) {
            res.status(409).json({ err: "Database error " })
        } else {
            res.status(500).json({ err: "Server error" })
        }
    }

})