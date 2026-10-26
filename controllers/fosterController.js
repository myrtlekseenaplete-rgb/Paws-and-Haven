const Foster = require('../models/Foster');

exports.listApplicants = async (req, res) => {
  try { res.json(await Foster.getApplicants()); }
  catch (e) { res.status(500).json({ error: e.message }); }
};
exports.createApplicant = async (req, res) => {
  const { user_id, housing_type, experience_level } = req.body;
  if (!user_id || !housing_type || !experience_level)
    return res.status(400).json({ error: 'user_id, housing_type, experience_level required' });
  try { res.status(201).json({ applicant_id: await Foster.createApplicant(req.body) }); }
  catch (e) { res.status(500).json({ error: e.message }); }
};
exports.setApproval = async (req, res) => {
  const { approval_status } = req.body;
  if (!['Pending','Approved','Rejected'].includes(approval_status))
    return res.status(400).json({ error: 'Invalid approval_status' });
  try {
    const n = await Foster.setApproval(req.params.id, approval_status);
    if (!n) return res.status(404).json({ error: 'Applicant not found' });
    res.json({ message: 'Approval updated' });
  } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.listAssignments = async (req, res) => {
  try { res.json(await Foster.getAssignments()); }
  catch (e) { res.status(500).json({ error: e.message }); }
};
exports.assign = async (req, res) => {
  const { animal_id, applicant_id, start_date } = req.body;
  if (!animal_id || !applicant_id || !start_date)
    return res.status(400).json({ error: 'animal_id, applicant_id, start_date required' });
  try { res.status(201).json({ assignment_id: await Foster.assign(animal_id, applicant_id, start_date) }); }
  catch (e) { res.status(400).json({ error: e.message }); }
};
exports.end = async (req, res) => {
  const { status = 'Completed', end_date = new Date().toISOString().slice(0, 10) } = req.body;
  if (!['Completed','Cancelled'].includes(status))
    return res.status(400).json({ error: 'status must be Completed or Cancelled' });
  try { await Foster.end(req.params.id, status, end_date); res.json({ message: 'Foster ended' }); }
  catch (e) { res.status(400).json({ error: e.message }); }
};
