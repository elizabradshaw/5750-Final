const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");

const router = express.Router();

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "/log/logRequests.txt"),
  { flags: "a" }
);

// setup the logger
router.use(morgan("dev", { stream: accessLogStream }));

router.get("/", (req, res, next) => {
  next();
});

module.exports = router;
