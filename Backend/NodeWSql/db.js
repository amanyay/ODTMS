const mysql = require('mysql2/promise');

async function createDBConnection() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'odtms'
    });

    return connection;
}

module.exports = createDBConnection;
