import axios from "axios";
export const getPlantCatalog = async () => {
  const res = await axios.get("http://localhost:5000/api/plantdb");
  return res.data;
};
