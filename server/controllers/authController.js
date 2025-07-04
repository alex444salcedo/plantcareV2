const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Verifica si el correo ya existe
    const [user] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
    if (user.length) return res.status(400).json({ msg: "Ya existe" });
    // Hashea y guarda
    const hashed = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashed]);
    res.json({ msg: "Registrado" });
  } catch (err) {
    res.status(500).json({ msg: "Error" });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [user] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    console.log('User encontrado:', user);
    if (!user.length) return res.status(400).json({ msg: "No existe" });

    console.log('Password recibido:', password);
    console.log('Password en BD:', user[0].password);

    const valid = await bcrypt.compare(password, user[0].password);
    if (!valid) return res.status(401).json({ msg: "Contraseña incorrecta" });

    const token = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (err) {
    console.error('Error en login:', err); // <--- ESTE LOG te dará la pista real
    res.status(500).json({ msg: "Error" });
  }
};

