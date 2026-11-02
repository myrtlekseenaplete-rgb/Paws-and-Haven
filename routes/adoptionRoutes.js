const express = require("express");
const router = express.Router();
const adoptionController = require("../controllers/adoptionController");

router.get("/", adoptionController.dashboard);
router.get("/new", adoptionController.showNewForm);
router.post("/", adoptionController.create);
router.post("/:id/status", adoptionController.updateStatus);
router.get("/:id/process", adoptionController.showProcessForm);
router.post("/:id/process", adoptionController.finalize); // Siguroha nga ang form action sa process view kay nag-POST diri

module.exports = router;