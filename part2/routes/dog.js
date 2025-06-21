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
        if(!req.session.user){
        return res.status(401).json({ error: 'Not logged in'});
    }

    const user_id = req.session.user.user_id;

    const [rows] = await db.query(`
            SELECT
            d.dog_id,
            name
            FROM Dogs
            WHERE owner_id = ?`, [user_id]);
            res.json(rows);
    } catch(err){
        console.error('Error fetching data', err);
        res.status(500).json({error:'Server error'});
    }
});


module.exports = router;