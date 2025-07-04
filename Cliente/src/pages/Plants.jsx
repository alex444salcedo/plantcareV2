import { useState, useEffect } from "react";
import { getPlants, addPlant, deletePlant } from "../services/plants";
import { getReminders } from "../services/reminders";

export default function Plants() {
  const [plants, setPlants] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    cargarPlantas();
    cargarReminders();
  }, []);

  const cargarPlantas = async () => {
    const data = await getPlants();
    setPlants(data);
  };

  const cargarReminders = async () => {
    const data = await getReminders();
    setReminders(data);
  };

  const agregar = async () => {
    await addPlant({ name, type, last_watered: new Date() });
    setName("");
    setType("");
    cargarPlantas();
  };

  const eliminar = async (id) => {
    // ¿Tiene recordatorios?
    const recordatoriosDePlanta = reminders.filter(r => r.plantId == id);
    if (recordatoriosDePlanta.length > 0) {
      alert("No puedes eliminar esta planta porque tiene recordatorios asociados. Elimina los recordatorios primero.");
      return;
    }
    await deletePlant(id);
    cargarPlantas();
  };

  // Función para volver a la página anterior
  const volver = () => {
    window.history.back();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Mis plantas</h2>
      <div style={styles.formContainer}>
        <input
          placeholder="Nombre"
          value={name}
          onChange={e => setName(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Tipo"
          value={type}
          onChange={e => setType(e.target.value)}
          style={styles.input}
        />
        <button onClick={agregar} style={styles.button}>Agregar</button>
      </div>
      <ul style={styles.list}>
        {plants.map(p => (
          <li key={p.id} style={styles.listItem}>
            {p.name} ({p.type})
            <button onClick={() => eliminar(p.id)} style={styles.deleteButton}>Eliminar</button>
          </li>
        ))}
      </ul>
      <button onClick={volver} style={styles.backButton}>Volver</button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    backgroundColor: "#f4f4f9",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    margin: "50px auto",
  },
  heading: {
    color: "#3e8e41",
    fontSize: "2rem",
    marginBottom: "20px",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    width: "100%",
    maxWidth: "300px",
    margin: "0 auto",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    width: "100%",
    maxWidth: "300px",
    margin: "0 auto",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    backgroundColor: "#fff",
    marginBottom: "10px",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  backButton: {
    padding: "10px 20px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    width: "100%",
    maxWidth: "300px",
    marginTop: "20px",
  },
};
