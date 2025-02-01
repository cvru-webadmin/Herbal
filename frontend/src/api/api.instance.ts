import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://192.168.1.20:8000",
  withCredentials: true,
});

export default apiInstance