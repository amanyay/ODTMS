const express = require('express');
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise');
const createDBConnection = require('./db');
const JWT = require('jsonwebtoken');



const app = express();
const JWT_SECRET = "ajd82hAHSJH82hjsahj@#92hjsa8h2hjsa";

app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("sql database server running in port 3000");
})



app.post("/signUp", async (req, res) => {

    const { firstName, phoneNumber, email, password, selectedValue } = req.body;
    const connection = await createDBConnection();
    const insertionQuery = `INSERT INTO users (first_name ,phone_number ,email , password , role) VALUES (?,?,?,?,?) `;

    const result = await connection.query(insertionQuery, [firstName, phoneNumber, email, password, selectedValue]);
    if (result[0].affectedRows === 1) {
        res.json({ message: 'Successfully Registerd' })
    }
    if (result[0].affectedRows === 0) {
        res.json({ message: 'Error in inserting data' })
    }
})



app.post('/login', async (req, res) => {

    const { phoneNumber, password } = req.body;
    const connection = await createDBConnection();

    const selectionQuery = `SELECT * FROM users WHERE phone_number = ? AND password = ? `;
    const selectedResult = await connection.query(selectionQuery, [phoneNumber, password]);
    // it shows you why [0][0] use
    // console.log(selectedResult[0][0].first_name);



    if (selectedResult[0].length > 0) {
        const token = JWT.sign({ tokenPhoneNumber: phoneNumber }, JWT_SECRET);
        res.json({ message: "User found", token: token, status: 'ok' })
    }
    else if (selectedResult[0].length === 0) {
        res.json({ message: 'User not found', status: 400 });
    }





})

app.post('/home', async (req, res) => {

    const { token } = req.body;
    const connection = await createDBConnection();

    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;

    const [selectionFromUser] = await connection.query(`SELECT * FROM users WHERE phone_number = ? `, [actualVerifiedPhoneNumber])

    if (selectionFromUser[0].role === 'recipents') {
        const [getRecInfoQuery] = await connection.query(`SELECT users.* , recipents_waitinglist.phone_number , recipents_waitinglist.organ_id ,
            organ.organ_id ,organ.organ_name
            FROM recipents_waitinglist 
            JOIN users ON recipents_waitinglist.phone_number = users.phone_number
            JOIN organ ON recipents_waitinglist.organ_id =  organ.organ_id 
            WHERE recipents_waitinglist.phone_number = ? ` , [actualVerifiedPhoneNumber]

        )
        res.json({
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
        res.json({
            message: selectionFromUser[0],
            joinMessage: getRecInfoQuery,
            status: 'ok'
        })
    }




})


app.post('/profile', async (req, res) => {

    const { token } = req.body;
    const connection = await createDBConnection();


    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;

    const findByPhoneNumberQuery = `SELECT * FROM users WHERE phone_number = ? `;

    //findByPhoneNumberQueryResult without [] would be return the whole array [rows, fields]. and we only care about
    //the rows (the actual data you care about), not the metadata.So [findByPhoneNumberQueryResult] is simply a neat way 
    // to ignore the metadata and directly get the query results.
    const [findByPhoneNumberQueryResult] = await connection.query(findByPhoneNumberQuery, [actualVerifiedPhoneNumber])

    if (!findByPhoneNumberQuery) {
        res.json({ message: 'Error' })
    }
    else if (findByPhoneNumberQuery) {
        const arrayToObject = findByPhoneNumberQueryResult[0];
        res.json({ message: arrayToObject });
    }



})

app.post('/donorsForm', async (req, res) => {

    const { firstName, lastName, email, age, location, bloodType, gender, tokenToBackEnd, organs } = req.body;
    const connection = await createDBConnection();


    const verifiedPhoneNumber = JWT.verify(tokenToBackEnd, JWT_SECRET)
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;


    const [updateQueryResult] = await connection.query(`UPDATE users SET  last_name = ? , age = ? , location = ? 
        , gender = ? , blood_type = ? WHERE phone_number = ? ` , [lastName, age, location, gender, bloodType, actualVerifiedPhoneNumber]);


    const [selectionFromDonation] = await connection.query(`SELECT * FROM donations 
        WHERE phone_numbers = ? ` , [actualVerifiedPhoneNumber])

    if (selectionFromDonation.length > 0) {
        const [updateDonation] = await connection.query(`UPDATE donations SET organ_id = ?
                 WHERE phone_numbers = ? ` , [organs, actualVerifiedPhoneNumber])

        if (updateQueryResult || updateDonation) {
            res.json({
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
            res.json({
                message: 'Successfully updated',
                status: 'ok',
                data: selectionFromDonation
            })
        }
    }


    if (!updateQueryResult) {
        res.json({ message: 'Error in updating' })
    }

})

app.post('/recForm', async (req, res) => {

    const { lastName, age, location, gender, bloodType, tokenToBackEnd, organs } = req.body;
    const verifiedPhoneNumber = JWT.verify(tokenToBackEnd, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;
    const connection = await createDBConnection();

    const [updateQueryResult] = await connection.query(`UPDATE users SET  last_name = ? , age = ? , location = ? 
        , gender = ? , blood_type = ? WHERE phone_number = ? ` , [lastName, age, location, gender, bloodType, actualVerifiedPhoneNumber]);

    const [selectionFromRecTable] = await connection.query(`SELECT * FROM recipents_waitinglist WHERE phone_number = ? `, [actualVerifiedPhoneNumber]);

    if (selectionFromRecTable.length > 1) {
        const [updateRecTable] = await connection.query(`UPDATE donations SET organ_id = ?
                 WHERE phone_number = ? ` , [organs, actualVerifiedPhoneNumber])



        if (updateQueryResult || updateRecTable) {
            res.json({
                message: 'Successfully updated',
                status: 'ok',
                data: selectionFromRecTable[0],
            })
        }
    }
    else if (selectionFromRecTable.length === 0) {

        const [insertionToRecTable] = await connection.query(`INSERT INTO recipents_waitinglist (phone_number , organ_id ) 
        VALUES (? , ? ) `, [actualVerifiedPhoneNumber, organs]);

        if (updateQueryResult || insertionToRecTable) {
            res.json({
                message: 'Successfully updated',
                status: 'ok',
                data: selectionFromRecTable[0],
            })
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
                res.status(404).json({
                    status: '404'
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
            res.status(404).json({
                status: '404'
            })

        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }






})

app.post('/donOrgans', async (req, res) => {

    const { token, donAge, donBloodType } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber
    const connection = await createDBConnection();


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


})



app.post('/recRequests', async (req, res) => {

    const { token, donorPhoneNumber, organId } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;
    const connection = await createDBConnection();



    try {
        const [selectionFromRecReqTable] = await connection.query(`SELECT * FROM rec_request WHERE rec_phone_number = ? `, [actualVerifiedPhoneNumber])

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
        res.status(500).json('Error on server')
    }




})



app.post('/donRequest', async (req, res) => {

    const { token, recPhoneNumber, organId } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;
    const connection = await createDBConnection();

    // try {r

    const insertionQuery = await connection.query("INSERT INTO don_request (don_phone_number , rec_phone_number , organ_id) VALUES (?,?,?)", [actualVerifiedPhoneNumber, recPhoneNumber, organId]);

    if (insertionQuery) {
        res.json({
            status: 'ok'
        })
    }

    // } catch (error) {
    //     if(error.code === 'Duplicate entry'){
    //         res.json({
    //             status:'no'
    //         })

    //     }

    // }




})

app.post('/userNotification', async (req, res) => {

    const { token } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;
    const connection = await createDBConnection();

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
            res.json({
                status: '404'
            })
        } else if (approvedRecipentSelectionQuery.length > 0) {
            res.json({
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

        console.log(approvedDonorSelectionQuery)

        if (approvedDonorSelectionQuery.length < 1) {
            res.json({
                status: '404'
            })
        }
        if (approvedDonorSelectionQuery.length > 0) {
            res.json({
                message: approvedDonorSelectionQuery,
                status: 'ok',
                arrow: '→'
            })
        }
    }





})


app.post("/updateProfile", async (req, res) => {

    const { token, firstName, lastName, email, age, location, gender, bloodType, role } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;
    const connection = await createDBConnection();

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
            res.status(201).json({
                message: selectionFromUsersTable[0]
            })
        }
        else if (selectionFromUsersTable.length < 1) {
            res.status(404).json({
                message: '404'
            })
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
        res.status(500).json({ message: 'server error' })
    }

})



app.post('/history', async (req, res) => {

    const { token } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;
    const connection = await createDBConnection();

    const [selectionFromUsersTable] = await connection.query("SELECT * FROM users WHERE phone_number = ?", [actualVerifiedPhoneNumber]);

    if (selectionFromUsersTable[0].role === 'recipents') {
        const [selectionFromRecReqTable] = await connection.query(`SELECT organ.organ_name, users.first_name ,
            users.role, organ.organ_id , rec_request.*
            FROM rec_request
            JOIN organ ON rec_request.organ_id = organ.organ_id 
            JOIN users ON rec_request.rec_phone_number = users.phone_number
            WHERE rec_phone_number = ?` , [actualVerifiedPhoneNumber])
        // console.log(selectionFromRecReqTable)

        res.json({
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
        console.log(selectionFromDonTable)

        res.json({
            message: selectionFromDonTable,
            text: 'Ask to donate'
        })
    }



})





















//          ADMIN API





app.post('/adminOrgansData', async (req, res) => {

    const { token } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;
    const connection = await createDBConnection();

    const [selectionOrganQuery] = await connection.query(`SELECT * FROM organ `);

    if (selectionOrganQuery.length > 0) {
        res.json({
            message: selectionOrganQuery
        })
    }
})


app.post('/adminDonorsData', async (req, res) => {

    const { token } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;
    const connection = await createDBConnection();

    const [selectionFromUser] = await connection.query(`SELECT users.first_name , users.age , users.location  , users.gender ,
        users.blood_type , organ.organ_id , organ.organ_name , donations.phone_number , donations.donation_date , donations.status
        FROM donations 
        JOIN users ON donations.phone_number = users.phone_number 
        JOIN organ ON donations.organ_id = organ.organ_id  `);

    if (selectionFromUser.length > 0) {
        res.json({
            message: selectionFromUser
        })
    }


})


app.post('/adminRecipentsData', async (req, res) => {

    const { token } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;
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


})


app.post('/adminRequestData', async (req, res) => {

    const { token, requestId, status } = req.body;
    const verifiedPhoneNumber = JWT.verify(token, JWT_SECRET);
    const actualVerifiedPhoneNumber = verifiedPhoneNumber.tokenPhoneNumber;
    const connection = await createDBConnection();


    const [selectionFromRequest] = await connection.query(`SELECT users.first_name , users.age ,
        users.location  , users.gender ,
        users.blood_type , organ.organ_id , organ.organ_name ,rec_request.id, 
        rec_request.rec_phone_number , rec_request.don_phone_number ,rec_request.organ_id ,
        rec_request.status ,rec_request.date
        FROM rec_request
        JOIN users ON rec_request.rec_phone_number = users.phone_number 
        JOIN organ ON rec_request.organ_id = organ.organ_id`);


    if (selectionFromRequest.length > 0) {
        res.json({
            message: selectionFromRequest
        })
    }

    if (status === 'Pending') {
        const [makeApproveQuery] = await connection.query(`UPDATE rec_request SET status = ? WHERE id = ?  `, ['Approved', requestId]);
        if (makeApproveQuery) {
            res.json({
                message: makeApproveQuery
            })
        }
    }



})
