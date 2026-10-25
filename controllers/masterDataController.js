const MasterData = require('../models/MasterData');

exports.getSpeciesAndBreeds = async (req, res) => {
  try {
    const species = await MasterData.getAllSpecies();
    res.render('member-A/master-data', { species });
  } catch (err) {
    res.status(500).send('Error loading master data.');
  }
};