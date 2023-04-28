const express = require('express');
const router = express.Router();

const kittenController = require('../controllers/kittenController');

router.post('/random-kitten', kittenController.getRandomKitten);

module.exports = router;
