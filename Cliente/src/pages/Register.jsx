import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para la confirmación de contraseña
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", { name, email, password });

      // Muestra la notificación de éxito
      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'Ahora puedes iniciar sesión.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#38764c',
        background: '#e2f5e7',
        color: '#38764c'
      }).then(() => {
        // Redirige a la página de login después de la notificación
        navigate("/login");
      });

    } catch (err) {
      alert("Error al registrar, intenta nuevamente");
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
      <h2 style={{ color: "#38764c" }}>Registrarse</h2>
      <input
        placeholder="Nombre"
        value={name}
        onChange={e => setName(e.target.value)}
        style={inputEstilo()}
        required
      /><br />
      <input
        placeholder="Correo"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={inputEstilo()}
        required
      /><br />
      <div style={{ position: "relative" }}>
        <input
          placeholder="Contraseña"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={inputEstilo()}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "20px",
            color: "#38764c",
            fontWeight: "bold"
          }}
        >
          {showPassword ? "Ocultar" : "Mostrar"}
        </button>
      </div><br />
      <div style={{ position: "relative" }}>
        <input
          placeholder="Confirmar contraseña"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          style={inputEstilo()}
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "20px",
            color: "#38764c",
            fontWeight: "bold"
          }}
        >
          {showConfirmPassword ? "Ocultar" : "Mostrar"}
        </button>
      </div><br />
      <button type="submit" style={btnEstilo()}>Registrarse</button>
      <button onClick={() => navigate("/login")} type="button" 
        style={{ ...btnEstilo({ background: "#52a96b", marginTop: 12 }) }}>
        ¿Ya tienes cuenta? Inicia sesión
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
