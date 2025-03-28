const express = require("express");
const { jobSubmitter, jobStatus } = require("../controller/jobController");

const router = express.Router();

// 1). Job submit route
router.post('/submit', jobSubmitter);
router.get('/status', jobStatus);

module.exports = router;
