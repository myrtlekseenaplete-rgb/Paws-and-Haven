require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Test DB Connection
const db = require('./config/db');
db.getConnection()
  .then((conn) => {
    console.log('✓ Successfully connected to MySQL Database');
    conn.release();
  })
  .catch((err) => {
    console.error('✗ Database connection failed:', err.message);
  });

// Mount Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/animals', require('./routes/animalRoutes'));
app.use('/fosters', require('./routes/fosterRoutes'));
app.use('/adoptions', require('./routes/adoptionRoutes'));
app.use('/medical', require('./routes/medicalRoutes'));
app.use('/rules', require('./routes/ruleEngineRoutes'));
app.use('/rescue', require('./routes/rescueRoutes'));
app.use('/master', require('./routes/masterDataroutes'));

app.get('/', (req, res) => res.redirect('/adoptions'));

app.listen(PORT, () => {
  console.log(`🐾 Paws & Haven running at http://localhost:${PORT}`);
});