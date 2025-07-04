import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Dashboard() {
  const navigate = useNavigate();

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    // Elimina el token del localStorage
    localStorage.removeItem("token");

    // Muestra la notificación de cierre de sesión
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada',
      text: 'Has cerrado sesión correctamente.',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#38764c',
      background: '#e2f5e7',
      color: '#38764c'
    }).then(() => {
      // Redirige a la página de login después de mostrar el mensaje
      navigate("/login");
    });
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(120deg, #e2f5e7 60%, #f8fff8 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#fff", padding: 38, borderRadius: 26, boxShadow: "0 2px 12px #38764c22", minWidth: 320
      }}>
        <h2 style={{ color: "#38764c" }}>¡Bienvenido a tu jardín virtual!</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 28 }}>
          <button onClick={() => navigate("/plants")} style={btnEstilo()}>Mis plantas</button>
          <button onClick={() => navigate("/community")} style={btnEstilo({ background: "#52a96b" })}>Comunidad</button>
          <button onClick={() => navigate("/reminders")} style={btnEstilo({ background: "#6ec484" })}>Recordatorios</button>
          <button onClick={() => navigate("/support")} style={btnEstilo({ background: "#9ce0a8" })}>Soporte</button>
          <button onClick={() => navigate("/plantdb")} style={btnEstilo({ background: "#aee2bb" })}>Buscar plantas</button>
          {/* Botón de Cerrar sesión */}
          <button onClick={handleLogout} style={btnEstilo({ background: "#e04343", marginTop: 20 })}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}

function btnEstilo(extra = {}) {
  return {
    background: "#38764c",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    padding: "13px 0",
    border: "none",
    borderRadius: "1em",
    boxShadow: "0 1px 7px #38764c16",
    cursor: "pointer",
    transition: "background 0.2s",
    ...extra
  };
}
