import axios from "axios";

const API = "http://localhost:5000/api/reminders";
const token = () => localStorage.getItem("token");

export const getReminders = async () => {
  const res = await axios.get(API, { headers: { Authorization: token() } });
  return res.data;
};
export const addReminder = async (reminder) => {
  const res = await axios.post(API, reminder, { headers: { Authorization: token() } });
  return res.data;
};
export const updateReminder = async (id, reminder) => {
  const res = await axios.put(`${API}/${id}`, reminder, { headers: { Authorization: token() } });
  return res.data;
};
export const deleteReminder = async (id) => {
  const res = await axios.delete(`${API}/${id}`, { headers: { Authorization: token() } });
  return res.data;
};
