const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { tokenVerify, adminVerify } = require('../middlewares/authentication');

router.post('/users', tokenVerify, userController.createUser);
router.post('/adminUsers', [tokenVerify, adminVerify], userController.createAdminUser);
router.get('/users', tokenVerify,userController.getUsers);
router.get('/users/:id', tokenVerify, userController.getUserById);
router.put('/users/:id', tokenVerify,userController.updateUser);
router.delete('/users/:id', tokenVerify,userController.softDeleteUser);


module.exports = router;
