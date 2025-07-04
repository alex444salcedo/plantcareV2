import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      
      // Guardamos el token en el localStorage
      localStorage.setItem("token", res.data.token);

      // Muestra la notificación de inicio de sesión exitoso
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        text: '¡Bienvenido de nuevo!',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#38764c',
        background: '#e2f5e7',
        color: '#38764c'
      }).then(() => {
        // Redirige al dashboard después de la notificación
        navigate("/dashboard");
      });

    } catch (err) {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      background: "#fff",
      maxWidth: 370,
      margin: "90px auto",
      borderRadius: "1.5em",
      boxShadow: "0 2px 10px #38764c22",
      padding: "32px 26px",
      textAlign: "center"
    }}>
      <h2 style={{ color: "#38764c" }}>Iniciar sesión</h2>
      <input
        placeholder="Correo"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={inputEstilo()}
      /><br />
      <input
        placeholder="Contraseña"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={inputEstilo()}
      /><br />
      <button type="submit" style={btnEstilo()}>Entrar</button>
      <button onClick={() => navigate("/register")} type="button"
        style={{ ...btnEstilo({ background: "#52a96b", marginTop: 12 }) }}>
        ¿No tienes cuenta? Regístrate
      </button>
    </form>
  );
}

function inputEstilo() {
  return {
    width: "100%",
    margin: "10px 0",
    padding: "12px",
    border: "1px solid #cbead7",
    borderRadius: 10,
    fontSize: 16
  };
}

function btnEstilo(extra = {}) {
  return {
    background: "#38764c",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    padding: "10px 24px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: 18,
    boxShadow: "0 1px 5px #38764c25",
    transition: "background 0.2s",
    ...extra
  };
}
