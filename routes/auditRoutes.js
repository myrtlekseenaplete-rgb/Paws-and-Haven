const express = require("express");
const router = express.Router();
const controller = require("../controllers/auditController");


router.get("/", controller.getLogs);
module.exports = router;