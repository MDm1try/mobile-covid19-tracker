import { CUSTOMERS } from '../actions';
import CustomersActionTypes from '../actionTypes/CustomersActionTypes';

const initialState = {
    list: [],
    unseenNotifications: 0,
    isLoading: false,
};

const notificationsReducer = (state = initialState, action: CustomersActionTypes) => {
    switch (action.type) {
        case CUSTOMERS.NOTIFICATIONS.GET_UNSEEN.SUCCESS: {
            return {
                ...state,
                unseenNotifications: action.payload,
            };
        }
        case CUSTOMERS.NOTIFICATIONS.GET_ALL.SUCCESS: {
            const { notifications, unseenNotifications } = action.payload;
            return {
                ...state,
                list: notifications,
                unseenNotifications,
                isLoading: false,
            };
        }
        case CUSTOMERS.NOTIFICATIONS.READ.REQUEST:
        case CUSTOMERS.NOTIFICATIONS.GET_ALL.REQUEST: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case CUSTOMERS.NOTIFICATIONS.READ.FAILURE:
        case CUSTOMERS.NOTIFICATIONS.GET_ALL.FAILURE: {
            return {
                ...state,
                isLoading: false,
            };
        }
        default:
            return state;
    }
};

export default notificationsReducer;
