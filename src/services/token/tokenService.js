import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";

const TOKEN_KEY = "firebase_id_token";

export const saveIdToken = async (token) => {
  console.log("Saving token:", token);
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    console.log("Token saved successfully");
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

export const getIdToken = async () => {
  try {
    const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      return storedToken;
    }

    console.log("No token available");
    return null;
  } catch (error) {
    console.error("Error getting ID token:", error);
    return null;
  }
};

export const clearToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    console.log("Token cleared successfully");
  } catch (error) {
    console.error("Error clearing token:", error);
  }
};

export const isAuthenticated = async () => {
  try {
    const token = await getIdToken();
    return token !== null;
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
};

export const getStoredToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error getting stored token:", error);
    return null;
  }
};
