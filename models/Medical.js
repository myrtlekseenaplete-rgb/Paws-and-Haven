const db = require('../config/db'); // Adjust this path if your DB connection file is elsewhere

const MedicalRecord = {
    // 1. Get all medical records with vet and animal details
    getAll: async () => {
        const query = `
            SELECT mr.*, v.name as vet_name, v.specialization 
            FROM medical_records mr
            LEFT JOIN veterinarians v ON mr.vet_id = v.id
        `;
        const [rows] = await db.query(query);
        return rows;
    },

    // 2. Create a new medical record
    create: async (data) => {
        const { animal_id, vet_id, diagnosis, treatment, record_date, notes } = data;
        const query = `
            INSERT INTO medical_records (animal_id, vet_id, diagnosis, treatment, record_date, notes)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.execute(query, [animal_id, vet_id, diagnosis, treatment, record_date, notes]);
        return result;
    },

    // 3. Special Join Report: RIGHT JOIN (All veterinarians, and matching medical records if any)
    getRightJoinReport: async () => {
        const query = `
            SELECT v.name AS veterinarian_name, v.specialization, mr.diagnosis, mr.treatment, mr.record_date
            FROM medical_records mr
            RIGHT JOIN veterinarians v ON mr.vet_id = v.id
        `;
        const [rows] = await db.query(query);
        return rows;
    },

    // 4. Special Join Report: FULL OUTER JOIN simulation using UNION (All records and all vets, matched or unmatched)
    getFullOuterJoinReport: async () => {
        const query = `
            SELECT mr.id AS record_id, mr.diagnosis, v.name AS vet_name
            FROM medical_records mr
            LEFT JOIN veterinarians v ON mr.vet_id = v.id
            UNION
            SELECT mr.id AS record_id, mr.diagnosis, v.name AS vet_name
            FROM medical_records mr
            RIGHT JOIN veterinarians v ON mr.vet_id = v.id
        `;
        const [rows] = await db.query(query);
        return rows;
    }
};

module.exports = MedicalRecord;