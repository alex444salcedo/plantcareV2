const db = require("../db");

exports.getPlantCatalog = async (req, res) => {
  try {
    const [plants] = await db.query("SELECT * FROM plant_catalog");
    res.json(plants);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener el catálogo" });
  }
};
