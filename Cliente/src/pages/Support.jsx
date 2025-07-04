import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Support() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Función para regresar a la página anterior
  const goBack = () => {
    navigate(-1); // Regresa a la página anterior en el historial
  };

  const enviar = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      await axios.post("http://localhost:5000/api/support", {
        email,
        message: msg
      });
      setSuccess("¡Mensaje enviado! Te responderemos pronto.");
      setEmail("");
      setMsg("");
    } catch (err) {
      setError("Error al enviar mensaje. Intenta más tarde.");
    }
  };

  return (
    <div style={{
      maxWidth: 600,
      margin: "40px auto",
      background: "#f4f8fb",
      borderRadius: "16px",
      boxShadow: "0 2px 12px #0002",
      padding: "30px 20px"
    }}>
      {/* Botón de regreso con ícono */}
      <button
        onClick={goBack}
        style={{
          background: "#38764c",
          color: "#fff",
          fontSize: "16px",
          padding: "12px 24px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "20px"
        }}
      >
        {/* Ícono de flecha */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="20"
          height="20"
          style={{ marginRight: "8px" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Volver
      </button>

      <h2 style={{ color: "#38764c", marginBottom: 12 }}>Soporte Plantcare</h2>
      <div style={{
        background: "#e2f5e7",
        borderRadius: "10px",
        padding: "15px 20px",
        marginBottom: 30
      }}>
        <p>
          <b>¿Tienes dudas, problemas o sugerencias?</b><br />
          ¡Escríbenos y te ayudamos rápido!
        </p>
        <ul style={{ textAlign: "left", margin: "12px 0 0 20px" }}>
          <li><b>Email:</b> <a href="mailto:soporte@plantcare.com">soporte@plantcare.com</a></li>
          <li><b>WhatsApp:</b> <a href="https://wa.me/524491234567" target="_blank" rel="noopener noreferrer">+52 449 123 4567</a></li>
        </ul>
      </div>

      <div style={{
        background: "#fff",
        borderRadius: "10px",
        padding: "15px 20px",
        marginBottom: 30,
        border: "1px solid #c6e5d2"
      }}>
        <h4 style={{ color: "#245c37" }}>Preguntas Frecuentes</h4>
        <div style={{ textAlign: "left" }}>
          <p><b>¿Cómo agrego una planta?</b><br />
            Ve a <b>Mis plantas</b>, llena el formulario y da click en <b>Agregar</b>.</p>
          <p><b>¿Por qué no puedo eliminar una planta?</b><br />
            Primero elimina los recordatorios asociados a esa planta.</p>
          <p><b>¿Cómo subo una foto de mi planta?</b><br />
            Ve a <b>Comunidad</b>, escribe tu mensaje y selecciona una imagen antes de publicar.</p>
          <p><b>¿Olvidaste tu contraseña?</b><br />
            Escríbenos por WhatsApp y te ayudamos a recuperarla.</p>
        </div>
      </div>

      <div style={{
        background: "#f8fff9",
        borderRadius: "10px",
        padding: "20px 20px",
        border: "1px solid #d3eddc"
      }}>
        <h4 style={{ color: "#245c37" }}>Contáctanos directamente</h4>
        <form onSubmit={enviar}>
          <input
            type="email"
            placeholder="Tu correo"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{
              padding: "8px",
              width: "90%",
              margin: "6px 0 10px",
              borderRadius: "6px",
              border: "1px solid #b7d6c2"
            }}
          /><br />
          <textarea
            placeholder="Escribe tu mensaje"
            value={msg}
            onChange={e => setMsg(e.target.value)}
            required
            rows={4}
            style={{
              width: "90%",
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid #b7d6c2"
            }}
          /><br />
          <button type="submit"
            style={{
              marginTop: 12,
              background: "#38764c",
              color: "#fff",
              padding: "10px 24px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold"
            }}>
            Enviar mensaje
          </button>
        </form>
        {success && <p style={{ color: "#2fa150", marginTop: 14 }}>{success}</p>}
        {error && <p style={{ color: "#c81a1a", marginTop: 14 }}>{error}</p>}
      </div>
    </div>
  );
}
