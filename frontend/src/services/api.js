import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Hardcoded to force connection
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    // This will log the EXACT error to your browser console!
    console.error("🚨 API ERROR:", err.response?.data || err.message);
    
    if (err.response?.status === 401 && !window.location.pathname.startsWith("/login")) {
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;