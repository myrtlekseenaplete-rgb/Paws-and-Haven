const express = require("express");
const router = express.Router();
const controller = require("../controllers/ruleEngineController");


router.get("/settings", controller.getSettings);
router.put("/settings", controller.updateSetting);
router.get("/evaluate/:id", controller.evaluateAnimal);
router.post("/evaluate-all", controller.evaluateAll);
module.exports = router;