const db = require('../config/db');
const Animal = require('./Animal');

const Foster = {
  // ----- Applicants -----
  async getApplicants() {
    const [rows] = await db.query(
      `SELECT fap.*, u.full_name FROM foster_applicants fap
       JOIN users u ON u.user_id = fap.user_id ORDER BY fap.applicant_id DESC`);
    return rows;
  },
  async createApplicant(d) {
    const [r] = await db.query(
      'INSERT INTO foster_applicants (user_id,housing_type,experience_level) VALUES (?,?,?)',
      [d.user_id, d.housing_type, d.experience_level]);
    return r.insertId;
  },
  async setApproval(id, status) {
    const [r] = await db.query('UPDATE foster_applicants SET approval_status=? WHERE applicant_id=?', [status, id]);
    return r.affectedRows;
  },

  // ----- Assignments -----
  async getAssignments() {
    const [rows] = await db.query(
      `SELECT fa.*, a.name AS animal_name, u.full_name AS foster_parent
       FROM foster_assignments fa
       JOIN animals a ON a.animal_id = fa.animal_id
       JOIN foster_applicants fap ON fap.applicant_id = fa.applicant_id
       JOIN users u ON u.user_id = fap.user_id
       ORDER BY fa.assignment_id DESC`);
    return rows;
  },
  // Assign: creates assignment + animal becomes 'Fostered' (atomic)
  async assign(animal_id, applicant_id, start_date) {
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();
      const [[animal]] = await conn.query('SELECT status FROM animals WHERE animal_id=? FOR UPDATE', [animal_id]);
      if (!animal) throw new Error('Animal not found');
      if (animal.status !== 'Available') throw new Error('Animal is not Available');
      const [[app]] = await conn.query('SELECT approval_status FROM foster_applicants WHERE applicant_id=?', [applicant_id]);
      if (!app || app.approval_status !== 'Approved') throw new Error('Applicant is not Approved');
      const [r] = await conn.query(
        'INSERT INTO foster_assignments (animal_id,applicant_id,start_date,status) VALUES (?,?,?,"Active")',
        [animal_id, applicant_id, start_date]);
      await Animal.setStatus(animal_id, 'Fostered', conn);
      await conn.commit();
      return r.insertId;
    } catch (e) { await conn.rollback(); throw e; }
    finally { conn.release(); }
  },
  // End: assignment Completed/Cancelled + animal back to 'Available'
  async end(assignment_id, status, end_date) {
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();
      const [[fa]] = await conn.query('SELECT animal_id,status FROM foster_assignments WHERE assignment_id=? FOR UPDATE', [assignment_id]);
      if (!fa) throw new Error('Assignment not found');
      if (fa.status !== 'Active') throw new Error('Assignment already closed');
      await conn.query('UPDATE foster_assignments SET status=?, end_date=? WHERE assignment_id=?',
        [status, end_date, assignment_id]);
      await Animal.setStatus(fa.animal_id, 'Available', conn);
      await conn.commit();
    } catch (e) { await conn.rollback(); throw e; }
    finally { conn.release(); }
  }
};
module.exports = Foster;
