import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://your-backend.onrender.com/api", // Your backend URL
  withCredentials: true, // If you later use cookies/sessions
});

export default axiosInstance;

