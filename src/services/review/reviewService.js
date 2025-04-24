import api from "../api/axios";

export const getReviewsByProduct = async (productId) => {
  try {
    if (!productId) {
      throw new Error("Product ID is required");
    }

    console.log(`Fetching reviews for product ID: ${productId}`);
    const response = await api.get(`/products/${productId}/reviews`);

    if (response.status === 204 || !response.data || response.data.length === 0) {
      console.log('No reviews found or 204 No Content response');
      return [];
    }

    const reviews = Array.isArray(response.data) ? response.data : [];

    return reviews.map(review => ({
      id: review.id,
      name: review.username || 'Anonymous',
      rating: review.rating,
      review: review.comment,
      date: review.createdAt,
      avatar: review.reviewer?.profilePicture || 'https://via.placeholder.com/40',
      isModerated: review.isModerated,
      reportReason: review.reportReason
    }));
  } catch (error) {
    console.error("Error fetching reviews:", error);

    if (error.response) {
      const { status, data, headers } = error.response;
      console.error("Error Response:", { status, data, headers });

      if (status === 404) {
        console.log("No reviews found for this product");
        return [];
      }

      throw new Error(data?.message || "Failed to fetch reviews");
    } else if (error.request) {
      console.error("No response received:", error.request);
      throw new Error("No response received from server");
    } else {
      throw new Error(error.message || "Failed to fetch reviews");
    }
  }
};

export const addReview = async (productId, reviewData) => {
  try {
    if (!productId || !reviewData) {
      throw new Error("Product ID and review data are required");
    }

    const reviewPayload = {
      rating: reviewData.rating,
      comment: reviewData.text,
      username: reviewData.username || 'Anonymous',
      photos: reviewData.photos || []
    };

    console.log('Submitting review with payload:', reviewPayload);

    const response = await api.post(`/products/${productId}/reviews`, reviewPayload, {
      headers: {
        'x-user-id': reviewData.firebaseUid  // Assure-toi de passer firebaseUid ici !
      }
    });

    return {
      success: true,
      message: "Review added successfully",
      data: response.data,
    };
  } catch (error) {
    console.error("API Error:", error);

    if (error.response) {
      console.error("Server response:", error.response.data);
      throw new Error(error.response.data.message || "Failed to add review. Please try again.");
    } else if (error.request) {
      console.error("No response received:", error.request);
      throw new Error("No response received from server");
    } else {
      throw new Error(error.message || "Failed to add review. Please try again.");
    }
  }
};
