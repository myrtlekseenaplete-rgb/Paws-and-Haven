
const db = require('../config/db');

const SystemLog = {
    async getUserAuditLogs() {
        const [rows] = await db.query(`
            SELECT
                sl.log_id,
                u.id AS user_id,
                u.full_name,
                u.email,
                sl.action,
                sl.description,
                sl.ip_address,
                sl.created_at
            FROM system_logs sl
            INNER JOIN users u ON u.id = sl.user_id
            ORDER BY sl.created_at DESC
        `);

        return rows;
    },

    async create(data) {
        const [result] = await db.query(
            `INSERT INTO system_logs
             (user_id, action, description, ip_address)
             VALUES (?, ?, ?, ?)`,
            [
                data.user_id || null,
                data.action,
                data.description || null,
                data.ip_address || null
            ]
        );

        return result.insertId;
    }
};

module.exports = SystemLog;
