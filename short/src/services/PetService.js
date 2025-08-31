import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getAllPets = () => axios.get(`${API}/pets`);
export const getPetById = (id) => axios.get(`${API}/pets/${id}`);
