const db = require('../config/db'); // mysql2/promise pool

const Animal = {
  async getAll() {
    const [rows] = await db.query(
      `SELECT a.*, s.species_name, b.breed_name
       FROM animals a
       JOIN species s ON s.species_id = a.species_id
       LEFT JOIN breeds b ON b.breed_id = a.breed_id
       ORDER BY a.animal_id DESC`);
    return rows;
  },
  async getById(id) {
    const [rows] = await db.query('SELECT * FROM animals WHERE animal_id = ?', [id]);
    return rows[0];
  },
  async create(d) {
    const [r] = await db.query(
      `INSERT INTO animals (name,species_id,breed_id,branch_id,age_months,gender,health_status,status,admission_date)
       VALUES (?,?,?,?,?,?,?,?,?)`,
      [d.name, d.species_id, d.breed_id || null, d.branch_id, d.age_months, d.gender,
       d.health_status || 'Healthy', 'Available', d.admission_date]);
    return r.insertId;
  },
  async update(id, d) {
    const [r] = await db.query(
      `UPDATE animals SET name=?, species_id=?, breed_id=?, branch_id=?, age_months=?, gender=?, health_status=?, admission_date=?
       WHERE animal_id=?`,
      [d.name, d.species_id, d.breed_id || null, d.branch_id, d.age_months, d.gender,
       d.health_status, d.admission_date, id]);
    return r.affectedRows;
  },
  async setStatus(id, status, conn = db) {
    const [r] = await conn.query('UPDATE animals SET status=? WHERE animal_id=?', [status, id]);
    return r.affectedRows;
  },
  async remove(id) {
    const [r] = await db.query('DELETE FROM animals WHERE animal_id=?', [id]);
    return r.affectedRows;
  },
  // JOIN REPORT 2 - LEFT JOIN
  async fosterDashboardReport() {
    const [rows] = await db.query(
      `SELECT a.animal_id, a.name AS animal_name, a.status AS animal_status,
              fa.assignment_id, fa.start_date, fa.end_date, fa.status AS foster_status,
              u.full_name AS foster_parent
       FROM animals a
       LEFT JOIN foster_assignments fa ON fa.animal_id = a.animal_id AND fa.status = 'Active'
       LEFT JOIN foster_applicants fap ON fap.applicant_id = fa.applicant_id
       LEFT JOIN users u ON u.user_id = fap.user_id
       ORDER BY a.animal_id`);
    return rows;
  }
};
module.exports = Animal;
