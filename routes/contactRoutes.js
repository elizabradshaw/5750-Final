const express = require("express");
const router = express.Router();

const contactController = require("../controllers/contactController");
const usersController = require("../controllers/usersController"); 

router.get("/new", usersController.isAdmin, contactController.getContact);

router.post("/create", usersController.isAdmin, contactController.createContact);

router.post("/:id/update", usersController.isAdmin, contactController.editContact);

router.get("/:id/edit", usersController.isAdmin, contactController.getEditContact);

router.get("/", usersController.isAdmin, contactController.getContactList);

module.exports = router;