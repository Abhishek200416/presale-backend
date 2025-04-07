// backend/routes/api.js

const express = require('express');
const router = express.Router();
const connectionController = require('../controllers/connectionController');
const Connection = require('../models/Connection');

// Health check route
router.get('/', (req, res) => {
    res.status(200).json({ message: 'API is working!' });
});

// Create a new connection
router.post('/connection', connectionController.createConnection);

// Update a connection by ID
router.put('/connection/:id', connectionController.updateConnection);

// Get all connections sorted by createdAt DESC
router.get('/connections', async(req, res) => {
    try {
        const connections = await Connection.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        });
        res.status(200).json(connections);
    } catch (error) {
        console.error('Error fetching connections:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;