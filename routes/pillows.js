const express = require('express');
const router = express.Router();

const pillowsController = require('../controllers/pillows');

router.get('/', pillowsController.getPillows);
router.get('/:id', pillowsController.getPillow);
router.post('/', pillowsController.postPillow);
router.put('/:id', pillowsController.updatePillow);
router.delete('/:id', pillowsController.deletePillow);

module.exports = router;