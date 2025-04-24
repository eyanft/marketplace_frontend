import api from "../api/axios";
export const getUserDetails = async () => {
  try {
    const response = await api.get("users");
    console.log("here");
    return response.data;
  } catch (err) {
    console.log(err);
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
