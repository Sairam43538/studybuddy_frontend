// src/services/roadmapService.js
import axios from "axios";

export const getRoadmaps = async () => {
  const response = await axios.get("/api/roadmaps");
  return response.data;
};

export const getRoadmapDetails = async (id) => {
  const response = await axios.get(`/api/roadmaps/${id}`);
  return response.data;
};

// Add this to fix the error
export const getCertification = async (id) => {
  const response = await axios.get(`/api/roadmaps/${id}/certification`);
  return response.data;
};
