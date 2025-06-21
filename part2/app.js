const express = require('express');
const path = require('path');
require('dotenv').config();
const session = require('express-session')

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

app.use(
    session({
        secret: process.env.SESSION_SECRET || 'secretS_dogwalk',
        resave: false,
        saveUninitialized: false,
        cookie: {httpOnly: true, maxAge: 1000 * 60 * 60}
    })
);

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');
const dogRoutes = require('./routes/dogRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

// Export the app instead of listening here
module.exports = app;