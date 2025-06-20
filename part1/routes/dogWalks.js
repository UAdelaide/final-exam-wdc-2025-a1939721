var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/dogs', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT
            d.name AS dog_name,
            d.size,
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

router.get('/walkrequests/open', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT
            wr.request_id,
            d.name AS dog_name,
            wr.requested_time,
            wr.duration_minutes,
            wr.location,
            u.username As owner_username
            FROM WalkRequests wr
            JOIN Dogs d ON wr.dog_id = d.dog_id
            JOIN Users u ON d.owner_id = u.user_id
            WHERE wr.status = 'open's
            `);
            res.json(rows);
    } catch(err){
        console.error('Error fetching data', err);
        res.status(500).json({error:'Server error'});
    }
});



module.exports = router;