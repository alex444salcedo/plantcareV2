const express = require("express");
const router = express.Router();
const { getPlantCatalog } = require("../controllers/plantdbController");

router.get("/", getPlantCatalog);

module.exports = router;
