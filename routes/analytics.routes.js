const express = require('express');
const router = express.Router();
const AnalyticsController = require('../controllers/analytics.controller');

router.get('/dashboard', AnalyticsController.getDashboardMetrics);
router.get('/performance', AnalyticsController.getPerformanceMetrics);
router.get('/pollution', AnalyticsController.getPollutionAnalytics);
router.get('/safety', AnalyticsController.getSafetyAnalytics);
router.get('/trends', AnalyticsController.getTrafficTrends);
router.post('/report/generate', AnalyticsController.generateReport);

module.exports = router;
