import axios from "axios";
import { BASE_URL } from "../config";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/JSON",
  },
  withCredentials: true,
});

export default axiosClient;
