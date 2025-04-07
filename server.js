const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/database');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

// Routes
const connectionRoutes = require('./routes/api');
app.use('/api/connection', connectionRoutes);

// Test DB connection
sequelize.authenticate()
    .then(() => {
        console.log('✅ MySQL connected');
        return sequelize.sync(); // ensure tables are created
    })
    .catch(err => {
        console.error('❌ MySQL connection error:', err);
    });

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});