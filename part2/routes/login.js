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
        WHERE username = ? AND password_hash = ?
        `,
        [username, password]);

        if(rows.length === 0){
            return res.status(401).json({error: 'Invalid credentials'})
        }

        res.json({nessage: 'Login successful', user: row[0].role})
}

module.exports = router;