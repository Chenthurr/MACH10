const express = require('express');
const router = express.Router();
const EmergencyController = require('../controllers/emergency.controller');

router.post('/vehicle/register', EmergencyController.registerVehicle);
router.put('/vehicle/:id/status', EmergencyController.updateVehicleStatus);
router.post('/green-wave/activate', EmergencyController.activateGreenWave);
router.get('/vehicles/active', EmergencyController.getActiveVehicles);
router.post('/route/optimize', EmergencyController.optimizeRoute);
router.get('/response-times', EmergencyController.getResponseTimes);

module.exports = router;
