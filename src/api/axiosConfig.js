import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://simpet-backend-1.onrender.com", // Your backend URL
  withCredentials: true, // If you later use cookies/sessions
});

export default axiosInstance;

