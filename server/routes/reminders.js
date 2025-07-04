const express = require("express");
const router = express.Router();
const { getReminders, addReminder, updateReminder, deleteReminder } = require("../controllers/remindersController");
const { authMiddleware } = require("../middleware/auth");

router.get("/", authMiddleware, getReminders);          // Obtener recordatorios del usuario
router.post("/", authMiddleware, addReminder);          // Agregar recordatorio
router.put("/:id", authMiddleware, updateReminder);     // Editar recordatorio
router.delete("/:id", authMiddleware, deleteReminder);  // Borrar recordatorio

module.exports = router;
