const MedicalRecord = require('../models/MedicalRecord');

const medicalController = {
    // Render the medical logs page with all records
    renderMedicalLogs: async (req, res) => {
        try {
            const records = await MedicalRecord.getAll();
            res.render('plete/medical-logs', { records });
        } catch (error) {
            console.error("Error fetching medical logs:", error);
            res.status(500).send("Server Error");
        }
    },

    // Handle creating a new medical record
    createRecord: async (req, res) => {
        try {
            await MedicalRecord.create(req.body);
            res.redirect('/medical');
        } catch (error) {
            console.error("Error creating medical record:", error);
            res.status(500).send("Server Error");
        }
    },

    // Render the special Join Reports page (Right Join & Full Outer Join)
    renderJoinReports: async (req, res) => {
        try {
            const rightJoinData = await MedicalRecord.getRightJoinReport();
            const fullOuterJoinData = await MedicalRecord.getFullOuterJoinReport();
            
            res.render('plete/join-reports', { 
                rightJoin: rightJoinData, 
                fullOuterJoin: fullOuterJoinData 
            });
        } catch (error) {
            console.error("Error fetching join reports:", error);
            res.status(500).send("Server Error");
        }
    }
};

module.exports = medicalController;