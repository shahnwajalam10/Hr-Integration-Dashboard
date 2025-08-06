const express = require('express');
const router = express.Router();
const { getLogs, createLog, getDashboardMetrics } = require('../controllers/logController');

router.get('/', getLogs);
router.post('/', createLog);
router.get('/metrics', getDashboardMetrics);

module.exports = router;
