const createDBConnection = require('../config/db');



async function superAdminDashboardData() {
    const connection = await createDBConnection();
    const [reportSelection] = await connection.query
        (`
            SELECT 
            COUNT(DISTINCT users.phone_number) AS total_user , 
            COUNT(DISTINCT CASE WHEN users.fayda_no IS NOT NULL THEN users.phone_number END) As verified_user,
            COUNT(DISTINCT CASE WHEN users.fayda_no IS NULL THEN users.phone_number END) As not_verified_user,
            
            COUNT(donations.phone_numbers) AS total_donor,
            COUNT(donations.status = 'Pending') AS active_donor,

            COUNT(recipents.organ_id) AS total_recipents,
            COUNT(recipents.status = 'Pending') AS active_recipents,
            COUNT(recipents.urgency_level = 'Urgent') AS urgent_level_recipents,

            COUNT(waiting_list.organ_id) AS waitinglist_user,
            COUNT(waiting_list.status = 'Pending') AS active_waitinglist_user,
            COUNT(waiting_list.status = 'Completed') AS successfull_transplant

            FROM users 

            LEFT JOIN 
            donations ON users.phone_number = donations.phone_numbers
            LEFT JOIN
            recipents ON users.phone_number = recipents.phone_number
            LEFT JOIN   
            waiting_list ON users.phone_number = waiting_list.rec_phone_number
            
            `,)

    return reportSelection[0];
}


async function superAdmingroupBySelctionQuery() {
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


async function getsuperAdminDonorInfo() {

    const connection = await createDBConnection();

    const [getsuperAdminDonorInfo] = await connection.query(`SELECT donations.donation_id , donations.phone_numbers , donations.donation_date , 
            donations.status , users.first_name , users.last_name , users.age ,users.blood_type , organ.organ_name , donations.organ_id ,users.location , users.gender
            FROM donations 
            JOIN users ON donations.phone_numbers = users.phone_number 
            JOIN organ ON donations.organ_id = organ.organ_id
            WHERE donations.organ_id = ? ` , [1]);

    return getsuperAdminDonorInfo
}


async function getsuperAdminRecipent() {

    const connection = await createDBConnection();
    const [getEyeRecipent] = await connection.query(`SELECT recipents.* , users.first_name ,
             users.last_name , users.age ,users.blood_type , organ.organ_name ,users.location , users.gender 
             FROM recipents 
             JOIN users ON recipents.phone_number = users.phone_number
             JOIN organ ON recipents.organ_id = organ.organ_id
             WHERE recipents.organ_id = ?  ` , [1])

    return getEyeRecipent;
}


async function getsuperAdminOrgan() {

    const connection = await createDBConnection();

    const [selectionOrganQuery] = await connection.query(`SELECT 
                organ.* , COALESCE(COUNT(donations.organ_id), 0) AS organ_amount
                FROM organ
                LEFT JOIN donations ON donations.organ_id = organ.organ_id AND donations.status = ?
                WHERE organ.organ_id = ?`, ['Pending', 1]);
    return selectionOrganQuery
}


async function getsuperAdminMatchedOrgan() {

    const connection = await createDBConnection();

    const [getsuperAdminMatchedOrgan] = await connection.query(`SELECT 
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

    return getsuperAdminMatchedOrgan
}


async function superAdminselectionFromWaitingListTable(recipentsPhoneNumber, donorPhoneNumber) {
    const connection = await createDBConnection();
    const [selectionFromWaitingListTable] = await connection.query(`SELECT * FROM waiting_list WHERE 
            rec_phone_number = ? AND don_phone_number = ? `, [recipentsPhoneNumber, donorPhoneNumber]);
    return selectionFromWaitingListTable
}


async function superAdminselectionFromWaitingListTableToCheckDuplicateDonor(donorPhoneNumber) {
    const connection = await createDBConnection();
    const [selectionFromWaitingListTableToCheckDuplicateDonor] = await connection.query(`SELECT * FROM waiting_list WHERE 
            don_phone_number = ? AND status = ?  `, [donorPhoneNumber, 'Pending']);
    return selectionFromWaitingListTableToCheckDuplicateDonor
}


async function superAdminselectionFromWaitingListTableToCheckDuplicateRecipents(recipentsPhoneNumber) {
    const connection = await createDBConnection();
    const [selectionFromWaitingListTableToCheckDuplicateRecipents] = await connection.query(`SELECT * FROM waiting_list WHERE 
            rec_phone_number = ? AND status = ?  `, [recipentsPhoneNumber, 'Pending']);
    return selectionFromWaitingListTableToCheckDuplicateRecipents
}



async function superAdmininsertionIntoWaitingList(recipentsPhoneNumber, donorPhoneNumber, organId) {
    const connection = await createDBConnection();
    const insertionIntoWaitingList = await connection.query(`INSERT INTO waiting_list (rec_phone_number , don_phone_number , organ_id)
         VALUES (?,?,?)`, [recipentsPhoneNumber, donorPhoneNumber, organId]);
    return insertionIntoWaitingList;
}


async function superAdminwaitingListDataDisplay() {
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


async function superAdminmakeApproveQueryToWaitingListTable(requestId, status) {
    const connection = await createDBConnection();
    const [makeApproveQueryToWaitingListTable] = await connection.query(`UPDATE waiting_list SET status = ? WHERE id = ? `, ['Approved', requestId]);
    return makeApproveQueryToWaitingListTable;
}


async function superAdminselectReadyForTransplant() {
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


async function superAdminmakeTransplantCompleteApprove(status, requestId) {
    const connection = await createDBConnection();
    const [makeTransplantCompleteApprove] = await connection.query(`UPDATE waiting_list SET status = ? WHERE id = ?  `, ['Completed', requestId]);
    return makeTransplantCompleteApprove;
}


async function superAdminupdateDonationsAndRecipentTable(rec_phone_number, don_phone_number, status) {
    const connection = await createDBConnection();
    const [updateQueryDonations] = await connection.query(`UPDATE donations SET status = ? WHERE phone_numbers = ?  AND organ_id  = ? `, ['Completed', don_phone_number, 1]);
    const [updateQueryRecipents] = await connection.query(`UPDATE recipents SET status = ? WHERE phone_number = ?  AND organ_id  = ?  `, ['Completed', rec_phone_number, 1]);

    return ({
        updateQueryDonations: updateQueryDonations,
        updateQueryRecipents: updateQueryRecipents
    })
}


async function superAdminsuperAdminProfileData(actualVerifiedPhoneNumber) {
    const connection = await createDBConnection();
    const [superAdminProfileData] = await connection.query(`SELECT * FROM admin WHERE phone_number = ? AND ID = ? `, [actualVerifiedPhoneNumber, 1])
    return superAdminProfileData
}

async function superAdminselectionForSearch(actualVerifiedPhoneNumber) {
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


async function superAdmingetDonorInfoForMatching() {

    const connection = await createDBConnection();

    const [getsuperAdminDonorInfo] = await connection.query(`SELECT donations.donation_id , donations.phone_numbers , donations.donation_date , 
            donations.status , users.first_name , users.last_name , users.age ,users.blood_type , organ.organ_name , donations.organ_id ,users.location , users.gender
            FROM donations 
            JOIN users ON donations.phone_numbers = users.phone_number 
            JOIN organ ON donations.organ_id = organ.organ_id
            WHERE donations.organ_id = ? AND status = ? ` , [1, 'Pending']);

    return getsuperAdminDonorInfo
}


async function superAdmingetRecipentInfoForMatching() {

    const connection = await createDBConnection();
    const [getsuperAdminRecipent] = await connection.query(`SELECT recipents.* , users.first_name ,
             users.last_name , users.age ,users.blood_type , organ.organ_name ,users.location , users.gender 
             FROM recipents 
             JOIN users ON recipents.phone_number = users.phone_number
             JOIN organ ON recipents.organ_id = organ.organ_id
             WHERE recipents.organ_id = ? AND status = ? ` , [1, 'Pending'])

    return getsuperAdminRecipent;
}


async function superAdmingetAllAdminsInfo() {

    const connection = await createDBConnection();

    const [superAdmingetAllAdminsInfo] = await connection.query
        (`
      SELECT admin.admin_id , admin.first_name ,admin.last_name , admin.age , admin.phone_number , admin.email,admin.location,
      admin.blood_type , admin.gender , hospital.ID , hospital.hospital_code
      FROM admin
      JOIN hospital ON admin.ID = hospital.ID
    `)

    return superAdmingetAllAdminsInfo
}


async function superAdminAddNewAdmin(firstName, lastName, age, phoneNumber, email, password, bloodType, gender, location, hospitalId) {

    const connection = await createDBConnection()
    const [addNewAdmin] = await connection.query(`INSERT INTO admin (first_name , last_name , age , role , location ,
            password , phone_number , gender , email , blood_type,ID) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?)` ,
        [firstName, lastName, age, 'admin', location, password, phoneNumber, gender, email, bloodType, hospitalId]);

    return addNewAdmin
}


async function superAdminDeleteAdmin(phoneNumber) {
    const connection = await createDBConnection()
    const [superAdminDeleteAdmin] = await connection.query(`DELETE FROM admin WHERE phone_number = ? `, [phoneNumber])
    return superAdminDeleteAdmin
}


async function addNewOrgan(params) {
    const connection = await createDBConnection()
    const [addNewOrgan] = await connection.query(`INSERT INTO organ (organ_name) VALUES (?)`, [newOrgan])
    return addNewOrgan
}

async function selectionFromWaitingListForHistory() {

    const connection = await createDBConnection()

    const [selectionFromWaitingListForHistory] = await connection.query
        (`
            SELECT 
            user_don.phone_number AS don_phone_number ,
            user_don.age AS don_age , 
            user_don.first_name AS don_first_name , 
            user_don.blood_type AS don_blood_type, 
            
            user_rec.phone_number AS rec_phone_number ,
            user_rec.age AS rec_age , 
            user_rec.first_name AS rec_first_name , 
            user_rec.blood_type AS rec_blood_type,  

            waiting_list.*  

            FROM waiting_list

            JOIN 
                users user_don ON waiting_list.don_phone_number = user_don.phone_number
            JOIN 
                users user_rec ON waiting_list.rec_phone_number = user_rec.phone_number
            JOIN 
                organ ON waiting_list.organ_id = organ.organ_id

           ` ,
        )
    return selectionFromWaitingListForHistory
}


async function superAdminSearchForDon(actualVerifiedPhoneNumber) {
    const connection = await createDBConnection();
    const [superAdminSearch] = await connection.query
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
            waiting_list ON users.phone_number = waiting_list.don_phone_number
            WHERE users.phone_number = ? 
        `, [actualVerifiedPhoneNumber])
    return superAdminSearch
}


async function superAdminSearchForRec(actualVerifiedPhoneNumber) {
    const connection = await createDBConnection();
    const [superAdminSearch] = await connection.query
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
    return superAdminSearch
}


async function superAdminProfileData(actualVerifiedPhoneNumber) {
    const connection = await createDBConnection();
    const [superAdminProfileData] = await connection.query(`SELECT * FROM admin WHERE phone_number = ?`, [actualVerifiedPhoneNumber])
    return superAdminProfileData
}









module.exports =
{
    superAdminDashboardData,
    superAdmingroupBySelctionQuery,
    getsuperAdminDonorInfo,
    getsuperAdminRecipent,
    getsuperAdminOrgan,
    getsuperAdminMatchedOrgan,
    superAdminselectionFromWaitingListTable,
    superAdminselectionFromWaitingListTableToCheckDuplicateDonor,
    superAdminselectionFromWaitingListTableToCheckDuplicateRecipents,
    superAdmininsertionIntoWaitingList,
    superAdminwaitingListDataDisplay,
    superAdminmakeApproveQueryToWaitingListTable,
    superAdminselectReadyForTransplant,
    superAdminmakeTransplantCompleteApprove,
    superAdminupdateDonationsAndRecipentTable,
    superAdminsuperAdminProfileData,
    superAdminselectionForSearch,
    superAdmingetRecipentInfoForMatching,
    superAdmingetDonorInfoForMatching,
    superAdmingetAllAdminsInfo,
    superAdminAddNewAdmin,
    superAdminDeleteAdmin,
    addNewOrgan,
    superAdminSearchForDon,
    superAdminSearchForRec,
    selectionFromWaitingListForHistory,
    superAdminProfileData
}