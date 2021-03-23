import { AUTH } from '../actions';
import AuthActionTypes from '../actionTypes/AuthActionTypes';

const initialState = {
    firstName: '',
    lastName: '',
    dob: '',
    type: '',
    isLoggedIn: false,
    isLoading: false,
};

const authReducer = (state = initialState, action: AuthActionTypes) => {
    switch (action.type) {
        case AUTH.LOGIN.SUCCESS: {
            return {
                ...state,
                ...action.payload,
                isLoggedIn: true,
                isLoading: true,
            };
        }
        case AUTH.LOGIN.REQUEST: {
            return {
                ...state,
                isLoading: true,
                isLoggedIn: false,
            };
        }
        case AUTH.LOGIN.FAILURE: {
            return {
                ...state,
                isLoading: false,
                isLoggedIn: false,
            };
        }
        case AUTH.LOGOUT.REQUEST: {
            return {
                ...initialState,
            };
        }
        default:
            return state;
    }
};

export default authReducer;
