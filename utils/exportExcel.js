const ExcelJS = require('exceljs');
const Connection = require('../models/Connection');

async function exportConnectionsToExcel() {
    try {
        const connections = await Connection.findAll({ order: [
                ['createdAt', 'DESC']
            ] });
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Connections');

        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Wallet Address', key: 'walletAddress', width: 30 },
            { header: 'Wallet Type', key: 'walletType', width: 20 },
            { header: 'Parcel Code', key: 'parcelCode', width: 20 },
            { header: 'USD Amount', key: 'usdAmount', width: 10 },
            { header: 'Token Amount', key: 'tokenAmount', width: 10 },
            { header: 'Timestamp', key: 'createdAt', width: 25 }
        ];

        connections.forEach(conn => {
            worksheet.addRow({
                id: conn.id,
                walletAddress: conn.walletAddress,
                walletType: conn.walletType,
                parcelCode: conn.parcelCode,
                usdAmount: conn.usdAmount || '',
                tokenAmount: conn.tokenAmount || '',
                createdAt: new Date(conn.createdAt).toLocaleString()
            });
        });

        await workbook.xlsx.writeFile('Connections.xlsx');
        console.log('Excel file Connections.xlsx generated.');
    } catch (error) {
        console.error('Error exporting to Excel:', error);
    }
}

module.exports = exportConnectionsToExcel;