const createDBConnection = require('../config/db');


async function selectionFromRecReqTable(actualVerifiedPhoneNumber) {

    const connection = await createDBConnection();
    const [selectionFromRecReqTable] = await connection.query(`SELECT organ.organ_name, users.first_name ,
            users.role, organ.organ_id , waiting_list.*
            FROM waiting_list
            JOIN organ ON waiting_list.organ_id = organ.organ_id 
            JOIN users ON waiting_list.rec_phone_number = users.phone_number
            WHERE rec_phone_number = ?` , [actualVerifiedPhoneNumber])
    return selectionFromRecReqTable;
}


async function waitingListSelection(actualVerifiedPhoneNumber) {
    const connection = await createDBConnection();
    const [waitingListSelection] = await connection.query(`SELECT * FROM waiting_list WHERE rec_phone_number = ? `
        , [actualVerifiedPhoneNumber])
    return waitingListSelection
}


async function selectionFromRecReqTableForReqBtn(actualVerifiedPhoneNumber, donorPhoneNumber, organId) {
    const connection = await createDBConnection();
    const [selectionFromRecReqTableForReqBtn] = await connection.query(`SELECT * FROM waiting_list WHERE 
            rec_phone_number = ? AND don_phone_number = ? `, [actualVerifiedPhoneNumber, donorPhoneNumber]);

    const insertionQueryForReqBtn = await connection.query(`INSERT INTO waiting_list (rec_phone_number , don_phone_number , organ_id)
         VALUES (?,?,?)`, [actualVerifiedPhoneNumber, donorPhoneNumber, organId]);
    return ({
        selectionFromRecReqTableForReqBtn: selectionFromRecReqTableForReqBtn,
        insertionQueryForReqBtn: insertionQueryForReqBtn
    })

}


async function approvedNotification(actualVerifiedPhoneNumber) {
    const connection = await createDBConnection();
    const [approvedRecipentSelectionQuery] = await connection.query(`SELECT  waiting_list.id , u1.first_name AS rec_name, 
                waiting_list.rec_phone_number , waiting_list.don_phone_number,waiting_list.date, waiting_list.status,
                organ.organ_name, organ.organ_id, u2.first_name AS don_name
                FROM waiting_list
                JOIN organ ON waiting_list.organ_id = organ.organ_id 
                JOIN users AS u1 ON waiting_list.rec_phone_number = u1.phone_number
                JOIN users AS u2 ON waiting_list.don_phone_number = u2.phone_number
                WHERE waiting_list.rec_phone_number = ?
                ORDER BY waiting_list.date DESC`, [actualVerifiedPhoneNumber]);

    const [approvedDonorSelectionQuery] = await connection.query(`SELECT waiting_list.id , u2.first_name AS rec_name, waiting_list.rec_phone_number ,
                waiting_list.don_phone_number,waiting_list.date, waiting_list.status,
                organ.organ_name, organ.organ_id, u1.first_name AS don_name
                FROM waiting_list
                JOIN organ ON waiting_list.organ_id = organ.organ_id 
                JOIN users AS u1 ON waiting_list.rec_phone_number = u1.phone_number
                JOIN users AS u2 ON waiting_list.don_phone_number = u2.phone_number
                WHERE waiting_list.don_phone_number = ? `, [actualVerifiedPhoneNumber]);
    return ({
        approvedDonorSelectionQuery: approvedDonorSelectionQuery,
        approvedRecipentSelectionQuery: approvedRecipentSelectionQuery
    })
}




module.exports = {
    selectionFromRecReqTable,
    waitingListSelection,
    selectionFromRecReqTableForReqBtn,
    approvedNotification
}