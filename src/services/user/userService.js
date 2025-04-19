import api from "../api/axios";
export const getUserDetails = async (firebaseID) => {
  try {
    response = await api.get("users" + `/${firebaseID}`);
    console.log("here");
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const updateUserDetails = async (data) => {
  try {
    console.log(data);
    response = await api.put("users/update", data);
    return response.data;
  } catch (err) {
    console.log("xxxxxxxxxxxx");
    console.log(err);
    throw err;
  }
};
