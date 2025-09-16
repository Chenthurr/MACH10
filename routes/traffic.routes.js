const express = require('express');
const router = express.Router();
const TrafficController = require('../controllers/traffic.controller');

router.get('/current', TrafficController.getCurrentTraffic);
router.get('/intersection/:id', TrafficController.getIntersectionTraffic);
router.post('/update', TrafficController.updateTrafficData);
router.get('/congestion-map', TrafficController.getCongestionMap);
router.post('/predict', TrafficController.predictTraffic);

module.exports = router;
