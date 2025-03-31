import { csrfFetch } from "../csrf";
export const GET_SPOT_REVIEWS = '/reviews/getSpotReviews'
export const CREATE_REVIEW = '/reviews/createReview'
export const DELETE_REVIEW = '/reviews/deleteReview'


export const getSpotReviews = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
  const reviewsData = await res.json();
  dispatch({
    type: GET_SPOT_REVIEWS,
    payload: {spotId, reviews: reviewsData.Reviews, avgRating: reviewsData.avgRating}
  });
};
export const createReview = (spotId, reviewData) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    body: JSON.stringify(reviewData),
  });
  const newReview = await res.json();
  dispatch({
    type: CREATE_REVIEW,
    payload: { spotId, newReview },
  });
  return newReview;
};
export const deleteReview = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${reviewId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch({
      type: DELETE_REVIEW,
      payload: reviewId,
    });
  }
};
