const express = require("express");
const router = express.Router();

const stylesController = require("../controllers/stylesController");
const usersController = require("../controllers/usersController");
const { upload } = require("../controllers/stylesController");

router.get("/new-style", usersController.isAdmin, stylesController.getNewStyleForm); 

router.post("/new-style", usersController.isAdmin, upload.single("image"), stylesController.postNewStyle); 

router.get("/", stylesController.getStyles);

router.get("/:styleSlug", stylesController.getSingleStyle);

module.exports = router;