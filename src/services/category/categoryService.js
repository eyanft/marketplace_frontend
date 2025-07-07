import api from "../api/axios";
export const getCategories = async () => {
  try {
    const response = await api.get("category");
    return response.data;
  } catch (err) {
    console.log("Error fetching categories:", err);
    // Return empty array instead of throwing to prevent crashes
    return [];
  }
};
