import { csrfFetch } from "../csrf.js";
import {
  GET_ALL_SPOTS,
  CREATE_SPOT,
  DELETE_SPOT,
  GET_SPOT_BY_ID,
  UPDATE_SPOT,
  GET_USER_SPOT,
} from "./spotsReducers.js";

export const getAllSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");
  const spotsData = await res.json();
  console.log("spot", spotsData);
  dispatch({
    type: GET_ALL_SPOTS,
    payload: spotsData.Spots,
  });
};

export const getSpotById = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);
  const spotsData = await res.json();
  dispatch({
    type: GET_SPOT_BY_ID,
    payload: spotsData.Spot,
  });
};
export const getUserSpot = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots/current");
  const spotsData = await res.json();
  console.log("user spots:", spotsData);
  dispatch({
    type: GET_USER_SPOT,
    payload: spotsData.Spots,
  });
};

export const createSpot = (newSpot) => async (dispatch) => {
  const res = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify(newSpot),
  });
  const spotsData = await res.json();
  dispatch({
    type: CREATE_SPOT,
    payload: spotsData,
  });
  return spotsData;
};

export const updateSpot = (spotId, spotData) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spotData),
  });
  const updatedSpot = await res.json();
  dispatch({
    type: UPDATE_SPOT,
    payload: updatedSpot,
  });
};

export const deleteSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });
  // const id = await res.json()
  if (res.ok) {
    dispatch({
      type: DELETE_SPOT,
      payload: spotId,
    });
  }
};
