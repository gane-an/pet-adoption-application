import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const applyForPet = (petId, applicant) =>
  axios.post(`${API}/applications`, { petId, applicant });

export const getMyApplications = (applicant) =>
  axios.get(`${API}/applications/mine?applicant=${applicant}`);

export const getApplicationsByPet = (petId) =>
  axios.get(`${API}/applications/pet/${petId}`);
