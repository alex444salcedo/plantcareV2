const db = require("../db");
const path = require("path");

exports.getPosts = async (req, res) => {
  try {
    const [posts] = await db.query(
      "SELECT c.id, c.message, c.image, c.created_at, u.name as userName FROM community_posts c JOIN users u ON c.userId = u.id ORDER BY c.created_at DESC"
    );
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener mensajes" });
  }
};

exports.addPost = async (req, res) => {
  const userId = req.user.userId;
  const { message } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const [user] = await db.query("SELECT name FROM users WHERE id=?", [userId]);
    if (!user.length) return res.status(400).json({ msg: "Usuario no encontrado" });

    await db.query(
      "INSERT INTO community_posts (userId, userName, message, image) VALUES (?, ?, ?, ?)",
      [userId, user[0].name, message, image]
    );
    res.json({ msg: "Mensaje publicado" });
  } catch (err) {
    res.status(500).json({ msg: "Error al publicar mensaje" });
  }
};
