
const Rescue = require('../models/rescue');
const db = require('../config/db');

// Submit a rescue request
exports.showRescueForm = (req, res) => {
    res.render('calingacion/rescueForm');
};
exports.createRescueRequest = async (req, res) => {
    try {
        await Rescue.create({
            species: req.body.species,
            size: req.body.size,
            urgency: req.body.urgency,
            address: req.body.location?.address,
            reportedBy: req.body.reportedBy
        });

        res.redirect('/rescue/dashboard');
    } catch (error) {
        console.error('Error creating rescue request:', error.message);
        res.status(500).send('Could not submit rescue request.');
    }
};

// Display rescue requests
exports.getRescueRequests = async (req, res) => {
    try {
        const requests = await Rescue.getAll();
        res.render('calingacion/rescueDashboard', { requests });
    } catch (error) {
        console.error('Error loading rescue requests:', error.message);
        res.status(500).send('Could not load rescue dashboard.');
    }
};

// Match a pending rescue request to an approved foster applicant
exports.autoMatchAndPlace = async (req, res) => {
    try {
        const rescue = await Rescue.findById(req.params.rescueId);

        if (!rescue) {
            return res.status(404).json({ message: 'Rescue request not found.' });
        }

        if (rescue.status !== 'Pending') {
            return res.json({ message: 'This rescue request is already assigned.' });
        }

        const [applicants] = await db.query(`
            SELECT fa.applicant_id,
                   COUNT(CASE WHEN fas.status = 'Active' THEN 1 END) AS active_count
            FROM foster_applicants fa
            LEFT JOIN foster_assignments fas
                ON fa.applicant_id = fas.applicant_id
            WHERE fa.approval_status = 'Approved'
            GROUP BY fa.applicant_id
            ORDER BY active_count ASC, fa.applicant_id ASC
            LIMIT 1
        `);

        if (applicants.length === 0) {
            return res.json({ message: 'No approved foster applicants found.' });
        }

        const applicantId = applicants[0].applicant_id;

        await db.query(`
            UPDATE rescue_requests
            SET applicant_id = ?, status = 'Assigned'
            WHERE rescue_id = ?
        `, [applicantId, req.params.rescueId]);

        res.json({
            success: true,
            message: 'Rescue request matched with an approved foster applicant.',
            applicantId
        });

    } catch (error) {
        console.error('Error matching rescue request:', error.message);
        res.status(500).json({ error: error.message });
    }
};
