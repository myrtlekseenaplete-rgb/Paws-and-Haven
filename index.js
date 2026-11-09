const express = require('express');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Test DB Connection
const db = require('./config/db');
db.getConnection()
    .then((conn) => {
        console.log('Successfully connected to MySQL Database');
        conn.release();
    })
    .catch((err) => {
        console.error('Database connection failed:', err.message);
    });

// Routes
app.use('/system-logs', require('./routes/systemLogRoutes'));
app.use('/reports', require('./routes/reportRoutes'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/master-data', require('./routes/masterDataRoutes'));
app.use('/users', require('./routes/userRoutes'));

app.use('/foster', require('./routes/fosterRoutes'));
app.use('/fosters', require('./routes/fosterRoutes'));

app.use('/animals', require('./routes/animalRoutes'));
app.use('/adoptions', require('./routes/adoptionRoutes'));
app.use('/audit', require('./routes/auditRoutes'));
app.use('/rules', require('./routes/ruleEngineRoutes'));

app.use('/medical', require('./routes/medicalRoutes'));
app.use('/rescue', require('./routes/rescueRoutes'));

// Home route
app.get('/', (req, res) => {
    res.send('Paws and Haven server is running!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Paws and Haven running at http://localhost:${PORT}`);
});