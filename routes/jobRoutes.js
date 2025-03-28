const express = require("express");
const { jobSubmitter, jobStatus } = require("../controller/jobController");

const router = express.Router();

// 1). Job submit route
router.post('/submit', jobSubmitter);

// 2). Job status Route
router.get('/status', jobStatus);

module.exports = router;
