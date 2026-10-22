const mysql = require('mysql2');
require('dotenv').config();

// Create a connection 
const mysqlConnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
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
