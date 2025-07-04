const express = require("express");
const router = express.Router();
const { getPlants, addPlant, updatePlant, deletePlant } = require("../controllers/plantsController");
const { authMiddleware } = require("../middleware/auth");

router.get("/", authMiddleware, getPlants);         // Obtener plantas del usuario
router.post("/", authMiddleware, addPlant);         // Agregar planta
router.put("/:id", authMiddleware, updatePlant);    // Editar planta
router.delete("/:id", authMiddleware, deletePlant); // Borrar planta

module.exports = router;
