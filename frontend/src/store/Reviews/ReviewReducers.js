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
      const reviews = state.reviews || []
      const existingReviews = reviews[action.payload.spotId] || [];
      const newReviews = [
       ...existingReviews,
        ...action.payload.newReviews,
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
                const newState = {...state, reviews: {...state.reviews}};
                delete newState.reviews[action.payload]
                return newState;
            }
    default:
      return state;
  }
};

export default reviewsReducer;
