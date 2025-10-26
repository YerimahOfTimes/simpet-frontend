import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://simpet-backend-1.onrender.com", // backend URL
  withCredentials: true,
});

export default axiosInstance;
