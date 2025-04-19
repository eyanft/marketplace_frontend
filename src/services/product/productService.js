import api from "../api/axios";
export const getProducts = async () => {
  try {
    response = await api.get("products");
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
