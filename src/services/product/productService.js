import { useZustandStore } from "../../store/zustand";
import api from "../api/axios";

export const getProductsGroupedByCategory = async (firebaseID) => {
  console.log(firebaseID ? firebaseID : "No Firebase ID provided");
  try {
    const response = await api.get("products/groupedByCategory", {
      params: { firebaseID },
    });

    console.log("token", response.request._headers.authorization);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const uploadProduct = async (formData) => {
  console.log(formData);
  try {
    const response = await api.post("products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading product:", error.message);
    throw error;
  }
};
export const getfilteredProduct = async (filter, sortBy, ascending) => {
  try {
    const response = await api.get("products/filter", {
      params: {
        ...filter,
        sortBy: sortBy,
        ascending: ascending,
      },
    });

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const getSortedProducts = async (sortBy, ascending) => {
  try {
    const response = await api.get("products/sort", {
      params: { sortBy, ascending },
    });

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const getDetectedObjects = async (img) => {
  try {
    const response = await api.post("detect-object", img, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const getRecommendedItems = async (products) => {
  try {
    const response = await api.post("recommendations", {
      product_ids: products,
    });
    console.log("Recommended items response:", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
