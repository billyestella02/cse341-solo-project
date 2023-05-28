const express = require('express');
const router = express.Router();

const pillowsController = require('../controllers/pillows');
const validation = require('../middleware/validate');

router.get('/', pillowsController.getPillows);
router.get('/:id', pillowsController.getPillow);
router.post('/', validation.validatePillow, pillowsController.postPillow);
router.put('/:id', validation.validatePillow, pillowsController.updatePillow);
router.delete('/:id', pillowsController.deletePillow);

module.exports = router;