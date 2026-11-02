const db = require("../config/db");

const Adoption = {
  async getAllApplications() {
    const [rows] = await db.query( 'SELECT aa.application_id, aa.user_id, u.full_name, aa.animal_id, an.animal_name, aa.application_date, aa.status, aa.notes FROM adoption_applications aa JOIN users u ON u.user_id = aa.user_id JOIN animals an ON an.animal_id = aa.animal_id ORDER BY aa.created_at DESC'
     );
    return rows;
  },

  async getApplicationById(id) {
    const [rows] = await db.query(
       'SELECT aa.*, u.full_name, u.email, an.animal_name FROM adoption_applications aa JOIN users u ON u.user_id = aa.user_id JOIN animals an ON an.animal_id = aa.animal_id WHERE aa.application_id = ?',
      [id]
    );
    return rows[0];
  },

  async createApplication({ user_id, animal_id, application_date, notes }) {
    const [result] = await db.query(
       'INSERT INTO adoption_applications (user_id, animal_id, application_date, notes, status) VALUES (?, ?, COALESCE(?, CURRENT_DATE), ?, \'Pending\')' ,
      [user_id, animal_id, application_date || null, notes || null]
    );
    return result.insertId;
  },

  async updateStatus(id, status) {
    const [result] = await db.query(
      "UPDATE adoption_applications SET status = ? WHERE application_id = ?",
      [status, id]
    );
    return result.affectedRows;
  },

  async finalizeAdoption( id, { adoption_date, adoption_fee, contract_details } ) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      const [appRows] = await connection.query(
        "SELECT application_id, status FROM adoption_applications WHERE application_id = ? FOR UPDATE",
        [id]
      );
      if (!appRows.length) throw new Error("Application not found.");
      if (!["Approved", "Completed"].includes(appRows[0].status)) {
        throw new Error("Only approved applications can be finalized.");
      }

      const [existing] = await connection.query(
        "SELECT adoption_id FROM adoptions WHERE application_id = ?",
        [id]
      );
      if (!existing.length) {
        await connection.query(
           'INSERT INTO adoptions (application_id, adoption_date, adoption_fee, contract_details) VALUES (?, COALESCE(?, CURRENT_DATE), ?, ?)' ,
          [
            id,
            adoption_date || null,
            Number(adoption_fee || 0),
            contract_details || null,
          ]
        );
      }

      await connection.query(
        "UPDATE adoption_applications SET status = 'Completed' WHERE application_id = ?",
        [id]
      );

      await connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  async getCompletedAdoptions() {
    const [rows] = await db.query( 'SELECT a.adoption_id, a.application_id, u.full_name, an.animal_name, a.adoption_date, a.adoption_fee, a.contract_details FROM adoptions a JOIN adoption_applications aa ON aa.application_id = a.application_id JOIN users u ON u.user_id = aa.user_id JOIN animals an ON an.animal_id = aa.animal_id ORDER BY a.adoption_date DESC' );
    return rows;
  },
};

module.exports = Adoption;