const db = require('../config/db');

const SystemSetting = {
 
  getAllSettings: async () => {
    const [rows] = await db.query('SELECT * FROM system_settings');
    return rows;
  },

  
  upsertSetting: async (key, value) => {
    const query = `
      INSERT INTO system_settings (setting_key, setting_value) 
      VALUES (?, ?) 
      ON DUPLICATE KEY UPDATE setting_value = ?
    `;
    await db.query(query, [key, value, value]);
  }
};

module.exports = SystemSetting;