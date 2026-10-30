const db = require("../config/db");

async function create({ userId = null, action, entityType, entityId = null, details = {}, ipAddress = null, status = "SUCCESS", }) {
    const sql = "INSERT INTO audit_logs (user_id, action, entity_type, entity_id, details, ip_address, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const [result] = await db.execute(sql, [
        userId,
        action,
        entityType,
        entityId,
        JSON.stringify(details),
        ipAddress,
        status,
    ]);
    return result.insertId;
}

async function list({ limit = 100, action = "", status = "" } = {}) {
    const conditions = [];
    const params = [];
    if (action) {
        conditions.push("action = ?");
        params.push(action);
    }
    if (status) {
        conditions.push("status = ?");
        params.push(status);
    }
    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    const safeLimit = Math.max(1, Math.min(Number(limit) || 100, 500));
    const [rows] = await db.execute(
        `SELECT id, user_id, action, entity_type, entity_id, details, ip_address, status, created_at FROM audit_logs ${where} ORDER BY created_at DESC LIMIT ${safeLimit}`,
        params
    );
    return rows;
}

module.exports = { create, list };