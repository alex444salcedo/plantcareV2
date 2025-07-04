const db = require("../db");

// Obtener recordatorios del usuario
exports.getReminders = async (req, res) => {
  try {
    const userId = req.user.userId;
    // OJO: puedes filtrar por planta también si quieres
    const [reminders] = await db.query("SELECT * FROM reminders WHERE userId = ?", [userId]);
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener recordatorios" });
  }
};

// Agregar recordatorio
exports.addReminder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { plantId, note, remind_at } = req.body;
    await db.query("INSERT INTO reminders (userId, plantId, note, remind_at) VALUES (?, ?, ?, ?)", [userId, plantId, note, remind_at]);
    res.json({ msg: "Recordatorio agregado" });
  } catch (err) {
    res.status(500).json({ msg: "Error al agregar recordatorio" });
  }
};

// Editar recordatorio
exports.updateReminder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const reminderId = req.params.id;
    const { note, remind_at } = req.body;
    await db.query("UPDATE reminders SET note=?, remind_at=? WHERE id=? AND userId=?", [note, remind_at, reminderId, userId]);
    res.json({ msg: "Recordatorio actualizado" });
  } catch (err) {
    res.status(500).json({ msg: "Error al actualizar recordatorio" });
  }
};

// Borrar recordatorio
exports.deleteReminder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const reminderId = req.params.id;
    await db.query("DELETE FROM reminders WHERE id=? AND userId=?", [reminderId, userId]);
    res.json({ msg: "Recordatorio eliminado" });
  } catch (err) {
    res.status(500).json({ msg: "Error al eliminar recordatorio" });
  }
};
