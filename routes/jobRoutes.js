const express = require("express");
const { jobSubmitter, jobStatus } = require("../controller/jobController");

const router = express.Router();

router.post('/submit', jobSubmitter);
router.get('/status', jobStatus);

module.exports = router;