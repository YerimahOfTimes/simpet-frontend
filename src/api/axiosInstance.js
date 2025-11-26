import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://simpet-backend-1.onrender.com/api", // <--- add /api
  withCredentials: true,
});

export default axiosInstance;



