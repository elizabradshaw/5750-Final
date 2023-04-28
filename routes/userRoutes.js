const express = require("express");
const router = express.Router();

const usersController = require('../controllers/usersController');

router.get('/admin', usersController.isAdmin, usersController.getAdmin);

router.post('/admin', usersController.isAdmin, usersController.updateAdmin);

router.get('/register', usersController.getRegister);

router.get('/login', usersController.getLogin);

router.post('/register', usersController.postRegister);

router.post('/login', usersController.findUser, usersController.processLogin);

router.get('/logout', usersController.getLogout);

router.post('/save-favorite/:styleId', usersController.saveFavoriteStyle);

router.get('/favorite-styles', usersController.getFavoriteStyles);

module.exports = router;
