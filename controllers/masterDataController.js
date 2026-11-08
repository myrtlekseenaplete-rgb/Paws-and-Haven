
const MasterData = require('../models/MasterData');

exports.getMasterData = async (req, res) => {
    try {
        const species = await MasterData.getSpecies();
        const breeds = await MasterData.getBreeds();
        const branches = await MasterData.getShelterBranches();

        res.render('nillas/master-data', {
            species,
            breeds,
            branches
        });
    } catch (error) {
        console.error('Could not load master data:', error.message);
        res.status(500).send('Could not load master data.');
    }
};