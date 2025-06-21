var express = require('express');
var router = express.Router();
var db = require('../db');

// Q6
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

// Q7
router.get('/walkrequests/open', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT
            wReq.request_id,
            d.name AS dog_name,
            wReq.requested_time,
            wReq.duration_minutes,
            wReq.location,
            u.username As owner_username
            FROM WalkRequests wReq
            JOIN Dogs d ON wReq.dog_id = d.dog_id
            JOIN Users u ON d.owner_id = u.user_id
            WHERE wReq.status = 'open'
            `);
            res.json(rows);
    } catch(err){
        console.error('Error fetching data', err);
        res.status(500).json({error:'Server error'});
    }
});

// Q8
router.get('/walkers/summary', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT
            u.username AS walker_username,
            COUNT(wRate.rating_id) AS total_ratings,
            AVG(wRate.rating) AS average_rating,
            COUNT(wReq.request_id) AS completed_walks
            FROM Users u
            LEFT JOIN WalkApplications wa ON u.user_id = wa.walker_id AND wa.status = 'accepted'
            LEFT JOIN WalkRequests wReq ON wa.request_id = wReq.request_id AND wReq.status = 'completed'
            LEFT JOIN WalkRatings wRate ON wRate.walker_id = u.user_id AND wRate.request_id = wReq.request_id
            WHERE u.role = 'walker'
            GROUP BY
            u.user_id, u.username
            `);
            res.json(rows);
    } catch(err){
        console.error('Error fetching data', err);
        res.status(500).json({error:'Server error'});
    }
});