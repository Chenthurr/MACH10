const express = require('express');
const router = express.Router();
const IntersectionController = require('../controllers/intersection.controller');

router.get('/', IntersectionController.getAllIntersections);
router.get('/:id', IntersectionController.getIntersection);
router.post('/create', IntersectionController.createIntersection);
router.put('/:id/signal', IntersectionController.updateSignal);
router.post('/:id/adaptive-control', IntersectionController.enableAdaptiveControl);
router.get('/:id/status', IntersectionController.getSignalStatus);

module.exports = router;
