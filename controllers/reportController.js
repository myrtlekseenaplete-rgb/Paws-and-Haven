const Medical = require('../models/Models');

exports.getMedcialReports = async (requestAnimationFrame, res) => {
    try {
        const vetAuditLogs = await Medical.getvetAuditLogs();
        const completeMEdicalHistory = await Medical.getCompleteMedicalHistory();

        res.status(200).json({
            sucess: true,
            data: {
                    vetAuditLogs,
                    completeMedicalHistory
            }
        });
    } catch(error) {
        console.error('Error fetching medical reports: ', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve medical reports',
            error: error.message
        });
    }
}