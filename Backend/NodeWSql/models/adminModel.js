const createDBConnection = require('../config/db');



//              EYE BANK ADMIN MODEL


async function adminLoginByPhone(phoneNumber, password) {
    const connection = await createDBConnection();
    const [selectionAdminByPhoneNumber] = await connection.query(
        `SELECT * FROM admin WHERE phone_number = ? AND password = ? 
            AND ((role = 'super_admin' AND ID = 0) OR (role = 'admin' AND ID IN (1, 2)))`,
        [phoneNumber, password]
    );
    return selectionAdminByPhoneNumber;
}


async function adminDashboardData() {
    const connection = await createDBConnection();
    const [reportSelection] = await connection.query
        (`
            SELECT 
            COUNT(DISTINCT users.phone_number) AS total_user , 
            COUNT(DISTINCT CASE WHEN users.fayda_no IS NOT NULL THEN users.phone_number END) As verified_user,
            COUNT(DISTINCT CASE WHEN users.fayda_no IS NULL THEN users.phone_number END) As not_verified_user,
            
            COUNT(CASE WHEN donations.organ_id = ? THEN donations.phone_numbers END) AS total_donor,
            COUNT(CASE WHEN donations.organ_id = ? AND donations.status = 'Pending' THEN donations.organ_id END) AS active_organ,
            COUNT(CASE WHEN donations.organ_id = ? AND donations.status = 'Pending' THEN donations.organ_id END) AS active_donor,

            COUNT(CASE WHEN recipents.organ_id = ? THEN recipents.organ_id END) AS total_recipents,
            COUNT(CASE WHEN recipents.organ_id = ? AND recipents.status = 'Pending' THEN recipents.organ_id END) AS active_recipents,
            COUNT(CASE WHEN recipents.organ_id = ? AND recipents.urgency_level = 'Urgent' THEN recipents.organ_id END ) AS urgent_level_recipents,

            COUNT(CASE WHEN waiting_list.organ_id = ? THEN waiting_list.organ_id END) AS waitinglist_user,
            COUNT(CASE WHEN waiting_list.organ_id = ? AND waiting_list.status = 'Pending' THEN waiting_list.organ_id END) AS active_waitinglist_user,
            COUNT(CASE WHEN waiting_list.organ_id = ? AND waiting_list.status = 'Completed' THEN waiting_list.organ_id END) AS successfull_transplant

            FROM users 

            LEFT JOIN 
            donations ON users.phone_number = donations.phone_numbers
            LEFT JOIN
            recipents ON users.phone_number = recipents.phone_number
            LEFT JOIN   
            waiting_list ON users.phone_number = waiting_list.rec_phone_number
            
            `, [3, 3, 3, 3, 3, 3, 3, 3, 3])

    return reportSelection[0];
}


async function groupBySelctionQuery() {
    const connection = await createDBConnection();
    const [groupBySelctionQuery] = await connection.query
        (`
                SELECT blood_type,
                COUNT(users.blood_type) AS blood_group_amount,
                COUNT(users.age) AS age_group_amount
                FROM users
                GROUP BY blood_type
            `)
    return groupBySelctionQuery;
}


async function getEyeDonorInfo() {

    const connection = await createDBConnection();

    const [getEyeDonorInfo] = await connection.query(`SELECT donations.donation_id , donations.phone_numbers , donations.donation_date , 
            donations.status , users.first_name , users.last_name , users.age ,users.blood_type , organ.organ_name , donations.organ_id ,users.location , users.gender
            FROM donations 
            JOIN users ON donations.phone_numbers = users.phone_number 
            JOIN organ ON donations.organ_id = organ.organ_id
            WHERE donations.organ_id = ? ` , [3]);

    return getEyeDonorInfo
}


async function getEyeRecipent() {

    const connection = await createDBConnection();
    const [getEyeRecipent] = await connection.query(`SELECT recipents.* , users.first_name ,
             users.last_name , users.age ,users.blood_type , organ.organ_name ,users.location , users.gender 
             FROM recipents 
             JOIN users ON recipents.phone_number = users.phone_number
             JOIN organ ON recipents.organ_id = organ.organ_id
             WHERE recipents.organ_id = ?  ` , [3])

    return getEyeRecipent;
}


async function getEyeOrgan() {

    const connection = await createDBConnection();

    const [selectionOrganQuery] = await connection.query(`SELECT 
                organ.* , COALESCE(COUNT(donations.organ_id), 0) AS organ_amount
                FROM organ
                LEFT JOIN donations ON donations.organ_id = organ.organ_id AND donations.status = ?
                WHERE organ.organ_id = ?`, ['Pending', 3]);
    return selectionOrganQuery
}


async function getEyeMatchedOrgan() {

    const connection = await createDBConnection();

    const [getEyeMatchedOrgan] = await connection.query(`SELECT 
            donations.donation_id,
            donations.organ_id AS don_organ_id ,
            donations.phone_numbers AS don_phone_number,     
            donations.status AS don_status ,        

            u_donor.phone_number AS don_phone_number,
            u_donor.first_name AS donor_name,
            u_donor.blood_type AS donor_blood_type,
            u_donor.age AS donor_age,

            organ.organ_id , 
            organ.organ_name,

            u_recipient.phone_number AS rec_phone_number,
            u_recipient.first_name AS recipient_name,
            u_recipient.blood_type AS recipient_blood_type,
            u_recipient.age AS recipient_age,
            
            recipents.wait_id,
            recipents.organ_id AS rec_organ_id,
            recipents.phone_number AS rec_phone_number,
            recipents.status AS rec_status,
            recipents.urgency_level AS urgency_level    

            FROM donations 
            JOIN 
                recipents ON donations.organ_id = recipents.organ_id
            JOIN 
                organ ON donations.organ_id = organ.organ_id
            JOIN 
                users u_donor ON donations.phone_numbers = u_donor.phone_number
            JOIN 
                users u_recipient ON recipents.phone_number = u_recipient.phone_number
                
            WHERE u_donor.blood_type = u_recipient.blood_type
            AND donations.organ_id = ? 
            AND recipents.status = ? 
            AND donations.status = ? ` , [3, 'Pending', 'Pending']);

    return getEyeMatchedOrgan
}



async function selectionFromWaitingListTable(recipentsPhoneNumber, donorPhoneNumber) {
    const connection = await createDBConnection();
    const [selectionFromWaitingListTable] = await connection.query(`SELECT * FROM waiting_list WHERE 
            rec_phone_number = ? AND don_phone_number = ? `, [recipentsPhoneNumber, donorPhoneNumber]);
    return selectionFromWaitingListTable
}


async function selectionFromWaitingListTableToCheckDuplicateDonor(donorPhoneNumber) {
    const connection = await createDBConnection();
    const [selectionFromWaitingListTableToCheckDuplicateDonor] = await connection.query(`SELECT * FROM waiting_list WHERE 
            don_phone_number = ? AND status = ?  `, [donorPhoneNumber, 'Pending']);
    return selectionFromWaitingListTableToCheckDuplicateDonor
}


async function selectionFromWaitingListTableToCheckDuplicateRecipents(recipentsPhoneNumber) {
    const connection = await createDBConnection();
    const [selectionFromWaitingListTableToCheckDuplicateRecipents] = await connection.query(`SELECT * FROM waiting_list WHERE 
            rec_phone_number = ? AND status = ?  `, [recipentsPhoneNumber, 'Pending']);
    return selectionFromWaitingListTableToCheckDuplicateRecipents
}



async function insertionIntoWaitingList(recipentsPhoneNumber, donorPhoneNumber, organId) {
    const connection = await createDBConnection();
    const insertionIntoWaitingList = await connection.query(`INSERT INTO waiting_list (rec_phone_number , don_phone_number , organ_id)
         VALUES (?,?,?)`, [recipentsPhoneNumber, donorPhoneNumber, organId]);
    return insertionIntoWaitingList;
}


async function waitingListDataDisplay() {
    const connection = await createDBConnection();
    const [waitingListDataDisplay] = await connection.query(`SELECT 
        users1.first_name AS rec_first_name , users1.age AS rec_age, users1.location AS rec_location , users1.phone_number AS rec_phone_number , users1.gender AS rec_gender , users1.blood_type AS rec_blood_type , 
        users2.first_name AS don_first_name , users2.age AS don_age, users2.location AS don_location , users1.phone_number AS rec_phone_number,  users2.gender AS don_gender , users2.blood_type AS don_blood_type ,
        organ.organ_id , organ.organ_name ,
        waiting_list.id, waiting_list.rec_phone_number , waiting_list.don_phone_number ,waiting_list.organ_id ,waiting_list.status ,waiting_list.date
        FROM waiting_list
        JOIN users users1 ON waiting_list.rec_phone_number = users1.phone_number 
        JOIN users users2 ON waiting_list.don_phone_number = users2.phone_number 
        JOIN organ  ON waiting_list.organ_id = organ.organ_id
        WHERE status = ? AND waiting_list.organ_id = ?` , ['Pending', 3]);
    return waitingListDataDisplay
}


async function makeApproveQueryToWaitingListTable(requestId, status, don_phone_number, rec_phone_number) {
    const connection = await createDBConnection();
    const [makeApproveQueryToWaitingListTable] = await connection.query(`UPDATE waiting_list SET status = ? WHERE id = ? `, ['Approved', requestId]);
    const [makeApproveQueryForDonationTable] = await connection.query(`UPDATE donations SET status = ? WHERE phone_numbers = ?  AND organ_id  = ?`, ['Approved', don_phone_number, 3])
    const [makeApproveQueryForRecipentsTable] = await connection.query(`UPDATE recipents SET status = ? WHERE phone_number = ?  AND organ_id  = ?`, ['Approved', rec_phone_number, 3])
    return { makeApproveQueryToWaitingListTable, makeApproveQueryForDonationTable, makeApproveQueryForRecipentsTable };
}


async function selectReadyForTransplant() {
    const connection = await createDBConnection();
    const [selectReadyForTransplant] = await connection.query(`SELECT 
        users1.first_name AS rec_first_name , users1.age AS rec_age, users1.location AS rec_location , users1.phone_number AS rec_phone_number , users1.gender AS rec_gender , users1.blood_type AS rec_blood_type , 
        users2.first_name AS don_first_name , users2.age AS don_age, users2.location AS don_location , users1.phone_number AS rec_phone_number,  users2.gender AS don_gender , users2.blood_type AS don_blood_type ,
        organ.organ_id , organ.organ_name ,
        waiting_list.id, waiting_list.rec_phone_number , waiting_list.don_phone_number ,waiting_list.organ_id ,waiting_list.status ,waiting_list.date
        FROM waiting_list
        JOIN users users1 ON waiting_list.rec_phone_number = users1.phone_number 
        JOIN users users2 ON waiting_list.don_phone_number = users2.phone_number 
        JOIN organ  ON waiting_list.organ_id = organ.organ_id
        WHERE status = ? AND waiting_list.organ_id = ?` , ['Approved', 3]);

    return selectReadyForTransplant

}


async function makeTransplantCompleteApprove(status, requestId) {
    const connection = await createDBConnection();
    const [makeTransplantCompleteApprove] = await connection.query(`UPDATE waiting_list SET status = ? WHERE id = ?  `, ['Completed', requestId]);
    return makeTransplantCompleteApprove;
}


async function updateDonationsAndRecipentTable(rec_phone_number, don_phone_number) {
    const connection = await createDBConnection();
    const [updateQueryDonations] = await connection.query(`UPDATE donations SET status = ? WHERE phone_numbers = ?  AND organ_id  = ? `, ['Completed', don_phone_number, 3]);
    const [updateQueryRecipents] = await connection.query(`UPDATE recipents SET status = ? WHERE phone_number = ?  AND organ_id  = ?  `, ['Completed', rec_phone_number, 3]);

    return ({
        updateQueryDonations: updateQueryDonations,
        updateQueryRecipents: updateQueryRecipents
    })
}

async function makeTransplantReject(status, requestId) {
    const connection = await createDBConnection();
    const [makeTransplantReject] = await connection.query(`UPDATE waiting_list SET status = ? WHERE id = ?  `, ['Rejected', requestId]);
    return makeTransplantReject;
}


async function RejectDonationsAndRecipentTable(rec_phone_number, don_phone_number) {
    const connection = await createDBConnection();
    const [RejectQueryDonations] = await connection.query(`UPDATE donations SET status = ? WHERE phone_numbers = ?  AND organ_id  = ? `, ['Rejected', don_phone_number, 3]);
    const [RejectQueryRecipents] = await connection.query(`UPDATE recipents SET status = ? WHERE phone_number = ?  AND organ_id  = ?  `, ['Rejected', rec_phone_number, 3]);

    return ({
        RejectQueryDonations: RejectQueryDonations,
        RejectQueryRecipents: RejectQueryRecipents
    })
}



async function selectEyeBankAdminFromAdminTable(actualVerifiedPhoneNumber) {
    const connection = await createDBConnection();
    const [selectEyeBankAdminFromAdminTable] = await connection.query(`SELECT * FROM admin WHERE phone_number = ? AND ID = ? `, [actualVerifiedPhoneNumber, 2])
    return selectEyeBankAdminFromAdminTable
}

async function selectionForSearch(actualVerifiedPhoneNumber) {
    const connection = await createDBConnection();
    const [selectionForSearch] = await connection.query
        (`
            SELECT 
            users.first_name,
            users.last_name,
            users.phone_number,
            users.blood_type,
            users.gender,
            users.role,users.location,
            COALESCE(waiting_list.date,'') AS date,
            COALESCE(waiting_list.status,'') AS status,
            COALESCE(waiting_list.organ_id,'') AS organ_id
            FROM users 
            LEFT JOIN 
            waiting_list ON users.phone_number = waiting_list.rec_phone_number
            WHERE users.phone_number = ? 
        `, [actualVerifiedPhoneNumber])
    return selectionForSearch
}


async function getEyeDonorInfoForMatching() {

    const connection = await createDBConnection();

    const [getEyeDonorInfo] = await connection.query(`SELECT donations.donation_id , donations.phone_numbers , donations.donation_date , 
            donations.status , users.first_name , users.last_name , users.age ,users.blood_type , organ.organ_name , donations.organ_id ,users.location , users.gender
            FROM donations 
            JOIN users ON donations.phone_numbers = users.phone_number 
            JOIN organ ON donations.organ_id = organ.organ_id
            WHERE donations.organ_id = ? AND status = ? ` , [3, 'Pending']);

    return getEyeDonorInfo
}


async function getEyeRecipentForMatching() {

    const connection = await createDBConnection();
    const [getEyeRecipent] = await connection.query(`SELECT recipents.* , users.first_name ,
             users.last_name , users.age ,users.blood_type , organ.organ_name ,users.location , users.gender 
             FROM recipents 
             JOIN users ON recipents.phone_number = users.phone_number
             JOIN organ ON recipents.organ_id = organ.organ_id
             WHERE recipents.organ_id = ? AND status = ? ` , [3, 'Pending'])

    return getEyeRecipent;
}



// Kidney Model


async function kidneyadminDashboardData() {
    const connection = await createDBConnection();
    const [reportSelection] = await connection.query
        (`
            SELECT 
            COUNT(DISTINCT users.phone_number) AS total_user , 
            COUNT(DISTINCT CASE WHEN users.fayda_no IS NOT NULL THEN users.phone_number END) As verified_user,
            COUNT(DISTINCT CASE WHEN users.fayda_no IS NULL THEN users.phone_number END) As not_verified_user,
            
            COUNT(CASE WHEN donations.organ_id = ? THEN donations.phone_numbers END) AS total_donor,
            COUNT(CASE WHEN donations.organ_id = ? AND donations.status = 'Pending' THEN donations.organ_id END) AS active_organ,
            COUNT(CASE WHEN donations.organ_id = ? AND donations.status = 'Pending' THEN donations.organ_id END) AS active_donor,

            COUNT(CASE WHEN recipents.organ_id = ? THEN recipents.organ_id END) AS total_recipents,
            COUNT(CASE WHEN recipents.organ_id = ? AND recipents.status = 'Pending' THEN recipents.organ_id END) AS active_recipents,
            COUNT(CASE WHEN recipents.organ_id = ? AND recipents.urgency_level = 'Urgent' THEN recipents.organ_id END ) AS urgent_level_recipents,

            COUNT(CASE WHEN waiting_list.organ_id = ? THEN waiting_list.organ_id END) AS waitinglist_user,
            COUNT(CASE WHEN waiting_list.organ_id = ? AND waiting_list.status = 'Pending' THEN waiting_list.organ_id END) AS active_waitinglist_user,
            COUNT(CASE WHEN waiting_list.organ_id = ? AND waiting_list.status = 'Completed' THEN waiting_list.organ_id END) AS successfull_transplant

            FROM users 

            LEFT JOIN 
            donations ON users.phone_number = donations.phone_numbers
            LEFT JOIN
            recipents ON users.phone_number = recipents.phone_number
            LEFT JOIN   
            waiting_list ON users.phone_number = waiting_list.rec_phone_number
            
            `, [1, 1, 1, 1, 1, 1, 1, 1, 1])

    return reportSelection[0];
}


async function kidneygroupBySelctionQuery() {
    const connection = await createDBConnection();
    const [groupBySelctionQuery] = await connection.query
        (`
                SELECT blood_type,
                COUNT(users.blood_type) AS blood_group_amount,
                COUNT(users.age) AS age_group_amount
                FROM users
                GROUP BY blood_type
            `)
    return groupBySelctionQuery;
}


async function getKidneyDonorInfo() {

    const connection = await createDBConnection();

    const [getKidneyDonorInfo] = await connection.query(`SELECT donations.donation_id , donations.phone_numbers , donations.donation_date , 
            donations.status , users.first_name , users.last_name , users.age ,users.blood_type , organ.organ_name , donations.organ_id ,users.location , users.gender
            FROM donations 
            JOIN users ON donations.phone_numbers = users.phone_number 
            JOIN organ ON donations.organ_id = organ.organ_id
            WHERE donations.organ_id = ? ` , [1]);

    return getKidneyDonorInfo
}


async function getKidneyRecipent() {

    const connection = await createDBConnection();
    const [getEyeRecipent] = await connection.query(`SELECT recipents.* , users.first_name ,
             users.last_name , users.age ,users.blood_type , organ.organ_name ,users.location , users.gender 
             FROM recipents 
             JOIN users ON recipents.phone_number = users.phone_number
             JOIN organ ON recipents.organ_id = organ.organ_id
             WHERE recipents.organ_id = ?  ` , [1])

    return getEyeRecipent;
}


async function getKidneyOrgan() {

    const connection = await createDBConnection();

    const [selectionOrganQuery] = await connection.query(`SELECT 
                organ.* , COALESCE(COUNT(donations.organ_id), 0) AS organ_amount
                FROM organ
                LEFT JOIN donations ON donations.organ_id = organ.organ_id AND donations.status = ?
                WHERE organ.organ_id = ?`, ['Pending', 1]);
    return selectionOrganQuery
}


async function getKidneyMatchedOrgan() {

    const connection = await createDBConnection();

    const [getKidneyMatchedOrgan] = await connection.query(`SELECT 
            donations.donation_id,
            donations.organ_id AS don_organ_id ,
            donations.phone_numbers AS don_phone_number,     
            donations.status AS don_status ,        

            u_donor.phone_number AS don_phone_number,
            u_donor.first_name AS donor_name,
            u_donor.blood_type AS donor_blood_type,
            u_donor.age AS donor_age,

            organ.organ_id , 
            organ.organ_name,

            u_recipient.phone_number AS rec_phone_number,
            u_recipient.first_name AS recipient_name,
            u_recipient.blood_type AS recipient_blood_type,
            u_recipient.age AS recipient_age,
            
            recipents.wait_id,
            recipents.organ_id AS rec_organ_id,
            recipents.phone_number AS rec_phone_number,
            recipents.status AS rec_status,
            recipents.urgency_level AS urgency_level    

            FROM donations 
            JOIN 
                recipents ON donations.organ_id = recipents.organ_id
            JOIN 
                organ ON donations.organ_id = organ.organ_id
            JOIN 
                users u_donor ON donations.phone_numbers = u_donor.phone_number
            JOIN 
                users u_recipient ON recipents.phone_number = u_recipient.phone_number
                
            WHERE u_donor.blood_type = u_recipient.blood_type
            AND donations.organ_id = ? 
            AND recipents.status = ? 
            AND donations.status = ? ` , [1, 'Pending', 'Pending']);

    return getKidneyMatchedOrgan
}



async function kidneyselectionFromWaitingListTable(recipentsPhoneNumber, donorPhoneNumber) {
    const connection = await createDBConnection();
    const [selectionFromWaitingListTable] = await connection.query(`SELECT * FROM waiting_list WHERE 
            rec_phone_number = ? AND don_phone_number = ? `, [recipentsPhoneNumber, donorPhoneNumber]);
    return selectionFromWaitingListTable
}


async function kidneyselectionFromWaitingListTableToCheckDuplicateDonor(donorPhoneNumber) {
    const connection = await createDBConnection();
    const [selectionFromWaitingListTableToCheckDuplicateDonor] = await connection.query(`SELECT * FROM waiting_list WHERE 
            don_phone_number = ? AND status = ?  `, [donorPhoneNumber, 'Pending']);
    return selectionFromWaitingListTableToCheckDuplicateDonor
}


async function kidneyselectionFromWaitingListTableToCheckDuplicateRecipents(recipentsPhoneNumber) {
    const connection = await createDBConnection();
    const [selectionFromWaitingListTableToCheckDuplicateRecipents] = await connection.query(`SELECT * FROM waiting_list WHERE 
            rec_phone_number = ? AND status = ?  `, [recipentsPhoneNumber, 'Pending']);
    return selectionFromWaitingListTableToCheckDuplicateRecipents
}



async function kidneyinsertionIntoWaitingList(recipentsPhoneNumber, donorPhoneNumber, organId) {
    const connection = await createDBConnection();
    const insertionIntoWaitingList = await connection.query(`INSERT INTO waiting_list (rec_phone_number , don_phone_number , organ_id)
         VALUES (?,?,?)`, [recipentsPhoneNumber, donorPhoneNumber, organId]);
    return insertionIntoWaitingList;
}


async function kidneywaitingListDataDisplay() {
    const connection = await createDBConnection();
    const [waitingListDataDisplay] = await connection.query(`SELECT 
        users1.first_name AS rec_first_name , users1.age AS rec_age, users1.location AS rec_location , users1.phone_number AS rec_phone_number , users1.gender AS rec_gender , users1.blood_type AS rec_blood_type , 
        users2.first_name AS don_first_name , users2.age AS don_age, users2.location AS don_location , users1.phone_number AS rec_phone_number,  users2.gender AS don_gender , users2.blood_type AS don_blood_type ,
        organ.organ_id , organ.organ_name ,
        waiting_list.id, waiting_list.rec_phone_number , waiting_list.don_phone_number ,waiting_list.organ_id ,waiting_list.status ,waiting_list.date
        FROM waiting_list
        JOIN users users1 ON waiting_list.rec_phone_number = users1.phone_number 
        JOIN users users2 ON waiting_list.don_phone_number = users2.phone_number 
        JOIN organ  ON waiting_list.organ_id = organ.organ_id
        WHERE status = ? AND waiting_list.organ_id = ?` , ['Pending', 1]);
    return waitingListDataDisplay
}


async function kidneymakeApproveQueryToWaitingListTable(requestId, status) {
    const connection = await createDBConnection();
    const [makeApproveQueryToWaitingListTable] = await connection.query(`UPDATE waiting_list SET status = ? WHERE id = ? `, ['Approved', requestId]);
    return makeApproveQueryToWaitingListTable;
}


async function kidneyselectReadyForTransplant() {
    const connection = await createDBConnection();
    const [selectReadyForTransplant] = await connection.query(`SELECT 
        users1.first_name AS rec_first_name , users1.age AS rec_age, users1.location AS rec_location , users1.phone_number AS rec_phone_number , users1.gender AS rec_gender , users1.blood_type AS rec_blood_type , 
        users2.first_name AS don_first_name , users2.age AS don_age, users2.location AS don_location , users1.phone_number AS rec_phone_number,  users2.gender AS don_gender , users2.blood_type AS don_blood_type ,
        organ.organ_id , organ.organ_name ,
        waiting_list.id, waiting_list.rec_phone_number , waiting_list.don_phone_number ,waiting_list.organ_id ,waiting_list.status ,waiting_list.date
        FROM waiting_list
        JOIN users users1 ON waiting_list.rec_phone_number = users1.phone_number 
        JOIN users users2 ON waiting_list.don_phone_number = users2.phone_number 
        JOIN organ  ON waiting_list.organ_id = organ.organ_id
        WHERE status = ? AND waiting_list.organ_id = ?` , ['Approved', 1]);

    return selectReadyForTransplant

}


async function kidneymakeTransplantCompleteApprove(status, requestId) {
    const connection = await createDBConnection();
    const [makeTransplantCompleteApprove] = await connection.query(`UPDATE waiting_list SET status = ? WHERE id = ?  `, ['Completed', requestId]);
    return makeTransplantCompleteApprove;
}


async function kidneyupdateDonationsAndRecipentTable(rec_phone_number, don_phone_number, status) {
    const connection = await createDBConnection();
    const [updateQueryDonations] = await connection.query(`UPDATE donations SET status = ? WHERE phone_numbers = ?  AND organ_id  = ? `, ['Completed', don_phone_number, 1]);
    const [updateQueryRecipents] = await connection.query(`UPDATE recipents SET status = ? WHERE phone_number = ?  AND organ_id  = ?  `, ['Completed', rec_phone_number, 1]);

    return ({
        updateQueryDonations: updateQueryDonations,
        updateQueryRecipents: updateQueryRecipents
    })
}


async function kidneyselectEyeBankAdminFromAdminTable(actualVerifiedPhoneNumber) {
    const connection = await createDBConnection();
    const [selectEyeBankAdminFromAdminTable] = await connection.query(`SELECT * FROM admin WHERE phone_number = ? AND ID = ? `, [actualVerifiedPhoneNumber, 1])
    return selectEyeBankAdminFromAdminTable
}

async function kidneyselectionForSearch(actualVerifiedPhoneNumber) {
    const connection = await createDBConnection();
    const [selectionForSearch] = await connection.query
        (`
            SELECT 
            users.first_name,
            users.last_name,
            users.phone_number,
            users.blood_type,
            users.gender,
            users.role,users.location,
            COALESCE(waiting_list.date,'') AS date,
            COALESCE(waiting_list.status,'') AS status,
            COALESCE(waiting_list.organ_id,'') AS organ_id
            FROM users 
            LEFT JOIN 
            waiting_list ON users.phone_number = waiting_list.rec_phone_number
            WHERE users.phone_number = ? 
        `, [actualVerifiedPhoneNumber])
    return selectionForSearch
}


async function kidneygetDonorInfoForMatching() {

    const connection = await createDBConnection();

    const [getKidneyDonorInfo] = await connection.query(`SELECT donations.donation_id , donations.phone_numbers , donations.donation_date , 
            donations.status , users.first_name , users.last_name , users.age ,users.blood_type , organ.organ_name , donations.organ_id ,users.location , users.gender
            FROM donations 
            JOIN users ON donations.phone_numbers = users.phone_number 
            JOIN organ ON donations.organ_id = organ.organ_id
            WHERE donations.organ_id = ? AND status = ? ` , [1, 'Pending']);

    return getKidneyDonorInfo
}


async function kidneygetRecipentInfoForMatching() {

    const connection = await createDBConnection();
    const [getKidneyRecipent] = await connection.query(`SELECT recipents.* , users.first_name ,
             users.last_name , users.age ,users.blood_type , organ.organ_name ,users.location , users.gender 
             FROM recipents 
             JOIN users ON recipents.phone_number = users.phone_number
             JOIN organ ON recipents.organ_id = organ.organ_id
             WHERE recipents.organ_id = ? AND status = ? ` , [1, 'Pending'])

    return getKidneyRecipent;
}






module.exports =
{
    adminLoginByPhone,
    adminDashboardData,
    groupBySelctionQuery,
    getEyeDonorInfo,
    getEyeRecipent,
    getEyeOrgan,
    getEyeMatchedOrgan,
    insertionIntoWaitingList,
    selectionFromWaitingListTable,
    waitingListDataDisplay,
    makeApproveQueryToWaitingListTable,
    selectReadyForTransplant,
    makeTransplantCompleteApprove,
    updateDonationsAndRecipentTable,
    selectionForSearch,
    getEyeDonorInfoForMatching,
    getEyeRecipentForMatching,
    selectionFromWaitingListTableToCheckDuplicateDonor,
    selectionFromWaitingListTableToCheckDuplicateRecipents,
    selectEyeBankAdminFromAdminTable,
    makeTransplantReject,
    RejectDonationsAndRecipentTable,

    //Kidney

    kidneyadminDashboardData,
    kidneygroupBySelctionQuery,
    getKidneyDonorInfo,
    getKidneyRecipent,
    getKidneyOrgan,
    getKidneyMatchedOrgan,
    kidneyselectionFromWaitingListTable,
    kidneyselectionFromWaitingListTableToCheckDuplicateDonor,
    kidneyselectionFromWaitingListTableToCheckDuplicateRecipents,
    kidneyinsertionIntoWaitingList,
    kidneywaitingListDataDisplay,
    kidneymakeApproveQueryToWaitingListTable,
    kidneyselectReadyForTransplant,
    kidneymakeTransplantCompleteApprove,
    kidneyupdateDonationsAndRecipentTable,
    kidneyselectEyeBankAdminFromAdminTable,
    kidneyselectionForSearch,
    kidneygetRecipentInfoForMatching,
    kidneygetDonorInfoForMatching

}