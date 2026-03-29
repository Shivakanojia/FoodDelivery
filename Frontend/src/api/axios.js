import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" 
    ? "http://localhost:5000/api" 
    : "https://fooddelivery-1-fh7g.onrender.com/api",
});

// 🔐 Attach token automatically (if present)
axiosInstance.interceptors.request.use(
(config) => {
const token = localStorage.getItem("token");


if (token) {
  config.headers.Authorization = `Bearer ${token}`;
}

return config;

},
(error) => Promise.reject(error)
);

export default axiosInstance;
