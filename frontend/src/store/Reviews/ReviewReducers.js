import { GET_SPOT_REVIEWS, CREATE_REVIEW, DELETE_REVIEW } from "./ReviewThunks";

let initialState = { reviews: null, avgRating: null, createReview: null };

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOT_REVIEWS: {
      const newState = { ...state };
      newState.allReviews = {};
      action.payload.reviews.forEach((review) => {
        newState.allReviews[review.id] = review;
      });

      newState.avgRating =
        action.payload.reviews.reduce((accumulator, currentValue) => {
          return Number(currentValue.stars) + accumulator;
        }, 0) / action.payload.reviews.length;
      return newState;
    }
    case CREATE_REVIEW: {
      const newReviews = [
        ...state.reviews[action.payload.spotId],
        action.payload.newReviews,
      ];
      return {
        ...state,
        reviews: {
          ...state.reviews,
          [action.payload.spotId]: newReviews,
        },
      };
    }
    case DELETE_REVIEW: {
      const newReviews = state.reviews[action.payload.spotId].filter(
        (review) => review.id !== action.payload.reviewId
      );
      return {
        ...state,
        reviews: {
          ...state.reviews,
          [action.payload.spotId]: newReviews,
        },
      };
    }
    default:
      return state;
  }
};

export default reviewsReducer;
