const express = require('express');
const session = require('express-session');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

 feature/Myrtle-medical-reports
// Session middleware configuration
app.use(session({
    secret: 'paws_and_haven_secret_key_123',
    resave: false,
    saveUninitialized: false
}));

=======
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
 main
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Test DB Connection
const db = require('./config/db');
db.getConnection()
feature/Myrtle-medical-reports
  .then((conn) => {
    console.log('✓ Successfully connected to MySQL Database');
    conn.release();
  })
  .catch((err) => {
    console.error('✗ Database connection failed:', err.message);
  });

// Mount Routes
//app.use('/auth', require('./routes/authRoutes'));
app.use('/animals', require('./routes/animalRoutes'));
app.use('/fosters', require('./routes/fosterRoutes'));
//app.use('/adoptions', require('./routes/adoptionRoutes'));
app.use('/medical', require('./routes/medicalRoutes'));
app.use('/rules', require('./routes/ruleEngineRoutes'));
//app.use('/rescue', require('./routes/rescueRoutes'));
//app.use('/master', require('./routes/masterDataroutes'));

app.get('/', (req, res) => res.redirect('/medical'));

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
main

// Start server
app.listen(PORT, () => {
    console.log(`Paws and Haven running at http://localhost:${PORT}`);
});