import createActionConstants from '../utils/createActionConstants';

export const AUTH = {
    LOGIN: createActionConstants('AUTH.LOGIN'),
    LOGOUT: createActionConstants('AUTH.LOGOUT'),
    REGISTRATION: createActionConstants('AUTH.REGISTRATION'),
};

export const CUSTOMERS = {
    GET_ALL: createActionConstants('CUSTOMERS.GET_ALL'),
    GET_BY_ID: createActionConstants('CUSTOMERS.GET_BY_ID'),
    UPDATE_STATUS_BY_ID: createActionConstants('CUSTOMERS.UPDATE_STATUS_BY_ID'),
    NOTIFICATIONS: {
        GET_ALL: createActionConstants('CUSTOMERS.NOTIFICATIONS.GET_ALL'),
        READ: createActionConstants('CUSTOMERS.NOTIFICATIONS.READ'),
        GET_UNSEEN: createActionConstants('CUSTOMERS.NOTIFICATIONS.GET_UNSEEN'),
    },
};

export const LOCATIONS = {
    GET_ALL: createActionConstants('LOCATIONS.GET_ALL'),
    ADD: createActionConstants('LOCATIONS.ADD'),
    GET_BY_ID: createActionConstants('LOCATIONS.GET_BY_ID'),
    REMOVE_BY_ID: createActionConstants('LOCATIONS.REMOVE_BY_ID'),
    TRACK: createActionConstants('LOCATIONS.TRACK'),
};
