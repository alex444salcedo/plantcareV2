import axios from "axios";

const API = "http://localhost:5000/api/plants";
const token = () => localStorage.getItem("token");

export const getPlants = async () => {
  const res = await axios.get(API, { headers: { Authorization: token() } });
  return res.data;
};
export const addPlant = async (plant) => {
  const res = await axios.post(API, plant, { headers: { Authorization: token() } });
  return res.data;
};
export const updatePlant = async (id, plant) => {
  const res = await axios.put(`${API}/${id}`, plant, { headers: { Authorization: token() } });
  return res.data;
};
export const deletePlant = async (id) => {
  const res = await axios.delete(`${API}/${id}`, { headers: { Authorization: token() } });
  return res.data;
};
