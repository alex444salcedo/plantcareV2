import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Usamos useNavigate para ir atrás
import { getPlantCatalog } from "../services/plantdb";

export default function PlantSearch() {
  const [plants, setPlants] = useState([]);
  const [q, setQ] = useState("");
  const navigate = useNavigate(); // Usamos useNavigate para navegar

  useEffect(() => {
    getPlantCatalog().then(setPlants);
  }, []);

  // Filtrar por nombre o tipo
  const filtered = plants.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    (p.type && p.type.toLowerCase().includes(q.toLowerCase()))
  );

  // Función para regresar a la página anterior
  const goBack = () => {
    navigate(-1); // Regresa a la página anterior en el historial
  };

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", textAlign: "center" }}>
      {/* Botón de regreso */}
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

      <h2>Buscar plantas</h2>
      <input
        style={{
          padding: 8,
          borderRadius: 8,
          width: 280,
          marginBottom: 20,
          border: "1px solid #bbb"
        }}
        placeholder="Escribe nombre o tipo (ej: interior, cactus...)"
        value={q}
        onChange={e => setQ(e.target.value)}
      />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 18, justifyContent: "center" }}>
        {filtered.map(p => (
          <div key={p.id} style={{
            width: 230,
            background: "#f8fff8",
            border: "1px solid #dde7e2",
            borderRadius: 12,
            boxShadow: "0 2px 8px #0001",
            padding: 14,
            marginBottom: 20
          }}>
            <img
              src={p.image}
              alt={p.name}
              style={{ maxWidth: 180, height: 130, borderRadius: 8, marginBottom: 8, objectFit: "cover" }}
            />
            <h4 style={{ margin: "10px 0 4px" }}>{p.name}</h4>
            <b style={{ color: "#388" }}>{p.type}</b>
            <p style={{ fontSize: 15, color: "#222", margin: "8px 0" }}>{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
