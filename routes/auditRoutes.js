const express = require("express");
const router = express.Router();
const controller = require("../controllers/auditController");

// Add your project's authentication/administrator middleware here.
router.get("/", controller.getLogs);
module.exports = router;