const Feature = require("../models/UniqueFeature");
const Audit = require("../models/Audit");

function userId(req) {
  return req.user?.id || null;
}
function ip(req) {
  return req.ip || req.socket?.remoteAddress || null;
}

exports.getSettings = async (req, res) => {
  try {
    res.json({ success: true, data: await Feature.getSettings() });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Could not load settings." });
  }
};

exports.updateSetting = async (req, res) => {
  const { key, value } = req.body || {};
  const validKeys = [
    "minimum_quarantine_days",
    "require_medical_clearance",
    "require_vaccination",
  ];
  if (!validKeys.includes(key) || value === undefined) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid setting key or value." });
  }
  if (
    key === "minimum_quarantine_days" &&
    (!Number.isInteger(Number(value)) ||
      Number(value) < 0 ||
      Number(value) > 365)
  ) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Quarantine days must be a whole number from 0 to 365.",
      });
  }
  if (
    ["require_medical_clearance", "require_vaccination"].includes(key) &&
    !["true", "false", true, false].includes(value)
  ) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Boolean settings must be true or false.",
      });
  }

  try {
    const normalized =
      typeof value === "boolean" ? String(value) : String(value);
    await Feature.updateSetting(key, normalized, userId(req));
    await Audit.create({
      userId: userId(req),
      action: "SETTING_UPDATED",
      entityType: "system_settings",
      entityId: key,
      details: { key, value: normalized },
      ipAddress: ip(req),
    });
    res.json({ success: true, message: "Setting updated." });
  } catch (error) {
    await Audit.create({
      userId: userId(req),
      action: "SETTING_UPDATE_FAILED",
      entityType: "system_settings",
      entityId: key,
      details: { message: error.message },
      ipAddress: ip(req),
      status: "FAILED",
    }).catch(() => {});
    res
      .status(500)
      .json({
        success: false,
        message: error.message || "Could not update setting.",
      });
  }
};

exports.evaluateAnimal = async (req, res) => {
  try {
    const result = await Feature.evaluateAnimal(req.params.id);
    if (!result)
      return res
        .status(404)
        .json({ success: false, message: "Animal not found." });
    await Audit.create({
      userId: userId(req),
      action: "READINESS_CHECKED",
      entityType: "animal",
      entityId: req.params.id,
      details: {
        recommendedReady: result.recommendedReady,
        reasons: result.reasons,
      },
      ipAddress: ip(req),
    });
    res.json({ success: true, data: result });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Could not evaluate animal. Check the animals table fields.",
      });
  }
};

exports.evaluateAll = async (req, res) => {
  try {
    const results = await Feature.evaluateAll();
    await Audit.create({
      userId: userId(req),
      action: "BULK_READINESS_CHECKED",
      entityType: "animal",
      details: {
        checked: results.length,
        recommendedReady: results.filter((x) => x?.recommendedReady).length,
      },
      ipAddress: ip(req),
    });
    res.json({ success: true, data: results });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Could not evaluate animals. Check your animals table schema.",
      });
  }
};