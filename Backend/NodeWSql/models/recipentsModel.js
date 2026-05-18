const createDBConnection = require('../config/db');


async function getRecInfoQuery(actualVerifiedPhoneNumber) {
    const connection = await createDBConnection();
    const [getRecInfoQuery] = await connection.query(`SELECT users.* , recipents.phone_number , recipents.organ_id ,
            organ.organ_id ,organ.organ_name
            FROM recipents 
            JOIN users ON recipents.phone_number = users.phone_number
            JOIN organ ON recipents.organ_id =  organ.organ_id 
            WHERE recipents.phone_number = ? ` , [actualVerifiedPhoneNumber]);
    return getRecInfoQuery
}

async function updateRecTable(organs, actualVerifiedPhoneNumber) {
    const connection = await createDBConnection();
    const [updateRecTable] = await connection.query(`UPDATE recipents SET organ_id = ?
            WHERE phone_number = ? ` , [organs, actualVerifiedPhoneNumber])
    return updateRecTable
}


async function insertionToRecTable(actualVerifiedPhoneNumber, organs) {
    const connection = await createDBConnection();
    const [insertionToRecTable] = await connection.query(`INSERT INTO recipents 
                (phone_number , organ_id ) VALUES (? , ? ) `, [actualVerifiedPhoneNumber, organs]);
    return insertionToRecTable
}

async function selectionFromRecTable(actualVerifiedPhoneNumber) {
    const connection = await createDBConnection()
    const [selectionFromRecTable] = await connection.query(`SELECT * FROM recipents WHERE phone_number = ? `, [actualVerifiedPhoneNumber]);
    return selectionFromRecTable
}


async function selectionFromRecipentsForDonDisplay(recBloodType, userOrgan) {
    const connection = await createDBConnection();
    const [selectionFromRecipentsForDonDisplay] = await connection.query(`SELECT users.first_name, users.gender , users.age , users.location , users.email,
         users.blood_type ,organ.organ_name , organ.organ_id , recipents.phone_number , recipents.status 
         FROM recipents 
         JOIN users ON recipents.phone_number = users.phone_number
         JOIN organ ON recipents.organ_id = organ.organ_id 
         WHERE users.blood_type = ? AND recipents.organ_id = ? AND status  = ?  `, [recBloodType, userOrgan, 'Pending']);
    return selectionFromRecipentsForDonDisplay

}

async function selectionFromRecTableJoin(actualVerifiedPhoneNumber) {
    const connection = await createDBConnection();
    const [selectionFromRecTable] = await connection.query(`SELECT organ.organ_name, users.first_name ,users.role, organ.organ_id ,
            users.blood_type , users.age, 
            recipents.wait_id AS wait_id , recipents.phone_number , recipents.organ_id , recipents.status , recipents.reg_date AS date
            FROM recipents
            JOIN organ ON recipents.organ_id = organ.organ_id 
            JOIN users ON recipents.phone_number = users.phone_number
            WHERE recipents.phone_number = ?` , [actualVerifiedPhoneNumber])
    return selectionFromRecTable
}


async function getEyeRecipentForMatching(userOrgan) {

    const connection = await createDBConnection();
    const [getEyeRecipent] = await connection.query(`SELECT recipents.* , users.first_name ,
             users.last_name , users.age ,users.blood_type , organ.organ_name ,users.location , users.gender 
             FROM recipents 
             JOIN users ON recipents.phone_number = users.phone_number
             JOIN organ ON recipents.organ_id = organ.organ_id
             WHERE recipents.organ_id = ? AND status = ? ` , [userOrgan, 'Pending'])

    return getEyeRecipent;
}



module.exports = {
    getRecInfoQuery,
    updateRecTable,
    insertionToRecTable,
    selectionFromRecTable,
    selectionFromRecipentsForDonDisplay,
    selectionFromRecTableJoin,
    getEyeRecipentForMatching
}