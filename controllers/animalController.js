const Animal = require('../models/Animal');

const required = ['name','species_id','branch_id','age_months','gender','admission_date'];
const missing = (b) => required.filter(f => b[f] === undefined || b[f] === '');

exports.list = async (req, res) => {
  try { res.json(await Animal.getAll()); }
  catch (e) { res.status(500).json({ error: e.message }); }
};
exports.get = async (req, res) => {
  try {
    const a = await Animal.getById(req.params.id);
    if (!a) return res.status(404).json({ error: 'Animal not found' });
    res.json(a);
  } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.create = async (req, res) => {
  const m = missing(req.body);
  if (m.length) return res.status(400).json({ error: 'Missing: ' + m.join(', ') });
  if (req.body.age_months < 0) return res.status(400).json({ error: 'age_months must be >= 0' });
  try { res.status(201).json({ animal_id: await Animal.create(req.body) }); }
  catch (e) { res.status(500).json({ error: e.message }); }
};
exports.update = async (req, res) => {
  const m = missing(req.body);
  if (m.length) return res.status(400).json({ error: 'Missing: ' + m.join(', ') });
  try {
    const n = await Animal.update(req.params.id, req.body);
    if (!n) return res.status(404).json({ error: 'Animal not found' });
    res.json({ message: 'Updated' });
  } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.remove = async (req, res) => {
  try {
    const n = await Animal.remove(req.params.id);
    if (!n) return res.status(404).json({ error: 'Animal not found' });
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(409).json({ error: 'Cannot delete: animal has related records' });
  }
};
exports.fosterReport = async (req, res) => {
  try { res.json(await Animal.fosterDashboardReport()); }
  catch (e) { res.status(500).json({ error: e.message }); }
};
