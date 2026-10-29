const db = require('../config/db');

const MasterData = {
  getAllSpecies: async () => {
    const [rows] = await db.execute('SELECT * FROM species');
    return rows;
  },

  getBreedsBySpecies: async (speciesId) => {
    const [rows] = await db.execute('SELECT * FROM breeds WHERE species_id = ?', [speciesId]);
    return rows;
  }
};

module.exports = MasterData;

const db = require('../config/db');

const MasterData = {
    getAllSpecies: async () => {
        const [rows] = await db.execute('SELECT * FROM species');
        return rows;
    },
    getBreedsBySpecies: async (speciesId) => {
        const [rows] = await db.execute('SELECT * FROM breeds WHERE species_id = ?', [speciesId]);
        return rows;
    },
    getAllBranches: async () => {
        const [rows] = await db.execute('SELECT * FROM shelter_branches');
        return rows;
    },
    getAllRoles: async () => {
        const [rows] = await db.execute('SELECT * FROM roles');
        return rows;
    }
};

module.exports = MasterData;