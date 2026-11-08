const Report = require('../models/Report');

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