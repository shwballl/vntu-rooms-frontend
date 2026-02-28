import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Автоматичне додавання токена до кожного запиту
api.interceptors.request.use((config) => {
  const saved = localStorage.getItem("vntu_user");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      const token = parsed.token || parsed.access_token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.error("Token parse error");
    }
  }
  return config;
});

export default api;
