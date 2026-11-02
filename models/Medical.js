const { useInsertionEffect } = require('react');
const db = require ('./config/db');

const Medical = {
    getVetAuditlogs: async () => {
          const query = ` 
           SELECT
            v.vet_id,
            v.first_name,
            v.last_name,
            v.specialization,
            mr.record_id,
            mr.diagnosis,
            mr.treatment_date
        FROM medical_records mr 
        RIGHT JOIN veterinarians v ON mr.vet_id = v.vet_id;
        ORDER BY v.vet_id ASC;
        `;
       const [rows] = await db.query(query);
       return rows;
        
    },     
    
    getCompleteMedicalHistory: async () => {
        const query =`
        SELECT 
            mr.record_id,
            mr.pet_id,
            mr.diagnosis,
            vs.schedule_id,
            vs.vaccine_name,
            vs.next_due_date
        FROM medical_records mr
        LEFT JOIN vaccination_schedule vs ON mr.pet_id = vs.pet_id;
        
        UNION 
        
        SELECT 
            mr.record_id,
            mr.pet_id,
            mr.diagnosis,
            vs.schedule_id,
            vs.vaccine_name,
            vs.next_due_date
        FROM medical_records mr 
        RIGHT JOIN vaccination_schedule vs ON mr.pet_id = vs.pet_id;
        `;
        const [rows] = await db.query(query);
        return rows;
        
    }
}

module.exports = Medical;