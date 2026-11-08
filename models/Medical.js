const db = require('../config/db');

const Medical = {
    getVetAuditlogs: async () => {
        const query = ` 
            SELECT
                record_id AS id,
                pet_id AS animal_id,
                diagnosis,
                treatment,
                NOW() AS record_date,
                'N/A' AS vet_name,
                'General' AS specialization
            FROM medical_records
            ORDER BY record_id DESC;
        `;
        const [rows] = await db.query(query);
        return rows;
    },    
    
    create: async (newData) => {
        const query = "INSERT INTO medical_records SET ?";
        const [result] = await db.query(query, [newData]);
        return result;
    },
    
    getCompleteMedicalHistory: async () => {
        const query = `
            SELECT 
                record_id,
                pet_id,
                diagnosis
            FROM medical_records;
        `;
        const [rows] = await db.query(query);
        return rows;
    }
};

module.exports = Medical;