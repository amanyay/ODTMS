const createDBConnection = require('../config/db');

async function updatePassword(password2, actualVerifiedForgetPasswordPhoneNumber) {
    const connection = await createDBConnection();
    const [updatePassword] = await connection.query(`UPDATE users SET password = ? 
        WHERE phone_number = ? `, [password2, actualVerifiedForgetPasswordPhoneNumber])

    return updatePassword;
}


async function insertfaydaNumberInt(faydaNumberInt, tokenVerifiedPhoneNumber) {
    const connection = await createDBConnection();
    const [insertfaydaNumberInt] = await connection.query(`UPDATE users SET fayda_no = ? 
            WHERE phone_number = ? ` , [faydaNumberInt, tokenVerifiedPhoneNumber])
    return insertfaydaNumberInt
}


async function selectionFromUsersTableForForgetPassword(phoneNumber) {

    const connection = await createDBConnection();
    const [selectionFromUsersTableForForgetPassword] = await connection.query(`SELECT phone_number FROM users 
                WHERE phone_number = ? AND role != ? ` , [phoneNumber, 'admin'])
    return selectionFromUsersTableForForgetPassword
}


async function userLoginSelection(phoneNumber) {
    const connection = await createDBConnection();
    const [userLoginSelection] = await connection.query(`SELECT phone_number , password , role FROM users 
                WHERE phone_number = ? AND role != ?  `, [phoneNumber, 'admin']);
    return userLoginSelection
}


async function userDeleteAccount(actualVerifiedPhoneNumber) {
    const connection = await createDBConnection();
    const deleteAccount = connection.query(`DELETE FROM users WHERE phone_number = ?`, [actualVerifiedPhoneNumber])
    return deleteAccount
}


async function selectionForProfile(actualVerifiedPhoneNumber) {
    const connection = await createDBConnection();
    const [selectionForProfile] = await connection.query(`SELECT * FROM users WHERE phone_number = ? `, [actualVerifiedPhoneNumber]);
    return selectionForProfile
}


async function qrGenerator(actualVerifiedPhoneNumber) {
    const connection = await createDBConnection();
    const [selectForqr] = await connection.query(`SELECT phone_number , first_name FROM users 
            WHERE phone_number = ? `, [actualVerifiedPhoneNumber])
    return selectForqr
}


async function userSignUp(phoneNumber) {
    const connection = await createDBConnection();

    const [selectionFromUsersTable] = await connection.query(`SELECT phone_number FROM users WHERE phone_number = ? `, [phoneNumber]);

    return selectionFromUsersTable

}


async function signupInsertionQuery(phoneNumber, firstName, lastName, email, password, selectedValue) {
    const connection = await createDBConnection();
    const signupInsertionQuery = await connection.query(`INSERT INTO users (first_name, last_name ,phone_number ,email ,
                 password , role) VALUES (?,?,?,?,?,?)` , [firstName, lastName, phoneNumber, email, password, selectedValue]);
    return signupInsertionQuery
}


async function updateUserProfile(firstname, lastName, email, age, location, gender, bloodType, actualVerifiedPhoneNumber) {
    const connection = await createDBConnection();
    const [updateUsersTable] = await connection.query(`UPDATE users SET 
        first_name = ? , 
        last_name = ?,
        email = ?,
        age = ? , 
        location = ? , 
        gender = ? , 
        blood_type = ? 
        WHERE phone_number = ? `, [firstname, lastName, email, age, location, gender, bloodType, actualVerifiedPhoneNumber])

    return updateUsersTable
}


async function updateUserForm(firstName, lastName, age, location, gender, bloodType, actualVerifiedPhoneNumber) {
    const connection = await createDBConnection();
    const [updateUserForm] = await connection.query(`UPDATE users SET  first_name = ? ,last_name = ? , age = ? , location = ? 
                , gender = ? , blood_type = ? WHERE phone_number = ? ` , [firstName, lastName, age, location, gender, bloodType, actualVerifiedPhoneNumber]);
    return updateUserForm;
}

async function selectionRole(actualVerifiedPhoneNumber) {
    const connection = await createDBConnection();
    const [selectionRole] = await connection.query(`SELECT role from users WHERE phone_number = ? `, [actualVerifiedPhoneNumber]);
    return selectionRole
}

module.exports = {
    updatePassword,
    insertfaydaNumberInt,
    selectionFromUsersTableForForgetPassword,
    userLoginSelection,
    userDeleteAccount,
    selectionForProfile,
    qrGenerator,
    userSignUp,
    updateUserProfile,
    updateUserForm,
    selectionRole,
    signupInsertionQuery
}