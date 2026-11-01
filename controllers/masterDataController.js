const MasterData = require('../models/MasterData');

const masterDataController = {
    getSpeciesAndBranches: async (req, res) => {
        try {
            const species = await MasterData.getAllSpecies();
            const branches = await MasterData.getAllBranches();
            res.render('nillas/master-data', { species, branches });
        } catch (err) {
            res.status(500).send('Server Error fetching master data.');
        }
    }
};

module.exports = masterDataController;