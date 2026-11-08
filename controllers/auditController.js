const Audit = require("../models/Audit");

exports.getLogs = async (req, res) => {
  try {
    const logs = await Audit.list({
      limit: req.query.limit,
      action: req.query.action || "",
      status: req.query.status || "",
    });
    res.json({ success: true, data: logs });
  } catch (error) {
    console.error("Could not load audit logs:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Could not load audit logs." });
  }
};