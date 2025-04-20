import api from "../api/axios";
export const getCategories = async () => {
  try {
    response = await api.get("category");
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
