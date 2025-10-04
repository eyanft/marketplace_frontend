import api from "../api/axios";
import { auth } from "../firebaseConfig";

export const getUserDetails = async () => {
  try {
    const response = await api.get("users/by-firebase-uid");
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
export const setDeviceID = async (data) => {
  try {
    console.log('Setting device ID:', data);
    // Try the original endpoint first
    const response = await api.put("users/setDeviceID", null, {
      params: { deviceID: data },
    });
    return response.data;
  } catch (err) {
    console.log('setDeviceID error:', err);
    // If the specific endpoint fails, try updating user details instead
    try {
      console.log('Trying alternative approach - updating user details');
      const response = await api.put("users/update", {
        deviceID: data
      });
      return response.data;
    } catch (updateErr) {
      console.log('Alternative approach also failed:', updateErr);
      throw updateErr; // Throw the original error
    }
  }
};
