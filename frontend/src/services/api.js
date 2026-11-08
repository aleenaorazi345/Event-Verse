import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("🚨 API ERROR:", err.response?.data || err.message);
    
    // Only redirect if we get a 401 AND we are NOT on a public page
    const publicPages = ["/", "/login", "/register", "/verify-otp"];
    if (
      err.response?.status === 401 && 
      !publicPages.includes(window.location.pathname)
    ) {
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;