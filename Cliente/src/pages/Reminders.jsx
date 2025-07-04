import { useState, useEffect } from "react";
import { getReminders, addReminder, updateReminder, deleteReminder } from "../services/reminders";
import { getPlants } from "../services/plants"; // Importa el servicio de plantas

export default function Reminders() {
  const [reminders, setReminders] = useState([]);
  const [note, setNote] = useState("");
  const [remindAt, setRemindAt] = useState("");
  const [plantId, setPlantId] = useState("");
  const [plants, setPlants] = useState([]); // <-- Aquí se guardan las plantas
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    cargar();
    cargarPlantas();
  }, []);

  const cargar = async () => {
    try {
      const data = await getReminders();
      setReminders(data);
    } catch (error) {
      console.error("Error al cargar recordatorios:", error);
    }
  };

  const cargarPlantas = async () => {
    try {
      const data = await getPlants();
      setPlants(data);
    } catch (error) {
      console.error("Error al cargar plantas:", error);
    }
  };

  const guardar = async () => {
    if (!note || !remindAt || !plantId) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      if (editing) {
        await updateReminder(editing, { note, remind_at: remindAt.replace('T', ' ') + ':00' });
        setEditing(null);
      } else {
        await addReminder({ note, remind_at: remindAt.replace('T', ' ') + ':00', plantId });
      }
    } catch (error) {
      console.error("Error al guardar recordatorio:", error);
      alert("Error al guardar recordatorio. Mira la consola para más detalles.");
    }
    setNote("");
    setRemindAt("");
    setPlantId("");
    cargar();
  };

  const editar = (reminder) => {
    setNote(reminder.note);
    setRemindAt(reminder.remind_at?.slice(0, 16));
    setPlantId(reminder.plantId);
    setEditing(reminder.id);
  };

  const eliminar = async (id) => {
    try {
      await deleteReminder(id);
      cargar();
    } catch (error) {
      console.error("Error al eliminar recordatorio:", error);
      alert("Error al eliminar recordatorio.");
    }
  };

  // Función para volver a la página anterior
  const volver = () => {
    window.history.back();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Recordatorios de Plantas</h2>
      <div style={styles.formContainer}>
        <input
          placeholder="Nota"
          value={note}
          onChange={e => setNote(e.target.value)}
          style={styles.input}
        />
        <input
          type="datetime-local"
          value={remindAt}
          onChange={e => setRemindAt(e.target.value)}
          style={styles.input}
        />
        <select
          value={plantId}
          onChange={e => setPlantId(e.target.value)}
          style={styles.select}
        >
          <option value="">Selecciona una planta</option>
          {plants.map(plant => (
            <option key={plant.id} value={plant.id}>
              {plant.name} ({plant.type})
            </option>
          ))}
        </select>
        <button onClick={guardar} style={styles.button}>{editing ? "Actualizar" : "Agregar"}</button>
      </div>
      <ul style={styles.list}>
        {reminders.map(r => (
          <li key={r.id} style={styles.listItem}>
            <span>{r.note} — {r.remind_at && new Date(r.remind_at).toLocaleString()} (Planta: {plants.find(p => p.id === r.plantId)?.name || r.plantId})</span>
            <div>
              <button onClick={() => editar(r)} style={styles.editButton}>Editar</button>
              <button onClick={() => eliminar(r.id)} style={styles.deleteButton}>Eliminar</button>
            </div>
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
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
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
  select: {
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
  editButton: {
    padding: "5px 10px",
    backgroundColor: "#ffa500",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
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
