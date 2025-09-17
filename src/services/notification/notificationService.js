import api from "../api/axios";
export const getNotifications = async () => {
  try {
    const response = await api.get("notifications/user");
    return response.data;
  } catch (err) {
    console.log("Error fetching categories:", err);

    return [];
  }
};
