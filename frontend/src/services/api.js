import axios from "axios";

const api = axios.create({

    baseURL: "https://civicpulse-ai-2ako.onrender.com"

});

export default api;