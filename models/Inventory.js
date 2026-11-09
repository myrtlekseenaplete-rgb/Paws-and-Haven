const db = require('../config/db');

const Inventory = {
  // GET all inventory items
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM inventory');
    return rows;
  },


  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM inventory WHERE id = ?', [id]);
    return rows[0];
  },


  create: async (item_name, category, quantity, unit) => {
    const [result] = await db.query(
      'INSERT INTO inventory (item_name, category, quantity, unit) VALUES (?, ?, ?, ?)',
      [item_name, category, quantity, unit]
    );
    return result.insertId;
  },


  update: async (id, item_name, category, quantity, unit) => {
    await db.query(
      'UPDATE inventory SET item_name = ?, category = ?, quantity = ?, unit = ? WHERE id = ?',
      [item_name, category, quantity, unit, id]
    );
  },

  delete: async (id) => {
    await db.query('DELETE FROM inventory WHERE id = ?', [id]);
  }
};

module.exports = Inventory;