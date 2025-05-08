import api from "../api/axios";

export const getReviewsByProduct = async (productId) => {
  try {
    if (!productId) {
      throw new Error("Product ID is required");
    }

    console.log(`Fetching reviews for product ID: ${productId}`);
    const response = await api.get(`/products/${productId}/reviews`);
    console.log('Full API response:', response);

    if (response.status === 204 || !response.data || response.data.length === 0) {
      console.log('No reviews found or 204 No Content response');
      return [];
    }

    const reviews = Array.isArray(response.data) ? response.data : [];
    console.log('Raw review data from backend:', JSON.stringify(reviews, null, 2));

    const transformedReviews = reviews.map(review => {
      console.log('Processing review:', JSON.stringify(review, null, 2));
      // Temporary fix: If the username is "Eya Habibi", set the reviewer ID to 2
      const reviewerId = review.username === "Eya Habibi" ? 2 : (review.reviewerId || review.reviewer?.id);
      console.log('Determined reviewer ID:', reviewerId);
      
      return {
        id: review.id,
        name: review.username,
        rating: review.rating,
        review: review.comment,
        date: review.createdAt,
        avatar: review.reviewer?.profilePicture || 'https://via.placeholder.com/40',
        isModerated: review.isModerated,
        reportReason: review.reportReason,
        reviewer: {
          id: reviewerId
        }
      };
    });

    console.log('Transformed reviews:', JSON.stringify(transformedReviews, null, 2));
    return transformedReviews;
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
      username: reviewData.username ,
      photos: reviewData.photos || []
    };

    console.log('Submitting review with payload:', reviewPayload);

    const response = await api.post(`/products/${productId}/reviews`, reviewPayload, {
      headers: {
        'x-user-id': reviewData.firebaseUid
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

export const updateReview = async (productId, reviewId, reviewData, firebaseUid) => {
  try {
    if (!productId || !reviewId || !reviewData) {
      throw new Error("Product ID, review ID, and review data are required");
    }

    const reviewPayload = {
      rating: reviewData.rating,
      comment: reviewData.review,
      username: reviewData.name,
    };

    console.log('Updating review with payload:', reviewPayload);

    const response = await api.put(`/products/${productId}/reviews/${reviewId}`, reviewPayload, {
      headers: {
        'x-user-id': firebaseUid
      }
    });

    if (response.status === 200) {
      return {
        success: true,
        message: "Review updated successfully",
        data: {
          ...response.data,
          name: response.data.username ,
          review: response.data.comment,
          date: response.data.createdAt,
          avatar: response.data.reviewer?.profilePicture || 'https://via.placeholder.com/40',
        }
      };
    }

    throw new Error("Failed to update review");
  } catch (error) {
    console.error("API Error:", error);

    if (error.response) {
      console.error("Server response:", error.response.data);
      if (error.response.status === 401) {
        throw new Error("You are not authorized to edit this review");
      } else if (error.response.status === 403) {
        throw new Error("You are not allowed to edit this review");
      } else if (error.response.status === 404) {
        throw new Error("Review not found");
      }
      throw new Error(error.response.data?.message || "Failed to update review");
    } else if (error.request) {
      console.error("No response received:", error.request);
      throw new Error("No response received from server");
    } else {
      throw new Error(error.message || "Failed to update review");
    }
  }
};

export const deleteReview = async (productId, reviewId, firebaseUid) => {
  try {
    if (!productId || !reviewId) {
      throw new Error("Product ID and review ID are required");
    }

    console.log('Deleting review:', reviewId);

    const response = await api.delete(`/products/${productId}/reviews/${reviewId}`, {
      headers: {
        'x-user-id': firebaseUid
      }
    });

    if (response.status === 204) {
      return {
        success: true,
        message: "Review deleted successfully"
      };
    }

    throw new Error("Failed to delete review");
  } catch (error) {
    console.error("API Error:", error);

    if (error.response) {
      console.error("Server response:", error.response.data);
      if (error.response.status === 401) {
        throw new Error("You are not authorized to delete this review");
      } else if (error.response.status === 403) {
        throw new Error("You are not allowed to delete this review");
      } else if (error.response.status === 404) {
        throw new Error("Review not found");
      }
      throw new Error(error.response.data?.message || "Failed to delete review");
    } else if (error.request) {
      console.error("No response received:", error.request);
      throw new Error("No response received from server");
    } else {
      throw new Error(error.message || "Failed to delete review");
    }
  }
}; 