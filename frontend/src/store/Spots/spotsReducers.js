export const GET_ALL_SPOTS = '/spots/getSpots'
export const CREATE_SPOT = 'spots/createSpot'
export const DELETE_SPOT = 'spots/deleteSpots'
export const GET_SPOT_BY_ID = 'spots/getSpotById'
export const UPDATE_SPOT = 'spots/updateSpot'
export const GET_USER_SPOT = 'spots/getUserSpot'

let initialState = { allSpots: null, singleSpot: null, userSpots: [] };

const spotsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_SPOTS: {
            const newState = {...state};
            newState.allSpots = {};
            action.payload.forEach((spot) => {
                newState.allSpots[spot.id] = spot;
            });
            return newState;
        }
        case GET_SPOT_BY_ID: {
            return{
                ...state,
                singleSpot: action.payload
            }
        }
        case GET_USER_SPOT: {
            return{
                ...state,
                userSpots: action.payload
            }
        }
        case CREATE_SPOT: {
            const newState={
            ...state,
            allSpots: {...state.allSpots, [action.payload.id]: action.payload},
            userSpots: {...state.allSpots, [action.payload.id]: action.payload},
            singleSpot: action.payload,
        }
        return newState
    }
        case DELETE_SPOT: {
            const newState = {...state, allSpots: {...state.spots}};
            delete newState.allSpots[action.payload]
            return newState;
        }
        case UPDATE_SPOT: {
            return {
                ...state,
                allSpots: {...state.allSpots, [action.payload.id]: action.payload},
                singleSpot: action.payload
            }
        }
        default:
            return state;
    }
    
}

export default spotsReducer