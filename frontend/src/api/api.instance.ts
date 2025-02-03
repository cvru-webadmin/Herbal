import axios from "axios";

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_END_POINT,
  withCredentials: true,
});

export default apiInstance