const express = require("express");
const router = express.Router();
const { addMessage } = require("../controllers/supportController");

router.post("/", addMessage);

module.exports = router;
