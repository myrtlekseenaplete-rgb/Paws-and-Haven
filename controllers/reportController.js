const Report = require('../models/Report');
const Medical = require('../models/Medical');

// Animal Report - Gladys
exports.getAnimalReport = async (req, res) => {
    try {
        const animals = await Report.getAnimalSpeciesBranchReport();

        res.render('nillas/animal-report', {
            animals
        });
    } catch (error) {
        console.error('Could not load animal report:', error.message);
        res.status(500).send('Could not load animal report.');
    }
};

// Medical Reports - Group feature
exports.getMedicalReports = async (req, res) => {
    try {
        const vetAuditLogs = await Medical.getvetAuditLogs();
        const completeMedicalHistory = await Medical.getCompleteMedicalHistory();

        res.status(200).json({
            success: true,
            data: {
                vetAuditLogs,
                completeMedicalHistory
            }
        });
    } catch (error) {
        console.error('Error fetching medical reports:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve medical reports',
            error: error.message
        });
    }
};