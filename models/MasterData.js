
const db = require('../config/db');

const MasterData = {
    async getSpecies() {
        const [rows] = await db.query(
            'SELECT species_id, species_name FROM species ORDER BY species_name'
        );
        return rows;
    },

    async getBreeds() {
        const [rows] = await db.query(
            `SELECT b.breed_id, b.breed_name, s.species_name
             FROM breeds b
             LEFT JOIN species s ON s.species_id = b.species_id
             ORDER BY b.breed_name`
        );
        return rows;
    },

    async getShelterBranches() {
        const [rows] = await db.query(
            `SELECT branch_id, branch_name, address, contact_number
             FROM shelter_branches
             ORDER BY branch_name`
        );
        return rows;
    }
};

module.exports = MasterData;