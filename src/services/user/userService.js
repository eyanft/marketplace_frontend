import api from "../api/axios";
import { auth } from "../firebaseConfig";

export const getUserDetails = async () => {
  try {
    const response = await api.get("users/by-firebase-uid");
    console.log("User details fetched successfully");
    return response.data;
  } catch (err) {
    console.log("Error fetching user details:", err);
    throw err;
  }
};
export const updateUserDetails = async (data) => {
  try {
    console.log(data);
    const response = await api.put("users/update", data);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const registerUser = async (userData) => {
  try {
    console.log("Registering user:", userData);
    const response = await api.post("users/register", userData);
    return response.data;
  } catch (err) {
    console.log("Error registering user:", err);
    throw err;
  }
};
