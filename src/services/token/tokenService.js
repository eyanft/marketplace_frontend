import { auth } from "../firebaseConfig";

export const getIdToken = async () => {
  const user = auth.currentUser;
  if (user) {
    try {
      const token = await user.getIdToken();
      return token;
    } catch (error) {
      console.error("Failed to get ID token:", error);
      return null;
    }
  }
  return null;
};
