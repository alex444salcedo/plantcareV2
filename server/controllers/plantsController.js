const db = require("../db");

// Obtener plantas del usuario
exports.getPlants = async (req, res) => {
  try {
    const userId = req.user.userId;
    const [plants] = await db.query("SELECT * FROM plants WHERE userId = ?", [userId]);
    res.json(plants);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener plantas" });
  }
};

// Agregar nueva planta
exports.addPlant = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, type, last_watered } = req.body;
    await db.query("INSERT INTO plants (userId, name, type, last_watered) VALUES (?, ?, ?, ?)", [userId, name, type, last_watered]);
    res.json({ msg: "Planta agregada" });
  } catch (err) {
    res.status(500).json({ msg: "Error al agregar planta" });
  }
};

// Editar planta
exports.updatePlant = async (req, res) => {
  try {
    const userId = req.user.userId;
    const plantId = req.params.id;
    const { name, type, last_watered } = req.body;
    // Solo permite editar si la planta es del usuario logeado
    await db.query("UPDATE plants SET name=?, type=?, last_watered=? WHERE id=? AND userId=?", [name, type, last_watered, plantId, userId]);
    res.json({ msg: "Planta actualizada" });
  } catch (err) {
    res.status(500).json({ msg: "Error al actualizar planta" });
  }
};

// Eliminar planta
exports.deletePlant = async (req, res) => {
  try {
    const userId = req.user.userId;
    const plantId = req.params.id;
    await db.query("DELETE FROM plants WHERE id=? AND userId=?", [plantId, userId]);
    res.json({ msg: "Planta eliminada" });
  } catch (err) {
    res.status(500).json({ msg: "Error al eliminar planta" });
  }
};
