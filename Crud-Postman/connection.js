const mysql = require('mysql2');

// Create a connection 
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_postman',
});

// Test the connection
mysqlConnection.connect((err, connection) => {
    if (err) {
        console.error('Error in DB Connection: ', err);
        return;
    }
    console.log('DB Connected Successfully...');
});

module.exports = mysqlConnection;
