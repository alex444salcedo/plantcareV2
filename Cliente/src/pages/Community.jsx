import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/community";
const token = () => localStorage.getItem("token");

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    cargarPosts();
  }, []);

  const cargarPosts = async () => {
    try {
      const res = await axios.get(API);
      setPosts(res.data);
    } catch (err) {
      alert("Error al cargar comunidad");
    }
  };

  const publicar = async () => {
    if (!message.trim()) return;
    try {
      const formData = new FormData();
      formData.append("message", message);
      if (image) formData.append("image", image);

      await axios.post(API, formData, {
        headers: {
          Authorization: token(),
          "Content-Type": "multipart/form-data"
        }
      });
      setMessage("");
      setImage(null);
      cargarPosts();
    } catch (err) {
      alert("Error al publicar (¿estás logueado?)");
    }
  };

  // Función para volver a la página anterior
  const volver = () => {
    window.history.back();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Comunidad Plantcare</h2>
      <div style={styles.postForm}>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="¡Miren cómo va mi planta!"
          rows={3}
          style={styles.textarea}
        />
        <input
          type="file"
          accept="image/*"
          onChange={e => setImage(e.target.files[0])}
          style={styles.fileInput}
        />
        <button onClick={publicar} style={styles.button}>Publicar</button>
      </div>
      <hr />
      <ul style={styles.postsList}>
        {posts.map(p => (
          <li key={p.id} style={styles.postItem}>
            <b>{p.userName}</b> <span style={styles.postDate}>{new Date(p.created_at).toLocaleString()}</span>
            <br />
            {p.message}
            {p.image &&
              <div>
                <img
                  src={`http://localhost:5000/uploads/${p.image}`}
                  alt="Imagen planta"
                  style={styles.image}
                />
              </div>
            }
          </li>
        ))}
      </ul>
      <button onClick={volver} style={styles.backButton}>Volver</button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
  },
  heading: {
    color: "#3e8e41",
    fontSize: "2rem",
    marginBottom: "20px",
  },
  postForm: {
    marginBottom: "20px",
    paddingBottom: "20px",
    borderBottom: "1px solid #ddd",
  },
  textarea: {
    width: "90%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    marginBottom: "10px",
    boxSizing: "border-box",
  },
  fileInput: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    width: "90%",
    marginBottom: "10px",
    boxSizing: "border-box",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    width: "90%",
  },
  postsList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  postItem: {
    marginBottom: "20px",
    textAlign: "left",
    borderBottom: "1px solid #ccc",
    paddingBottom: "10px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "15px",
  },
  postDate: {
    color: "#888",
    fontSize: "12px",
  },
  image: {
    maxWidth: "250px",
    marginTop: "10px",
    borderRadius: "1em",
  },
  backButton: {
    padding: "10px 20px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    width: "90%",
    marginTop: "20px",
  },
};
