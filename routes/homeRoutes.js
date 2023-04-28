const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");

// Define route handlers
router.get("/", homeController.getHome);

router.get("/about", homeController.getAbout);

router.get("/unauthorized", homeController.getUnauthorized);

router.get('/external-api', homeController.getExternalApi); 

module.exports = router;
