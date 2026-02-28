const mysql = require('mysql2/promise');

async function createDBConnection() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: '',
        database: process.env.DB_NAME
    });

    return connection;
}

module.exports = createDBConnection;
