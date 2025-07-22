import api from "../api/axios";

export const passOrder = async (order) => {
  try {
    const response = await api.post("orders", order);

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const getOrderCount = async () => {
  try {
    const response = await api.get("orders/count/user");
    console.log("response.data");
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const getUserOrders = async () => {
  try {
    const response = await api.get("orders/user");

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const getUserListedOrders = async () => {
  try {
    const response = await api.get("orders/seller");

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const getOrderById = async (orderId) => {
  try {
    const response = await api.get("orders/" + orderId);

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const cancelOrder = async (orderId) => {
  try {
    const response = await api.put("orders/cancel/" + orderId);

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const confirmOrder = async (orderId) => {
  try {
    const response = await api.put("orders/confirm/" + orderId);

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
