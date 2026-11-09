const SystemSetting = require('../models/SystemSetting');

exports.getSettings = async (req, res) => {
  try {
    const settings = await SystemSetting.getAllSettings();
    res.render('systemSettings', { settings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const { key, value } = req.body;
    await SystemSetting.upsertSetting(key, value);
    res.redirect('/admin/settings');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};