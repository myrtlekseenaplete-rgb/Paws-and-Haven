const Medical = require('../models/Medical');

const medicalController = {
    renderMedicalLogs: async (req, res) => {
        try {
            const logs = await Medical.getVetAuditlogs();
            res.render('medical-logs', { logs });
        } catch (err) {
            res.status(500).send('Server Error: ' + err.message);
        }
    },
    renderCreateForm: async (req, res) => {
        try {
            const logs = await Medical.getVetAuditlogs();
            res.render('medical-logs', { logs }); // Renders the consolidated page containing the form & table
        } catch (err) {
            res.status(500).send('Server Error: ' + err.message);
        }
    },
    createRecord: async (req, res) => {
        try {
            const recordData = {
                pet_id: req.body.animal_id || req.body.pet_id,
                vet_id: req.body.vet_id,
                diagnosis: req.body.diagnosis,
                treatment: req.body.treatment,
                record_date: req.body.record_date,
                notes: req.body.notes
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