
const SystemLog = require('../models/SystemLog');

exports.getUserAuditLogs = async (req, res) => {
    try {
        const logs = await SystemLog.getUserAuditLogs();

        res.json({
            success: true,
            data: logs
        });
    } catch (error) {
        console.error('Could not load user audit logs:', error.message);

        res.status(500).json({
            success: false,
            message: 'Could not load user audit logs.'
        });
    }
};
