const express = require('express');
const router = express.Router();
const db = require('../models/db');

// POST login
router.post('/login', async (req, res) =>{
    const { username, password } req.body;
})

try{
    const [rows] = awaitdb.query(`
        SELECT role FROM Users
        WHERE username = ? AND
        password_hash = ?
        `,
        [username, password]);

        if
}

module.exports = router;