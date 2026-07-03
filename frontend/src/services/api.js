import axios from "axios";

export const API_BASE_URL = "https://civicpulse-ai-2ako.onrender.com";

const api = axios.create({
    baseURL: API_BASE_URL
});

export default api;