const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'mypassword',
    database: 'DogWalkService'
});

module.exports = db;