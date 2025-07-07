import axios from "axios";
import { auth } from "../firebaseConfig";
import { API_BASE_URL } from "@env";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const currentUser = auth.currentUser;
  
  if (currentUser) {
    try {
      // Get Firebase ID token for authentication
      const idToken = await currentUser.getIdToken();
      if (idToken) {
        config.headers.Authorization = `Bearer ${idToken}`;
      }
      // Also add Firebase UID to headers for backend authentication
      config.headers["x-user-id"] = currentUser.uid;
      
      console.log("Request headers:", {
        "x-user-id": currentUser.uid,
        "Authorization": idToken ? "Bearer [TOKEN]" : "No token"
      });
    } catch (error) {
      console.error("Failed to get ID token:", error);
    }
  } else {
    console.log("No current user found for API request");
  }

  return config;
});
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized request – token might be expired or invalid.');
      // Don't automatically sign out, just log the error
      console.log('401 Error details:', error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;
