const express = require('express');
const router = express.Router();

const apiController = require('../controllers/apiController');

router.get('/token', apiController.getToken);

router.get('/styles', apiController.verifyToken, apiController.getStyles);

router.get('/styles', apiController.getStyles);

module.exports = router;
