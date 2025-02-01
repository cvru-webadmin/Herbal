import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://82.112.231.100:8001",
  withCredentials: true,
});

export default apiInstance