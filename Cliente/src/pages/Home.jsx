import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(120deg,#e2f5e7 60%,#f8fff8 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        background: "#fff",
        borderRadius: "2em",
        boxShadow: "0 2px 16px #0001",
        padding: "44px 38px",
        textAlign: "center"
      }}>
        <h1 style={{
          fontSize: 38,
          color: "#38764c",
          marginBottom: 8,
          letterSpacing: "1px"
        }}>
          Plantcare 🌱
        </h1>
        <p style={{
          color: "#35744d",
          fontSize: 20,
          marginBottom: 32
        }}>
          ¡Cuida, presume y aprende sobre tus plantas!
        </p>
        <button onClick={() => navigate("/about")}
          style={btnEstilo()}>Saber más</button>
        <button onClick={() => navigate("/login")}
          style={btnEstilo({ marginLeft: 15 })}>Iniciar sesión</button>
        <button onClick={() => navigate("/plantdb")}
          style={btnEstilo({ marginLeft: 15, background: "#52a96b" })}>Buscar plantas</button>
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
    padding: "12px 32px",
    border: "none",
    borderRadius: "1em",
    marginTop: 16,
    cursor: "pointer",
    boxShadow: "0 1px 7px #38764c25",
    transition: "background 0.2s",
    ...extra
  };
}
