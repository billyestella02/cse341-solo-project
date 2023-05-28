const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const validation = require('../middleware/validate');

router.get('/', usersController.getUsers);
router.get('/:id', usersController.getUser);
router.post('/', validation.validateUser, usersController.postUser);
router.put('/:id', validation.validateUser, usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;