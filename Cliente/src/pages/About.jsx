export default function About() {
  return (
    <div style={{
      maxWidth: 620,
      margin: "60px auto",
      padding: 30,
      borderRadius: 20,
      background: "#fff",
      boxShadow: "0 2px 14px #38764c18",
      textAlign: "center"
    }}>
      <h2 style={{ color: "#38764c", fontSize: 32, marginBottom: 12 }}>Sobre Plantcare 🌱</h2>
      <p style={{ fontSize: 19, color: "#225c36" }}>
        Plantcare es tu app web para gestionar y presumir tu jardín virtual. Guarda tus plantas, recibe recordatorios y comparte tus mejores fotos con la comunidad.
      </p>
      <div style={{
        margin: "40px auto 0", background: "#e2f5e7", borderRadius: 12, padding: 18, color: "#35744d"
      }}>
        <b>Empresa:</b> Plantcare<br />
        <b>Contacto:</b> soporte@plantcare.com
      </div>
    </div>
  );
}
