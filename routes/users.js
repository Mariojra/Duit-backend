const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { tokenVerify } = require('../middlewares/authentication');

router.post('/users', tokenVerify, userController.createUser);
router.get('/users', tokenVerify,userController.getUsers);
router.put('/users/:id', tokenVerify,userController.updateUser);
router.delete('/users/:id', tokenVerify,userController.softDeleteUser);


module.exports = router;
