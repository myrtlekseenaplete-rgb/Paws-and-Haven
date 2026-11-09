const db = require('../config/db');

const Report = {
    async getAnimalSpeciesBranchReport() {
        const [rows] = await db.query(
            `SELECT
                a.animal_id,
                a.name AS animal_name,
                s.species_name,
                b.breed_name,
                sb.branch_name,
                a.age_months,
                a.gender,
                a.health_status,
                a.status
             FROM animals a
             INNER JOIN species s
                ON a.species_id = s.species_id
             INNER JOIN breeds b
                ON a.breed_id = b.breed_id
             INNER JOIN shelter_branches sb
                ON a.branch_id = sb.branch_id
             ORDER BY a.animal_id`
        );

        return rows;
    }
};

module.exports = Report;