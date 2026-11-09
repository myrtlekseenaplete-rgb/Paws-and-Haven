const Medical = require('../models/Medical');

const medicalController = {
    renderMedicalLogs: async (req, res) => {
        try {
            const logs = await Medical.getVetAuditlogs();
            res.render('plete/medical-logs', { logs });
        } catch (err) {
            res.status(500).send('Server Error: ' + err.message);
        }
    },
    renderCreateForm: async (req, res) => {
        try {
            const logs = await Medical.getVetAuditlogs();
            res.render('plete/medical-logs', { logs });
        } catch (err) {
            res.status(500).send('Server Error: ' + err.message);
        }
    },
    createRecord: async (req, res) => {
        try {
            const recordData = {
                pet_id: req.body.animal_id || req.body.pet_id,
                diagnosis: req.body.diagnosis,
                treatment: req.body.treatment,
                record_date: req.body.record_date
            };
            await Medical.create(recordData);
            res.redirect('/medical');
        } catch (err) {
            res.status(500).send('Server Error: ' + err.message);
        }
    },
    renderJoinReports: async (req, res) => {
        try {
            const reports = await Medical.getCompleteMedicalHistory();
            res.render('medical-reports', { reports });
        } catch (err) {
            res.status(500).send('Server Error: ' + err.message);
        }
    }
};

module.exports = medicalController;