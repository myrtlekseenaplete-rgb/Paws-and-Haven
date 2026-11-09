const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
    async getAll() {
        const [rows] = await db.query(
            `SELECT id, full_name, email, role, created_at
             FROM users
             ORDER BY id DESC`
        );
        return rows;
    },

    async getById(id) {
        const [rows] = await db.query(
            `SELECT id, full_name, email, role
             FROM users WHERE id = ?`,
            [id]
        );
        return rows[0];
    },

    async create(data) {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const [result] = await db.query(
            `INSERT INTO users (full_name, email, password, role)
             VALUES (?, ?, ?, ?)`,
            [data.full_name, data.email, hashedPassword, data.role]
        );

        return result.insertId;
    },

    async update(id, data) {
        const [result] = await db.query(
            `UPDATE users
             SET full_name = ?, email = ?, role = ?
             WHERE id = ?`,
            [data.full_name, data.email, data.role, id]
        );

        return result.affectedRows;
    },

    async delete(id) {
        const [result] = await db.query(
            'DELETE FROM users WHERE id = ?',
            [id]
        );

        return result.affectedRows;
    }
};

module.exports = User;