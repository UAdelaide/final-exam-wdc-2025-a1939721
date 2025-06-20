var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/dogs', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT d.dog_id, d.name as DogName,
            `);
            res.json(rows);
    } catch(err){
        console.error('Error fetching data')
    }
});