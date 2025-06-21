var express = require('express');
var router = express.Router();
var db = require('../models/db');

router.get('/dogs', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT
            d.dog_id,
            d.name,
            d.size,
            d.owner_id,
            u.username AS owner_username
            FROM Dogs d
            JOIN Users u ON d.owner_id = u.user_id
            `);
            res.json(rows);
    } catch(err){
        console.error('Error fetching data', err);
        res.status(500).json({error:'Server error'});
    }
});

router.get('/mydogs', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT
            d.dog_id,
            d.name,
            d.size,
            d.owner_id,
            u.username AS owner_username
            FROM Dogs d
            JOIN Users u ON d.owner_id = u.user_id
            `);
            res.json(rows);
    } catch(err){
        console.error('Error fetching data', err);
        res.status(500).json({error:'Server error'});
    }
});


module.exports = router;