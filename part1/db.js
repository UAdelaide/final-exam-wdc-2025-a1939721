const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'mypassword',
    database: 'dogwalks'
});


module.exports = db;