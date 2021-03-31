import { LOCATIONS } from '../actions';
import LocationActionTypes from '../actionTypes/LocationActionTypes';

const initialState = {
    list: [],
    location: null,
    isLoading: false,
};

const locationsReducer = (state = initialState, action: LocationActionTypes) => {
    switch (action.type) {
        case LOCATIONS.GET_ALL.SUCCESS: {
            return {
                ...state,
                list: action.payload,
                isLoading: false,
            };
        }
        case LOCATIONS.GET_BY_ID.SUCCESS: {
            return {
                ...state,
                location: action.payload,
                isLoading: false,
            };
        }
        case LOCATIONS.REMOVE_BY_ID.REQUEST:
        case LOCATIONS.GET_BY_ID.REQUEST:
        case LOCATIONS.GET_ALL.REQUEST: {
            return {
                ...state,
                location: null,
                isLoading: true,
            };
        }
        case LOCATIONS.GET_ALL.FAILURE: {
            return {
                ...state,
                list: [],
                isLoading: false,
            };
        }
        case LOCATIONS.REMOVE_BY_ID.SUCCESS:
        case LOCATIONS.REMOVE_BY_ID.FAILURE:
        case LOCATIONS.GET_BY_ID.FAILURE: {
            return {
                ...state,
                isLoading: false,
            };
        }
        default:
            return state;
    }
};

export default locationsReducer;
