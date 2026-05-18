const createDBConnection = require('../config/db');


async function selectionFromrecTable(actualVerifiedPhoneNumber) {
    const connection = await createDBConnection();
    const [selectionFromrecTable] = await connection.query(`SELECT users.first_name, users.gender , users.age , users.location , users.email,
         users.blood_type, donations.phone_numbers ,organ.organ_name, organ.organ_id 
         FROM donations
         JOIN users ON donations.phone_numbers = users.phone_number
         JOIN organ ON donations.organ_id = organ.organ_id 
         WHERE users.phone_number = ?`, [actualVerifiedPhoneNumber]);
    return selectionFromrecTable
}


async function donorFormUpdate(firstName, lastName, email, age, location, bloodType, gender, tokenToBackEnd, organs, actualVerifiedPhoneNumber) {
    const connection = await createDBConnection();
    const [updateQueryResult] = await connection.query(`UPDATE users SET  last_name = ? , age = ? , location = ? 
        , gender = ? , blood_type = ? WHERE phone_number = ? ` , [lastName, age, location, gender, bloodType, actualVerifiedPhoneNumber]);

    return updateQueryResult


}


async function updateDonation(organs, actualVerifiedPhoneNumber) {
    const connection = await createDBConnection();
    const [updateDonation] = await connection.query(`UPDATE donations SET organ_id = ?
                 WHERE phone_numbers = ? ` , [organs, actualVerifiedPhoneNumber])
    return updateDonation
}


async function selectionFromDonationByPhoneNumber(actualVerifiedPhoneNumber) {
    const connection = await createDBConnection()
    const [selectionFromDonationByPhoneNumber] = await connection.query(`SELECT * FROM donations 
        WHERE phone_numbers = ? ` , [actualVerifiedPhoneNumber])
    return selectionFromDonationByPhoneNumber

}


async function insertToDonationTable(actualVerifiedPhoneNumber, organs) {
    const connection = await createDBConnection();
    const [insertToDonationTable] = await connection.query(`INSERT INTO donations (phone_numbers , organ_id) 
            VALUES(?,?)`, [actualVerifiedPhoneNumber, organs])

    return insertToDonationTable
}


async function selectionFromDonTable(actualVerifiedPhoneNumber) {
    const connection = await createDBConnection();
    const [selectionFromDonTable] = await connection.query(`SELECT organ.organ_name, users.first_name ,users.role, organ.organ_id ,
            users.blood_type , users.age, 
            donations.donation_id AS id , donations.phone_numbers , donations.organ_id , donations.status , donations.donation_date AS date
            FROM donations
            JOIN organ ON donations.organ_id = organ.organ_id 
            JOIN users ON donations.phone_numbers = users.phone_number
            WHERE phone_numbers = ?` , [actualVerifiedPhoneNumber])
    return selectionFromDonTable
}


async function getDonInfoQuery(actualVerifiedPhoneNumber) {
    const connection = await createDBConnection();
    const [getDonInfoQuery] = await connection.query(`SELECT users.* , donations.phone_numbers , donations.organ_id ,
            organ.organ_id ,organ.organ_name
            FROM donations 
            JOIN users ON donations.phone_numbers = users.phone_number
            JOIN organ ON donations.organ_id =  organ.organ_id 
            WHERE donations.phone_numbers = ? ` , [actualVerifiedPhoneNumber])
    return getDonInfoQuery
}


async function selectionFromdonationForRecDisplay(recBloodType, userOrgan) {
    const connection = await createDBConnection();
    const [selectionFromdonationForRecDisplay] = await connection.query(`SELECT users.first_name, users.gender , users.age , users.location , users.email,
         users.blood_type ,organ.organ_name , organ.organ_id , donations.phone_numbers , donations.status 
         FROM donations 
         JOIN users ON donations.phone_numbers = users.phone_number
         JOIN organ ON donations.organ_id = organ.organ_id 
         WHERE users.blood_type = ? AND donations.organ_id = ? AND status  = ?  `, [recBloodType, userOrgan, 'Pending']);
    return selectionFromdonationForRecDisplay

}


async function getEyeDonorInfoForMatching(userOrgan) {

    const connection = await createDBConnection();

    const [getEyeDonorInfo] = await connection.query(`SELECT donations.donation_id , donations.phone_numbers , donations.donation_date , 
            donations.status , users.first_name , users.last_name , users.age ,users.blood_type , organ.organ_name , donations.organ_id ,users.location , users.gender
            FROM donations 
            JOIN users ON donations.phone_numbers = users.phone_number 
            JOIN organ ON donations.organ_id = organ.organ_id
            WHERE donations.organ_id = ? AND status = ? ` , [userOrgan, 'Pending']);

    return getEyeDonorInfo
}




module.exports = ({
    selectionFromrecTable,
    getDonInfoQuery,
    selectionFromdonationForRecDisplay,
    selectionFromDonTable,
    donorFormUpdate,
    updateDonation,
    selectionFromDonationByPhoneNumber,
    insertToDonationTable,
    getEyeDonorInfoForMatching
})