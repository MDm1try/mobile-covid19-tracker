import { CUSTOMERS } from '../actions';
import CustomersActionTypes from '../actionTypes/CustomersActionTypes';

const initialState = {
    list: [],
    lastCustomerStatus: null,
    isLoading: false,
};

const customersReducer = (state = initialState, action: CustomersActionTypes) => {
    switch (action.type) {
        case CUSTOMERS.GET_LAST_STATUS.SUCCESS: {
            return {
                ...state,
                lastCustomerStatus: action.payload,
                isLoading: false,
            };
        }
        case CUSTOMERS.GET_ALL.SUCCESS: {
            return {
                ...state,
                list: action.payload,
                isLoading: false,
            };
        }
        case CUSTOMERS.GET_BY_ID.SUCCESS: {
            return {
                ...state,
                customer: action.payload,
                isLoading: false,
            };
        }
        case CUSTOMERS.GET_BY_ID.REQUEST:
        case CUSTOMERS.GET_ALL.REQUEST: {
            return {
                ...state,
                customer: null,
                isLoading: true,
            };
        }
        case CUSTOMERS.GET_LAST_STATUS.REQUEST:
        case CUSTOMERS.UPDATE_STATUS_BY_ID.REQUEST: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case CUSTOMERS.GET_LAST_STATUS.FAILURE:
        case CUSTOMERS.GET_ALL.FAILURE: {
            return {
                ...state,
                isLoading: false,
            };
        }
        case CUSTOMERS.GET_BY_ID.FAILURE:
        case CUSTOMERS.UPDATE_STATUS_BY_ID.FAILURE:
        case CUSTOMERS.UPDATE_STATUS_BY_ID.SUCCESS: {
            return {
                ...state,
                isLoading: false,
            };
        }
        default:
            return state;
    }
};

export default customersReducer;
