
const db = require('../config/db');

const Rescue = {
    async create(data) {
        const sql = `
            INSERT INTO rescue_requests
            (species, size, urgency, address, reported_by)
            VALUES (?, ?, ?, ?, ?)
        `;

        const [result] = await db.query(sql, [
            data.species,
            data.size,
            data.urgency || 'Medium',
            data.address,
            data.reportedBy
        ]);

        return result.insertId;
    },

    async getAll() {
        const [rows] = await db.query(
            'SELECT * FROM rescue_requests ORDER BY created_at DESC'
        );
        return rows;
    },

    async findById(id) {
        const [rows] = await db.query(
            'SELECT * FROM rescue_requests WHERE rescue_id = ?',
            [id]
        );
        return rows[0];
    }
};

module.exports = Rescue;
