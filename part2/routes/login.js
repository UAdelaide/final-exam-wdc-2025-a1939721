const express = require('express');
const router = express.Router();
const db = require('../models/db');

// POST login
router.post('/login', async (req, res) =>{
    const { username, password } req.body;
})

module.exports = router;