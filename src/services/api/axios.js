import axios from "axios";
import { API_BASE_URL } from "@env";
import { getIdToken } from "../token/tokenService";

const api = axios.create({
  baseURL: "http://192.168.1.15:8222/api/v1",
});

api.interceptors.request.use(async (config) => {
  const token = await getIdToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
export default api;
