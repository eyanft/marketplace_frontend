import axios from "axios";
import { getIdToken } from "../token/tokenService";
import { API_BASE_URL } from "@env";
const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await getIdToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// api.interceptors.response.use(
//     response => response,
//     async error => {
//       if (error.response && error.response.status === 401) {
//         console.warn('Unauthorized request – token might be expired or invalid.');

//         await signOut();
//         Alert.alert('Session expired', 'Please log in again.');

//         return Promise.reject(error);
//       }

//       return Promise.reject(error);
//     }
//   );

export default api;
