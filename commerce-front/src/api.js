import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const generateCategoryAPI = async (data) => {
  const response = await axios.post(
    `${API_BASE_URL}/catalog/auto-category`,
    data
  );
  return response.data;
};

export const generateProposalAPI = async (data) => {
  const response = await axios.post(
    `${API_BASE_URL}/proposal/generate`,
    data
  );
  return response.data;
};