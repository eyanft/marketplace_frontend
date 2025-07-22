import api from "../api/axios";
export const createPayment = async (order) => {
  try {
    const response = await api.post("payments/create", order);

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const confirmPayment = async (order) => {
  try {
    const response = await api.post("payments/capture", order);

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const cancelPayment = async (order) => {
  console.log("watis", order);
  try {
    const response = await api.post("payments/cancel", order);

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
