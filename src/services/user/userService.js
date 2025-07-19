import api from "../api/axios";
import { auth } from "../firebaseConfig";

export const getUserDetails = async () => {
  try {
    const response = await api.get("users");
    console.log(response.data);
    return response.data;
  } catch (err) {
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
