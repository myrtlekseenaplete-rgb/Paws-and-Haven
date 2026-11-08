const db = require("../config/db");

async function getSettings() {
  const [rows] = await db.execute(
    "SELECT setting_key, setting_value, description FROM system_settings ORDER BY setting_key"
  );
  return Object.fromEntries(
    rows.map((row) => [row.setting_key, row.setting_value])
  );
}

async function updateSetting(key, value, userId) {
  const allowed = [
    "minimum_quarantine_days",
    "require_medical_clearance",
    "require_vaccination",
  ];
  if (!allowed.includes(key))
    throw new Error("Setting is not allowed to be changed.");
  const [result] = await db.execute(
    "UPDATE system_settings SET setting_value = ?, updated_by = ? WHERE setting_key = ?",
    [String(value), userId || null, key]
  );
  if (!result.affectedRows)
    throw new Error("Setting was not found. Run database.sql first.");
}

async function evaluateAnimal(animalId) {
  const [animals] = await db.execute(
    "SELECT id, name, quarantine_start_date, medical_cleared, vaccination_status, adoption_status FROM animals WHERE id = ? LIMIT 1",
    [animalId]
  );
  if (!animals.length) return null;

  const animal = animals[0];
  const settings = await getSettings();
  const minimumDays = Math.max(
    0,
    Number(settings.minimum_quarantine_days) || 14
  );
  const requireMedical = settings.require_medical_clearance !== "false";
  const requireVaccination = settings.require_vaccination !== "false";
  const reasons = [];

  if (!animal.quarantine_start_date) {
    reasons.push("Quarantine start date is missing.");
  } else {
    const start = new Date(`${animal.quarantine_start_date}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const days = Math.floor((today - start) / 86400000);
    if (days < 0) reasons.push("Quarantine start date is in the future.");
    else if (days < minimumDays)
      reasons.push(`Quarantine period is ${days}/${minimumDays} days.`);
  }

  if (requireMedical && Number(animal.medical_cleared) !== 1) {
    reasons.push("Veterinary medical clearance is required.");
  }
  if (
    requireVaccination &&
    String(animal.vaccination_status).toLowerCase() !== "complete"
  ) {
    reasons.push("Vaccination status is not complete.");
  }
  if (String(animal.adoption_status).toLowerCase() === "adopted") {
    reasons.push("Animal has already been adopted.");
  }

  return {
    animalId: animal.id,
    animalName: animal.name,
    recommendedReady: reasons.length === 0,
    reasons,
    message: reasons.length
      ? "Needs staff review before adoption."
      : "Meets configured readiness checks; staff/veterinarian must confirm.",
  };
}

async function evaluateAll() {
  const [animals] = await db.execute(
    'SELECT id FROM animals WHERE LOWER(COALESCE(adoption_status, "")) <> "adopted"'
  );
  const results = [];
  for (const animal of animals) results.push(await evaluateAnimal(animal.id));
  return results;
}

module.exports = { getSettings, updateSetting, evaluateAnimal, evaluateAll };