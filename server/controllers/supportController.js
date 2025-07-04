const db = require("../db");

exports.addMessage = async (req, res) => {
  const { email, message } = req.body;
  if (!email || !message) {
    return res.status(400).json({ msg: "Faltan datos" });
  }
  try {
    await db.query(
      "INSERT INTO support_messages (email, message) VALUES (?, ?)",
      [email, message]
    );
    res.json({ msg: "Mensaje recibido" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error al guardar mensaje" });
  }
};
